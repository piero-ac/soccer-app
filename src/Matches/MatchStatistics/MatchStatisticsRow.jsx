
export default function MatchStatisticsRow(props) {
  const {matchStat} = props;
  const total = matchStat.hVal + matchStat.aVal;
  const team1Percentage = Math.floor((matchStat.hVal / total)* 100);
  const team2Percentage = Math.floor((matchStat.aVal / total)* 100);

  return (
    <div className="text-center border-primary border-bottom border-2 mb-1">
      <p className="mb-0">{matchStat.type}</p>
      <div className="d-flex justify-content-around align-items-center">
        <div>{matchStat.hVal}</div>
        <div className="progress" style={{minWidth: "35%", transform: "rotate(180deg)"}} role="progressbar" aria-label="Team 1 Stat" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
        <div className="progress-bar progress-bar-striped progress-bar-animated" 
          style={{width: matchStat.type === 'Passes %' || matchStat.type === 'Ball Possession' ? matchStat.hVal : `${team1Percentage}%`}}></div>
        </div>
        <div className="progress" style={{minWidth: "35%"}} role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
        <div className="progress-bar bg-info progress-bar-striped progress-bar-animated" 
          style={{width: matchStat.type === 'Passes %'|| matchStat.type === 'Ball Possession' ? matchStat.aVal : `${team2Percentage}%`}}></div>
        </div>
        <div>{matchStat.aVal}</div>
      </div>
    </div>
  )
}