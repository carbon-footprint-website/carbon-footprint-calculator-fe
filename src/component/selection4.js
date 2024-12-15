import Title from "../component/title";
import Button from "./button";
import "./css/selection4.css"
import { useState,useRef,useEffect } from "react";

const mealData = {
    "trash":0.26,
    "foodwaste":0.61,
    "none":0.0,
    "not":0.0
}

const Selection4 = ({onResultChange}) =>{
    const [selectedTrashOption, setSelectedTrashOption] = useState("not"); 
    const [activeTrashButton, setActiveTrashButton] = useState(null); 

    const [selectedFoodWasteOption, setSelectedFoodWasteOption] = useState("not"); 
    const [activeFoodWasteButton, setActiveFoodWasteButton] = useState(null); 

    const selectionResult4 = useRef(1);
    const visibleOption3 = useRef(true);

    useEffect(() => {
        if  (selectedTrashOption ||
            selectedFoodWasteOption) {
          selectionResult4.current = mealData[selectedTrashOption]+mealData[selectedFoodWasteOption]
          // 부모로 전달
          selectedFoodWasteOption!="none"? visibleOption3.current = true :visibleOption3.current = false

          console.log(selectionResult4.current)
        if (onResultChange) {
            onResultChange(selectionResult4,visibleOption3);
        }
        }
      }, [selectedTrashOption, selectedFoodWasteOption]); // 상태가 변경될 때마다 실행


    const handleTrashButton = (option) => {
        //setSelectedTrashOption(option); // 클릭된 버튼 ID로 상태 업데이트
        //setActiveTrashButton(option);
        setSelectedTrashOption((prev) => (prev === option ? 'not' : option));    
    };

    const handleFoodWasteButton = (option) => {
        //setSelectedFoodWasteOption(option); // 클릭된 버튼 ID로 상태 업데이트
        //setActiveFoodWasteButton(option);    
        setSelectedFoodWasteOption((prev) => (prev === option ? 'not' : option));
    };

    return(
        <div className='selection4-content-container'>
            <div className='selection4-inner-container'>
                <div className='left-content-container'>
                    <Title content='오늘 하루 쓰레기를 버리셨나요?' fontColor={'white'} fontSize={'max(16px,1.4vw)'} lineColor={'white'}/>
                        <Button 
                            label={'네, 버렸어요'}
                            radius={'8px'}
                            border={'none'}
                            fontSize={'max(16px,1.2vw)'}
                            width={'100%'}
                            height={'calc((54/720)*100vh)'}
                            bgColor={selectedTrashOption === "trash" ? "white" : "rgba(255, 255, 255, 0.2)"} // 활성화된 버튼 색상 변경
                            color={selectedTrashOption === "trash" ? "#001F3F" : "white"} 
                            onClick={() => handleTrashButton("trash")}/>
                        <Button 
                            label={'쓰레기가 생기지 않았어요'}
                            radius={'8px'}
                            border={'none'}
                            fontSize={'max(16px,1.2vw)'}
                            width={'100%'}
                            height={'calc((54/720)*100vh)'}
                            bgColor={selectedTrashOption === "none" ? "white" : "rgba(255, 255, 255, 0.2)"} // 활성화된 버튼 색상 변경
                            color={selectedTrashOption === "none" ? "#001F3F" : "white"} 
                            onClick={() => handleTrashButton("none")}/>
                </div>
                <div className='right-content-container'>
                    <Title content='오늘 하루 음식을 남기셨나요?' fontColor={'white'} fontSize={'max(16px,1.4vw)'} lineColor={'white'}/>
                        <Button 
                            label={'남겼어요'}
                            radius={'8px'}
                            border={'none'}
                            fontSize={'max(16px,1.2vw)'}
                            width={'100%'}
                            height={'calc((54/720)*100vh)'}
                            bgColor={selectedFoodWasteOption === "foodwaste" ? "white" : "rgba(255, 255, 255, 0.2)"} // 활성화된 버튼 색상 변경
                            color={selectedFoodWasteOption === "foodwaste" ? "#001F3F" : "white"} 
                            onClick={() => handleFoodWasteButton("foodwaste")}/>
                        <Button 
                            label={'아니요, 다 먹었어요'}
                            radius={'8px'}
                            border={'none'}
                            fontSize={'max(16px,1.2vw)'}
                            width={'100%'}
                            height={'calc((54/720)*100vh)'}
                            bgColor={selectedFoodWasteOption === "none" ? "white" : "rgba(255, 255, 255, 0.2)"} // 활성화된 버튼 색상 변경
                            color={selectedFoodWasteOption === "none" ? "#001F3F" : "white"} 
                            onClick={() => handleFoodWasteButton("none")}/>
                </div>
            </div>
        </div>
    )
}
export default Selection4;