import { GAME_STATE } from '../constants'
import { Button } from './common/Button'

type Props = {
  updateGame: (state: string) => void
  reloadGame: () => void
}

export const GameMenu = (props: Props) => {
  const { updateGame, reloadGame } = props

  return (
    <div className='flex gap-x-8'>
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
    </div>
  )
}
