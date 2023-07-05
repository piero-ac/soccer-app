import { useState } from 'react'
import './App.css';
import TopScorers from './TopScorers/TopScorers';
import LeagueTable from './LeagueTable/LeagueTable';
import Matches from './Matches/Matches';
import Navbar from './Navbar';
import SelectForm from './SelectForm';
import LeagueSeasonContext from './store/league_season-context';

const leagueMappings = {
  '39': 'Premier League',
  '135': 'Serie A',
  '61': 'Ligue 1',
  '140': 'La Liga',
  '78': 'Bundesliga'
}

function App() {
  const [leagueData, setLeagueData] = useState({ league: '39', season: '2022' });
  const [isChangingLeagueSeason, setIsChangingLeagueSeason] = useState(false);
  const [isChangingLeague, setIsChangingLeague] = useState(false);
  const [selectedTab, setSelectedTab] = useState('table');

  function tabSelectionHandler(tab) {
    setSelectedTab(tab);
  }

  function seasonChangeHandler(season) {
    console.log(season);
    setLeagueData((prevState) => {
      return { ...prevState, season }
    });
    setIsChangingLeagueSeason(false);
  }

  function leagueChangeHandler(league) {
    console.log(league);
    setLeagueData((prevState) => {
      return { ...prevState, league }
    });
    setIsChangingLeague(false);
  }

  // Decide forms to display
  let leagueDisplayContent = "";
  if(isChangingLeague) {
    leagueDisplayContent = <SelectForm
      formId={"league-form"}
      for={"league"}
      selectName={"league-select"}
      selectId={"league-select"}    
    />
  } else {
    leagueDisplayContent = <h1 
      onClick={() => {
        setIsChangingLeague(true);
        setIsChangingLeagueSeason(false);
      }} >
      {leagueMappings[leagueData.league]}
    </h1>
  }

  let seasonDisplayContent = "";
  if(isChangingLeagueSeason) {
    seasonDisplayContent = 
    <SelectForm
      formId={"league-season-form"}
      for={"season"}
      selectName={"league-season-select"}
      selectId={"league-season-select"}    
    />
  } else {
    seasonDisplayContent = <h3 
      onClick={() => {
        setIsChangingLeagueSeason(true);
        setIsChangingLeague(false);
      }}>
      {`${leagueData.season}-${Number(leagueData.season) + 1}`}
    </h3>
  }

  // Decide tab info to display
  let mainContent = "";
  switch(selectedTab){
    case 'top-scorers':
      mainContent = <TopScorers />
      break;
    case 'table':
      mainContent = <LeagueTable />
      break;
    case 'matches' :
      mainContent =  <Matches />
      break;
    default:
      mainContent = <LeagueTable />
  }

  return (
    <LeagueSeasonContext.Provider value={{
      league: leagueData.league, 
      season: leagueData.season, 
      leagueChangeHandler, 
      seasonChangeHandler
    }}>

      <header>
        {leagueDisplayContent}
        {seasonDisplayContent}
        <Navbar activeTab={selectedTab} onTabClick={tabSelectionHandler} />
      </header>
      <div className="container-fluid mt-2 my-3">{mainContent}</div>
    </LeagueSeasonContext.Provider>
  )
}

export default App
