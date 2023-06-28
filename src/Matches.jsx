import { useState, useEffect } from "react";
import Match from "./Match";
import MatchTeam from './MatchTeam';
import MatchScore from './MatchScore';
import useRapidAPI from "./hooks/use-rapidapi";

export default function Matches(props) {
  const league = props.league, season = props.season;
  const [currentMatchday, setCurrentMatchday] = useState('Regular Season - 1');
  const [matchesData, setMatchesData] = useState([]);
  const [leagueRoundsData, setLeagueRoundsData] = useState([]);
  const {loading, error, sendRequest: fetchData} = useRapidAPI();

  useEffect(() => {
    const matchesKey = `leaguematches-l=${league}-s=${season}`;
    const roundsKey = `leaguerounds-l=${league}-s=${season}`;

    const savedMatchesData = localStorage.getItem(matchesKey);
    const savedRoundsData = localStorage.getItem(roundsKey);

    if(savedMatchesData) {
      console.log("Using cached matches and rounds data");
      setMatchesData(JSON.parse(savedMatchesData));
      setLeagueRoundsData(JSON.parse(savedRoundsData));
    } else {
      const parseMatchesData = (dataObj) => {
        const data = dataObj.response;
        const parsedData = [];

        for(let match of data){
          parsedData.push({
            round: match.league.round,
            date: new Date(match.fixture.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            id: match.fixture.id,
            homeTeam: { logo: match.teams.home.logo, name: match.teams.home.name},
            awayTeam: { logo: match.teams.away.logo, name: match.teams.away.name},
            score: { home: match.score.fulltime.home, away: match.score.fulltime.away }
          })
        }
        localStorage.setItem(matchesKey, JSON.stringify(parsedData));
        setMatchesData(parsedData);
      };

      const parseRoundsData = (dataObj) => {
        const data = dataObj.response;
        localStorage.setItem(roundsKey,JSON.stringify(data));
        setLeagueRoundsData(data);
      };

      console.log("Fetching new matches and rounds data");
      fetchData(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${league}&season=${season}`, parseMatchesData);
      fetchData(`https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=${league}&season=${season}`, parseRoundsData);
    }

  }, [league, season, fetchData]);

  const filteredMatches = matchesData.filter(match => match.round === currentMatchday);
  let content = '';

  if(filteredMatches.length > 0) {
    content = (
      <div className="container text-center w-75 p-3">
        {filteredMatches.length !== 0 && filteredMatches.map(match => {
          return (
            <Match key={match.id} >
              <MatchTeam
                teamLogo={match.homeTeam.logo}
                teamName={match.homeTeam.name}
              />
              <MatchScore
                homeTeamScore={match.score.home}
                awayTeamScore={match.score.away}
                matchdate={match.date}
              />
              <MatchTeam
                teamLogo={match.awayTeam.logo}
                teamName={match.awayTeam.name}
              />
            </Match>
          );
        })}
      </div>
    );
  }

  if(loading) {
    content = <div>Loading...</div>
  }

  if(error) {
    content = <div>Something went wrong...</div>
  }
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
      {content}
    </>
  );
}