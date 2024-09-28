#!/bin/bash

# MySQL 사용자 정보
USERNAME="root"          # MySQL 사용자 이름
PASSWORD="11223344"      # MySQL 비밀번호
DB_NAME="ueong"     # 적용할 데이터베이스 이름
BACKUP_DIR="$(dirname "$0")/ueong_database_backup"  # 현재 스크립트의 디렉토리에 백업할 디렉토리 설정

# 최신 스키마 및 데이터 파일 찾기
SCHEMA_BACKUP_FILE=$(ls -t $BACKUP_DIR/ueong_schema_*.sql 2>/dev/null | head -n 1)  # 최신 스키마 파일
DATA_BACKUP_FILE=$(ls -t $BACKUP_DIR/ueong_data_*.sql 2>/dev/null | head -n 1)      # 최신 데이터 파일

if [ -z "$SCHEMA_BACKUP_FILE" ]; then
    echo "최신 스키마 백업 파일을 찾을 수 없습니다."
    exit 1
fi

if [ -z "$DATA_BACKUP_FILE" ]; then
    echo "최신 데이터 백업 파일을 찾을 수 없습니다."
    exit 1
fi

# 기존 데이터베이스 삭제 (있을 경우)
mysql -u $USERNAME -p$PASSWORD -e "DROP DATABASE IF EXISTS $DB_NAME;"
echo "기존 데이터베이스가 삭제되었습니다: $DB_NAME"

# 데이터베이스 생성
mysql -u $USERNAME -p$PASSWORD -e "CREATE DATABASE $DB_NAME;"
echo "새 데이터베이스가 생성되었습니다: $DB_NAME"

# 스키마 적용
mysql -u $USERNAME -p$PASSWORD $DB_NAME < "$SCHEMA_BACKUP_FILE"
if [ $? -eq 0 ]; then
    echo "스키마가 성공적으로 적용되었습니다: $SCHEMA_BACKUP_FILE"
else
    echo "스키마 적용 중 오류 발생"
fi

# 데이터 적용
mysql -u $USERNAME -p$PASSWORD $DB_NAME < "$DATA_BACKUP_FILE"
if [ $? -eq 0 ]; then
    echo "데이터가 성공적으로 적용되었습니다: $DATA_BACKUP_FILE"
else
    echo "데이터 적용 중 오류 발생"
fi
