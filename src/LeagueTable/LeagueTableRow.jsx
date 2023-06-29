import TeamForm from "./TeamForm";

export default function LeagueTableRow(props) {
  
  const {team} = props;
  let rowClasses = "row mt-1 border rounded-1 p-1 ";
  if (team.teamRank === 1) rowClasses += "bg-success-subtle";
  else if (team.teamRank >= 2 && team.teamRank <= 17) rowClasses+= "bg-secondary-subtle";
  else rowClasses += "bg-danger-subtle";

  return (
    <div className={rowClasses} >
      <div className="col-5 col-md-3 d-flex px-0">
        <span className="text-dark fw-bold pe-1">{team.teamRank}</span>
        <span><img src={team.teamLogo} alt="" width="30px" height="auto"/></span>
        <span className="flex-fill">{team.teamName}</span>
      </div>
			<div className="col col-md-1">{team.totalGamesPlayed}</div>
			<div className="col col-md-1">{team.totalGamesWon}</div>
			<div className="col col-md-1">{team.totalGamesDraw}</div>
			<div className="col col-md-1">{team.totalGamesLose}</div>
			<div className="d-none d-md-block col-md-1">{team.totalGoalsFor}</div>
			<div className="d-none d-md-block col-md-1">{team.totalGoalsAgainst}</div>
			<div className="d-none d-md-block col-md-1">{team.totalGoalsDiff}</div>
			<div className="col col-md-1">{team.totalPoints}</div>
			<div className="d-none d-md-block col-md-1 p-0"><TeamForm form={team.teamForm.split("")} /></div>
    </div>
  )
  
}