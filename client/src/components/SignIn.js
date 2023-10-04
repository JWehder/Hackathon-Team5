import React, { useState, useEffect } from 'react' 
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  InputGroup,
  InputRightElement,
  Link,
} from '@chakra-ui/react'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Logo from '../assets/main-logo.png'
import SignUp from './SignUp'
import { useStore } from '../stores/useUsersStore'

export default function SimpleCard() {
    const [show, setShow] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })
    const [user, setUser] = useState()
    const createUser = useStore(state => state.login)
    const checkUser = useStore(state => state.getUser)

    useEffect(() => {
      checkUser()
    }, [checkUser])

    useEffect(() => {
      fetch('http://localhost:5555/me')
      .then(response => response.json())
      .then(data => setUser(data))
    }
    , [])


    function handleLogin(e) {
      e.preventDefault()
      createUser(userInfo)
      console.log(userInfo) 
    }

    // function handleLogin(e) {
    //   e.preventDefault()
    //   fetch('http://localhost:5555/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(userInfo)
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     setUser(data)
    //   })
    //   .catch(error => console.error('Error:', error));
    // }

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
            <Stack align='center'>
                <Heading fontSize='3xl'>Sign in</Heading>
                <Text fontSize='md' color={'gray.600'}>
                    Please sign in first to access all features
                </Text>
                <Button borderRadius='100'
                    width='100%'
                    bg='white'
                    variant='outline'
                    marginBottom='2'
                    colorScheme='google'
                    leftIcon={<FcGoogle />}>Continue with Google</Button>
                <Button borderRadius='100'
                    width='100%'
                    colorScheme='facebook'
                    leftIcon={<FaFacebook />}>Continue with Facebook</Button>
            </Stack>
            <Flex align="center">
                <Divider />
                    <Text padding="4">OR</Text>
                <Divider />
            </Flex>
          <form onSubmit={handleLogin}>
          <Stack spacing='4'>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={userInfo.email} onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? 'text' : 'password'} value={userInfo.password}
                        onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}/>
                    <InputRightElement width='4.5rem'>
                        <Button h="1.75rem" size="sm" 
                                variant='ghost'
                                onClick={() => setShow(!show)}>
                        {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            
            <Stack spacing='10'>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Keep me signed in</Checkbox>
                <Text> <Link color={'blue.400'}>Forgot password?</Link></Text>
              </Stack>
              <Button
                type='submit'
                borderRadius='100'
                bg='#2F3CED'
                color='white'
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
                <Text textAlign='center'>Don't have an account?  <Link href='/signup' color='blue.400'>Sign Up</Link>
              </Text>
            </Stack>
          </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
    </div>
  )
}