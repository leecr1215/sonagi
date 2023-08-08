package com.fa.sonagi.record.health.repository;

import java.time.LocalDate;
import java.util.List;

import com.fa.sonagi.record.health.dto.HealthResDto;
import com.fa.sonagi.statistics.health.dto.HealthStatisticsQueryDto;

public interface MedicationRepositoryCustom {

	HealthResDto findMedicationRecord(Long medicationId);

	List<HealthStatisticsQueryDto> findMedicationByDay(Long babyId, LocalDate createdDate);

	Long findMedicationCnt(Long babyId, LocalDate createdDate);
}
