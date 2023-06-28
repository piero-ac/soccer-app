import { useContext } from "react";
import LeagueSeasonContext from "./store/league_season-context";

const leagueSelectOptions = [
  {value: '39', text: 'Premier League'},
  {value: '135', text: 'Serie A'},
  {value: '61', text:'Ligue 1'},
  {value: '140', text: 'La Liga'},
  {value: '78', text: 'Bundesliga'}
]

const seasonSelectOptions = [
  {value: '2022', text: '2022-2023'},
  {value: '2021', text: '2021-2022'},
  {value: '2020', text:'2020-2021'},           
]

export default function SelectForm(props){
  const {league, season, leagueChangeHandler, seasonChangeHandler} = useContext(LeagueSeasonContext);
  const defaultValue = props.for === 'league' ? league : season;
  const options = props.for === 'league' ? leagueSelectOptions : seasonSelectOptions;
  const onChangeHandler = props.for === 'league' ? leagueChangeHandler : seasonChangeHandler;
  
  return (
    <form id={props.formId}>
      <select 
        defaultValue={defaultValue }
        name={props.selectName} 
        id={props.selectId} 
        onChange={(e) => onChangeHandler(e.target.value)}>
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>{option.text}</option>
          )
        })}
      </select>
    </form>
  )
}