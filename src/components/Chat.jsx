import React,{ useState, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import { MicNone } from '@material-ui/icons'
import {
    serverTimestamp,
    collection,
    addDoc,
    query,
    orderBy,
    getDocs,
  } from 'firebase/firestore'
  import { useSelector } from 'react-redux'

  import { db } from '../firebase/firebase'
  import Message from './Message'
  import { selectUser } from '../redux/features/userSlice'
  import {selectChatId, selectChatName} from '../redux/features/chatSlice'

const Chat = () => {
    const [messages, setMessages] = useState(null)
    const [input, setInput] =useState('')

    const user = useSelector(selectUser)
    const chatName = useSelector(selectChatName)
    const chatId = useSelector(selectChatId)

    const fetchMessages = useCallback(async () => {
        const msgRef = collection(db, 'chats', chatId, 'messages')
        const q = query(msgRef, orderBy('timestamp', 'asc'))
        await getDocs(q).then((snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({ 
                id: doc.id, 
                data: doc.data() 
            })))
        })
    },[chatId])

    useEffect(() => {
        if(chatId){
            fetchMessages()
        }
    }, [chatId, fetchMessages])

    // QcRrJSDkPtE1IpE2zyBI

    const sendMessage = async (e) => {
        e.preventDefault()

        const data = {
            uid: user.uid,
            photo: user.photoURL || '',
            email: user.email,
            displayName: user.displayName,
            message: input,
            timestamp: serverTimestamp()
        }
        

        const newMessageRef = collection(db, 'chats', chatId,'messages')
        await addDoc(newMessageRef, data).then(() => {
            fetchMessages()
            setInput('')
        })
    }

    return (
        <ChatContainer>
            <ChatHeaderContainer>
                <ChatHeader>
                    Room: <ChatName>{chatName}</ChatName>
                </ChatHeader>
            </ChatHeaderContainer>

            <ChatMessagesContainer>
                { messages && messages.map(
                    ({ id, data}) => (
                        <Message key={id} contents={data} />
                    )
                )}
            </ChatMessagesContainer>

            <ChatInputContainer>
                <ChatForm>
                    <ChatInput
                        value={input}
                        placeholder='Type a message'
                        type='text'
                        onChange ={ (e) => setInput(e.target.value)}
                    />
                    <ChatSubmitButton onClick={sendMessage}>Send Message</ChatSubmitButton>
                </ChatForm>

                <IconButton>
                    <MicNone/>
                </IconButton>
            </ChatInputContainer>
        </ChatContainer>
    )
}

export default Chat


const ChatContainer = styled.div`
display: flex;
flex-direction: column;
flex: 0.65;
height: 100vh;
background-color: white;
`

const ChatHeaderContainer = styled.div`
padding: 20px;
display: flex;
justify-content: space-between;
border-bottom: 1px solid lightgray;
background-color: #f5f5f5;
`

const ChatHeader = styled.div`
font-weight: 500;
color: gray;
`

const ChatName = styled.span`
color: black;
`

const ChatMessagesContainer = styled.div`
flex: 1;
overlow: scroll;
`

const ChatInputContainer = styled.div`
display: flex;
align-items: center;
padding: 10px 20px;
border-top: 1px solid lightgray;
background-color: #f5f5f5;
`

const ChatForm = styled.form`
flex: 1;
`

const ChatInput = styled.input`
width: 98%;
outline-width: 0;
border: 1px solid lightgray;
border-radius: 999px;
padding: 5px;
`

const ChatSubmitButton = styled.button`
display: none;
`