import './css/selection1.css'
import Title from './title';
import Button from './button';
import RegionDropdown from "./RegionDropdown/regionDropdown"
import { useState, useEffect, useRef } from 'react';

const regionTrafficMatrix = 
    {
        "seoul": {"electric-car" : 0.0, "fuel-car": 33.01, "bus": 4.35, "train": 4.07, "airplane": 0.0},
        "busan": {"electric-car" : 0.0, "fuel-car": 79.86, "bus": 10.53, "train": 14.75, "airplane": 0.0},
        "daegu": {"electric-car" : 0.0, "fuel-car": 57.35, "bus": 7.56, "train": 12.25, "airplane": 0.0},
        "incheon": {"electric-car" : 0.0, "fuel-car": 36.37, "bus": 4.8, "train": 5.31, "airplane": 0.0},
        "gwangju": {"electric-car" : 0.0, "fuel-car": 79.63, "bus": 10.5, "train": 11.79, "airplane": 0.0},
        "daejeon": {"electric-car" : 0.0, "fuel-car": 45.42, "bus": 5.99, "train": 8.27, "airplane": 0.0},
        "ulsan": {"electric-car" : 0.0, "fuel-car": 75.94, "bus": 10.02, "train": 11.92, "airplane": 0.0},
        "sejong": {"electric-car" : 0.0, "fuel-car": 43.39, "bus": 5.72, "train": 7.21, "airplane": 0.0},
        "gyeonggi": {"electric-car" : 0.0, "fuel-car": 30.7, "bus": 4.05, "train": 5.59, "airplane": 0.0},
        "chungbuk": {"electric-car" : 0.0, "fuel-car": 37.86, "bus": 4.99, "train": 7.41, "airplane": 0.0},
        "chungnam": {"electric-car" : 0.0, "fuel-car": 51.01, "bus": 6.73, "train": 8.22, "airplane": 0.0},
        "jeonnam": {"electric-car" : 0.0, "fuel-car": 91.77, "bus": 12.1, "train": 13.18, "airplane": 0.0},
        "gyeongbuk": {"electric-car" : 0.0, "fuel-car": 39.4, "bus": 5.2, "train": 10.5, "airplane": 0.0},
        "gyeongnam": {"electric-car" : 0.0, "fuel-car": 78.08, "bus": 10.3, "train": 13.74, "airplane": 0.0},
        "gangwon": {"electric-car" : 0.0, "fuel-car": 23.86, "bus": 3.15, "train": 6.12, "airplane": 0.0},
        "jeonbuk": {"electric-car" : 0.0, "fuel-car": 62.73, "bus": 8.27, "train": 10.3, "airplane": 0.0},
        "jeju": {"electric-car" : 0.0, "fuel-car": 11.11, "bus": 0.0, "train": 0.0, "airplane": 98}
      }
      
