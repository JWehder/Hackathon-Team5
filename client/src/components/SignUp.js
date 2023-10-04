import { useState } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { AiOutlineEye,  AiOutlineEyeInvisible } from 'react-icons/ai'
import Logo from '../assets/main-logo.png'
import { useStore } from '../stores/useUsersStore'

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    disability:'blind'
  })
  const createUser = useStore(state => state.signup)

  function handleSignUp(e) {
    e.preventDefault()
    createUser(userInfo)
    console.log(userInfo) 
  } 
  

  function handleChange(e){
    setUserInfo({
      ...userInfo,
      [e.target.id]: e.target.value,
    })
  }


  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing='8' mx='auto' maxW='lg' py='12' px='6'>
        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='lg'
          maxW={["100%", "100%", "2xl"]}
          width={["100%", "100%", "500px"]}
          p={8}>
             <Box mx='auto' width='150px' marginBottom='5'>
                <img src={Logo} alt='logo' width='150' height='150'/>
             </Box>
            <Stack align='center' marginBottom='5'>
                <Heading fontSize='4xl' textAlign='center'>
                    Sign up
                </Heading>
                <Text fontSize='lg' color='gray.600'>
                    to enjoy all of our cool features 
                </Text>
            </Stack>
          <Stack spacing={4}>
            <form onSubmit={handleSignUp}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" 
                    value={userInfo.firstName} onChange={handleChange} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text"
                  value={userInfo.lastName} onChange={handleChange} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email"
              value={userInfo.email} onChange={handleChange} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                  value={userInfo.password} onChange={handleChange} />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem" size="sm"
                    variant='ghost'
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type='submit'
                borderRadius='100'
                loadingText="Submitting"
                size="lg"
                bg='#2F3CED'
                color='white'
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align='center'>
                Already a user? <Link href='/' color='blue.400'>Login</Link>
              </Text>
            </Stack>
          </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}