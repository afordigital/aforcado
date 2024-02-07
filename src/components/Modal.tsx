type Props = {
  bannedUsers: string[]
  hasLost: boolean
  chosenWord: string
}

export const Modal = (props: Props) => {
  const { bannedUsers, hasLost, chosenWord } = props

  return (
    <dialog open className='w-[500px] h-[500px] bg-white text-black text-xl'>
      <h1 className='flex w-full text-4xl justify-center font-bold'>
        {hasLost ? 'HAS PERDIDO TRONCHO' : '¡HAS GANADO!'}
      </h1>
      <p className='text-[42px]'>
        La palabra era{' '}
        <span className='text-[72px] font-bold'>{chosenWord}</span>
      </p>
      <p>Los más tronchos:</p>
      <ul>
        {bannedUsers.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </dialog>
  )
}
