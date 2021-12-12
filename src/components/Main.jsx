import React from 'react'
import styled from 'styled-components'

import SideBar from './SideBar'
import Chat from './Chat'

const Main = ({ user }) => {
    return (
        <MainContainer>
            
            <SideBar user={user} />
            {/* chat */}
            <Chat user={user}/>
        </MainContainer>
    )
}

export default Main

const MainContainer = styled.div`
    display: flex;
`