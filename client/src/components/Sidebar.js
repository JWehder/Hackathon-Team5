import React, { useState } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import {
  FiHome,
  FiCompass,
  FiMessageSquare,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiCheckSquare,
} from 'react-icons/fi'
import { TfiBookmarkAlt } from 'react-icons/tfi'
import Logo from '../assets/main-logo.png'
import Home from './Home'
import EBooks from './Ebooks'
import Dashboard from './HomeTest'
import Courses from './Courses'
import CompletedCourses from './CompletedCourses'
import Community from './Community'
import Settings from './Settings'
import Ebook from './Ebook'
import { useStore } from '../stores/useUsersStore'
import { useNavigate } from 'react-router-dom'



const LinkItems = [
  { linkName: 'Home', icon: FiHome },
  { linkName: 'eBooks', icon: TfiBookmarkAlt },
  { linkName: 'Courses', icon: FiCompass },
  { linkName: 'Completed Courses', icon: FiCheckSquare },
  { linkName: 'Community', icon: FiMessageSquare },
  { linkName: 'Settings', icon: FiSettings }
]

const SidebarContent = ({ onClose, selectedLink, setSelectedLink, ...rest }) => {

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Box mx='auto' width='150px' marginBottom='5'>
                <img src={Logo} alt='logo' width='150' height='150'/>
      </Box>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.linkName} icon={link.icon} linkName={link.linkName} setSelectedLink={setSelectedLink} selectedLink={selectedLink}>
          {link.linkName}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, setSelectedLink, selectedLink, linkName, ...rest }) => {

  return (
    <Box
      as="a"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={() => setSelectedLink(linkName)}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#2F4CED',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const MobileNav = ({ onOpen, selectedLink, ...rest }) => {
  const logout = useStore((state) => state.logout)
  const user = useStore((state) => state.user)
  const navigate = useNavigate()

  console.log(user)

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  bg='#2F4CED'
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{user?.first_name + ' ' + user?.last_name}</Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedLink, setSelectedLink] = useState('Home')

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} selectedLink={selectedLink}/>
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
          {selectedLink === 'Home' && <Dashboard />}
          {selectedLink === 'eBooks' && <Ebook />}
          {selectedLink === 'Courses' && <Courses />}
          {selectedLink === 'Completed Courses' && <CompletedCourses />}
          {selectedLink === 'Community' && <Community />}
          {selectedLink === 'Settings' && <Settings />}
      </Box>
    </Box>
  )
}

export default SidebarWithHeader