import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Avatar, IconButton } from '@material-ui/core'
import { RateReviewOutlined } from '@material-ui/icons'
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { signOut } from 'firebase/auth'

import { auth, db } from '../firebase/firebase'
import SidebarChat from './SidebarChat'

const SideBar = ({ user }) => {
  const [chats, setChats] = useState([])

  useEffect(() => {
    if (chats.length === 0) {
      fetchChat()
    }
    console.log(chats)
  }, [chats])

  const fetchChat = async () => {
    const chatRef = collection(db, 'chats')

    const q = query(chatRef, orderBy('timestamp', 'desc'))

    await getDocs(q).then((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }

  const addChat = async () => {
    const chatName = prompt('Please enter a chat name')

    if (chatName) {
      const chatRef = collection(db, 'chats')
      await addDoc(chatRef, {
        chatName,
        timestamp: serverTimestamp(),
      }).then(() => fetchChat())
    }
  }

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarAvatar src={user.photoURL} onClick={() => signOut(auth)} />
        <SidebarTitle>{user.displayName}</SidebarTitle>
        <IconButton variant='outline' onClick={addChat}>
          <RateReviewOutlined />
        </IconButton>
      </SidebarHeader>

      <SidebarChats>
        {chats &&
          chats.map(({ id, data: { chatName } }) => (
            <SidebarChat key={id} id={id} chatName={chatName} />
          ))}
      </SidebarChats>
    </SidebarContainer>
  )
}

export default SideBar

const SidebarContainer = styled.div`
  flex: 0.35;
  height: 100vh;
  flex-direction: column;
  background-color: #f5f5f5;
  border-right: 1px solid lightgray;
`

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 50px;
`

const SidebarAvatar = styled(Avatar)`
  cursor: pointer;
  margin: 10px;
`

const SidebarTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: #e1e1e1;
  color: gray;
  border-radius: 5px;
`

const SidebarChats = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkits-scrollbar {
    display: none;
  }
`