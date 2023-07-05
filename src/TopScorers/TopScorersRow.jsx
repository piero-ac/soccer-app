
export default function TopScorersRow(props) {
  const {player} = props;

  return (
    <div className="row border border-secondary border-2 rounded-1 my-1 py-1 d-flex align-items-center shadow-lg">
      <div className="col-2 col-sm-1 fw-bold">{player.rank}</div>
      <div className="col-5">{player.name}</div>
      <div className="d-none d-sm-block col-2"><img className="border border-secondary border-bottom rounded-1" src={player.photoURL} width="50px" height="auto" alt=""/></div>
      <div className="d-none d-md-block col-2">{player.totalGoals}</div>
      <div className="d-none d-md-block col-2">{player.totalAssists}</div>
      <div className="col-5 col-sm-4 d-md-none">{`${player.totalGoals} / ${player.totalAssists}`}</div>
    </div>
  )
}