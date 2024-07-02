import React from 'react'
import { Link } from 'react-router-dom';

const AdminTrainerList = ({trainerList, isLoading}) => {
    console.log(";;;;;;;;;;;;;;;;;;;" + trainerList);
    return (
      <div className='container'>
        <h1>게시글 목록</h1>
  
        {
  
          !isLoading && trainerList && (
            <table border={1}>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>등록일자</th>
                </tr>
              </thead>
              <tbody>
  
                {trainerList.map((trainer) =>
                    (
                      <tr key={trainer.no}>
                        <td>{trainer.no}</td>
                        <td>
                          <Link to={`/api/admin/${trainer.no}`}>
                            {trainer.userId}
                          </Link>
                        </td>
                        <td>{trainer.name}</td>
                        <td>{trainer.regDate}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          )
        }
      </div>
    )
  }

export default AdminTrainerList