type Props = {
  chosenWord: string
  writtenLetters: string[]
}

export const WordSection = (props: Props) => {
  const { chosenWord, writtenLetters } = props

  return (
    <div className='flex-1 h-full flex gap-8 items-center'>
      {chosenWord.split('').map((letter, index) => (
        <div key={index} className='w-[100px] flex flex-col'>
          <span className='w-[100px] text-black text-center font-bold border-b-[16px] border-black text-[64px] capitalize'>
            {writtenLetters.includes(letter) ? letter : '-'}
          </span>
        </div>
      ))}
    </div>
  )
}
