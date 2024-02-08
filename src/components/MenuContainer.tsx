import { GAME_STATE } from '../constants'

type Props = {
  updateGame: (state: string) => void
}

export const MenuContainer = (props: Props) => {
  const { updateGame } = props

  return (
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
        <button
          onClick={() => updateGame(GAME_STATE.OPTIONS)}
          className='bg-[#D30040] hover:bg-[#F10049] w-fit text-3xl px-[75px] py-[15px] text-white border-4 border-black font-bold rounded-[12px] -rotate-1'
        >
          OPTIONS
        </button>
      </div>
    </div>
  )
}
