import { useEffect, useState, useContext } from "react";
import LeagueSeasonContext from "./store/league_season-context";
import useRapidAPI from "./hooks/use-rapidapi";

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
    content = (
      <tbody className="table-group-divider">
        {topScorersData.map(player => {
          return (
            <tr key={player.id}>
              <th className="align-middle" scope="row">{player.rank}</th>
              <td className="name-row">
                <p>{player.name}</p>
                <div><img width="50px" height="auto" src={player.photoURL} /></div>
              </td>
              <td className="align-middle">{player.totalGoals}</td>
              <td className="align-middle">{player.totalAssists}</td>
            </tr>
          );
        })}
      </tbody>
    )
  }

  if(loading) {
    content = <tbody className="table-group-divider"><tr><th colSpan="4">Loading...</th></tr></tbody>
  }

  if(error) {
    content = <tbody className="table-group-divider"><tr><th colSpan="4">Something went wrong...</th></tr></tbody>
  }

  return (
    <>
      <h2>Top Scorers</h2>
      <div className="table-responsive w-50 p-3 text-center border " >
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Goals</th>
              <th scope="col">Assists</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </>
  );
}