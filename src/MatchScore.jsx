export default function MatchScore(props) {
  return (
    <div className="col-3 align-self-center match-score">
      <p className="score">{props.homeTeamScore}-{props.awayTeamScore}</p>
      <p className="date">{props.matchdate}</p>
    </div>
  );
}