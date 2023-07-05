
export default function MatchdaySelectForm(props) {

  return (
    <div className="form-container w-100 d-flex justify-content-center">
      <div className="select-container d-flex justify-content-center">
      <select 
        name="league-round" 
        id="league-round" 
        className="form-select text-center shadow text-bg-primary" 
        onChange={props.onChangeHandler}>
        {props.leagueRoundsData.length > 0 && props.leagueRoundsData.map((round, index) => {
          return (<option key={`r${index + 1}`} value={round}>{round}</option>);
        })}
      </select>
      </div>
          
    </div>
  )
}