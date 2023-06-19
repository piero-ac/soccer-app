import { useEffect, useState } from "react";

export default function LeagueTable(props) {
  const league = props.league, season = props.season;

  const [leagueTableData, setLeagueTableData] = useState([]);


  useEffect(() => {
    const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
    const key = `leaguetable-l=${league}-s=${season}`;

    const fetchLeagueTableData = async () => {
      let data;
      const savedData = localStorage.getItem(key);

      if (savedData) {
        data = JSON.parse(savedData);
        console.log("Using cached league table info");
      } else {
        const url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=${league}`;
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
          data = result.response[0].league.standings[0];
          localStorage.setItem(key, JSON.stringify(data));
          console.log('New league table info requested');
        } catch (error) {
          console.error(error);
        }
      }
      setLeagueTableData(data || []);
    };

    fetchLeagueTableData();

  }, [league, season]);

  return (
    <>
      <h2>Table</h2>
      <div className="table-responsive w-50 p-3 text-center" >
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
          <tbody className="table-group-divider">
            {leagueTableData.length === 0 && <tr><th scope="row" colSpan="4">Loading...</th></tr>}
            {leagueTableData.length > 0 && leagueTableData.map((team) => {
              let rowClasses = '';
              if (team.rank === 1) rowClasses += "table-success";
              else if (team.rank >= 2 && team.rank <= 17) rowClasses += "table-secondary";
              else rowClasses += "table-danger";
              return (
                <tr key={team.team.id} className={rowClasses}>
                  <th scope="row">{team.rank}</th>
                  <td><img src={team.team.logo} width="30px" height="auto" /></td>
                  <td className="text-left">{team.team.name}</td>
                  <td>{team.all.played}</td>
                  <td>{team.all.win}</td>
                  <td>{team.all.draw}</td>
                  <td>{team.all.lose}</td>
                  <td>{team.all.goals.for}</td>
                  <td>{team.all.goals.against}</td>
                  <td>{team.goalsDiff}</td>
                  <td>{team.points}</td>
                  <td>{team.form}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )

}