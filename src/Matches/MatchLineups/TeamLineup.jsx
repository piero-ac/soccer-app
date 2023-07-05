
export default function TeamLineup(props){
  const {teamLineup} = props;
  return (
    <div className="col-12 col-md-6">
      <div className='ps-1 py-1 text-uppercase fw-bold row'>
        <div className="col-7">
          <div className="">{teamLineup.team.name}</div>
          <div className="text-secondary">{teamLineup.formation}</div>
        </div>
        <div className="col-5 text-end">
          <span className="col-6 col-md-2"><img width="40px" height="40px" src={teamLineup.team.logo} alt="" /></span>
        </div>
      </div>
      <div className='bg-secondary-subtle ps-3 border-top border-bottom border-dark-subtle fw-bold'>
        COACH
      </div>
      <div className='row'>
        <div className="col-3"></div>
        <div className="col-9">{teamLineup.coach.name}</div>
      </div>
      <div className='bg-secondary-subtle ps-3 border-top border-bottom border-dark-subtle fw-bold'>
        STARTING XI
      </div>
      <div className='ps-3 pe-3 mb-1'>
        {teamLineup.startXI.map(p => {
          const { player } = p;
          return (
            <div key={player.id} className="row border-bottom border-dark-subtle">
              <div className="col-3 text-center text-secondary fw-bold">{player.number}</div>
              <div className="col-9">{player.name}</div>
            </div>
          )
        })}
      </div>
      <div className='bg-secondary-subtle ps-3 border-top border-bottom border-dark-subtle fw-bold'>
        SUBSTITUTES
      </div>
      <div className='ps-3 pe-3 mb-1'>
        {teamLineup.substitutes.map(p => {
          const { player } = p;
          return (
            <div key={player.id} className="row border-bottom border-dark-subtle">
              <div className="col-3 text-center text-secondary fw-bold">{player.number}</div>
              <div className="col-9">{player.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
}