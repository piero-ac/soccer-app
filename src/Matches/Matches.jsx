import { useState, useEffect, useContext } from "react";
import Match from "./Match/Match";
import MatchTeam from "./Match/MatchTeam";
import MatchScore from "./Match/MatchScore";
// import useRapidAPI from "../hooks/use-rapidapi";
import useBackend from "../hooks/use-backend";
import LeagueSeasonContext from "../store/league_season-context";
import MatchdaySelectForm from "./MatchdaySelectForm";
import Container from "../UI/Container";

export default function Matches() {
  const {league, season} = useContext(LeagueSeasonContext);
  const [currentMatchday, setCurrentMatchday] = useState("Regular Season - 1");
  const [matchesData, setMatchesData] = useState({matches: [], rounds: []});
  const {loading, error, sendRequest: fetchData} = useBackend();

  useEffect(() => {
    const endpoint = `/soccer/matches/${league}/${season}`;
    fetchData(endpoint, setMatchesData);

  }, [league, season, fetchData]);

  const filteredMatches = matchesData.matches.filter(match => match.round === currentMatchday).sort((a,b) => {
    return new Date(a.date) - new Date(b.date);
  });
  let content = "";

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
          leagueRoundsData={matchesData.rounds} 
          onChangeHandler={(e) => setCurrentMatchday(e.target.value)}
        />
      </Container>
      <Container maxWidth="md">
        {content}
      </Container>
      
    </>
  );
}