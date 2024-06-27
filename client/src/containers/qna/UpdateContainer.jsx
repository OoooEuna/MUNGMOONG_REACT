import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as qna from '../../apis/qna' 
import BoardUpdateForm from '../../components/qna/UpdateForm'; 
// 게시글 수정
const UpdateContainer = () => {  
    const { no } = useParams();

    const [board, setBoard] = useState({})
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate()

    const onUpdate = async (no, title, writer, content) => {
        try {
            const response = await qna.update(no, title, writer, content)
            console.log(response.data);
            alert('수정 완료')

            // 게시글 목록 이동
            navigate('/qna/list')
        } catch(e) {
            console.log(e);
        }
    }

    const getBoard = async () => {
        setLoading(true)
        try {
            const response = await qna.select(no);
            const data = response.data;
            console.log(data);
            setBoard(data);
        }
        catch(e) {
            console.log(e);
        }
        setLoading(false)
    }

    const onDelete = async (no) => {
        const response = await qna.remove(no);
        console.log(response.data);
        alert('삭제 완료')

        // 게시글 목록 이동
        navigate('/qna/list')
    }

    useEffect(() => {
        getBoard()
    }, [])

    return (
        <BoardUpdateForm 
            no={no} 
            board={board} 
            onUpdate={onUpdate}
            onDelete={onDelete}
            isLoading={isLoading}
        />
    )
}

export default UpdateContainer;
