
export default function MatchEventRow(props) {
  const {matchEvent} = props;

  const time = `${matchEvent.time.elapsed}' ${matchEvent.time.extra ? '+ ' + matchEvent.time.extra : ''}`;
  let info = '';
  let eventType = matchEvent.type === 'Card' ? matchEvent.detail : matchEvent.type;

  if(matchEvent.type === 'Card') {
    info = matchEvent.player.name;
  } else if (matchEvent.type === 'Goal'){
    info = (<>
      <p className='m-0'>Scorer: {matchEvent.player.name}</p>
      {matchEvent.assist.name && <p className='m-0'>Assist: {matchEvent.assist.name}</p>}
    </>);
  } else if (matchEvent.type == 'Var'){
    info = (<p className='m-0'>{matchEvent.detail}</p>);
  } else if (matchEvent.type == "Substitution"){
    info = (<>
      <p className='m-0'>Out: {matchEvent.player.name}</p>
      <p className='m-0'>In: {matchEvent.assist.name}</p>
    </>);
  }

  return (
    <div className="row text-center mb-2 border-bottom border-2 d-flex align-items-center">
      <div className="col-4 col-md-2">{time}</div>
      <div className="col-4 col-md-2"><img width="40px" height="40px" src={matchEvent.team.logo} alt=""/></div>
      <div className="col-4 col-md-3">{eventType}</div>
      <div className="d-none d-md-block col-md-5">{info}</div>
    </div>
  )
}