import { useEffect, useState } from "react";
import useRapidAPI from "./hooks/use-rapidapi";

export default function LeagueTable(props) {
  const league = props.league, season = props.season;

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
      console.log("Fetching new league table info")
      const endpoint = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=${league}`;
      fetchTableData(endpoint, parseLeagueTableData);
    }

    
  }, [league, season, fetchTableData])

  let content = '';

  if(leagueTableData.length > 0) {
    console.log(leagueTableData)
    content = leagueTableData.map(team => {
      let rowClasses = '';
      if (team.teamRank === 1) rowClasses += "table-success";
      else if (team.teamRank >= 2 && team.teamRank <= 17) rowClasses += "table-secondary";
      else rowClasses += "table-danger";
      return (
        <tr key={team.teamId} className={rowClasses}>
          <th scope="row">{team.teamRank}</th>
          <td><img src={team.teamLogo} width="30px" height="auto" /></td>
          <td className="text-left">{team.teamName}</td>
          <td>{team.totalGamesPlayed}</td>
          <td>{team.totalGamesWon}</td>
          <td>{team.totalGamesDraw}</td>
          <td>{team.totalGamesLose}</td>
          <td>{team.totalGoalsFor}</td>
          <td>{team.totalGoalsAgainst}</td>
          <td>{team.totalGoalsDiff}</td>
          <td>{team.totalPoints}</td>
          <td>{team.teamForm}</td>
        </tr>
      );
    })
  }

  if(loading) {
    content = <tr><th colSpan="12">Loading...</th></tr>
  }

  if(error) {
    content = <tr><th colSpan="12">Something went wrong...</th></tr>
  }


  // useEffect(() => {
  //   const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
  //   const key = `leaguetable-l=${league}-s=${season}`;

  //   const fetchLeagueTableData = async () => {
  //     let data;
  //     const savedData = localStorage.getItem(key);

  //     if (savedData) {
  //       data = JSON.parse(savedData);
  //       console.log("Using cached league table info");
  //     } else {
  //       const url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=${league}`;
  //       const options = {
  //         method: 'GET',
  //         headers: {
  //           'X-RapidAPI-Key': RAPID_API_KEY,
  //           'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  //         }
  //       };

  //       try {
  //         const response = await fetch(url, options);
  //         const result = await response.json();
  //         data = result.response[0].league.standings[0];
  //         localStorage.setItem(key, JSON.stringify(data));
  //         console.log('New league table info requested');
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //     setLeagueTableData(data || []);
  //   };

  //   fetchLeagueTableData();

  // }, [league, season]);

  return (
    <>
      <h2>Table</h2>
      <div className="table-responsive w-75 p-3 text-center" >
        <table className="table table-striped table-bordered table-sm">
          <thead>
            <tr>
              <th scope="col" colSpan="3" className="text-left">Club</th>
              <th scope="col">MP</th>
              <th scope="col">W</th>
              <th scope="col">D</th>
              <th scope="col">L</th>
              <th scope="col">GF</th>
              <th scope="col">GA</th>
              <th scope="col">GD</th>
              <th scope="col">Pts</th>
              <th scope="col">Last 5</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">{content}</tbody>
        </table>
      </div>
    </>
  )

}