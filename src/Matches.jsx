import { useState, useEffect } from "react";
import Match from "./Match";
import MatchTeam from './MatchTeam';
import MatchScore from './MatchScore';

export default function Matches(props) {
  const league = props.league, season = props.season;
  const [currentMatchday, setCurrentMatchday] = useState('Regular Season - 1');
  const [matchesData, setMatchesData] = useState([]);
  const [leagueRoundsData, setLeagueRoundsData] = useState([]);

  useEffect(() => {
    const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
    const matchesKey = `leaguematches-l=${league}-s=${season}`;
    const roundsKey = `leaguerounds-l=${league}-s=${season}`;

    const fetchLeagueRoundsAndMatchesData = async (endpoint, key, setData) => {
      let storedData = localStorage.getItem(key);

      if (storedData) {
        setData(JSON.parse(storedData));
        console.log('Using cached data');
      } else {
        const url = `https://api-football-v1.p.rapidapi.com/v3/${endpoint}?league=${league}&season=${season}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
          }
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          localStorage.setItem(key, JSON.stringify(result.response));
          setData(result.response);
          console.log('New data requested');
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchLeagueRoundsAndMatchesData('fixtures', matchesKey, setMatchesData);
    fetchLeagueRoundsAndMatchesData('fixtures/rounds', roundsKey, setLeagueRoundsData);
  }, [league, season]);

  const filteredMatches = matchesData.filter(match => match.league.round === currentMatchday);

  return (
    <>
      <div className="form-container">
        <form>
          <select name="league-round" id="league-round" onChange={(e) => setCurrentMatchday(e.target.value)}>
            {leagueRoundsData.length > 0 && leagueRoundsData.map((round, index) => {
              return (<option key={`r${index + 1}`} value={round}>{round}</option>);
            })}
          </select>
        </form>
      </div>
      <div className="container text-center w-50 p-3">
        {filteredMatches.length !== 0 && filteredMatches.map(match => {
          const dateObj = new Date(match.fixture.date);
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const formattedDate = dateObj.toLocaleDateString('en-US', options);

          return (
            <Match key={match.fixture.id} >
              <MatchTeam
                teamLogo={match.teams.home.logo}
                teamName={match.teams.home.name}
              />
              <MatchScore
                homeTeamScore={match.score.fulltime.home}
                awayTeamScore={match.score.fulltime.away}
                matchdate={formattedDate}
              />
              <MatchTeam
                teamLogo={match.teams.away.logo}
                teamName={match.teams.away.name}
              />
            </Match>
          );
        })}
      </div>
    </>

  );
}