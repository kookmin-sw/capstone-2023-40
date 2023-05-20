package com.thesurvey.api.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import com.thesurvey.api.domain.PointHistory;
import com.thesurvey.api.domain.User;
import com.thesurvey.api.repository.PointHistoryRepository;

import org.springframework.stereotype.Service;

@Service
public class PointHistoryService {

    private final PointHistoryRepository pointHistoryRepository;

    public PointHistoryService(PointHistoryRepository pointHistoryRepository) {this.pointHistoryRepository = pointHistoryRepository;}

    public void savePointHistory(User user, int saveUserPoint) {
        int userTotalPoint = getUserTotalPoint(user.getUserId());
        pointHistoryRepository.save(
            PointHistory.builder()
                .user(user)
                .transactionDate(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .point(userTotalPoint + saveUserPoint)
                .build()
        );
    }

    public Integer getUserTotalPoint(Long userId) {
        List<Integer> totalPoint = pointHistoryRepository.findPointHistoryByUserId(userId);
        return totalPoint.get(0);
    }

}
