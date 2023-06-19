import { useEffect, useState } from "react";

export default function TopScorers(props) {
  const league = props.league, season = props.season;
  const [topScorersData, setTopScorersData] = useState([]);

  useEffect(() => {
    const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
    const key = `topScorers-l=${league}-s=${season}`;
    const fetchTopScorersData = async () => {
      let data;
      const savedData = localStorage.getItem(key);

      if (savedData) {
        data = JSON.parse(savedData);
        console.log("Using cached league top scorers info");
      } else {
        const url = `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${league}&season=${season}`;
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
          data = result.response;
          localStorage.setItem(key, JSON.stringify(data));
          console.log('New league top scorers info requested');
        } catch (error) {
          console.error(error);
        }
      }
      setTopScorersData(data || []);
    };

    fetchTopScorersData();

  }, [league, season]);

  return (
    <>
      <h2>Top Scorers</h2>
      <div className="table-responsive w-25 p-3 text-center border " >
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Goals</th>
              <th scope="col">Assists</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {topScorersData.length === 0 && <tr><th scope="row" colSpan="4">Loading...</th></tr>}
            {topScorersData.length > 0 && topScorersData.map((player, index) => {
              return (
                <tr key={player.player.id}>
                  <th className="align-middle" scope="row">{index + 1}</th>
                  <td className="name-row">
                    <p>{player.player.name}</p>
                    <div><img width="50px" height="auto" src={player.player.photo} /></div>
                  </td>
                  <td className="align-middle">{player.statistics[0].goals.total}</td>
                  <td className="align-middle">{player.statistics[0].goals.assists}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}