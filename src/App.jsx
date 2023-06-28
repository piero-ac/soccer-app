import { useState } from 'react'
import './App.css';
import TopScorers from './TopScorers';
import LeagueTable from './LeagueTable';
import Matches from './Matches';
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

  return (
    <LeagueSeasonContext.Provider value={{
      league: leagueData.league, 
      season: leagueData.season, 
      leagueChangeHandler, 
      seasonChangeHandler
    }}>

      <header>
        {!isChangingLeague && <h1 onClick={() => setIsChangingLeague(true)} >{leagueMappings[leagueData.league]}</h1>}
        {isChangingLeague && 
        <SelectForm
            formId={"league-form"}
            for={"league"}
            selectName={"league-select"}
            selectId={"league-select"}    
           />


        }
        {isChangingLeagueSeason &&
        <SelectForm
        formId={"league-season-form"}
        for={"season"}
        selectName={"league-season-select"}
        selectId={"league-season-select"}    
       />
        }
        {!isChangingLeagueSeason && <h3 onClick={() => setIsChangingLeagueSeason(true)}>{`${leagueData.season}-${Number(leagueData.season) + 1}`}</h3>}
        <Navbar activeTab={selectedTab} onTabClick={tabSelectionHandler} />
      </header>
      <div className='main-content'>
        {selectedTab === 'top-scorers' && <TopScorers />}
        {selectedTab === 'table' && <LeagueTable />}
        {selectedTab === 'matches' && <Matches />}
      </div>
    </LeagueSeasonContext.Provider>
  )
}

export default App
