import React from 'react';
import PropTypes from 'prop-types';
import './css/button.css'
/*...props로 추가 속성 전달 */
const Button = ({ 
  width = '150px', 
  height = '50px', 
  label, 
  onClick, 
  type = 'button', 
  borderWidth='1px', 
  borderColor='white', 
  borderStyle='none',
  size = 'medium', 
  disabled = false, 
  radius='50px',
  bgColor='transparent', 
  opacity='', 
  fontSize='20px', 
  fontWeight='400', 
  color='white', 
  border='solid',
  hoverBgColor='white',
  hoverBorderColor='white',
  hoverColor='black',
  imgSrc,
  imgWidth,
   ...props }) => {
    const customStyle = { width, height, fontSize, fontWeight, color, border };
    const borderCustomStyle = {borderWidth, borderStyle, borderColor};
    return (
    <button style={
      {... customStyle, borderCustomStyle, borderRadius:radius, backgroundColor:bgColor, display:'flex', justifyContent:'center', alignItems:'center'}} {...props}
      className={`button ${size}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
        <style>
{`
  .button.${size}:hover {
    background-color: ${hoverBgColor};
    color: ${hoverColor};
    border-color: ${hoverBorderColor};
  }
`}
</style>
      {label}
      {imgSrc?<span >
        <img src={imgSrc} style={{ width: imgWidth, marginLeft: '8px', marginTop:'3px'}} />
      </span>:""}
      
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired, // 버튼 텍스트
  onClick: PropTypes.func, // 클릭 이벤트 핸들러
  type: PropTypes.oneOf(['button', 'submit', 'reset']), // 버튼 타입
  size: PropTypes.oneOf(['small', 'medium', 'large']), // 버튼 크기
  disabled: PropTypes.bool, // 비활성화 여부
};

export default Button;
