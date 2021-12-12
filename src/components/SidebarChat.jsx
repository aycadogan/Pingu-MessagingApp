import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Avatar } from '@material-ui/core'
import * as timeago from 'timeago.js'

const SidebarChart = ({ id, chatName }) => {
    return (
        <SidebarChatContainer>
            <Avatar />
            <SidebarChatInfoContainer>
                <h3>{chatName}</h3>
                {/* <p>chat info...</p> */}
                <TimeStamp>
                    {/* time ago */}
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