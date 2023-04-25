package com.thesurvey.api.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PointHistoryId implements Serializable {

    @Column(name = "transaction_date")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime transactionDate;

    @Column(name = "user_id")
    private Long userId;

    @Builder
    public PointHistoryId(LocalDateTime transactionDate, Long userId) {
        this.transactionDate = transactionDate;
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PointHistoryId that = (PointHistoryId) o;
        return Objects.equals(transactionDate, that.transactionDate) && Objects.equals(userId,
            that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(transactionDate, userId);
    }
}
