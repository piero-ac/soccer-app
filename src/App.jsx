import { useState } from 'react'
import './App.css';
import TopScorers from './TopScorers';
import LeagueTable from './LeagueTable';
import Matches from './Matches';
import Navbar from './Navbar';

function App() {
  const [leagueData, setLeagueData] = useState({ league: '39', season: '2022' });
  const [isChangingLeagueSeason, setIsChangingLeagueSeason] = useState(false);
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

  return (
    <>
      <header>
        <h1>Premier League</h1>
        {isChangingLeagueSeason &&
          <form id="league-season-form">
            <select defaultValue={leagueData.season} name="" id="" onChange={(e) => leagueSeasonChangeHandler(e.target.value)}>
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
