import React from 'react'

const RadioButton = ({id,name, value,label,onChange}) => (
    <div>
        <input type="radio" 
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        />
        <label htmlFor={id}>{label}</label>
    </div>
);

export default RadioButton;