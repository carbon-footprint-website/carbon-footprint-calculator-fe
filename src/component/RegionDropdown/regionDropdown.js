import "./regionDropdown.css"
import React from "react";
import Select from "react-select";
import { useState } from "react";

const regions = [
  { value: "seoul", label: "서울" },
  { value: "busan", label: "부산" },
  { value: "daegu", label: "대구" },
  { value: "incheon", label: "인천" },
  { value: "gwangju", label: "광주" },
  { value: "daejeon", label: "대전" },
  { value: "ulsan", label: "울산" },
  { value: "sejong", label: "세종" },
  { value: "gyeonggi", label: "경기" },
  { value: "chungbuk", label: "충북" },
  { value: "chungnam", label: "충남" },
  { value: "jeonnam", label: "전남" },
  { value: "gyeongbuk", label: "경북" },
  { value: "gyeongnam", label: "경남" },
  { value: "gangwon", label: "강원" },
  { value: "jeonbuk", label: "전북" },
  { value: "jeju", label: "제주" },
];

const RegionDropdown = ({ width = "200px", height = "40px", onRegionSelect  }) => {
    
    const [selectedRegion, setSelectedRegion] = useState("");

    const handleChange = (selectedOption) => {
        setSelectedRegion(selectedOption.value.value); // 선택된 옵션 객체 저장
    if (onRegionSelect) {
      onRegionSelect(selectedOption.value); // 부모로 선택된 값 전달
    }
    };
  

    return (
    <Select className="inner-region-dropdown"
      placeholder="지역을 선택하세요"
      options={regions}
      onChange={handleChange} value={selectedRegion}
      styles={{
        control: (base) => ({
          ...base,
          width: width,
          height: height, // 드롭다운 너비
          fontSize: "16px",
        }),
        menu: (base) => ({
          ...base,
          maxHeight: width, // 드롭다운 높이 제한
          overflowY: "hidden",
        }),
      }}
    />
  );
};

export default RegionDropdown;
