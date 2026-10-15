import { useEffect, useRef } from 'react'
import styles from './ChatWindow.module.scss'

export default function ChatWindow({ messages, isStreaming }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  return (
    <div className={styles.window}>
      {messages.length === 0 && !isStreaming && (
        <p className={styles.empty}>Send a message to start chatting</p>
      )}
      {messages.map((msg, i) => (
        <div key={i} className={`${styles.bubble} ${styles[msg.role]}`}>
          {msg.persona && <span className={styles.persona}>{msg.persona + ':'}</span>} {msg.content}
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
