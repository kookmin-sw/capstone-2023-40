package com.thesurvey.api.repository;

import com.thesurvey.api.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByName(String name);

    @Query("SELECT u FROM User u JOIN fetch u.answeredQuestions a")
    Optional<List<User>> findByAllWithAnsweredQuestion();
}
