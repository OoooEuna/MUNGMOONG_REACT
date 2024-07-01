// components/common/Button.js'

// 버튼 컴포넌트
import React from 'react';

const Button = ({type, className, onClick, children, disabled}) => (
<button
    type= {type}
    className={className}
    onClick={onClick}
    disabled={disabled}
    >
        {children}
</button>
);

export default Button;
