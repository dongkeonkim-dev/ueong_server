#!/bin/bash

# MySQL 사용자 정보
USERNAME="root"          # MySQL 사용자 이름
PASSWORD="11223344"      # MySQL 비밀번호
DB_NAME="ueong"          # 백업할 데이터베이스 이름
BACKUP_DIR="$(dirname "$0")/ueong_database_backup"  # 현재 스크립트의 디렉토리에 백업할 디렉토리 설정

# 백업 디렉토리 생성
mkdir -p "$BACKUP_DIR"

# 날짜 포맷 설정
DATE=$(date +"%Y%m%d_%H%M%S")

# 백업 파일 이름 설정
SCHEMA_BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_schema_$DATE.sql"
DATA_BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_data_$DATE.sql"

# 스키마 덤프
mysqldump -u $USERNAME -p$PASSWORD --no-data $DB_NAME > $SCHEMA_BACKUP_FILE
if [ $? -eq 0 ]; then
    echo "스키마 백업이 완료되었습니다: $SCHEMA_BACKUP_FILE"
else
    echo "스키마 백업 중 오류 발생"
fi

# 데이터 덤프
mysqldump -u $USERNAME -p$PASSWORD --no-create-info $DB_NAME > $DATA_BACKUP_FILE
if [ $? -eq 0 ]; then
    echo "데이터 백업이 완료되었습니다: $DATA_BACKUP_FILE"
else
    echo "데이터 백업 중 오류 발생"
fi
