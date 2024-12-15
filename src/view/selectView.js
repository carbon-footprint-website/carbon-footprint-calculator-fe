import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/selectView.css';
import Button from '../component/button';
import ProgressBar from '../component/progressBar';
import ArrowDownWhite from '../assets/icon/arrow-down-white.png'
import Cloud from '../assets/icon/cloud.png'
import Selection1 from '../component/selection1';
import Selection2 from '../component/selection2';
import Selection3 from '../component/selection3';
import Selection4 from '../component/selection4';

import homeIcon from '../assets/icon/home-icon.png';
import previousIcon from '../assets/icon/previous-icon.png';
import nextIcon from '../assets/icon/next-icon.png';

function SelectView() {

    const navigate = useNavigate();

    const props = {
        titles : ["01", "02", "03", "04"],
        desc : ["교통", "음식", "의류", "폐기물"]
    }

    const [currentStep, setCurrentStep] = useState(1);

    const goToNextStep = () => {
      if (currentStep < 4) setCurrentStep(currentStep + 1);
      console.log('클릭')

    };
  
    const goToPreviousStep = () => {
      if (currentStep > 1) setCurrentStep(currentStep - 1);
      console.log('클릭')
    };

    const handleStepChange = (newStep) => {
        setCurrentStep(newStep); // 부모 상태 업데이트
        console.log("현재 단계:", newStep);
      };

    const goToHomePage = () => {
        navigate("/")
    }

 
    // 가운데 섹션
    const renderSelectionComponent = () => {
        switch (currentStep) {
        case 1:
            return <Selection1 onResultChange={handleResultChange1}/>;
        case 2:
            return <Selection2 onResultChange={handleResultChange2}/>;
        case 3:
            return <Selection3 onResultChange={handleResultChange3}/>;
        case 4 :
            return <Selection4 onResultChange={handleResultChange4}/>;
        default:
            return null;
        }
    };

    const renderResultComponent = () => {
        switch (currentStep) {
        case 1:
            return (
                <div className='result-text-container'>
                    <span>
                {PageResult1.toFixed(2)}
                </span>
                {PageResult1=='0'?'':<span>
                    kgCO2
                </span>}</div>
                );
        case 2:
            return (
                <div className='result-text-container'>
                    <span>
                {PageResult2.toFixed(2)}
                </span>
                {PageResult2=='0'?'':<span>
                    kgCO2
                </span>}</div>
                );
        case 3:
            return (
                <div className='result-text-container'>
                    <span>
                {PageResult3.toFixed(2)}
                </span>
                {PageResult3=='0'?'':<span>
                    kgCO2
                </span>}</div>
                );
        case 4:
            return (
                <div className='result-text-container'>
                    <span>
                {PageResult4.toFixed(2)}
                </span>
                {PageResult4=='0'?'':<span>
                    kgCO2
                </span>}</div>
                );
        default:
            return null;
        }
    };

    const [PageResult1, setPageResult1] = useState(0);
    const [PageResult2, setPageResult2] = useState(0);
    const [PageResult3, setPageResult3] = useState(0);
    const [PageResult4, setPageResult4] = useState(0);

    const [visibleOption1, setVisibleOption1] = useState(true);
    const [visibleValue1, setVisibleValue1] = useState(true);

    const [visibleOption2, setVisibleOption2] = useState(true);
    const [visibleValue2, setVisibleValue2] = useState(true);

    const [visibleOption3, setVisibleOption3] = useState(true);

    const [visibleRegion, setVisibleRegion] = useState(null);
    const[entireResult, setEntireResult] = useState(null);

    useEffect(() => {
        setEntireResult((PageResult1+PageResult2+PageResult3+PageResult4).toFixed(2));}
      , [PageResult1,PageResult2,PageResult3,PageResult4]); 

      const goToResultPage = () => {
        navigate("/result",{   state: { 
            entireResult: entireResult, 
            visibleOption1: visibleOption1, 
            visibleValue1: visibleValue1,
            visibleOption2: visibleOption2, 
            visibleValue2: visibleValue2,
            visibleOption3: visibleOption3,
            visibleRegion : visibleRegion
        }})
    }

    const handleResultChange1 = (selectionResult1, visibleOption1, selectedRegion, visibleValue1) => {
        setPageResult1(selectionResult1.current); // 자식 컴포넌트에서 전달받은 값을 저장
        setVisibleOption1(visibleOption1.current);
        setVisibleValue1(visibleValue1.current);
        setVisibleRegion(selectedRegion);
      };

    const handleResultChange2 = (value) => {
        setPageResult2(value); 
        // 자식 컴포넌트에서 전달받은 값을 저장
      };

    const handleResultChange3 = (selectionResult3, visibleOption2, visibleValue2) => {
        setPageResult3(selectionResult3.current);
        setVisibleOption2(visibleOption2.current) // 자식 컴포넌트에서 전달받은 값을 저장
        setVisibleValue2(visibleValue2.current)
      };

    const handleResultChange4 = (selectionResult4, visibleOption3) => {
       
        setPageResult4(selectionResult4.current);
        setVisibleOption3(visibleOption3.current)  // 자식 컴포넌트에서 전달받은 값을 저장
      };
      
    return(
        <div className='step-outer-container'>
            <div className='step-container'>

                <div className='navigation-container'>
                    <Button 
                    label="홈으로"
                    imgSrc={homeIcon}
                    imgWidth={'12px'}
                    width="calc((90/1280)*100vw)"
                    height="calc((38/720)*100vh)"
                    fontSize={'max(12px,1vw)'}
                    border='dashed 0.14vw'
                    borderStyle='dashed'
                    borderColor='white'
                    onClick={goToHomePage} />
                    <ProgressBar 
                        currentStep={currentStep}
                        totalSteps={4}
                        {...props}
                        onStepChange={handleStepChange}
                        />
                </div>

                <div className='selection-container'>
                    {renderSelectionComponent()}
                </div>
                <div className='below-outer-container'>


                    <div className='prior-button-container'>
                        {currentStep !=1 && <Button 
                        label={"이전"} 
                        imgSrc={previousIcon}
                        imgWidth={'8px'}
                        width={'calc((91/1280)*100vw)'} 
                        height={'calc((42/720)*100vh)'} 
                        fontSize={'max(12px,1vw)'} 
                        border='solid 0.14vw'
                        onClick={goToPreviousStep} /> }
                    </div>
                    
                    <div className='below-container'>     
                        <div className='arrow-container'>
                            <img src={ArrowDownWhite} alt="Arrow Down White" width={"41px"} />
                        </div>
                        <div className='carbon-result-container'>
                            <div className='result-inner-container'>
                                <div className='result-title-container'>
                                    <span>
                                        <img src={Cloud} style={{ width: "calc((38/1280)*100vw)" }}></img>
                                    </span>
                                    <span>
                                        탄소배출량
                                    </span>
                                </div>
                                {renderResultComponent()}
                            </div>
                        </div>
                    </div>

                    <div className='next-button-container'>
                        {currentStep == 4 ? 
                        <Button
                        label={"내 탄소 발자국"}
                        width={"calc((140/1280)*100vw)"} 
                        fontSize={'max(12px,1vw)'} 
                        height={'calc((42/720)*100vh)'} 
                        border='solid 0.14vw'
                        onClick={goToResultPage}
                         />
                         :
                        <Button 
                        label={"다음"} 
                        imgSrc={nextIcon}
                        imgWidth={'8px'}
                        width={'calc((91/1280)*100vw)'} 
                        height={'calc((42/720)*100vh)'} 
                        fontSize={'max(12px,1vw)'} 
                        color={"white"} 
                        border='solid 0.14vw'
                        onClick={goToNextStep}  /> }
                    </div>

                </div>
            
            </div>
        </div>

    )
}

export default SelectView;