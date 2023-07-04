export default function MatchTeam(props) {
  return (
    <div className="match-team text-bg-primary rounded-3 my-1">
      <div className="h-50 text-center"><img width="50px" height="50px" src={props.teamLogo} /></div>
      <div className="mt-1 mb-0 flex-fill text-center fw-bold h-50 d-flex align-items-center justify-content-center" style={{fontSize: '0.8rem'}}>
        {props.teamName} </div>
    </div>
  )
}