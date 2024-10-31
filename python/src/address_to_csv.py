import sys
import os
import pandas as pd

def convert_excel_to_csv(excel_file):
    # Check if the Excel file exists
    if not os.path.isfile(excel_file):
        print(f"Error: 파일 '{excel_file}'을(를) 찾을 수 없습니다.")
        sys.exit(1)

    try:
        # Read all sheets from the Excel file
        xls = pd.ExcelFile(excel_file)
        all_data = pd.concat([xls.parse(sheet) for sheet in xls.sheet_names], ignore_index=True)
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        sys.exit(1)

    # Rename columns to standard names
    all_data.columns = ['시도', '시군구', '읍면동구', '읍면리동', '리', '위도', '경도']

    # Drop rows where 시도 is missing
    all_data = all_data.dropna(subset=['시도'])

    # Reset index after dropping
    all_data.reset_index(drop=True, inplace=True)

    # Create address_sd.csv
    sd_df = all_data[['시도']].drop_duplicates().reset_index(drop=True)
    sd_df = sd_df.rename(columns={'시도': 'sd_name'})
    sd_df['sd_id'] = sd_df.index + 1  # Assign sd_id starting from 1
    sd_df = sd_df[['sd_id', 'sd_name']]
    sd_df.to_csv('address_sd.csv', index=False, encoding='utf-8')
    # Changed encoding from 'utf-8-sig' to 'utf-8'

    # Create address_sgg.csv
    sgg_df = all_data[['시군구', '시도']].drop_duplicates().reset_index(drop=True)
    sgg_df = sgg_df.rename(columns={'시군구': 'sgg_name', '시도': 'sd_name'})

    # **추가 수정: sgg_name이 비어있는 행을 제거합니다.**
    sgg_df = sgg_df.dropna(subset=['sgg_name'])

    # Merge with sd_df to get sd_id
    sgg_df = sgg_df.merge(sd_df, on='sd_name', how='left')
    sgg_df = sgg_df.drop(columns=['sd_name'])
    sgg_df['sgg_id'] = sgg_df.index + 1  # Assign sgg_id starting from 1
    sgg_df = sgg_df[['sgg_id', 'sgg_name', 'sd_id']]
    sgg_df.to_csv('address_sgg.csv', index=False, encoding='utf-8')
    # Changed encoding from 'utf-8-sig' to 'utf-8'

    # Create address_emd.csv
    emd_df = all_data[['읍면동구', '시군구', '위도', '경도']].drop_duplicates().reset_index(drop=True)
    emd_df = emd_df.rename(columns={'읍면동구': 'emd_name', '시군구': 'sgg_name'})
    
    # **추가 수정: emd_name이 비어있는 행을 제거합니다.**
    emd_df = emd_df.dropna(subset=['emd_name'])

    # Merge with sgg_df to get sgg_id
    emd_df = emd_df.merge(sgg_df, on='sgg_name', how='left')
    emd_df = emd_df.drop(columns=['sgg_name'])
    emd_df['emd_id'] = emd_df.index + 1  # Assign emd_id starting from 1
    emd_df = emd_df.rename(columns={'위도': 'emd_latitude', '경도': 'emd_longitude'})
    emd_df = emd_df[['emd_id', 'emd_name', 'sgg_id', 'emd_latitude', 'emd_longitude']]
    emd_df.to_csv('address_emd.csv', index=False, encoding='utf-8')
    # Changed encoding from 'utf-8-sig' to 'utf-8'

    print("CSV 파일이 성공적으로 생성되었습니다:")
    print("- address_sd.csv")
    print("- address_sgg.csv")
    print("- address_emd.csv")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("사용법: python3 address_to_csv.py <엑셀파일.xlsx>")
        sys.exit(1)

    excel_file = sys.argv[1]
    convert_excel_to_csv(excel_file)
