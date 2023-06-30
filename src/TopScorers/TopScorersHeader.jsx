import PersonIcon from "../assets/person.svg";


export default function TopScorersHeader() {
  return (
    <div className="row text-bg-primary rounded-1 text-center p-1 fw-bold">
      <div className="col-2 col-sm-1">#</div>
      <div className="col-5">Name</div>
      <div className="d-none d-sm-block col-2"><img className="bg-light rounded-1" src={PersonIcon} width="25px" height="auto" alt=""/></div>
      <div className="d-none d-md-block col-2">Goals</div>
      <div className="d-none d-md-block col-2">Assists</div>
      <div className="col-5 col-sm-4 d-md-none">G / A</div>
    </div>
  )
}