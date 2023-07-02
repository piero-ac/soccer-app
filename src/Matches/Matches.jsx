import { useState, useEffect, useContext } from "react";
import Match from "./Match";
import MatchTeam from './MatchTeam';
import MatchScore from './MatchScore';
import useRapidAPI from "../hooks/use-rapidapi";
import LeagueSeasonContext from "../store/league_season-context";
import MatchdaySelectForm from "./MatchdaySelectForm";
import Container from "../UI/Container";

export default function Matches(props) {
  const {league, season} = useContext(LeagueSeasonContext);
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

  const filteredMatches = matchesData.filter(match => match.round === currentMatchday).sort((a,b) => {
    return new Date(a.date) - new Date(b.date);
  });
  let content = '';

  if(filteredMatches.length > 0) {
    content = (
      <Container maxWidth="md">
        <div className="row my-3 d-flex justify-content-around">
          {filteredMatches.length !== 0 && filteredMatches.map(match => {
            const title = `${match.homeTeam.name} vs ${match.awayTeam.name}`;
            return (
              <Match key={match.id}  matchId={match.id} title={title}>
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
      </Container>
    );
  }

  if(loading) {
    content = (
      <Container maxWidth="md">
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
        
      </Container>
    );
  }

  if(error) {
    content = (
      <Container maxWidth="md">
        <div className="text-center">Something went wrong...</div>
      </Container>
    );
  }
  return (
    <>
      <Container maxWidth="sm">
        <MatchdaySelectForm 
          leagueRoundsData={leagueRoundsData} 
          onChangeHandler={(e) => setCurrentMatchday(e.target.value)}
        />
      </Container>
      <Container maxWidth="md">
        {content}
      </Container>
      
    </>
  );
}