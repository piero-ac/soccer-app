import { useEffect, useState, useContext } from "react";
import LeagueSeasonContext from "./store/league_season-context";
import useRapidAPI from "./hooks/use-rapidapi";
import Container from "./UI/Container";
import TopScorersHeader from "./TopScorers/TopScorersHeader";
import TopScorersBody from "./TopScorers/TopScorersBody";

export default function TopScorers(props) {
  const {league, season} = useContext(LeagueSeasonContext);
  const [topScorersData, setTopScorersData] = useState([]);
  const {loading, error, sendRequest: fetchTopScorersData} = useRapidAPI();

  useEffect(() => {
    const key = `topScorers-l=${league}-s=${season}`;
    const savedData = localStorage.getItem(key);

    if(savedData) {
      console.log("Using cached top scorers info");
      const cachedData = JSON.parse(savedData);
      setTopScorersData(cachedData);
    } else {
      const parseTopScorersData = (dataObj) => {
        const data = dataObj.response;
        const parsedData = [];
        let index = 1;
        for(let player of data) {
          parsedData.push({
            id: player.player.id,
            rank: index++,
            name: player.player.name,
            photoURL: player.player.photo,
            totalGoals: player.statistics[0].goals.total || 0,
            totalAssists: player.statistics[0].goals.assists || 0
          })
        }

        localStorage.setItem(key, JSON.stringify(parsedData));
        setTopScorersData(parsedData);
      }
      console.log("Fetching new top scorers info");
      const endpoint = `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${league}&season=${season}`;
      fetchTopScorersData(endpoint, parseTopScorersData);
    }
  }, [league, season, fetchTopScorersData]);

  let content = '';

  if(topScorersData.length > 0) {
    content = <TopScorersBody topScorersData={topScorersData} loading={false} error={false} />
  }

  if(loading) {
    content = <TopScorersBody loading={true} error={false} />
  }

  if(error) {
    content =  <TopScorersBody loading={false} error={true} />
  }

  return (
    <>
      <h2 className="text-center">Top Scorers</h2>
      <Container maxWidth="sm">
        <TopScorersHeader />
        {content}
      </Container>
    </>
  );
}