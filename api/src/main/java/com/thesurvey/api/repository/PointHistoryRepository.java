package com.thesurvey.api.repository;

import java.util.List;

import com.thesurvey.api.domain.PointHistory;
import com.thesurvey.api.domain.PointHistoryId;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PointHistoryRepository extends JpaRepository<PointHistory, PointHistoryId> {

    @Query(value = "SELECT ph.point FROM PointHistory ph WHERE ph.user.userId = :userId ORDER BY "
        + "ph.transactionDate DESC")
    List<Integer> findPointHistoryByUserId(@Param("userId") Long userId);
}
