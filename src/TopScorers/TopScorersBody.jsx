import TopScorersRow from "./TopScorersRow";
import TopScorersPlaceholder from "./TopScorersPlaceholder";

export default function TopScorersBody(props){
  if(props.error) {
    return (<h5>Something went wrong...</h5>);
  }

  if(props.loading) {
    let placeHolderContent = [];
    for(let i = 0; i < 20; i++){
      placeHolderContent.push(<TopScorersPlaceholder key={Math.random()}/>);
    }
    return placeHolderContent;
  }
  return (
    <div className="text-center">
      {props.topScorersData.map(player => {
        return (
          <TopScorersRow key={player.id} player={player}/>
        )
      })}    
  </div>
  )
}