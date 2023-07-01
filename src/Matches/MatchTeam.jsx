export default function MatchTeam(props) {
  return (
    <div className="match-team d-flex flex-column align-items-center text-bg-primary rounded-3 my-1">
      <img width="50px" height="50px" src={props.teamLogo} />
      <p className="mt-1 mb-0 flex-fill text-center fw-bold" style={{fontSize: '0.8rem'}}>{props.teamName}</p>
    </div>
  )
}