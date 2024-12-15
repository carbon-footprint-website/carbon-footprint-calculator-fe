import Title from "../component/title";
import Button from "./button";
import "./css/selection3.css";
import { useState, useEffect, useRef } from "react";

const ClothesData = {
    "rental": 0.46,
    "buying": 50.80,
    "secondhand": 37.64,
    "none":0.0
};

const Selection3 = ({ onResultChange }) => {
    const [selectedClothesOption, setSelectedClothesOption] = useState("none"); // 단일 선택
    const selectionResult3 = useRef(1);
    const visibleOption2 = useRef(true);
    const visibleValue2 = useRef(0);

    useEffect(() => {
        if (selectedClothesOption) {
            // 선택된 옵션의 탄소 배출량 계산
            selectionResult3.current = ClothesData[selectedClothesOption];
            visibleOption2.current = selectedClothesOption !== "rental"; // 렌탈일 때만 false
            visibleValue2.current = ((ClothesData[selectedClothesOption]-ClothesData['rental'])/ClothesData[selectedClothesOption]).toFixed(2)*100

            // 부모로 값 전달
            if (onResultChange) {
                onResultChange(selectionResult3, visibleOption2, visibleValue2);
            }
        }
    }, [selectedClothesOption]); // 선택된 옵션이 변경될 때마다 실행

    const handleClothesButton = (option) => {
        // 동일한 옵션 클릭 시 선택 해제
        setSelectedClothesOption((prev) => (prev === option ? "none" : option));
    };

    return (
        <div className="selection3-content-container">
            <div className="selection3-inner-container">
                <div className="left-content-container">
                    <Title
                        content="스키복을 렌탈하셨나요?"
                        fontColor={"white"}
                        fontSize={"max(16px,1.4vw)"}
                        lineColor={"white"}
                    />
                </div>
                <div className="right-content-container">
                    <Button
                        label={"네, 렌탈했어요"}
                        radius={"8px"}
                        border={"none"}
                        fontSize="max(16px,1.2vw)"
                        width={"100%"}
                        height={"calc((51/720)*100vh)"}
                        bgColor={
                            selectedClothesOption === "rental"
                                ? "white"
                                : "rgba(255, 255, 255, 0.2)"
                        } // 활성화된 버튼 색상 변경
                        color={
                            selectedClothesOption === "rental" ? "#001F3F" : "white"
                        }
                        onClick={() => handleClothesButton("rental")}
                    />
                    <Button
                        label={"아니요, 제 옷이에요 (구매)"}
                        radius={"8px"}
                        border={"none"}
                        fontSize={"max(16px,1.2vw)"}
                        width={"100%"}
                        height={"calc((51/720)*100vh)"}
                        bgColor={
                            selectedClothesOption === "buying"
                                ? "white"
                                : "rgba(255, 255, 255, 0.2)"
                        } // 활성화된 버튼 색상 변경
                        color={
                            selectedClothesOption === "buying" ? "#001F3F" : "white"
                        }
                        onClick={() => handleClothesButton("buying")}
                    />
                    <Button
                        label={"아니요, 제 옷이에요 (중고)"}
                        radius={"8px"}
                        border={"none"}
                        fontSize={"max(16px,1.2vw)"}
                        width={"100%"}
                        height={"calc((51/720)*100vh)"}
                        bgColor={
                            selectedClothesOption === "secondhand"
                                ? "white"
                                : "rgba(255, 255, 255, 0.2)"
                        } // 활성화된 버튼 색상 변경
                        color={
                            selectedClothesOption === "secondhand"
                                ? "#001F3F"
                                : "white"
                        }
                        onClick={() => handleClothesButton("secondhand")}
                    />
                </div>
            </div>
        </div>
    );
};

export default Selection3;
