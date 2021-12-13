import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Avatar } from '@material-ui/core'
import * as timeago from 'timeago.js'
import { useDispatch } from 'react-redux'
import { collection, getDocs, query, where} from 'firebase/firestore'

import { db } from '../firebase/firebase'
import { setChat } from '../redux/features/chatSlice'

const SidebarChart = ({ id, chatName }) => {

  const dispatch =  useDispatch()
  const [chatInfo, setChatInfo] = useState([])

  useEffect(() => {

    const fetchChat = async () => {

      const chatRefById = query(collection(db, 'chats'), where('id', '==', id))
      await getDocs(chatRefById).then((snapshot) => {
        setChatInfo(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          }))
        )
      })
    }

    if(chatInfo.length === 0){
      fetchChat()
    }
  }, [chatInfo, id])

    return (
        <SidebarChatContainer onClick={() => {
          dispatch(setChat({
            chatId: id,
            chatName
          }))
        }}>
            <Avatar  src={chatInfo[0]?.photo}/>
            <SidebarChatInfoContainer>
                <h3>{chatName}</h3>
                <p>{chatInfo[0]?.message}</p>
                <TimeStamp>
                {timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}
                </TimeStamp>
            </SidebarChatInfoContainer>
        </SidebarChatContainer>
    )
}

export default SidebarChart

const SidebarChatContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  :hover {
    background-color: #3e93fd;
    color: white;
  }
`

const SidebarChatInfoContainer = styled.div`
  margin-left: 15px;
  position: relative;
  width: 100%;
`

const TimeStamp = styled.small`
  position: absolute;
  top: 5px;
  right: 0;
` 