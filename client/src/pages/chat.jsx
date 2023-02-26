import Image from 'next/image'
import useState from 'react-usestateref'

const ChatMessage = ({ text }) => {
  return (
    <div className='whitespace-pre-wrap fixed bttom-20 flex flex-col-reverse'>
      {/* <p>{input}</p> */}
      <p className='text-white text-xl'>{text.text}</p>

      {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit quo tempora aliquid culpa nemo blanditiis, perferendis asperiores magnam mollitia atque totam provident, dolor facere, esse dignissimos soluta deleniti corrupti quod.</p> */}
    </div>
  )
}

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('')

  const sendInput = () => {
    onSend(input);
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      sendInput()
    }
  }

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className='w-full py-3 px-4 rounded-lg fixed bottom-16 text-gray-800'
        type='text'
        placeholder='Ask me anything' disabled={disabled}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </div>
  )
}
const Chat = () => {
  const [messages, setMessages, messagesRef] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async (input) => {

    setLoading(true)
    const myMessage = {
      text: input,
      key: new Date().getTime()
    }
    setMessages(messages => [...messages, myMessage])

    setMessages([...messagesRef.current, myMessage])

    const response = await fetch('/api/generate-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: input
      })
    })

    const data = await response.json()

    setLoading(false)

    if (data.text) {
      const botMessage = {
        text: data.text,
        key: Date.now()
      }
      console.log(botMessage)
      setMessages([...messagesRef.current, botMessage])
    } else {
      console.log('Error occured')
    }
  }

  return (
    <main>
      <div>
        <ChatInput onSend={((input) => fetchData(input))} disabled={loading} />
      </div>

      <div>
        {messages.map(msg => (
          <ChatMessage key={msg.key} text={msg.text} />
        ))}
      </div>
    </main>
  )
}

export default Chat
