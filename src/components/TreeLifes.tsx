export const TreeLifes = ({
  USER_LIFES,
  lifes
}: {
  USER_LIFES: number
  lifes: number
}) => {
  return (
    <div
      style={{
        background: `url('imgs/step-${USER_LIFES - lifes}.png')`
      }}
      className='w-[600px] h-[600px] absolute right-0 top-0 bottom-0'
    ></div>
  )
}
