package com.thesurvey.api.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.thesurvey.api.domain.Survey;
import com.thesurvey.api.dto.response.user.UserSurveyTitleDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, UUID> {

    @Query("SELECT s FROM Survey s ORDER BY s.createdDate DESC")
    Page<Survey> findAllInDescendingOrder(Pageable pageable);

    @Query("SELECT p.certificationType FROM Participation p WHERE p.survey.surveyId = :surveyId AND p.user.userId = :authorId")
    List<Integer> findCertificationTypeBySurveyIdAndAuthorId(@Param("surveyId") UUID surveyId, @Param("authorId") Long authorId);

    Optional<Survey> findBySurveyId(UUID surveyId);

    @Query("SELECT new com.thesurvey.api.dto.response.user.UserSurveyTitleDto(s.surveyId, s.title) FROM Survey s WHERE s.authorId = :authorId ORDER BY s.createdDate DESC")
    List<UserSurveyTitleDto> findUserCreatedSurveysByAuthorID(@Param("authorId") Long authorId);

}
