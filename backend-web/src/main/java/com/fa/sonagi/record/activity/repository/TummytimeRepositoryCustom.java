package com.fa.sonagi.record.activity.repository;

import com.fa.sonagi.record.activity.dto.ActivityResDto;

public interface TummytimeRepositoryCustom {
	ActivityResDto findTummytimeRecord(Long tummytimeId);
}
