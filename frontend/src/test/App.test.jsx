import { render, screen, fireEvent, act } from '@testing-library/react'
import { vi, it, expect } from 'vitest'
import App from '../App'

vi.mock('../api/chat', () => ({
  sendMessage: vi.fn(),
}))

import { sendMessage } from '../api/chat'

it('disables persona cards and input while a reply is pending, then re-enables them', async () => {
  let resolve
  sendMessage.mockReturnValue(new Promise(r => { resolve = r }))

  render(<App />)

  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: 'Hello tutor' } })
  fireEvent.click(screen.getByRole('button', { name: /send/i }))

  const mentorCard = screen.getByRole('button', { name: /Career Mentor/ })
  const tutorCard = screen.getByRole('button', { name: /Tutor/ })
  expect(mentorCard).toBeDisabled()
  expect(tutorCard).toBeDisabled()
  expect(input).toBeDisabled()

  await act(async () => {
    resolve('This is the tutor reply')
  })

  expect(screen.getByText('This is the tutor reply')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /Career Mentor/ })).toBeEnabled()
  expect(screen.getByRole('textbox')).toBeEnabled()
})
