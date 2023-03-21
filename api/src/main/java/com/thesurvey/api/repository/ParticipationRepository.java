package com.thesurvey.api.repository;

import com.thesurvey.api.domain.Participation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {

}
