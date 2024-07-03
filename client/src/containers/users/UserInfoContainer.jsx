import React from 'react';
import UserInfoComponent from '../../components/users/UserInfoComponent';
import '../../css/font.css'; // 폰트 CSS 파일 import

const UserInfoContainer = () => {
    const user = {
        name: "김철수",
        gender: 0, // 0: 남성, 1: 여성
        mail: "kim@example.com",
        phone: "010-1234-5678",
        birth: "1990-01-01",
        address: "서울시 강남구",
        role: 1 // 예시로 사용
    };

    const pets = [
        {
            petNo: 1,
            petname: "댕댕이",
            petgender: 0,
            age: 3,
            character: "활발함",
            specialNotes: "없음"
        },
        {
            petNo: 2,
            petname: "멍멍이",
            petgender: 1,
            age: 2,
            character: "온순함",
            specialNotes: "알러지 있음"
        }
    ];

    const onDeletePet = (petNo) => {
        console.log(`Delete pet with id: ${petNo}`);
        // 여기서 실제 삭제 로직을 구현하세요
    };

    return <UserInfoComponent user={user} pets={pets} onDeletePet={onDeletePet} />;
};

export default UserInfoContainer;
