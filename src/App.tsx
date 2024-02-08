import { useState } from 'react'
import { GAME_STATE } from './constants'
import { MenuContainer } from './components/MenuContainer'
import { GameContainer } from './components/GameContainer'
import { OptionsContainer } from './components/OptionsContainer'

function App () {
  const [state, setState] = useState<string>(GAME_STATE.MENU)

  const updateGame = (state: string) => {
    setState(state)
  }

  return (
    <main className='w-screen min-h-screen h-screen flex flex-col py-20 text-white bg-[url(/imgs/bg.jpeg)] bg-cover font-inika'>
      {state === GAME_STATE.MENU && <MenuContainer updateGame={updateGame} />}
      {state === GAME_STATE.GAME && <GameContainer updateGame={updateGame} />}
      {state === GAME_STATE.OPTIONS && (
        <OptionsContainer updateGame={updateGame} />
      )}
    </main>
  )
}

export default App
