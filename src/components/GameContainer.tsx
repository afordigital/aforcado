import JSConfetti from 'js-confetti'
import { useEffect, useState } from 'react'
import { BLACK_USERS, GAME_STATE, WORDS } from '../constants'
import Tmi from 'tmi.js'
import { Modal } from './Modal'
import { GameMenu } from './GameMenu'
import { WordSection } from './WordSection'
import { TreeLifes } from './TreeLifes'
import { WrittenLetters } from './WrittenLetters'
import { BannedUsers } from './BannedUsers'

type Props = {
  updateGame: (state: string) => void
}

const USER_LIFES = 6

const client = new Tmi.Client({
  options: { debug: false },
  channels: ['afor_digital']
})

const chooseWord = () => {
  const index = Math.floor(Math.random() * WORDS.length)
  const word = WORDS[index]

  return word.toUpperCase()
}

const jsConfetti = new JSConfetti()

export const GameContainer = (props: Props) => {
  const { updateGame } = props

  const [writtenLetters, setWrittenLetters] = useState<string[]>([])
  const [chosenWord, setChosenWord] = useState<string>(chooseWord)
  const [bannedUsers, setBannedUsers] = useState<string[]>(BLACK_USERS)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [lifes, setLifes] = useState<number>(USER_LIFES)

  const hasWon = chosenWord
    .split('')
    .every(letter => writtenLetters.includes(letter))

  const hasLost = lifes === 0

  const isGameOver = hasLost || hasWon

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

  const validateLetter = (letter: string, username: string) => {
    if (!chosenWord.includes(letter)) {
      setLifes(lifes => lifes - 1)
      setBannedUsers(users => [...users, username])
    }
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
    }
  }, [hasWon, hasLost])

  const addWrittenLetter = (letter: string) => {
    setWrittenLetters(prev => [...prev, letter])
  }

  const reestartGame = () => {
    setChosenWord(chooseWord)
    setWrittenLetters([])
    setLifes(USER_LIFES)
    setBannedUsers(BLACK_USERS)
    updateGame(GAME_STATE.GAME)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div className='pl-20 h-full flex flex-col justify-center'>
      <GameMenu updateGame={updateGame} reloadGame={reestartGame} />

      <WordSection chosenWord={chosenWord} writtenLetters={writtenLetters} />

      {isOpen && (
        <Modal
          bannedUsers={bannedUsers}
          hasLost={hasLost}
          chosenWord={chosenWord}
          updateGame={() => updateGame(GAME_STATE.MENU)}
          reloadGame={reestartGame}
          closeModal={closeModal}
        />
      )}

      <WrittenLetters writtenLetters={writtenLetters} chosenWord={chosenWord} />

      <BannedUsers bannedUsers={bannedUsers} />

      <TreeLifes USER_LIFES={USER_LIFES} lifes={lifes} />
    </div>
  )
}
