import React from 'react';
import PropTypes from 'prop-types';
import './css/button.css'
/*...props로 추가 속성 전달 */
const Button = ({ width = '150px', height = '50px', label, onClick, type = 'button', border='1px solid white', size = 'medium', disabled = false, radius='50px',
  bgColor='transparent', opacity='', fontSize='20px', fontWeight='400', color='white', ...props }) => {
    const customStyle = { width, height, fontSize, fontWeight, color };
    return (
    <button style={{... customStyle, borderRadius:radius, backgroundColor:bgColor, border:border}} {...props}
      className={`button ${size}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
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
