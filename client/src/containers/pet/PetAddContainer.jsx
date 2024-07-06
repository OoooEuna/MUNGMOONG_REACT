import React, { useState } from 'react';
import axios from 'axios';
import PetAddComponent from '../../components/pet/PetAddComponent';
import '../../css/font.css'; // 폰트 CSS 파일 import

const PetAddContainer = () => {
    const [formData, setFormData] = useState({
        petname: '',
        age: '',
        type: '',
        character: '',
        specialNotes: '',
        petgender: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }
        try {
            await axios.post('/api/pets/add', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('펫이 성공적으로 추가되었습니다!');
            window.location.href = '/users/index'; // 성공 시 마이페이지로 리디렉션
        } catch (error) {
            console.error('Error adding pet:', error);
            alert('펫 추가 중 오류가 발생했습니다.');
        }
    };

    return (
        <PetAddComponent
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default PetAddContainer;
