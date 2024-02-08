import { GAME_STATE } from '../constants'
import { Button } from './common/Button'
import { X } from 'lucide-react'

type Props = {
  bannedUsers: string[]
  guessUsers: string[]
  hasLost: boolean
  chosenWord: string
  updateGame: (state: string) => void
  reloadGame: () => void
  closeModal: () => void
  winner: string | null
}

export const Modal = (props: Props) => {
  const {
    bannedUsers,
    guessUsers,
    hasLost,
    chosenWord,
    updateGame,
    reloadGame,
    closeModal,
    winner
  } = props

  return (
    <dialog
      open
      className='bg-[#FFBB54] z-5 flex flex-col px-20 gap-y-8 border-2 border-black rounded-lg text-black text-xl'
    >
      <header className='flex'>
        <h1 className='flex w-full text-6xl justify-center font-bold'>
          {hasLost ? 'HAS PERDIDO TRONCHO' : '¡HAS GANADO!'}
        </h1>
        <X onClick={closeModal} />
      </header>
      <p className='text-2xl'>
        La palabra era <span className='text-4xl font-bold'>{chosenWord}</span>
      </p>
      {winner && (
        <p className='text-2xl'>
          EL GANADOR ES <span className='text-3xl font-bold'>{winner}</span>
        </p>
      )}

      <article className='grid grid-cols-2 gap-x-8'>
        <div>
          <p>Los más tronchos:</p>
          <ul>
            {bannedUsers.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
        <div>
          <p>Los menos tronchos:</p>
          <ul>
            {guessUsers.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      </article>

      <footer className='flex gap-x-4 justify-center'>
        <Button
          children='MENÚ'
          bgColor='bg-[#5491FF]'
          hoverColor='hover:bg-[#6199FF]'
          onClick={() => updateGame(GAME_STATE.MENU)}
        />
        <Button
          children='TRY AGAIN'
          bgColor='bg-[#D30040]'
          hoverColor='hover:bg-[#F10049]'
          onClick={reloadGame}
        />
      </footer>
    </dialog>
  )
}
