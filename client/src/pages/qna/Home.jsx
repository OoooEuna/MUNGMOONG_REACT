import React from 'react'
import { Link } from 'react-router-dom'; 


const Home = () => {
  return (
    <div className='container home'>
        <h1 className='title'>Home</h1>
        <h3>문의 게시판</h3>
        <Link to="/QnA" className='btn'>문의</Link>
    </div>
  )
}

export default Home


