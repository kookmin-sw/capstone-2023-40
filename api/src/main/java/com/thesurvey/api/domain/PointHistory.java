package com.thesurvey.api.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "point_history")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PointHistory {

    @EmbeddedId
    private PointHistoryId pointHistoryId;

    @Column(name = "transaction_date", insertable = false, updatable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime transactionDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "point")
    private Integer point;

    public static final int USER_INITIAL_POINT = 50;

    @Builder
    public PointHistory(User user, LocalDateTime transactionDate, Integer point) {
        this.user = user;
        this.point = point;
        this.transactionDate = transactionDate;
        this.pointHistoryId = PointHistoryId.builder()
            .transactionDate(transactionDate)
            .userId(user.getUserId())
            .build();
    }

}
