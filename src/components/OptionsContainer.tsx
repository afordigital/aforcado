import { GAME_STATE } from '../constants'
import { Button } from './common/Button'

type Props = {
  updateGame: (state: string) => void
}

export const OptionsContainer = (props: Props) => {
  const { updateGame } = props

  return (
    <div>
      <Button
        children='MENÚ'
        bgColor='bg-[#5491FF]'
        hoverColor='hover:bg-[#6199FF]'
        onClick={() => updateGame(GAME_STATE.MENU)}
      />
    </div>
  )
}
