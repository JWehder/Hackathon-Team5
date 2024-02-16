import { Box } from '@chakra-ui/layout';
import Lottie from 'lottie-react';
import animationData from '../lottie/Component_3.json';

export default function Circle() {

    return (
        <Box
            position='fixed'
            top='0'
            left='0'
            width='100%'
            height='100%'
            display='flex'
            justifyContent='center'
            alignItems='center'
            zIndex='9999'
            backgroundColor='rgba(0,0,0,0.5)'
            >
            <Lottie animationData={animationData} speed={2} loop={true}/>
        </Box>
    );
  }

