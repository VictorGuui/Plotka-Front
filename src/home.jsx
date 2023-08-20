import "./style.css"
import { Text } from '@chakra-ui/react'
import { useState } from 'react'
import services from "./services/services";

export function Home() {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);

    async function handleMessage(message) {
        const newMessage = {
            role: 'user',
            message: message
        }
        setMessages(prev => [...prev, newMessage])
        console.log(newMessage);
        console.log(messages);
        services.sendMessage(newMessage)
        .then((response) => {
            if (response.data[0].status === 'finish') {

            } else {
                const messageAssistant = response.data;
                setMessages(prev => [...prev, messageAssistant])
            }
        })
        .catch((error) => {
            console.log(error);
        }) 
    }

    return (
        <div className="main">
            <div className="contents">
                {messages.map((message) => (
                    <div className={message.role}>
                        <Text fontSize='md'>{message.message}</Text>
                    </div>
                ))}
            </div>
            <div className="actions">
                <input type="text" placeholder="type" className="entry" onChange={(e) => setCurrentMessage(e.target.value)}/>
                <button className="send" onClick={() => handleMessage(currentMessage)}>enviar</button>
            </div>
        </div>
    )
}
