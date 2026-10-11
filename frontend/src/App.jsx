import { useState } from 'react'
import PersonaSelector from './components/PersonaSelector/PersonaSelector'
import ChatWindow from './components/ChatWindow/ChatWindow'
import MessageInput from './components/MessageInput/MessageInput'
import { PERSONAS } from './data/personas'
import { sendMessage } from './api/chat'
import styles from './App.module.scss'

export default function App() {
  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[0])
  const [messages, setMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)

  const handleSelectPersona = (persona) => {
    setSelectedPersona(persona)
    setMessages([])
  }

  const handleSend = async (text) => {
    const newMessages = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setIsStreaming(true)
    try {
      const reply = await sendMessage(newMessages, selectedPersona.id)
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error(err)
    } finally {
      setIsStreaming(false)
    }
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>AI Persona Chat</h1>
      </header>
      <PersonaSelector
        personas={PERSONAS}
        selected={selectedPersona}
        onSelect={handleSelectPersona}
      />
      <ChatWindow messages={messages} isStreaming={isStreaming} />
      <MessageInput onSend={handleSend} disabled={isStreaming} />
    </div>
  )
}
