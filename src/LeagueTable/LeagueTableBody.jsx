import LeagueTableRow from "./LeagueTableRow";
import LeagueTablePlaceholder from "./LeagueTablePlaceholder";

export default function LeagueTableBody(props) {

  if(props.error) {
    return (<h5>Something went wrong...</h5>);
  }

  if(props.loading) {
    let placeHolderContent = [];
    for(let i = 0; i < 20; i++){
      placeHolderContent.push(<LeagueTablePlaceholder key={Math.random()}/>);
    }
    return placeHolderContent;
  }

  return (
    <div id="table-body" className="text-center">
      {props.standings.map(team => {
        return <LeagueTableRow key={team.teamId} team={team} />
      })}
     
		</div>
  )
}