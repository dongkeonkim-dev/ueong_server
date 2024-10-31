#!/bin/bash

# 가상 환경 디렉토리 설정
PYTHON_DIR="./python"  # 가상 환경을 생성할 디렉토리 경로
REQUIREMENTS_FILE="$PYTHON_DIR/requirements.txt"  # 의존성 라이브러리 목록 파일

# 가상 환경 활성화
if [ -d "$PYTHON_DIR/venv" ]; then
    source "$PYTHON_DIR/venv/bin/activate"
else
    echo "가상 환경이 존재하지 않습니다. 경로를 확인하세요."
    exit 1
fi

# 현재 설치된 패키지를 requirements.txt로 내보내기
pip freeze > "$REQUIREMENTS_FILE"

echo "의존성 라이브러리가 $REQUIREMENTS_FILE 파일로 저장되었습니다."

# 가상 환경 비활성화
deactivate