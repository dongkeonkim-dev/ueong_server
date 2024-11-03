#!/bin/bash

# Python 경로 설정
PYTHON_DIR="./python"

# 스크립트 실행 경로 확인
echo "현재 작업 디렉토리: $PWD"

# Python 설치 스크립트 실행
chmod +x "$PYTHON_DIR/src/install_python.sh"
bash "$PYTHON_DIR/src/install_python.sh"

# 가상 환경 생성 스크립트 실행
chmod +x "$PYTHON_DIR/src/create_venv.sh"
bash "$PYTHON_DIR/src/create_venv.sh"

# 의존성 설치 스크립트 실행
chmod +x "$PYTHON_DIR/src/install_requirements.sh"
bash "$PYTHON_DIR/src/install_requirements.sh"

# 가상 환경 활성화
if [ -d "$PYTHON_DIR/venv" ]; then
    source "$PYTHON_DIR/venv/bin/activate"
    echo "가상 환경이 활성화되었습니다."
else
    echo "가상 환경이 존재하지 않습니다."
    exit 1
fi

# Python 스크립트 실행 (인자 전달)
python3 "$PYTHON_DIR/src/address_to_csv.py" "$1"

# 가상 환경 비활성화
deactivate
echo "가상 환경이 비활성화되었습니다."