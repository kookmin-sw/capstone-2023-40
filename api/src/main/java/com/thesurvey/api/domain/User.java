package com.thesurvey.api.domain;

import com.thesurvey.api.domain.EnumTypeEntity.Role;
import com.thesurvey.api.exception.BadRequestExceptionMapper;
import com.thesurvey.api.exception.ErrorMessage;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
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
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", unique = true)
    private Long userId;

    @OneToMany(
        mappedBy = "user",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Participation> participations;

    @OneToMany(
        mappedBy = "user",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<AnsweredQuestion> answeredQuestions;

    @OneToMany(
        mappedBy = "user",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<PointHistory> pointHistories;

    /**
     * User's name should be unique. This will be used when finding user during authentication
     */
    @NotBlank
    @Size(max = 50)
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    /**
     * email should be unique. This will be used when login user during authentication
     */
    @Email
    @NotBlank
    @Size(max = 100)
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotBlank
    @Size(min = 60, max = 60)
    @Column(name = "password", nullable = false)
    private String password;

    @NotBlank
    @Pattern(regexp = "^01[016-9]\\d{7,8}$")
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Size(max = 100)
    @Column(name = "address", nullable = true)
    private String address;

    @Pattern(regexp = "^https?://.*$")
    @Column(name = "profile_image", nullable = true)
    private String profileImage;

    public void changePassword(String password) {
        if (!password.matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()_+=])\\S{8,25}$")) {
            throw new BadRequestExceptionMapper(ErrorMessage.INVALID_REQUEST);
        }
        this.password = passwordEncoder().encode(password);
    }

    public void changeAddress(String address) {
        if (address.length() > 100) {
            throw new BadRequestExceptionMapper(ErrorMessage.MAX_SIZE_EXCEEDED, "주소", 100);
        }
        this.address = address;
    }

    public void changePhoneNumber(String phoneNumber) {
        if (!phoneNumber.matches("^01[016-9]\\d{7,8}$")) {
            throw new BadRequestExceptionMapper(ErrorMessage.INVALID_REQUEST);
        }
        this.phoneNumber = phoneNumber;
    }

    public void changeProfileImage(String profileImage) {
        if (!profileImage.matches("^https?://.*$")) {
            throw new BadRequestExceptionMapper(ErrorMessage.INVALID_REQUEST);
        }
        this.profileImage = profileImage;
    }

    @Builder
    public User(List<Participation> participations, List<AnsweredQuestion> answeredQuestions,
        List<PointHistory> pointHistories, String email, String name, String password,
        String phoneNumber, String address, String profileImage) {
        this.participations = participations;
        this.answeredQuestions = answeredQuestions;
        this.pointHistories = pointHistories;
        this.email = email;
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.profileImage = profileImage;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role = Role.USER;

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        User user = (User) o;
        return Objects.equals(userId, user.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId);
    }

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
