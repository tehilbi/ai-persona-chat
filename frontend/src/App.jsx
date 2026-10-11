import { useState } from 'react'
import PersonaSelector from './components/PersonaSelector/PersonaSelector'
import ChatWindow from './components/ChatWindow/ChatWindow'
import MessageInput from './components/MessageInput/MessageInput'
import { PERSONAS } from './data/personas'
import styles from './App.module.scss'

const mockSend = (text, persona) =>
  new Promise(resolve =>
    setTimeout(
      () => resolve(`[${persona.name}] This is a mock response for: "${text}"`),
      800
    )
  )

export default function App() {
  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[0])
  const [messages, setMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)

  const handleSelectPersona = (persona) => {
    setSelectedPersona(persona)
    setMessages([])
  }

  const handleSend = async (text) => {
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setIsStreaming(true)
    const reply = await mockSend(text, selectedPersona)
    setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    setIsStreaming(false)
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
