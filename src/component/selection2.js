import './css/selection2.css'
import Button from './button';
import QRCode from '../assets/img/qrcode.jpg'
import { useState, useEffect, useRef } from 'react';

const btnWidth = 'calc((187/1280) * 100vw)';
const btnHeight = 'calc((50/720) * 100vh)';

const mealData = {
    "rice":0.67,
    "noodle":1.4,
    "bread":0.25,
    "porridge":0.7,
    "meat-soup":7.08,
    "veggie-soup":1.06,
    "meat-stew":2.43,
    "veggie-stew":1.7,
    "main-veggie":0.26,
    "main-meat":4.15,
    "main-seafood":0.30,
    "pizza":2.0,
    "hamburger":3.7,
    "chicken":2.1,
    "none":0.0
}

const Selection2 = ({onResultChange}) => {

 // 버튼 상태를 객체로 관리
    const [activeButtons, setActiveButtons] = useState({
        'rice': false,
        'bread': false,
        'noodle': false,
        'porridge': false,
        "veggie-soup": false,
        "meat-soup": false,
        "veggie-stew": false,
        "meat-stew": false,
        "main-veggie": false,
        "main-meat": false,
        "main-seafood": false,
        'pizza': false,
        'hamburger': false,
        'chicken': false,
    });

    // 버튼 클릭 핸들러
    const handleButtonClick = (buttonName) => {
        setActiveButtons((prevState) => ({
            ...prevState,
            [buttonName]: !prevState[buttonName], // 현재 상태를 토글
        }));
    };

    const [selectionResult2, setSelectionResult2] = useState(0);

    useEffect(() => {
        // 활성화된 버튼의 값을 계산
        const total = Object.keys(activeButtons)
            .filter((key) => activeButtons[key]) // true인 버튼만 필터링
            .reduce((sum, key) => sum + mealData[key], 0); // mealData에서 값을 가져와 합산

        setSelectionResult2(total); // 결과 상태 업데이트
        console.log(total)

        // 부모 컴포넌트로 값 전달
        if (onResultChange) {
            onResultChange(total);
           // onResultChange(total);
        }
    }, [activeButtons, onResultChange]); // activeButtons가 변경될 때 실행

    
    return(
        <div className='selection2-content-container'>
            <div className='selection2-inner-container'>

                <div className='area1-container'>
                    <div className='option1-container'>
                        <Button 
                        label={'밥'} 
                        width={btnWidth} 
                        height={btnHeight} 
                        radius='8px' 
                        border='none' 
                        fontSize='max(17px,1.2vw)' 
                        fontWeight='300'
                        bgColor={ activeButtons['rice'] ? "white" : "rgba(255, 255, 255, 0.2)" }
                        color={ activeButtons['rice'] ? "#001F3F" : "white" }
                        onClick={() => handleButtonClick('rice')}/>

                        <Button 
                        label={'빵'} 
                        width={btnWidth} 
                        height={btnHeight} 
                        radius='8px' 
                        border='none' 
                        fontSize='max(17px,1.2vw)' 
                        fontWeight='300'
                        bgColor={ activeButtons['bread'] ? "white" : "rgba(255, 255, 255, 0.2)" }
                        color={ activeButtons['bread'] ? "#001F3F" : "white" }
                        onClick={() => handleButtonClick('bread')}/>

                        <Button 
                        label={'면'} 
                        width={btnWidth} 
                        height={btnHeight} 
                        radius='8px' 
                        border='none' 
                        fontSize='max(17px,1.2vw)' 
                        fontWeight='300'
                        bgColor={ activeButtons['noodle'] ? "white" : "rgba(255, 255, 255, 0.2)" }
                        color={ activeButtons['noodle'] ? "#001F3F" : "white" }
                        onClick={() => handleButtonClick('noodle')}/>

                        <Button 
                        label={'죽'} 
                        width={btnWidth} 
                        height={btnHeight} 
                        radius='8px' 
                        border='none' 
                        fontSize='max(17px,1.2vw)' 
                        fontWeight='300'
                        bgColor={ activeButtons['porridge'] ? "white" : "rgba(255, 255, 255, 0.2)" }
                        color={ activeButtons['porridge'] ? "#001F3F" : "white" }
                        onClick={() => handleButtonClick('porridge')}/>
                    </div>

                    <div className='option1-container'>
                        <Button 
                        label={'국•채소'} 
                        width={btnWidth} 
                        height={btnHeight} 
                        radius='8px' 
                        border='none' 
                        fontSize='max(17px,1.2vw)' 
                        fontWeight='300'
                        bgColor={ activeButtons['veggie-soup'] ? "white" : "rgba(255, 255, 255, 0.2)" }
                        color={ activeButtons['veggie-soup'] ? "#001F3F" : "white" }
                        onClick={() => handleButtonClick('veggie-soup')}/>

                        <Button 
                        label={'국•고기'} 
                        width={btnWidth} 
                        height={btnHeight} 
                        radius='8px' 
                        border='none' 
                        fontSize='max(17px,1.2vw)' 
                        fontWeight='300'
                        bgColor={ activeButtons['meat-soup'] ? "white" : "rgba(255, 255, 255, 0.2)" }
                        color={ activeButtons['meat-soup'] ? "#001F3F" : "white" }
                        onClick={() => handleButtonClick('meat-soup')}/>
                        <Button 
                        label={'찌개•채소'} 
                        width={btnWidth} 
                        height={btnHeight} 
                        radius='8px' 
                        border='none' 
                        fontSize='max(17px,1.2vw)' 
                        fontWeight='300'
                        bgColor={ activeButtons['veggie-stew'] ? "white" : "rgba(255, 255, 255, 0.2)" }
                        color={ activeButtons['veggie-stew'] ? "#001F3F" : "white" }
                        onClick={() => handleButtonClick('veggie-stew')}/>
                        <Button 
                        label={'찌개•고기'} 
                        width={btnWidth} 
                        height={btnHeight} 
                        radius='8px' 
                        border='none' 
                        fontSize='max(17px,1.2vw)' 
                        fontWeight='300'
                        bgColor={ activeButtons['meat-stew'] ? "white" : "rgba(255, 255, 255, 0.2)" }
                        color={ activeButtons['meat-stew'] ? "#001F3F" : "white" }
                        onClick={() => handleButtonClick('meat-stew')}/>
                    </div>

                </div>
                
                <div className='area2-container'>
                    <div className='area2-inner-container'>
                        <div className='option3-container'>
                            <Button 
                            label={'메인반찬•채소'} 
                            width={btnWidth} 
                            height={btnHeight} 
                            radius='8px'  
                            border='none' 
                            fontSize='max(17px,1.2vw)' 
                            fontWeight='300'
                            bgColor={ activeButtons['main-veggie'] ? "white" : "rgba(255, 255, 255, 0.2)" }
                            color={ activeButtons['main-veggie'] ? "#001F3F" : "white" }
                            onClick={() => handleButtonClick('main-veggie')}/>

                            <Button 
                            label={'메인반찬•고기'} 
                            width={btnWidth} 
                            height={btnHeight} 
                            radius='8px'  
                            border='none' 
                            fontSize='max(17px,1.2vw)'
                            fontWeight='300'
                            bgColor={ activeButtons['main-meat'] ? "white" : "rgba(255, 255, 255, 0.2)" }
                            color={ activeButtons['main-meat'] ? "#001F3F" : "white" }
                            onClick={() => handleButtonClick('main-meat')}/>

                            <Button 
                            label={'메인반찬•해산물'} 
                            width={btnWidth} 
                            height={btnHeight} 
                            radius='8px'  
                            border='none' 
                            fontSize='max(17px,1.2vw)' 
                            fontWeight='300'
                            bgColor={ activeButtons['main-seafood'] ? "white" : "rgba(255, 255, 255, 0.2)" }
                            color={ activeButtons['main-seafood'] ? "#001F3F" : "white" }
                            onClick={() => handleButtonClick('main-seafood')}/>
                        </div>
                    
                        <div className='option4-container'>
                            <Button 
                            label={'피자'} 
                            width={btnWidth} 
                            height={btnHeight} 
                            radius='8px'  
                            border='none' 
                            fontSize='max(17px,1.2vw)' 
                            fontWeight='300'
                            bgColor={ activeButtons['pizza'] ? "white" : "rgba(255, 255, 255, 0.2)" }
                            color={ activeButtons['pizza'] ? "#001F3F" : "white" }
                            onClick={() => handleButtonClick('pizza')}/>

                            <Button 
                            label={'햄버거'} 
                            width={btnWidth} 
                            height={btnHeight} 
                            radius='8px'  
                            border='none' 
                            fontSize='max(17px,1.2vw)' 
                            fontWeight='300'
                            bgColor={ activeButtons['hamburger'] ? "white" : "rgba(255, 255, 255, 0.2)" }
                            color={ activeButtons['hamburger'] ? "#001F3F" : "white" }
                            onClick={() => handleButtonClick('hamburger')}/>

                            <Button 
                            label={'치킨'} 
                            width={btnWidth} 
                            height={btnHeight} 
                            radius='8px'  
                            border='none' 
                            fontSize='max(17px,1.2vw)' 
                            fontWeight='300'
                            bgColor={ activeButtons['chicken'] ? "white" : "rgba(255, 255, 255, 0.2)" }
                            color={ activeButtons['chicken'] ? "#001F3F" : "white" }
                            onClick={() => handleButtonClick('chicken')}/>
                        </div>
                    </div>

                    <div className='area2-inner-container2'>
                        <div className='qr-outer-container'>
                            <div className='qr-text-container'>
                                <span>
                                    출처
                                </span>
                                <span>
                                    한국일보 한끼밥상 탄소계산기
                                </span>
                            </div>
                            <span className='qr-img-container'>
                                <img src={QRCode} style={{ width: "calc((43/1280)*100vw)" }} />
                            </span>
                           
                            
                        </div>
                    </div>

                </div>
                
               
                
            </div>
        </div>
    )
}
export default Selection2;