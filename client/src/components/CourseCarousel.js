import React, { useRef } from 'react'
import { Icon } from '@chakra-ui/react'
import { CenterDiv } from '../styles/Styles'
import styled from '@emotion/styled'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { 
Card, 
CardBody, 
CardHeader, 
Button,
Text, 
Heading
 } from '@chakra-ui/react'

export default function CourseCarousel() {
    const scrollContainer = useRef(null)

    const handleBackClick = () => {
        scrollContainer.current.style.scrollBehavior = 'smooth'
        scrollContainer.current.scrollLeft -= 400
    }

    const handleNextClick = () => {
        scrollContainer.current.style.scrollBehavior = 'smooth'
        scrollContainer.current.scrollLeft += 400
    }

    return (
        <>
        <CenterDiv>
            <div style={{textAlign: 'left'}}>Some other listings you may like</div>
        </CenterDiv>
        <CenterDiv>
            <Gallery>
                <StyledIcon as={ArrowLeftIcon} onClick={handleBackClick} />
                <List ref={scrollContainer}>
                    <GalleryWrap>
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
                    </GalleryWrap>
                </List>
                <StyledIcon as={ArrowRightIcon} onClick={handleNextClick} />
            </Gallery>
        </CenterDiv>
        </>
    )
}

const Gallery = styled.div`
    width: 1000px;
    display: flex;
    overflow-x: scroll;
    align-items: center;
    justify-content:center;
    display: flex;

`

const List = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    height: 315px;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`

const GalleryWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10% auto;
`

const StyledIcon = styled(Icon)`
    cursor: pointer;
    margin: 2px;
`