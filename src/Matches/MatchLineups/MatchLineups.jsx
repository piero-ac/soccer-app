import { useEffect, useState } from "react";
// import useRapidAPI from "../../hooks/use-rapidapi";
import useBackend from "../../hooks/use-backend";
import TeamLineup from "./TeamLineup";

export default function MatchLineups(props) {
  const {matchId} = props;
  const [matchLineupsData, setMatchLineupsData] = useState({team1: [], team2: []});
  const {loading, error, sendRequest: fetchMatchLineupsData} = useBackend();

  useEffect(() => {
    const endpoint = `/soccer/match/${matchId}/lineups`;
    fetchMatchLineupsData(endpoint, setMatchLineupsData);

  }, [matchId, setMatchLineupsData, fetchMatchLineupsData]);
  
  const {team1, team2} = matchLineupsData;
  let content = "";
  if(Object.keys(team1).length > 0 || Object.keys(team2).length > 0){
    content = <>
      <TeamLineup teamLineup={matchLineupsData.team1} />
      <TeamLineup teamLineup={matchLineupsData.team2} />
    </>
  }

  if(loading) {
    content = (
    <div className="text-center mt-3">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>)
  }

  if(error) {
    content = (
      <div className="bg-danger text-center mt-3">Could not fetch lineups.</div>
    )
  }
  
  return (
    <div className="container">
      <h6 className="text-center">
        <a className="fs-2 link-underline link-underline-opacity-0" 
          data-bs-toggle="collapse" 
          href="#collapseLineups" 
          role="button" 
          aria-expanded="false" 
          aria-controls="collapseLineups">
          Lineups
        </a>
      </h6>
      
      <div className="collapse" id="collapseLineups">
        <div className="row">
          {content}
        </div>
        
      </div>
    </div>
  )
}