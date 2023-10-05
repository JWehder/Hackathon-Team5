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
} from '@chakra-ui/react';

export default function Dashboard() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Flex>
        <Box w='100%' p={4} md={2}>
          <Container
            textAlign='center'
            fluid
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
                  textAlign='right'
                  style={{ marginRight: 100, color: 'blue' }}
                >
                  Browse all courses
                </Link>
              </Stack>
            </form>
          </Container>
          <Container
            textAlign='center'
            fluid
            style={{ marginTop: 30 }}
            maxW='container.lg'
          >
            <Stack spacing='4'>
              <HStack>
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
                <Box>
                  <Link
                    textAlign='right'
                    fontSize={'1xl'}
                    style={{ marginLeft: 600, color: 'blue' }}
                  >
                    View All
                  </Link>
                </Box>
              </HStack>
            </Stack>
          </Container>
          <Container
            textAlign='center'
            fluid
            style={{ marginTop: 30 }}
            maxW='container.lg'
          >
            <SimpleGrid
              spacing={3}
              templateColumns='repeat(auto-fill, minmax(250px, 1fr))'
            >
              <Card maxH={{ base: '100%', sm: '200px' }} align='left'>
                <CardHeader>
                  <Button>Web Design</Button>
                </CardHeader>
                <CardBody>
                  <Text>
                    View a summary of all your customers over the last month.
                  </Text>
                </CardBody>
              </Card>
              <Card maxH={{ base: '100%', sm: '200px' }} align='left'>
                <CardHeader>
                  <Button>Software Engineering</Button>
                </CardHeader>
                <CardBody>
                  <Text>
                    View a summary of all your customers over the last month.
                  </Text>
                </CardBody>
              </Card>
              <Card maxH={{ base: '100%', sm: '200px' }} align='left'>
                <Button colorScheme='yellow'>Digital Marketing</Button>
                <Heading size='sm'>The perfect latte</Heading>
                <CardBody>
                  <Text py='2'>
                    Caffè latte is a coffee beverage of Italian origin made with
                    espresso and steamed milk.
                  </Text>
                  <Text>
                    View a summary of all your customers over the last month.
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
