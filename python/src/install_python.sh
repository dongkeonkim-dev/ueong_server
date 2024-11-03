#!/bin/bash

# Python 설치 확인 및 설치
if ! command -v python3 &> /dev/null; then
    echo "Python이 설치되어 있지 않습니다. 설치를 진행합니다."
    # Homebrew가 설치되어 있는지 확인
    if ! command -v brew &> /dev/null; then
        echo "Homebrew가 설치되어 있지 않습니다. Homebrew를 설치합니다."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    # Python 설치
    brew install python
    if [ $? -ne 0 ]; then
        echo "Python 설치에 실패했습니다."
        exit 1
    fi
    echo "Python이 설치되었습니다."
else
    echo "Python이 이미 설치되어 있습니다."
fi