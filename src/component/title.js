import React from 'react';
import './css/title.css'

const Title = ( {content , fontColor, fontSize, fontWeight, lineColor} )=>{
    const customFontStyle = { color:fontColor, fontSize, fontWeight}
    return(
        <span className='title-container' style={customFontStyle}>
            {content}
            <style>
            {`
            .title-container::after {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%); /* 세로 정렬 보정 */
                width: calc((4.8/1280)*100vw); /* 선의 두께 */
                height: calc((21.6/720)*100vh);  /* 부모 요소 높이에 맞춤 */
                background-color: ${lineColor || '#001F3F'}; /* lineColor가 없을 경우 기본값 */
            }
            `}
      </style>
        </span>
    )
}
export default Title;