const Selection1 = ({onResultChange}) => {

    const [selectedTraffic, setSelectedTraffic] = useState(null); // 선택된 버튼 ID를 저장

    const [selectedRegion, setSelectedRegion] = useState(null); // 지역 정보 저장

    // 선택지를 배열로 관리 (첫 번째 요소는 교통수단, 두 번째 요소는 지역)

    const [activeTrafficButton, setActiveTrafficButton] = useState(null); // 활성화된 버튼 ID 저장

    const selectionResult1 = useRef(1);
    const visibleOption1 = useRef(true);
    const visibleValue1 = useRef(0);

    useEffect(() => {
        if (selectedRegion && selectedTraffic) {
          // 두 값이 모두 선택되었을 때 실행
          if(selectedTraffic=="fuel-car"&&selectedRegion!="jeju"){
            visibleOption1.current = true
            visibleValue1.current = ((regionTrafficMatrix[selectedRegion][selectedTraffic]-regionTrafficMatrix[selectedRegion]['bus'])/regionTrafficMatrix[selectedRegion][selectedTraffic]*100).toFixed(2)
          }else{
            visibleOption1.current = false
          }
          //selectedTraffic=="fuel-car"?visibleOption1.current = true :visibleOption1.current = false
          selectionResult1.current = regionTrafficMatrix[selectedRegion][selectedTraffic]          
          // 부모로 전달
        
          
        if (onResultChange) {
            onResultChange(selectionResult1,visibleOption1,selectedRegion, visibleValue1);
        }
        }
      }, [selectedRegion, selectedTraffic]); // 상태가 변경될 때마다 실행

    const handleTrafficButtonClick = (traffic) => {
        setSelectedTraffic(traffic); // 클릭된 버튼 ID로 상태 업데이트
        setActiveTrafficButton(traffic);    
    };

    const handleRegionSelect = (regionData) => {
      setSelectedRegion(regionData);
    };
    
    return(
        <div className='selection-content-container'>
            <div className='selection-inner-container'>
                <div className='left-content-container'>
                    <Title content='어떤 교통수단을 이용하여 오셨나요?' fontColor={'white'} fontSize={'max(16px,1.4vw)'}/>
                    <div className='traffic-option-container'>
                        <div className='traffic-btn-container'>
                            <Button 
                                label={'자동차(휘발유, 경유)'}
                                radius='8px'
                                border='none'
                                fontSize='max(15px,1.2vw)'
                                width={'calc((170/1280)*100vw)'}
                                height={'calc((58/720)*100vh)'}
                                bgColor={activeTrafficButton === "fuel-car" ? "white" : "#001F3F"} // 활성화된 버튼 색상 변경
                                color={activeTrafficButton === "fuel-car" ? "#001F3F" : "white"} 
                                onClick={() => handleTrafficButtonClick('fuel-car')}/>
                            <Button
                                label={'자동차(전기차)'}
                                width={'calc((140/1280)*100vw)'}
                                height={'calc((58/720)*100vh)'}
                                radius='8px'
                                border='none'
                                fontSize='max(15px,1.2vw)'
                                bgColor={activeTrafficButton === "electric-car" ? "white" : "#001F3F"} // 활성화된 버튼 색상 변경
                                color={activeTrafficButton === "electric-car" ? "#001F3F" : "white"} 
                                onClick={() => handleTrafficButtonClick('electric-car')} />
                        </div>
                        <div className='traffic-btn-container'>
                            <Button
                                label={'고속버스'} 
                                width={'calc((110/1280)*100vw)'}
                                height={'calc((58/720)*100vh)'} 
                                radius='8px' border='none'
                                fontSize='max(17px,1.3vw)'
                                bgColor={activeTrafficButton === "bus" ? "white" : "#001F3F"} // 활성화된 버튼 색상 변경
                                color={activeTrafficButton === "bus" ? "#001F3F" : "white"} 
                                onClick={() => handleTrafficButtonClick('bus')}/>
                            <Button 
                                label={'국내항공'} 
                                width={'calc((110/1280)*100vw)'}
                                height={'calc((58/720)*100vh)'}
                                radius='8px'
                                border='none' 
                                fontSize='max(17px,1.3vw)'
                                bgColor={activeTrafficButton === "airplane" ? "white" : "#001F3F"} // 활성화된 버튼 색상 변경
                                color={activeTrafficButton === "airplane" ? "#001F3F" : "white"} 
                                onClick={() => handleTrafficButtonClick('airplane')}/>
                            <Button 
                                label={'기차'}
                                width={'calc((110/1280)*100vw)'}
                                height={'calc((58/720)*100vh)'} 
                                radius='8px'
                                border='none'
                                fontSize='max(17px,1.3vw)'
                                bgColor={activeTrafficButton === "train" ? "white" : "#001F3F"} // 활성화된 버튼 색상 변경
                                color={activeTrafficButton === "train" ? "#001F3F" : "white"} 
                                onClick={() => handleTrafficButtonClick('train')}/>
                        </div>
                    </div>
                </div>
                <div className="selection-divider">
                </div>
                <div className='right-content-container'>
                    <div className='right-inner-container'>
                        <Title content='지역을 선택해주세요.' fontColor={'white'} fontSize={'max(16px,1.4vw)'}/>
                        <div className='region-dropbox-container'>
                            <RegionDropdown
                                width='calc((320/1280)*100vw)'
                                height='calc((50/720)*100vh)'
                                onRegionSelect={handleRegionSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Selection1;