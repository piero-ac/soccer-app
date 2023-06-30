import RedCircle from '../assets/red-circle.svg';
import YellowCircle from '../assets/yellow-circle.svg';
import GreenCircle from '../assets/green-circle.svg';

export default function LeagueTableLegend() {
  return (
    <div className="d-none d-md-flex row">
      <div className="col text-center p-0"><img src={GreenCircle} alt="" width="10px" height="auto" /><br />Win</div>
      <div className="col text-center p-0"><img src={RedCircle} alt="" width="10px" height="auto" /><br />Loss</div> 
      <div className="col text-center p-0"><img src={YellowCircle} alt="" width="10px" height="auto" /><br />Draw</div>
    </div>
  )
}