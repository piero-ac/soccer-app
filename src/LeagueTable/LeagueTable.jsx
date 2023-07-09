import { useEffect, useState, useContext } from "react";
// import useRapidAPI from "../hooks/use-rapidapi";
import useBackend from "../hooks/use-backend";
import LeagueSeasonContext from "../store/league_season-context";
import LeagueTableHeader from "./LeagueTableHeader";
import LeagueTableBody from "./LeagueTableBody";
import LeagueTableLegend from "./LeagueTableLegend";
import Container from "../UI/Container";

export default function LeagueTable() {
  const {league, season} = useContext(LeagueSeasonContext);
  const [leagueTableData, setLeagueTableData] = useState([]);
  const {loading, error, sendRequest: fetchTableData} = useBackend();

  useEffect(() => {
    const endpoint = `/soccer/table/${league}/${season}`;
    fetchTableData(endpoint, setLeagueTableData);

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