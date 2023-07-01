export default function MatchScore(props) {
  const [month, day, year] = props.matchdate.split(' ');

  return (
    <div className="d-flex flex-column justify-content-center text-center flex-fill">
      <div className="m-0 lh-sm fw-bold">
        <div>{month}</div>
        <div>{day.substring(0,1)}</div>
        <div>{year}</div>
      </div>
      <div className="m-0 fs-4">{props.homeTeamScore}-{props.awayTeamScore}</div>
    </div>
  );
}