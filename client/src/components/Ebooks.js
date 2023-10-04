import React from 'react'
import Lottie from 'lottie-react'
import wave from '../lottie/Component_3.json'

const Ebooks = () => {
  return (
    <div>Ebooks
      <Lottie loop={true} animationData={wave} />
    </div>
  )
}

export default Ebooks