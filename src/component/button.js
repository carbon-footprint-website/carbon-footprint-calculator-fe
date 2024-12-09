import React from 'react';
import PropTypes from 'prop-types';
import './css/button.css'
/*...props로 추가 속성 전달 */
const Button = ({ width = '150px', height = '50px', label, onClick, type = 'button', size = 'medium', disabled = false, ...props }) => {
    const customStyle = { width, height };
    return (
    <button style={customStyle} {...props}
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
