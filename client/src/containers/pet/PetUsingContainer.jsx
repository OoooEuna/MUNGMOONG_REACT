// src/containers/pet/PetUsingContainer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PetUsingComponent from '../../components/pet/PetUsingComponent';

const PetUsingContainer = () => {
    const [trainer, setTrainer] = useState(null);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = 'user'; // 실제 userId로 대체
                const trainerResponse = await axios.get(`/api/trainer?userId=${userId}`);
                const petsResponse = await axios.get('/api/pets');

                setTrainer(trainerResponse.data);
                setPets(petsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return <PetUsingComponent trainer={trainer} pets={pets} />;
};

export default PetUsingContainer;
