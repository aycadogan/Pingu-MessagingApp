import React from 'react'

import { Button } from '@material-ui/core'
import styled from 'styled-components'

import Pingu from '../assets/penguin.svg'
import { signInWithGoogle } from '../firebase/firebase'

const Login = () => {
    return (
        <div>
            <LoginContainer>
                <LogoContainer>
                    <LoginImage src={Pingu} alt="logo" />
                </LogoContainer>
                <LoginTitle>Pingu</LoginTitle>
                <LoginButton onClick={signInWithGoogle}>Sign In</LoginButton>
            </LoginContainer>
        </div>
    )
}

export default Login

const LoginContainer = styled.div`
    display:grid;
    place-items: center;
    height: 100vh;
    width: 100%;
`

const LogoContainer = styled.div``
const LoginImage = styled.img`
    object-fit: contain;
    height: 350px
`
const LoginTitle = styled.h1`
    text-align:center
`

const LoginButton = styled(Button)`
    width: 300px;
    background-color: #3ea4fb !important;
    color: #ddd;
    font-weight: 800;
    cursor: pointer;

    &:hover{
        background-color: gainsboro !important;
        color: #333;
    }


`