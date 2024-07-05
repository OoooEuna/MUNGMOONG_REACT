import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfoComponent from '../../components/users/UserInfoComponent';
import '../../css/font.css'; // 폰트 CSS 파일 import

const UserInfoContainer = () => {
    const [user, setUser] = useState(null);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get('/api/users/info'); // 사용자 정보를 가져오는 API 엔드포인트
                const petsResponse = await axios.get('/api/pets'); // 펫 정보를 가져오는 API 엔드포인트

                setUser(userResponse.data);
                setPets(petsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const onDeletePet = async (petNo) => {
        try {
            await axios.delete(`/api/pets/${petNo}`); // 펫 삭제 API 엔드포인트
            setPets(pets.filter(pet => pet.petNo !== petNo));
        } catch (error) {
            console.error('Error deleting pet:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return <UserInfoComponent user={user} pets={pets} onDeletePet={onDeletePet} />;
};

export default UserInfoContainer;
