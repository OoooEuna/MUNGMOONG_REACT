import axios from 'axios';

// 훈련사 정보 등록         -  [POST]  
export const join = (trainerData) => axios.post("/api/trainer/join_data", trainerData)

// 훈련사 정보 조회         -  [GET]   
export const info = (userId) => axios.get(`/api/trainer/info?userId=${userId}`)

// 훈련사 수정 화면         -  [GET]
export const getUpdate = (userId) => axios.get(`/api/trainer/info_update?userId=${userId}`)

// 훈련사 수정              -  [PUT]   
export const update = (trainer) => axios.put("/api/trainer/info_update", trainer)

// 훈련사 경력 추가         -  [POST]   
export const addCareer = (trainer) => axios.post("/api/trainer/career", trainer)

// 훈련사 휴무일            -  [GET]  
export const schedule = () => axios.get("/api/trainer/schedule")

// 훈련사 휴무일 data       -  [GET] 
export const schedule_data = (trainerNo) => axios.get(`/api/trainer/schedule/event?trainerNo=${trainerNo}`)

// 훈련사 휴무일 등록       -  [POST]   
export const insert_schedule = (scheduleData) => axios.post("/api/trainer/schedule", scheduleData)

// 훈련사 휴무일 삭제       -  [DELETE]
export const delete_schedule = (no) => axios.delete(`/api/trainer/schedule/event/${no}`)

// 훈련사 입금 내역 목록    -  [GET]    
export const deposit = (trainerNo) => axios.get(`/api/trainer/deposit?trainerNo=${trainerNo}`)

// 훈련사 정보 조회         - [GET]
export const getTrainerInfo = (userId) => axios.get(`/api/trainer`, { params: { userId } })

// 훈련사 orders 목록       -  [GET] 
export const ordersList = (trainerNo) => axios.get(`/api/trainer/orders?trainerNo=${trainerNo}`)

// 훈련사 orders 상세       -  [GET] 
export const orders = (no) => axios.get(`/api/trainer/orders_details?no=${no}`)

// 훈련사 Meaning 수정 처리 -  [PUT]   
export const meaning = (no, meaning) => axios.put("/api/trainer/orders", { no, meaning })

// 자격증 삭제 처리         - [DELETE]
export const certificate_delete = (certificateNo) => axios.delete(`/api/certificate/${certificateNo}`)