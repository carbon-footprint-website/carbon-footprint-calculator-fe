import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import './css/progressBar.css'

function ProgressBar({ currentStep, totalSteps, onStepChange, ...props }) {
  // 현재 진행 상태를 백분율로 계산
  //useState는 기본적으로 바뀌면, 다시 재렌더링이 된다.
  const selectedWidth = 44; // 선택된 스텝의 너비(44%)
  const remainingWidth = 16;// 나머지 스텝 너비

  return (
    <div className="progress-bar">
        {Array.from({ length: totalSteps }, (_, index) => (
            <div 
                key={index}
                className="progress-bar-item"
                style={{
                width: `${index + 1 === currentStep ? selectedWidth : remainingWidth}%`,}}
                onClick={() => 
                  onStepChange(index + 1) //부모의 onStepChange를 호출한다.
                }
            >
            <div 
                className="progress-title"
              ><span>
                {props.titles[index]}
              </span>
              {index + 1 === currentStep && <span>{props.desc[index]}</span>}
              </div> {/* 제목 추가 */}
            <div
              className={`progress-bar-step ${index + 1 === currentStep ? "selected" : ""}`}
              style={{
                height: "4px",
                background: `${index + 1 === currentStep ? "white" : "#0A3159"}`,
              }}
            ></div>
          </div>
      ))}
     
    </div>
  );
}

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired, // 현재 단계
  totalSteps: PropTypes.number.isRequired, // 총 단계 수
};

export default ProgressBar;
