type Props = {
  writtenLetters: string[]
  chosenWord: string
  bannedUsers: string[]
}

export const WrittenLetters = (props: Props) => {
  const { writtenLetters, chosenWord, bannedUsers } = props

  return (
    <div className='grid grid-cols-8 gap-y-4 justify-start'>
      {writtenLetters
        .filter(letter => !chosenWord.includes(letter))
        .map((letter, index) => (
          <div key={index} className='flex flex-col gap-y-4 items-center'>
            <p className='bg-[#FFBB54] w-fit px-4 text-black rounded-md border-2 border-black'>
              {bannedUsers[index]}
            </p>
            <div className='flex flex-col'>
              <span
                key={letter}
                className='w-[75px] h-[75px] font-bold border-2 border-black rounded-md text-4xl bg-[#FF9C54] text-black flex items-center justify-center'
              >
                {letter}
              </span>
            </div>
          </div>
        ))}
    </div>
  )
}
