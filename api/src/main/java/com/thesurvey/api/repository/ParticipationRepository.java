package com.thesurvey.api.repository;

import com.thesurvey.api.domain.Participation;
import com.thesurvey.api.domain.ParticipationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipationRepository extends JpaRepository<Participation, ParticipationId> {

}
