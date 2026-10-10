
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/selectView.css';

import Button from '../component/button';
import ProgressBar from '../component/progressBar';

import ArrowDownWhite from '../assets/icon/arrow-down-white.png';
import Cloud from '../assets/icon/cloud.png';

import Selection1 from '../component/selection1';
import Selection2 from '../component/selection2';
import Selection4 from '../component/selection4';

import homeIcon from '../assets/icon/home-icon.png';
import previousIcon from '../assets/icon/previous-icon.png';
import nextIcon from '../assets/icon/next-icon.png';

function SelectView() {
    const navigate = useNavigate();

    const props = {
        titles: ['01', '02', '03'],
        desc: ['교통', '음식', '폐기물']
    };

    const [currentStep, setCurrentStep] = useState(1);

    // 단계 이동: 총 3단계
    const goToNextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleStepChange = (newStep) => {
        // ProgressBar에서도 1~3단계만 선택 가능하도록 제한
        if (newStep >= 1 && newStep <= 3) {
            setCurrentStep(newStep);
        }
    };

    const goToHomePage = () => {
        navigate('/');
    };

    // 각 단계의 탄소배출량
    const [PageResult1, setPageResult1] = useState(0);
    const [PageResult2, setPageResult2] = useState(0);
    const [PageResult3, setPageResult3] = useState(0);

    // 결과 페이지에서 사용할 표시 옵션
    const [visibleOption1, setVisibleOption1] = useState(true);
    const [visibleValue1, setVisibleValue1] = useState(true);

    const [visibleOption2, setVisibleOption2] = useState(true);
    const [visibleValue2, setVisibleValue2] = useState(true);

    const [visibleOption3, setVisibleOption3] = useState(true);
    const [visibleRegion, setVisibleRegion] = useState(null);

    const [entireResult, setEntireResult] = useState('0.00');

    // 전체 탄소배출량: 교통 + 음식 + 폐기물
    useEffect(() => {
        setEntireResult(
            (PageResult1 + PageResult2 + PageResult3).toFixed(2)
        );
    }, [PageResult1, PageResult2, PageResult3]);

    // Selection1 결과
    const handleResultChange1 = (
        selectionResult1,
        visibleOption1,
        selectedRegion,
        visibleValue1
    ) => {
        setPageResult1(selectionResult1.current);
        setVisibleOption1(visibleOption1.current);
        setVisibleValue1(visibleValue1.current);
        setVisibleRegion(selectedRegion);
    };

    // Selection2 결과
    const handleResultChange2 = (value) => {
        setPageResult2(value);
    };

    // Selection4를 3단계에서 사용하므로 결과도 3단계 상태에 저장
    // Selection4가 ref 객체를 전달하는 기존 구조를 유지
    const handleResultChange3 = (selectionResult, visibleOption3) => {
        if (!selectionResult || !visibleOption3) {
            console.error(
                'Selection4에서 전달된 결과값을 확인해 주세요.',
                { selectionResult, visibleOption3 }
            );
            return;
        }

        setPageResult3(selectionResult.current);
        setVisibleOption3(visibleOption3.current);
    };

    // 현재 단계에 맞는 선택 컴포넌트
    const renderSelectionComponent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Selection1
                        onResultChange={handleResultChange1}
                    />
                );

            case 2:
                return (
                    <Selection2
                        onResultChange={handleResultChange2}
                    />
                );

            case 3:
                return (
                    <Selection4
                        onResultChange={handleResultChange3}
                    />
                );

            default:
                return null;
        }
    };

    // 현재 단계의 탄소배출량 표시
    const renderResultComponent = () => {
        let result;

        switch (currentStep) {
            case 1:
                result = PageResult1;
                break;

            case 2:
                result = PageResult2;
                break;

            case 3:
                result = PageResult3;
                break;

            default:
                return null;
        }

        return (
            <div className="result-text-container">
                <span>{result.toFixed(2)}</span>
                {result !== 0 && <span>kgCO2</span>}
            </div>
        );
    };

    // 결과 페이지로 이동
    const goToResultPage = () => {
        navigate('/result', {
            state: {
                entireResult,
                visibleOption1,
                visibleValue1,
                visibleOption2,
                visibleValue2,
                visibleOption3,
                visibleRegion
            }
        });
    };

    return (
        <div className="step-outer-container">
            <div className="step-container">

                <div className="navigation-container">
                    <Button
                        label="홈으로"
                        imgSrc={homeIcon}
                        imgWidth="12px"
                        width="calc((90/1280)*100vw)"
                        height="calc((38/720)*100vh)"
                        fontSize="max(12px,1vw)"
                        border="dashed 0.14vw"
                        borderStyle="dashed"
                        borderColor="white"
                        onClick={goToHomePage}
                    />

                    <ProgressBar
                        currentStep={currentStep}
                        totalSteps={3}
                        {...props}
                        onStepChange={handleStepChange}
                    />
                </div>

                <div className="selection-container">
                    {renderSelectionComponent()}
                </div>

                <div className="below-outer-container">

                    <div className="prior-button-container">
                        {currentStep !== 1 && (
                            <Button
                                label="이전"
                                imgSrc={previousIcon}
                                imgWidth="8px"
                                width="calc((91/1280)*100vw)"
                                height="calc((42/720)*100vh)"
                                fontSize="max(12px,1vw)"
                                border="solid 0.14vw"
                                onClick={goToPreviousStep}
                            />
                        )}
                    </div>

                    <div className="below-container">
                        <div className="arrow-container">
                            <img
                                src={ArrowDownWhite}
                                alt="Arrow Down White"
                                width="41px"
                            />
                        </div>

                        <div className="carbon-result-container">
                            <div className="result-inner-container">

                                <div className="result-title-container">
                                    <span>
                                        <img
                                            src={Cloud}
                                            alt="탄소배출량"
                                            style={{
                                                width: 'calc((38/1280)*100vw)'
                                            }}
                                        />
                                    </span>

                                    <span>탄소배출량</span>
                                </div>

                                {renderResultComponent()}

                            </div>
                        </div>
                    </div>

                    <div className="next-button-container">
                        {currentStep === 3 ? (
                            <Button
                                label="내 탄소 발자국"
                                width="calc((140/1280)*100vw)"
                                fontSize="max(12px,1vw)"
                                height="calc((42/720)*100vh)"
                                border="solid 0.14vw"
                                onClick={goToResultPage}
                            />
                        ) : (
                            <Button
                                label="다음"
                                imgSrc={nextIcon}
                                imgWidth="8px"
                                width="calc((91/1280)*100vw)"
                                height="calc((42/720)*100vh)"
                                fontSize="max(12px,1vw)"
                                color="white"
                                border="solid 0.14vw"
                                onClick={goToNextStep}
                            />
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SelectView;
