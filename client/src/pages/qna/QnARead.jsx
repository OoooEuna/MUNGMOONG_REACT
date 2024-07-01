import React from 'react'

const QnARead = () => {
    // 🔗❓ 파라미터 가져오기
    const { no } = useParams()
    console.log(`no : ${no}`);
    return (
      <>
        {/* Header */}
        <ReadContainer no={no} />
        {/* Footer */}
      </>
    )
  }
  
  export default QnARead