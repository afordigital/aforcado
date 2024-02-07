import { useEffect, useState } from 'react'
import JSConfetti from 'js-confetti'
import { GAME_STATE, BLACK_USERS, WORDS } from './constants'
import Tmi from 'tmi.js'
import { Modal } from './components/Modal'

const client = new Tmi.Client({
  options: { debug: false },
  channels: ['afor_digital']
})

const chooseWord = () => {
  const index = Math.floor(Math.random() * WORDS.length)
  const word = WORDS[index]

  return word.toUpperCase()
}

const USER_LIFES = 6
const jsConfetti = new JSConfetti()

function App () {
  const [state, setState] = useState<string>(GAME_STATE.MENU)
  const [bannedUsers, setBannedUsers] = useState<string[]>(BLACK_USERS)
  const [writtenLetters, setWrittenLetters] = useState<string[]>([])
  const [chosenWord, setChosenWord] = useState<string>(chooseWord)
  const [lifes, setLifes] = useState<number>(USER_LIFES)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const reloadGame = () => {
    setChosenWord(chooseWord)
  }

  const hasWon = chosenWord
    .split('')
    .every(letter => writtenLetters.includes(letter))

  const hasLost = lifes === 0

  const isGameOver = hasLost || hasWon

  const addWrittenLetter = (letter: string) => {
    setWrittenLetters(prev => [...prev, letter])
  }

  useEffect(() => {
    client.connect()

    return () => {
      client.disconnect()
    }
  }, [])

  useEffect(() => {
    client.on('message', async (channel, userState, message) => {
      const { username } = userState

      if (!username || bannedUsers.includes(username)) {
        return
      }

      if (message.startsWith('!play ') && GAME_STATE.GAME && !isGameOver) {
        const letter = message.slice(6, 7).toUpperCase()
        const regex = /^[a-zA-ZñÑ]$/

        if (letter.match(regex) && !writtenLetters.includes(letter)) {
          addWrittenLetter(letter)
          validateLetter(letter, username)
        }
      }
    })

    return () => {
      client.removeAllListeners('message')
    }
  }, [writtenLetters, bannedUsers, hasWon, isGameOver])

  const updateGame = (state: string) => {
    setState(state)
  }

  useEffect(() => {
    if (hasWon) {
      jsConfetti.addConfetti({
        emojis: ['🧦'],
        confettiNumber: 200
      })
    }

    if (hasLost) {
      updateGame(GAME_STATE.RESULTS)
      setIsOpen(true)
      // setChosenWord(chooseWord)
      // setWrittenLetters([])
      // setLifes(USER_LIFES)
      // setBannedUsers(BLACK_USERS)
    }
  }, [hasWon, hasLost])

  const validateLetter = (letter: string, username: string) => {
    if (!chosenWord.includes(letter)) {
      setLifes(lifes => lifes - 1)
      setBannedUsers(users => [...users, username])
    }
  }

  return (
    <main className='w-screen min-h-screen h-screen flex flex-col py-20 text-white bg-[url(/imgs/bg.jpeg)] bg-cover font-inika'>
      {state === GAME_STATE.MENU ? (
        <div className='flex flex-col w-full items-center'>
          <img
            src='/imgs/title.png'
            alt='aforcado-title'
            className='w-full max-w-[800px]'
          />
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
        </div>
      ) : (
        <div className='pl-20 h-full flex flex-col justify-center'>
          <div className='flex gap-x-8'>
            <button
              onClick={() => updateGame(GAME_STATE.MENU)}
              className='bg-[#5491FF] hover:bg-[#6199FF] text-xl px-[20px] py-[4px] text-white border-2 border-black font-bold rounded-[8px]'
            >
              MENU
            </button>
            <button
              onClick={() => {
                setLifes(0)
                reloadGame()
              }}
              className='bg-[#D30040] hover:bg-[#F10049] w-fit text-xl px-[20px] py-[4px] text-white border-2 border-black font-bold rounded-[8px]'
            >
              TRY AGAIN
            </button>
          </div>

          <div className='flex-1 h-full flex gap-8 items-center'>
            {chosenWord.split('').map((letter, index) => (
              <div key={index} className='w-[100px] flex flex-col'>
                <span className='w-[100px] text-black text-center font-bold border-b-[16px] border-black text-[64px] capitalize'>
                  {writtenLetters.includes(letter) ? letter : '-'}
                </span>
              </div>
            ))}
          </div>

          {isOpen && (
            <Modal
              bannedUsers={bannedUsers}
              hasLost={hasLost}
              chosenWord={chosenWord}
            />
          )}

          <div className='grid grid-cols-8 gap-y-4'>
            {writtenLetters.map(letter => (
              <>
                {!chosenWord.includes(letter) && (
                  <div className='flex flex-col'>
                    <span
                      key={letter}
                      className='w-[75px] h-[75px] font-bold border-2 border-black rounded-md text-4xl bg-[#FF9C54] text-black flex items-center justify-center'
                    >
                      {letter}
                    </span>
                  </div>
                )}
              </>
            ))}
          </div>

          <div className='flex gap-x-6'>
            {bannedUsers.map(user => (
              <span className='px-8 py-2 text-black border-2 rounded-md bg-[#FFEE54]'>
                {user}
              </span>
            ))}
          </div>

          <div
            style={{
              background: `url('imgs/step-${USER_LIFES - lifes}.png')`
            }}
            className='w-[600px] h-[600px] absolute right-0 top-0 bottom-0'
          ></div>
        </div>
      )}
    </main>
  )
}

export default App
