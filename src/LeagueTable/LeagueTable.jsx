import { useEffect, useState, useContext } from "react";
import useRapidAPI from "../hooks/use-rapidapi";
import LeagueSeasonContext from "../store/league_season-context";
import LeagueTableHeader from "./LeagueTableHeader";
import LeagueTableBody from "./LeagueTableBody";
import LeagueTableLegend from "./LeagueTableLegend";
import Container from "../UI/Container";

export default function LeagueTable(props) {
  const {league, season} = useContext(LeagueSeasonContext);
  const [leagueTableData, setLeagueTableData] = useState([]);
  const {loading, error, sendRequest: fetchTableData} = useRapidAPI();

  useEffect(() => {
    const key = `leaguetable-l=${league}-s=${season}`;
    const savedData = localStorage.getItem(key);

    if (savedData) {
      console.log("Using cached league table info");
      const cachedData = JSON.parse(savedData);
      setLeagueTableData(cachedData);
    } else {
      const parseLeagueTableData = (dataObj) => {
        const data = dataObj.response[0].league.standings[0];
        const parsedData = [];
      
        for(let team of data){
          parsedData.push({
            teamId: team.team.id, teamRank: team.rank, teamName: team.team.name,
            totalGamesPlayed: team.all.played, totalGamesWon: team.all.win,
            totalGamesDraw: team.all.draw, totalGamesLose: team.all.lose,
            totalGoalsFor: team.all.goals.for, totalGoalsAgainst: team.all.goals.against,
            totalGoalsDiff: team.goalsDiff, totalPoints: team.points, teamForm: team.form,
            teamLogo: team.team.logo
          })
        } 
        localStorage.setItem(key, JSON.stringify(parsedData));
        setLeagueTableData(parsedData);
      };
      console.log("Fetching new league table info");
      const endpoint = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=${league}`;
      fetchTableData(endpoint, parseLeagueTableData);
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
    content = <LeagueTableBody loading={true} error={true}/>
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