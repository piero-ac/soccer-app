export default function MatchTeam(props) {
  return (
    <div className="col-4 align-self-center match-team">
      <div width="50px" height="50px">
        <img width="50px" height="50px" src={props.teamLogo} />
      </div>
      <p>{props.teamName}</p>
    </div>
  )
}