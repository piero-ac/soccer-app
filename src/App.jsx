import { useState } from 'react'
import './App.css';
import TopScorers from './TopScorers';
import LeagueTable from './LeagueTable';
import Matches from './Matches';
import Navbar from './Navbar';

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

  function leagueSeasonChangeHandler(season) {
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
    <>
      <header>
        {!isChangingLeague && <h1 onClick={() => setIsChangingLeague(true)} >{leagueMappings[leagueData.league]}</h1>}
        {isChangingLeague &&
          <form id="league-form">
            <select defaultValue={leagueData.league} name="league-select" id="league-select" onChange={(e) => leagueChangeHandler(e.target.value)}>
              <option value="39">Premier League</option>
              <option value="135">Serie A</option>
              <option value="61">Ligue 1</option>
              <option value="140">La Liga</option>
              <option value="78">Bundesliga</option>
            </select>
          </form>
        }
        {isChangingLeagueSeason &&
          <form id="league-season-form">
            <select defaultValue={leagueData.season} name="league-season-select" id="league-season-select" onChange={(e) => leagueSeasonChangeHandler(e.target.value)}>
              <option value="2022">2022-2023</option>
              <option value="2021">2021-2022</option>
              <option value="2020">2020-2021</option>
            </select>
          </form>
        }
        {!isChangingLeagueSeason && <h3 onClick={() => setIsChangingLeagueSeason(true)}>{`${leagueData.season}-${Number(leagueData.season) + 1}`}</h3>}
        <Navbar activeTab={selectedTab} onTabClick={tabSelectionHandler} />
      </header>
      <div className='main-content'>
        {selectedTab === 'top-scorers' && <TopScorers league={leagueData.league} season={leagueData.season} />}
        {selectedTab === 'table' && <LeagueTable league={leagueData.league} season={leagueData.season} />}
        {selectedTab === 'matches' && <Matches league={leagueData.league} season={leagueData.season} />}
      </div>
    </>
  )
}

export default App
