import "./style.css"
import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import services from "./services/services";

export function Home() {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log(messages)
    }, [messages])

    async function handleMessage(message) {
        const newMessage = {
            role: 'user',
            content: message
        }
        setMessages(prev => [...prev, newMessage])
        services.sendMessage([...messages, newMessage])
        .then((response) => {
            if (response.data.finish) {
                alert(response.data);
            } else {
                const messageAssistant = response.data;
                setMessages(prev => ([...prev, {role: 'assistant', content: messageAssistant}]))
            }
            
        })
        .catch((error) => {
            console.log(error);
        }) 
    }

    return (
        <div className="main">
            <div className="contents">
                {messages.map((message, index) => (
                    <div key={index} className={message.role}>
                        <Text fontSize='md'>{message.content}</Text>
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
