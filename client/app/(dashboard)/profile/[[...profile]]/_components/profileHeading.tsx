interface ProfileHeadingProps {
  title: string
}

const ProfileHeading = ({ title }: ProfileHeadingProps) => {
  return <h1 className="mb-4 text-lg font-bold">{title}</h1>
}

export default ProfileHeading
