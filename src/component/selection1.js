import './css/selection1.css'
import Title from './title';
import Button from './button';
import RegionDropdown from "./RegionDropdown/regionDropdown"
import { useState, useEffect, useRef } from 'react';

const regionTrafficMatrix = 
    {
           "seoul": {"electric-car": 50.5949325, "fuel-car": 567.5656872, "bus": 2.2991, "train": 0.00492, "airplane": 0},
    "busan": {"electric-car": 254.1938175, "fuel-car": 2851.504718, "bus": 11.5509, "train": 10.56514, "airplane": 0},
    "daegu": {"electric-car": 190.18818, "fuel-car": 2133.499933, "bus": 8.6424, "train": 7.17747, "airplane": 0},
    "incheon": {"electric-car": 73.7588775, "fuel-car": 827.415038, "bus": 3.3517, "train": 0.00608, "airplane": 0},
    "gwangju": {"electric-car": 218.228745, "fuel-car": 2448.05441, "bus": 9.9166, "train": 7.69106, "airplane": 0},
    "daejeon": {"electric-car": 132.887895, "fuel-car": 1490.714696, "bus": 6.0386, "train": 4.04786, "airplane": 0},
    "ulsan": {"electric-car": 238.95438, "fuel-car": 2680.551197, "bus": 10.8584, "train": 9.25713, "airplane": 0},
    "sejong": {"electric-car": 127.4016975, "fuel-car": 1429.171429, "bus": 5.7893, "train": 3.15983, "airplane": 0},
    "gyeonggi": {"electric-car": 62.7864825, "fuel-car": 704.3285034, "bus": 2.8531, "train": 0.0048, "airplane": 0},
    "chungbuk": {"electric-car": 109.72395, "fuel-car": 1230.865346, "bus": 4.986, "train": 3.15983, "airplane": 0},
    "chungnam": {"electric-car": 124.35381, "fuel-car": 1394.980725, "bus": 5.6508, "train": 0.00492, "airplane": 0},
    "jeonnam": {"electric-car": 248.70762, "fuel-car": 2789.96145, "bus": 11.3016, "train": 9.3811, "airplane": 0},
    "gyeongbuk": {"electric-car": 132.887895, "fuel-car": 1490.714696, "bus": 6.0386, "train": 5.55382, "airplane": 0},
    "gyeongnam": {"electric-car": 233.4681825, "fuel-car": 2619.00793, "bus": 10.6091, "train": 9.74289, "airplane": 0},
    "gangwon": {"electric-car": 12.8011275, "fuel-car": 143.600957, "bus": 0.5817, "train": 0, "airplane": 0},
    "jeonbuk": {"electric-car": 169.462545, "fuel-car": 1901.003145, "bus": 7.7006, "train": 4.76132, "airplane": 0},
    "jeju": {"electric-car": 0, "fuel-car": 0, "bus": 0, "train": 0, "airplane": 2472.5}
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
                                label={'기차/지하철'}
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