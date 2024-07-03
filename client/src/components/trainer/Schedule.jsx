// import React, { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import '@fullcalendar/common/main.css';
// import '@fullcalendar/daygrid/main.css';
// import * as Swal from '../apis/alert';

// const Schedule = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const response = await fetch(`/trainer/schedule/event?trainerNo=1`); // trainerNo 임시 값 사용
//       const eventList = await response.json();
//       setEvents(eventList);
//     };

//     fetchEvents();
//   }, []);

//   const handleAddSchedule = () => {
//     Swal.MySwal.fire({
//       title: '일정 추가',
//       icon: 'info',
//       html: `
//         <form id="scheduleForm">
//           <div>
//             <label for="title">사유 :</label>
//             <input type="text" id="title" name="title" required />
//           </div>
//           <div>
//             <label for="scheduleDate">휴무일 :</label>
//             <input type="datetime-local" id="scheduleDate" name="scheduleDate" required />
//           </div>
//         </form>
//       `,
//       showCancelButton: true,
//       confirmButtonText: '추가',
//       cancelButtonText: '취소',
//       preConfirm: () => {
//         const title = Swal.MySwal.getPopup().querySelector('#title').value;
//         const scheduleDate = Swal.MySwal.getPopup().querySelector('#scheduleDate').value;
//         if (!title || !scheduleDate) {
//           Swal.MySwal.showValidationMessage('Please enter title and schedule date');
//         }
//         return { title, scheduleDate };
//       },
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const newEvent = {
//           title: result.value.title,
//           start: result.value.scheduleDate,
//         };
//         setEvents([...events, newEvent]);

//         // 여기에 서버로 POST 요청을 보내는 코드 추가 가능
//       }
//     });
//   };

//   const handleEventClick = (info) => {
//     Swal.confirm(
//       '일정을 삭제하시겠습니까?',
//       '삭제된 일정은 되돌릴 수 없습니다.',
//       'warning',
//       (result) => {
//         if (result.isConfirmed) {
//           setEvents(events.filter((event) => event.id !== info.event.id));

//           // 여기에 서버로 DELETE 요청을 보내는 코드 추가 가능
//         }
//       }
//     );
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
