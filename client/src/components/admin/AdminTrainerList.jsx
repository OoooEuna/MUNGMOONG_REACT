import React from 'react'
import { Link } from 'react-router-dom';

const AdminTrainerList = ({ trainerList, isLoading }) => {
  console.log(";;;;;;;;;;;;;;;;;;;" + trainerList);
  return (
    <div className='container'>
      <div className="inner">
        <h1>게시글 목록</h1>

        <nav className='navbar navbar-expand-lg navbar-light'>
          <div className='collapse navbar-collapse justify-content-start'>
            <ul className='navbar-nav'>
              <li className='nav-item'><Link className='tab-button' to={`/api/admin/admin_info`}>회원정보</Link></li>
              <li className='nav-item'><Link className='tab-button' to={`/api/admin/admin_trainer`}>훈련사</Link></li>
              <li className='nav-item'><Link className='tab-button' to={`/api/admin/admin_product`}>상품정보</Link></li>
              <li className='nav-item'><Link className='tab-button' to={`/api/admin/admin_board`}>게시판</Link></li>
            </ul>
          </div>
        </nav>

        {

          !isLoading && trainerList && (
            <table className='table table-striped'>
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
                    <td className='text-truncate'>{trainer.no}</td>
                    <td className='text-truncate'>
                      <Link to={`/api/admin/admin_trainer_read/${trainer.no}`}>
                        {trainer.userId}
                      </Link>
                    </td>
                    <td className='text-truncate'>{trainer.name}</td>
                    <td className='text-truncate'>{trainer.regDate}</td>
                  </tr>
                )
                )}
              </tbody>
            </table>
          )
        }
      </div>
    </div>
  )
}

export default AdminTrainerList