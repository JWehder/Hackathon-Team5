import {
    Box,
    Stack,
    Heading,
    Text,
    Container,
    SimpleGrid,
    Flex,
    useBreakpointValue,
    Icon,
    Image,
    Avatar,
    Button,
    Divider,
  } from '@chakra-ui/react';
  import { StarIcon } from '@chakra-ui/icons';
  import { BsBookmark, BsLightbulb, BsChatLeftDots, BsPuzzle } from 'react-icons/bs';


  export default function Ebook() {

    const IMAGE = 'https://m.media-amazon.com/images/I/81lopKpiXhL._AC_UF1000,1000_QL80_.jpg'

    return (
    <Flex direction={'row'}>
      <Box position={'relative'}>
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}>
          <Stack spacing={{ base: 10, md: 20 }}>
          <Box
            role={'group'}
            p={6}
            maxW={'275px'}
            w={'full'}
            bg={'gray.200'}
            boxShadow={'2xl'}
            rounded={'lg'}
            pos={'relative'}
            zIndex={1}>
            <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
                transition: 'all .3s ease',
                content: '""',
                w: 'full',
                h: 'full',
                pos: 'absolute',
                top: 5,
                left: 0,
                backgroundImage: `url(${IMAGE})`,
                filter: 'blur(15px)',
                zIndex: -1,
            }}
            _groupHover={{
                _after: {
                filter: 'blur(20px)',
                },
            }}>
            <Image
                rounded={'lg'}
                height={230}
                width={282}
                objectFit='inherit'
                src={IMAGE}
                alt="#"
            />
            </Box>
            <Stack pt={10} >
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            Python Crash Course
            </Heading>
            <Stack direction={'row'} align={'center'}>
                <Text fontWeight={200} fontSize={'sm'}>
                A Hands On, Project Based Introduction to Programming
                </Text>
                <Icon as={BsBookmark} color={'gray.500'} size={'xs'} />
            </Stack>
            <Flex alignItems='center'>
                <Avatar name='Eric Matthes' align={'flex-start'} size='xs'/>
                <Text ml={2}>Eric Matthes</Text> 
                <Icon as={StarIcon} color={'yellow.300'} size={'xs'} ml={2}/>
                <Icon as={StarIcon} color={'yellow.300'} size={'xs'} ml={2}/>
                <Icon as={StarIcon} color={'yellow.300'} size={'xs'} ml={2}/>
                <Icon as={StarIcon} color={'gray.500'} size={'xs'} ml={2}/>
                <Icon as={StarIcon} color={'gray.500'} size={'xs'} ml={2}/>
            </Flex>
            <Text>200 visited</Text>
            <Text>12 Dec 2019 Published</Text>
            <Button leftIcon={<BsLightbulb />} borderRadius={100} bg={'#2F3CED'} color={'white'} mb={4}>Key Ideas</Button>
            <Button leftIcon={<BsChatLeftDots />} borderRadius={100} bg={'#2F3CED'} color={'white'} mb={4}>Text to Voice</Button>
            <Button leftIcon={<BsPuzzle />}borderRadius={100} bg={'#2F3CED'} color={'white'} mb={4}>Take Quiz</Button>
            </Stack>
        </Box>
            </Stack>
                <Stack
                    bg={'white'}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={'md'}
                    >
                    <Stack spacing={4}>
                    <Heading
                        color={'gray.800'}
                        lineHeight={1.1}
                        fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                        Overview
                    </Heading>
                    <Text>The basics of a powerful language</Text>
                    <Divider />
                    <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500
                    </Text>
                    </Stack>
                    <Box mt={10}>
                    <Stack spacing={4}>
                    </Stack>
                    
                    </Box>
                </Stack>
            </Container>
        </Box>
    </Flex>
    );
  }
  