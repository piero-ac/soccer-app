import { useEffect, useState, useContext } from "react";
import LeagueSeasonContext from "../store/league_season-context";
// import useRapidAPI from "../hooks/use-rapidapi";
import useBackend from "../hooks/use-backend";
import Container from "../UI/Container";
import TopScorersHeader from "./TopScorersHeader";
import TopScorersBody from "./TopScorersBody";

export default function TopScorers(props) {
  const {league, season} = useContext(LeagueSeasonContext);
  const [topScorersData, setTopScorersData] = useState([]);
  const {loading, error, sendRequest: fetchTopScorersData} = useBackend();

  useEffect(() => {
      const endpoint = `/soccer/topscorers/${league}/${season}`;
      fetchTopScorersData(endpoint, setTopScorersData);
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