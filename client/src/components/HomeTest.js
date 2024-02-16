import React, { useState } from 'react';
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  SimpleGrid,
  Flex,
  HStack,
  StackDivider,
  Icon,
  Image,
  Avatar,
  Button,
  Divider,
  FormLabel,
  Link,
  Input,
  FormControl,
  useColorModeValue,
  Spacer,
} from '@chakra-ui/react';

export default function Dashboard() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Flex>
        <Box w='100%' p={4} md={2}>
          <Container
            textAlign='center'
            fluid='true'
            style={{ marginTop: 0 }}
            maxW='container.lg'
          >
            <Heading fontSize={'5xl'} fontFamily={'body'} fontWeight={600}>
              What would you like to learn today?
            </Heading>
            <form style={{ marginTop: 75 }}>
              <Stack spacing='5'>
                <FormControl>
                  <Input
                    backgroundColor='#F5F5F5'
                    width='40.5rem'
                    placeholder='ex: Python courses for beginner'
                    height='3.8rem'
                    style={{ borderRadius: 15 }}
                  />
                </FormControl>
                <Link
                  textAlign='center'
                  color={'blue'}
                  fontWeight={600}
                >
                  Browse all courses
                </Link>
              </Stack>
            </form>
          </Container>
          <Container
            textAlign='center'
            fluid='true'
            style={{ marginTop: 30 }}
            maxW='container.lg'
          >
            <Stack spacing='4'>
                <Flex>
                  <Box>
                    <Heading
                      textAlign='left'
                      fontSize={'1xl'}
                      fontFamily={'body'}
                      fontWeight={600}
                    >
                      Current Courses
                    </Heading>
                  </Box>
                  <Spacer />
                  <Box>
                    <Link
                      fontSize={'1xl'}
                      color={'blue'}
                      fontWeight={600}
                    >
                      View All
                    </Link>
                  </Box>
                </Flex>
            </Stack>
          </Container>
          <Container
            textAlign='center'
            fluid='true'
            style={{ marginTop: 30 }}
            maxW='container.lg'
          >
            <SimpleGrid
              spacing={3}
              templateColumns='repeat(auto-fill, minmax(255px, 1fr))'
            >
              <Card
                style={{
                  overflowX: 'hidden',
                  overflow: 'hidden',
                }}
                maxH={{ base: '100%', sm: '200px' }}
                align='left'
              >
                <Button
                  fontSize='15px'
                  marginTop='18px'
                  marginLeft='20px'
                  fontWeight='600'
                  width='110px'
                  size='sm'
                  color='red'
                  bg={useColorModeValue('red.50', 'red.900')}
                  variant='outline'
                  backgroundColor='#FFE5E7'
                  p={2}
                  px={3}
                >
                  Web Design
                </Button>
                <Heading
                  py='2'
                  style={{ textAlign: 'left', marginLeft: 20, marginTop: 10 }}
                  size='sm'
                  fontSize='12px'
                >
                  Learning web design with Figma
                </Heading>
                <CardBody>
                  <Text style={{ textAlign: 'left', fontWeight: 300 }} py='2'>
                    Master Figma from the essentials to design, and building
                    your portfolio with Webflow ...
                  </Text>
                </CardBody>
              </Card>
              <Card
                style={{
                  overflowX: 'hidden',
                  overflow: 'hidden',
                }}
                maxH={{ base: '100%', sm: '200px' }}
                align='left'
              >
                <Button
                  fontSize='15px'
                  marginTop='18px'
                  marginLeft='20px'
                  fontWeight='600'
                  width='180px'
                  size='sm'
                  color='orange'
                  variant='outline'
                  backgroundColor='#FFF5E7'
                  bg={useColorModeValue('orange.50', 'orange.900')}
                  p={2}
                  px={3}
                >
                  Software Engineering
                </Button>
                <Heading
                  py='2'
                  style={{ textAlign: 'left', marginLeft: 20, marginTop: 10 }}
                  size='sm'
                  fontSize='12px'
                >
                  Understand the basic of software and programming with the
                  expert ...
                </Heading>
                <CardBody>
                  <Text
                    style={{ textAlign: 'left', fontWeight: 300, marginTop: 1 }}
                    py='2'
                  >
                    Start learning software and programming to unlock your
                    potential as a future engineer...
                  </Text>
                </CardBody>
              </Card>
              <Card maxH={{ base: '100%', sm: '200px' }} align='left'>
                <Button
                  fontSize='15px'
                  marginTop='18px'
                  marginLeft='20px'
                  fontWeight='600'
                  width='180px'
                  size='sm'
                  color='blue'
                  border='0px'
                  variant='outline'
                  backgroundColor='#E6F7FF'
                  bg={useColorModeValue('blue.50', 'blue.900')}
                  colorScheme='blue'
                  p={2}
                  px={3}
                >
                  Digital Marketing
                </Button>
                <Heading
                  py='2'
                  style={{ textAlign: 'left', marginLeft: 20, marginTop: 10 }}
                  size='sm'
                  fontSize='12px'
                >
                  Brand Strategy in Digital Marketing
                </Heading>
                <CardBody>
                  <Text style={{ textAlign: 'left', fontWeight: 300 }} py='2'>
                    Master the comprehensive understanding about Brand Strategy
                    in digital marketing from expert ...
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Container>
        </Box>
      </Flex>
    </div>
  );
}
