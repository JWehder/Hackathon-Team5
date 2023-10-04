import Lottie from 'lottie-react';
import animationData from '../lottie/Component_3.json';

export default function Circle() {
    return <div style={{
      width: 100,
      height: 100,
      borderRadius: '100%',
      backgroundColor: 'blue'
    }}>
        <Lottie options={{
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
            }
        }}
        />
    </div>;
  };

