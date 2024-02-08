type Props = {
  writtenLetters: string[]
  chosenWord: string
}

export const WrittenLetters = (props: Props) => {
  const { writtenLetters, chosenWord } = props

  return (
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
  )
}
