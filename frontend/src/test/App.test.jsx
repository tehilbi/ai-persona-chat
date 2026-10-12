import { render, screen, fireEvent, act } from '@testing-library/react'
import { vi, it, expect } from 'vitest'
import App from '../App'

vi.mock('../api/chat', () => ({
  sendMessage: vi.fn(),
}))

import { sendMessage } from '../api/chat'

it('discards reply if persona was switched before promise resolved', async () => {
  let resolve
  sendMessage.mockReturnValue(new Promise(r => { resolve = r }))

  render(<App />)

  // Send a message on the first persona (Tutor)
  const input = screen.getByRole('textbox')
  const sendBtn = screen.getByRole('button', { name: /send/i })

  fireEvent.change(input, { target: { value: 'Hello tutor' } })
  fireEvent.click(sendBtn)

  // Switch to second persona (Career Mentor) before the promise resolves
  const mentorCard = screen.getByText('Career Mentor')
  fireEvent.click(mentorCard)

  // Now resolve the promise with the tutor's reply
  await act(async () => {
    resolve('This is the tutor reply')
  })

  // The tutor reply should NOT appear — persona was switched and chat was reset
  expect(screen.queryByText('This is the tutor reply')).not.toBeInTheDocument()
})
