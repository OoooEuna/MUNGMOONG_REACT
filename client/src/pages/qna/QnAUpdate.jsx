import React from 'react'

const QnAUpdate = () => {
    const { no } = useParams()
    return (
      <>
        {/* Header */}
        <UpdateContainer no={no} />
        {/* Footer */}
      </>
    )
  }
  
  export default QnAUpdate