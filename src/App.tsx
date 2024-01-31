import { useEffect, useState } from 'react'
import Tmi from 'tmi.js'
import { GAME_STATE, BLACK_USERS, WORDS } from './constants'

const client = new Tmi.Client({
  options: { debug: false },
  channels: ['afor_digital']
})

const chooseWord = () => {
  let index = Math.floor(Math.random() * WORDS.length)
  let word = WORDS[index]

  return word
}

function App () {
  const [state, setState] = useState<string>(GAME_STATE.MENU)
  const [writtenLetters, setWrittenLetters] = useState<string[]>([])
  const [chosenWord, setChosenWord] = useState<string>(chooseWord)

  const addWrittenLetter = (letter: string) => {
    setWrittenLetters(prev => [...prev, letter])
  }

  console.log(chosenWord)

  useEffect(() => {
    client.on('message', async (channel, userState, message) => {
      const { username, ['display-name']: displayName } = userState

      if (!username || BLACK_USERS.includes(username)) {
        return
      }

      if (message.startsWith('!play ')) {
        const letter = message.slice(6, 7)
        const regex = /^[a-zA-Z]$/

        if (letter.match(regex) && !writtenLetters.includes(letter)) {
        }
      }

      console.log(userState)
    })
    client.connect()

    return () => {
      client.removeAllListeners('message')
      client.disconnect()
    }
  }, [])

  const updateGame = (state: string) => {
    setState(state)
  }

  return (
    <main className='w-screen min-h-screen flex flex-col py-20 text-white bg-[url(/imgs/bg.jpeg)] bg-cover font-inika'>
      {state === GAME_STATE.MENU ? (
        <>
          <img src='/imgs/title.png' alt='aforcado-title' />
          <div className='flex flex-col items-center gap-y-10 pt-20'>
            <button
              onClick={() => updateGame(GAME_STATE.GAME)}
              className='bg-[#5491FF] hover:bg-[#6199FF] text-6xl px-[100px] py-[20px] text-white border-4 border-black font-bold rounded-[12px] rotate-1'
            >
              PLAY
            </button>
            <button className='bg-[#D30040] hover:bg-[#F10049] w-fit text-3xl px-[75px] py-[15px] text-white border-4 border-black font-bold rounded-[12px] -rotate-1'>
              OPTIONS
            </button>
          </div>
        </>
      ) : (
        <div className='pl-20'>
          <div className='flex gap-x-8'>
            <button
              onClick={() => updateGame(GAME_STATE.MENU)}
              className='bg-[#5491FF] hover:bg-[#6199FF] text-xl px-[20px] py-[4px] text-white border-2 border-black font-bold rounded-[8px]'
            >
              MENU
            </button>
            <button className='bg-[#D30040] hover:bg-[#F10049] w-fit text-xl px-[20px] py-[4px] text-white border-2 border-black font-bold rounded-[8px]'>
              TRY AGAIN
            </button>
          </div>

          <div></div>

          <div className='w-[600px] h-[600px] absolute right-0 top-0 bottom-0 bg-[url(/imgs/step-0.png)]'></div>
        </div>
      )}
    </main>
  )
}

export default App
