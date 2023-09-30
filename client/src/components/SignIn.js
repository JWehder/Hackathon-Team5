import React, { useState } from 'react'
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
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import Logo from '../assets/main-logo.png'

export default function SimpleCard() {
    const [show, setShow] = useState(false)
  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing='8' mx='auto' maxW='2xl' py='12' px='6'>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          >
             <Box mx='auto' width='150px' marginBottom='5'>
                <img src={Logo} alt='logo' width='150' height='150'/>
             </Box>
            <Stack align='center'>
                <Heading fontSize={'3xl'}>Sign in</Heading>
                <Text fontSize={'md'} color={'gray.600'}>
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
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? 'text' : 'password'}/>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" 
                                color={'gray'}
                                _hover={{bg: 'gray.200'}}
                                onClick={() => setShow(!show)}>
                        {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Keep Me Signed In</Checkbox>
                <Text> <Link color={'blue.400'}>Forgot password?</Link></Text>
              </Stack>
              <Button
                borderRadius={100}
                bg={'#2F3CED'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
              <Text>Don't have an account?  <Link color={'blue.400'}>Sign Up</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}