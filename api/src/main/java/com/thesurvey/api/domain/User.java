package com.thesurvey.api.domain;

import com.thesurvey.api.domain.EnumTypeEntity.Role;
import java.util.Collection;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @OneToMany(
        mappedBy = "participationId.user",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Participation> participations;
    @OneToMany(
        mappedBy = "answeredQuestionId.user",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<AnsweredQuestion> answeredQuestions;
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "address", nullable = true)
    private String address;

    @Column(name = "profile_image", nullable = true)
    private String profileImage;

    @Builder
    public User(String email, String name, Role role, String password, String phoneNumber, String address, String profileImage) {
        this.email = email;
        this.name = name;
        this.role = role;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.profileImage = profileImage;
    }

    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
