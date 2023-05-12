package com.thesurvey.api.repository;

import com.thesurvey.api.domain.UserCertification;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCertificationRepository extends JpaRepository<UserCertification, Long> {

    @Query("SELECT uc.certificationType FROM UserCertification uc WHERE uc.userCertificationId.userId = :userId")
    List<Integer> findUserCertificationTypeByUserId(Long userId);

    @Query("SELECT uc FROM UserCertification uc WHERE uc.userCertificationId.userId = :userId")
    List<UserCertification> findUserCertificationByUserId(Long userId);

    void deleteByExpirationDateLessThanEqual(LocalDateTime nowDate);

}