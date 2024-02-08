type Props = {
  bannedUsers: string[]
}

export const BannedUsers = (props: Props) => {
  const { bannedUsers } = props

  return (
    <div className='flex gap-x-6'>
      {bannedUsers.map(user => (
        <span className='px-8 py-2 text-black border-2 rounded-md bg-[#FFEE54]'>
          {user}
        </span>
      ))}
    </div>
  )
}
