import { useEffect, useState, useContext } from "react";
// import useRapidAPI from "../hooks/use-rapidapi";
import useBackend from "../hooks/use-backend";
import LeagueSeasonContext from "../store/league_season-context";
import LeagueTableHeader from "./LeagueTableHeader";
import LeagueTableBody from "./LeagueTableBody";
import LeagueTableLegend from "./LeagueTableLegend";
import Container from "../UI/Container";

export default function LeagueTable(props) {
  const {league, season} = useContext(LeagueSeasonContext);
  const [leagueTableData, setLeagueTableData] = useState([]);
  const {loading, error, sendRequest: fetchTableData} = useBackend();

  useEffect(() => {
    const key = `leaguetable-l=${league}-s=${season}`;
    const savedData = localStorage.getItem(key);

    if (savedData) {
      console.log("Using cached league table info");
      const cachedData = JSON.parse(savedData);
      setLeagueTableData(cachedData);
    } else {
      const setData = (data) => {
        localStorage.setItem(key, JSON.stringify(data));
        setLeagueTableData(data);
      };
      console.log("Fetching new league table info");
      const endpoint = `/soccer/table/${league}/${season}`;
      fetchTableData(endpoint, setData);
    }

    
  }, [league, season, fetchTableData])

  let content = '';

  if(leagueTableData.length > 0) {
    content = <LeagueTableBody standings={leagueTableData} loading={false} error={false}/>
  }

  if(loading) {
    content = <LeagueTableBody loading={true} error={false}/>
  }

  if(error) {
    content = <LeagueTableBody loading={false} error={true}/>
  }

  return (
    <>
      <h2 className="text-center">League Standings</h2>     
      <Container maxWidth="md">
        <LeagueTableHeader />
        {content}
      </Container>
      <Container maxWidth="sm">
        <LeagueTableLegend />
      </Container>
    </>
  )

}