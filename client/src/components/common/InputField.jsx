
import React from 'react'

const InputField = ({type,name, id,placeholder, value, onChange, required, feedback}) => (
  <div className='mb-3'>
    <label htmlFor={id}>{placeholder}</label>
    <input type="{type}" 
    className='form-control'
    name={name}
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    />
    {feedback && <div className='invalid-feedback'>{feedback}</div>}
  </div>
);

export default InputField