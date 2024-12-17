import '../css/resultView.css'
import Button from '../component/button';
import homeIcon from '../assets/icon/home-icon-navy.png'
import previousIcon from '../assets/icon/previous-icon-navy.png'
import nextIcon from '../assets/icon/next-icon.png'
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const regions = {
    seoul: "서울",
    busan: "부산",
    daegu: "대구",
    incheon: "인천",
    gwangju: "광주",
    daejeon: "대전",
    ulsan: "울산",
    sejong: "세종",
    gyeonggi: "경기",
    chungbuk: "충북",
    chungnam: "충남",
    jeonnam: "전남",
    gyeongbuk: "경북",
    gyeongnam: "경남",
    gangwon: "강원",
    jeonbuk: "전북",
    jeju: "제주"
}

function ResultView () {

    const location = useLocation();
    const data = location.state;
    const [percentile, setPercentile] = useState('100');

    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate("/");
    }

    const saveCarbonEmission = () => {
        const request = {
            regionName: data.visibleRegion, // 지역 이름
            emissionValue: data.entireResult // 탄소 배출량
        };
    
        fetch("http://211.117.197.184:50/api/carbon-emissions", { // API 엔드포인트
            method: "POST",
            headers: {
                "Content-Type": "application/json", // JSON 데이터 전송
            },
            body: JSON.stringify(request), // 객체를 JSON 문자열로 변환
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then((result) => {
            // console.log("데이터 저장 성공:", result); // 서버에서 반환된 결과 확인
            alert("탄소 배출량 저장 성공!");
        })
        .catch((error) => {
            // console.error("데이터 저장 실패:", error); // 오류 처리
            alert("탄소 배출량 저장 실패. 다시 시도해주세요.");
        });
    };
    
    useEffect(() => {
        console.log('데이터')
        console.log(data.visibleValue2)
        console.log('데이터 끝')
        if (data.entireResult) {
            fetch(`http://211.117.197.184:50/api/carbon-emissions/percentile?emissionValue=${data.entireResult}`, {
                method: 'GET',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((result) => {
                    setPercentile(parseFloat(result.percentile.toFixed(2))); 

                })
                .catch((error) => {
                    // console.error("API 호출 에러:", error);
                });
        }
    }, [data.visibleOption1,data.visibleOption2,data.visibleOption3,data.visbleValue1,data.visbleValue2,percentile]);
    
    return(
        <div className="resultv-outer-container">
            <div className="resultv-inner-container">
            <div className='navigation-container'>
                    <Button 
                    label="홈으로"
                    imgSrc={homeIcon}
                    imgWidth={'12px'}
                    width="calc((90/1280)*100vw)"
                    height="calc((38/720)*100vh)"
                    fontSize={'max(12px,1vw)'}
                    border='dashed 0.2vw #001F3F'
                    color='#001F3F'
                    fontWeight='700'
                    onClick={goToHomePage} />
            </div>

            <div className='resultv-content-container'>
                    <div className='result-left-container'>
                        <div className='resultv-title-container'>
                            <div>
                                오늘,나의
                            </div>
                            <div>
                                탄소 발자국은?
                            </div>
                        </div>
                        <div className='result-calc-container'>
                            <span className='entire-result'>
                            {data.entireResult}
                            </span>
                            <span className='result-calc-unit'>
                            kg CO2eq
                            </span>
                        </div>

                    </div>

                    <div className='result-right-container'>
                        <div className='result-rank-container'>
                            <div>
                             <Button label={regions[data.visibleRegion]} 
                              bgColor='white'
                              color='#001F3F'
                              fontSize='1.4vw'
                              width='9vw'
                              height='6vh'
                              fontWeight='700'></Button>
                            </div>
                            <div style={{paddingLeft:'10px', fontSize:'1.4vw'}}> 
                                에서 온 사람 중
                            </div>
                            <div className='resultv-ratio-container'>
                                <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                    <span style={{fontSize:'3vw'}}>
                                    {percentile}
                                    </span>
                                    <span style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                         %
                                    </span>
                                </div>
                                <div style={{fontSize:'1.4vw'}}>
                                    탄소배출량 상위
                                </div>
                            </div>      
                        </div>
                        <div className='resultv-desc-container'>
                            <div>
                          
                            </div>
                            <ul>
                                {data.visibleOption1?<li>
                                고속버스를 이용할 시, 자동차 대비 {data.visibleValue1}% 탄소를 덜 배출할 수 있습니다. 
                                </li>:''}
                                {data.visibleOption2?<li>
                                스키복 렌탈 시, 구매 대비 {data.visibleValue2}% 탄소를 덜 배출할 수 있습니다.
                                </li>:''}
                                {data.visibleOption3?<li>
                                잔반을 남기지 않을 시, 잔반 배출 대비 100% 탄소를 덜 배출할 수 있습니다.
                                </li>:''}
                            </ul>
                        </div>
                        
                    </div>
            </div>
            <div className='below-outer-container'>

                <div className='prior-button-container'>
                <Button 
                    label={"탄소발자국 저장"} 
                    imgWidth={'8px'}
                    width={'calc((120/1280)*100vw)'} 
                    height={'calc((42/720)*100vh)'} 
                    fontSize={'max(12px,1vw)'} 
                    bgColor='#001F3F'
                    borderColor='#001F3'
                    border='solid 0.2vw #001F3'
                    onClick={saveCarbonEmission}
                /> 
                </div>  
                </div>

            </div>
        </div>
    )
}export default ResultView;