type Props = {
  onClick: () => void
  children: React.ReactNode
  bgColor: string
  hoverColor: string
}

export const Button = (props: Props) => {
  const { onClick, children, bgColor, hoverColor } = props

  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${hoverColor} cursor-pointer text-xl px-[20px] py-[4px] text-white border-2 border-black font-bold rounded-[8px]`}
    >
      {children}
    </button>
  )
}
