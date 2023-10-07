import React, { useRef } from 'react'
import { Icon } from '@chakra-ui/react'
import { CenterDiv } from '../styles/Styles'
import styled from '@emotion/styled'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

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
                    <div>cards</div>
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