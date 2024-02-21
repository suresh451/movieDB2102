import './index.css'

const CastCard = props => {
  const {castDetails} = props
  const {profileImage, originalName, characterName} = castDetails

  return (
    <li className="cast-card">
      <img
        src={`https://image.tmdb.org/t/p/w500/${profileImage}`}
        alt={originalName}
        className="popular-img"
      />
      <p className="character">{characterName}</p>
      <p className="original">{originalName}</p>
    </li>
  )
}

export default CastCard
