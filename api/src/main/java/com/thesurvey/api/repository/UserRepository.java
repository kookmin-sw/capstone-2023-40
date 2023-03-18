package com.thesurvey.api.repository;

import com.thesurvey.api.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Override
    List<User> findAll();

    User save(User user);
    Optional<User> findByEmail(String email);
    Optional<User> findByName(String name);
}
