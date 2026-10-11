export const sendMessage = async (messages, personaId) => {
  const response = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, persona_id: personaId }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error ?? "Request failed")
  }

  const data = await response.json()
  return data.reply
}
