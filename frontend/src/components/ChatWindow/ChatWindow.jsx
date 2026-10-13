import { useEffect, useRef } from 'react'
import styles from './ChatWindow.module.scss'

export default function ChatWindow({ messages, isStreaming }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  console.log(messages)
  return (
    <div className={styles.window}>
      {messages.length === 0 && !isStreaming && (
        <p className={styles.empty}>Select a persona and send a message to start chatting</p>
      )}
      {messages.map((msg, i) => (
        <div key={i} className={`${styles.bubble} ${styles[msg.role]}`}>
          {msg.persona}: {msg.content}
        </div>
      ))}
      {isStreaming && (
        <div className={`${styles.bubble} ${styles.assistant} ${styles.typing}`}>
          <span /><span /><span />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
