// import React, { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// // import '@fullcalendar/core/main.css';
// // import '@fullcalendar/daygrid/main.css';
// import * as Swal from '../../apis/alert';
// import withReactContent from 'sweetalert2-react-content';


// const MySwal = withReactContent(Swal);

// const Schedule = ({ trainerNo }) => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const response = await fetch(`/trainer/schedule/event?trainerNo=${trainerNo}`);
//       const eventList = await response.json();
//       setEvents(eventList);
//     };

//     fetchEvents();
//   }, [trainerNo]);

//   const handleAddSchedule = () => {
//     MySwal.fire({
//       title: '일정 추가',
//       icon: 'info',
//       html: `
//         <div>
//           <label for="title">사유 :</label>
//           <input type="text" id="title" name="title" required />
//         </div>
//         <div>
//           <label for="scheduleDate">휴무일 :</label>
//           <input type="datetime-local" id="scheduleDate" name="scheduleDate" required />
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonText: '추가',
//       cancelButtonText: '취소',
//       preConfirm: () => {
//         const title = MySwal.getPopup().querySelector('#title').value;
//         const scheduleDate = MySwal.getPopup().querySelector('#scheduleDate').value;
//         if (!title || !scheduleDate) {
//           MySwal.showValidationMessage('Please enter title and schedule date');
//         }
//         return { title, scheduleDate };
//       }
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const newEvent = {
//           title: result.value.title,
//           start: result.value.scheduleDate,
//         };
//         setEvents([...events, newEvent]);

//         // 서버로 POST 요청을 보내는 코드 추가 가능
//         fetch('/trainer/schedule', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             title: newEvent.title,
//             scheduleDate: newEvent.start,
//             trainerNo: trainerNo
//           })
//         }).then(response => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         }).then(data => {
//           // 성공적으로 처리된 경우 필요한 작업 수행
//         }).catch(error => {
//           console.error('Error:', error);
//         });
//       }
//     });
//   };

//   const handleEventClick = (info) => {
//     MySwal.fire({
//       title: '일정을 삭제하시겠습니까?',
//       text: '삭제된 일정은 되돌릴 수 없습니다.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: '삭제',
//       cancelButtonText: '취소'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`/trainer/schedule/event/${info.event.id}`, {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }).then(response => {
//           if (response.ok) {
//             info.event.remove();
//             MySwal.fire({
//               title: '일정 삭제',
//               text: '일정이 삭제되었습니다.',
//               icon: 'success'
//             });
//           } else {
//             MySwal.fire({
//               title: '일정 삭제 실패',
//               text: '일정 삭제가 실패되었습니다.',
//               icon: 'error'
//             });
//           }
//         }).catch(error => {
//           console.error('Error:', error);
//           MySwal.fire({
//             title: '일정 삭제 중 에러',
//             text: '일정 삭제 중 오류가 발생했습니다.',
//             icon: 'error'
//           });
//         });
//       }
//     });
//   };

//   return (
//     <div className="container">
//       <div className="inner">
//         <div className="title-container">
//           <h1 className="title">스케쥴 관리</h1>
//         </div>
//         <nav className="navbar navbar-expand-lg navbar-light">
//           <div className="collapse navbar-collapse justify-content-start">
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <a className="tab-button" href="/trainer/info">훈련사 정보</a>
//               </li>
//               <li className="nav-item">
//                 <a className="tab-button active" href="/trainer/schedule">스케쥴 관리</a>
//               </li>
//               <li className="nav-item">
//                 <a className="tab-button" href="/trainer/deposit">입금 내역서</a>
//               </li>
//               <li className="nav-item">
//                 <a className="tab-button" href="/trainer/orders">예약</a>
//               </li>
//             </ul>
//           </div>
//         </nav>
//         <div className="container p-4">
//           <div id="calendar">
//             <FullCalendar
//               plugins={[dayGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               height="700px"
//               expandRows={true}
//               customButtons={{
//                 myCustomButton: {
//                   text: '일정 추가',
//                   click: handleAddSchedule,
//                 },
//               }}
//               headerToolbar={{
//                 right: 'prev,next today',
//                 center: 'title',
//                 left: 'myCustomButton',
//               }}
//               selectable={true}
//               nowIndicator={true}
//               dayMaxEvents={true}
//               locale="ko"
//               events={events}
//               eventDidMount={(info) => {
//                 info.el.title = info.event.start;
//                 info.el.style.backgroundColor = '#FFD700';
//               }}
//               eventClick={handleEventClick}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Schedule;
