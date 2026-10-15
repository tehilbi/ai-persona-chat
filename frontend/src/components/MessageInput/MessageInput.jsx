import { useState } from 'react'
import styles from './MessageInput.module.scss'

export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim() || disabled) return
    onSend(text.trim())
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message (Enter to send)"
        disabled={disabled}
        rows={1}
      />
      <button className={styles.button} type="submit" disabled={disabled || !text.trim()}>
        Send
      </button>
    </form>
  )
}
