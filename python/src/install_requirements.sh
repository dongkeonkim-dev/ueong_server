#!/bin/bash

# 가상 환경 디렉토리 설정
PYTHON_DIR="./python"  # 가상 환경을 생성할 디렉토리 경로
REQUIREMENTS_FILE="$PYTHON_DIR/requirements.txt"  # 의존성 라이브러리 목록 파일

# 가상 환경 활성화
if [ -d "$PYTHON_DIR/venv" ]; then
    source "$PYTHON_DIR/venv/bin/activate"
    echo "가상 환경이 활성화되었습니다."
else
    echo "가상 환경이 존재하지 않습니다. 경로를 확인하세요."
    exit 1
fi

# 의존성 라이브러리 설치
if [ -f "$REQUIREMENTS_FILE" ]; then
    echo "의존성 라이브러리를 설치합니다."
    pip install -r "$REQUIREMENTS_FILE"
else
    echo "의존성 라이브러리 목록 파일이 존재하지 않습니다."
    deactivate
    exit 1
fi

# 가상 환경 비활성화
deactivate
echo "가상 환경이 비활성화되었습니다."