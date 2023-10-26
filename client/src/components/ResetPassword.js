import React, { useState } from 'react'
import { Flex,
         Stack,
         Box,
         Heading,
         Text,
         Button,
         Input,
         FormControl,
         FormLabel,
         useColorModeValue 
        } from '@chakra-ui/react'
import Logo from '../assets/main-logo.png'
import axios from 'axios'


const ResetPassword = () => {
    const [email, setEmail] = useState('')


    function handleReset(e) {
        e.preventDefault()
        fetch('http://localhost:5555/forgot_password', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: email
        })
        .then(res => res.json())
        .then(console.log)
    }

  return (
    <div>
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}
      >
      <Stack spacing='8' mx='auto' py='12' px='6'>
        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='lg'
          p={8}
          maxW={["100%", "100%", "2xl"]}
          width={["100%", "100%", "500px"]}
          >
             <Box mx='auto' width='150px' marginBottom='5'>
                <img src={Logo} alt='logo' width='150' height='150'/>
             </Box>
             <Stack align='center' mb='6'>
                <Heading fontSize='xl'>
                 Reset Your Password
                </Heading>
             </Stack>
             <Stack spacing='4'>
                <form onSubmit={handleReset}>
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" onChange={(e) => setEmail(e.target.value)}/>
                    <Button
                        mt='6'
                        p='4'
                        width='100%'
                        type='submit'
                        borderRadius='100'
                        bg='#2F3CED'
                        color='white'
                        _hover={{
                        bg: 'blue.500',
                        }}>
                        Send a reset password email
                    </Button>
                </FormControl>
                </form>
             </Stack>
            </Box>
        </Stack>
    </Flex>
    </div>
  )
}

export default ResetPassword