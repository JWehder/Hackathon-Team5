import React, { useState, useRef } from 'react';
import {
    Box,
    Stack,
    Heading,
    Text,
    Container,
    SimpleGrid,
    Flex,
    Icon,
    Image,
    Avatar,
    Button,
    Divider,
  } from '@chakra-ui/react';
  import { StarIcon } from '@chakra-ui/icons';
  import { BsBookmark, BsLightbulb, BsChatLeftDots, BsPuzzle, BsStop } from 'react-icons/bs';
  import Loading from './Loading';
  import ReactMarkdown from 'react-markdown';


  export default function Ebook() {
    const [summary, setSummary] = useState('')
    const [loading, setLoading] = useState(false)
    const [isAudioPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef(null)

    const IMAGE = 'https://m.media-amazon.com/images/I/81lopKpiXhL._AC_UF1000,1000_QL80_.jpg'

    function generateIdeas() {
        setLoading(true)
        fetch('http://localhost:5555/generate_summary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: "Give me a short summary of Python Crash Course and why we should read it in paragraph string form" })
            })
        .then(response => response.json())
        .then(data => {
            setLoading(false)
            setSummary(data.text)
        })
        .catch(error => console.error('Error:', error));
    }

    function generateSpeech() {
        setLoading(true)
        setIsPlaying(true)
        fetch('http://localhost:5555/synthesize_speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: summary, lesson_name: 'test' })
        })
        .then(response => response.blob())
        .then(blob => {
            setLoading(false)
            const audioUrl = URL.createObjectURL(blob)
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
              }
              const audio = new Audio(audioUrl);
              audioRef.current = audio
              audio.play();
            })
            .catch((error) => console.error('Error:', error));
    }

    function stopSpeech() {
        if (audioRef.current) {
            audioRef.current.pause() 
            audioRef.current = null
            setIsPlaying(false)
        }
    }


    return (
    <Flex>
      <Box>
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 12 }}
          py={{ base: 10, sm: 20, lg: 12 }}
          >
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
            <Button leftIcon={<BsLightbulb />} borderRadius={100} bg={'#2F3CED'} color={'white'} mb={4}
                onClick={generateIdeas}>Key Ideas</Button>
                {isAudioPlaying ? 
                <Button leftIcon={<BsStop />} borderRadius={100} bg={'#2F3CED'} color={'white'} mb={4}
                onClick={stopSpeech}>Stop</Button> :
                <Button leftIcon={<BsChatLeftDots />} borderRadius={100} bg={'#2F3CED'} color={'white'} mb={4} 
                onClick={generateSpeech}>Text to Voice</Button> 
            }
            <Button leftIcon={<BsPuzzle />}borderRadius={100} bg={'#2F3CED'} color={'white'} mb={4}>Take Quiz</Button>
            </Stack>
        </Box>
            </Stack>
                <Stack
                    bg={'white'}
                    p={{ base: 4, sm: 6, md: 8 }}
                    // spacing={{ base: 8 }}
                    maxW={'lg'}
                    spacing={{ base: 10, lg: 12 }}
                    >
                    <Stack spacing={4}>
                    <Heading
                        color={'gray.800'}
                        lineHeight={1.1}
                        fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                        Overview
                    </Heading>
                    <Divider />
                    <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                        {summary === '' ? 'Click on Key Ideas to generate a summary' : ''}
                   <ReactMarkdown>{summary}</ReactMarkdown> 
                    {loading && <Loading />}
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
