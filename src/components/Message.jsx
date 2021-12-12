import React from 'react'
import styled from 'styled-components'
import { Avatar } from '@material-ui/core'
import * as timeago from 'timeago.js'
// import { useSelector } from 'react-redux'

// import { selectUser } from '../redux/features/userSlice'

const Message = ({ user, contents: { email, photo, message, timestamp }}) => {
  const isUser = user?.email === email
    
    return (
        <MessageContainer $sender={isUser}>
            <AvatarContainer src={photo} $sender={isUser ? 1: 0} />
            <MessageBubble $sender={isUser}>
                {message}
            </MessageBubble>
            <TimeStamp>{timeago.format(new Date(timestamp?.toDate()))}</TimeStamp>
        </MessageContainer>
    )
}

export default Message

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: fit-content;
  justify-content: space-between;
  margin: 15px;
  ${({ $sender }) =>
    $sender &&
    `
            margin-left: auto;
        `}
`

const MessageBubble = styled.p`
  background-color: #f3f3f5;
  font-size: medium;
  padding: 15px;
  border-radius: 20px;
  margin: 10px;
  margin-right: auto;
  ${({ $sender }) =>
    $sender &&
    `
    background-color: #3cabfa;
    color: white;
  `}
`

const AvatarContainer = styled(Avatar)`
  ${({ sender }) =>
    sender &&
    `
    order: 1;
    margin: 15px;
  `}
`

const TimeStamp = styled.small`
  color: gray;
  position: absolute;
  font-size: 8px;
  bottom: -5px;
  right: 0;
`
