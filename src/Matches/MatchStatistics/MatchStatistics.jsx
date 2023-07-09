import { useEffect, useState } from "react";
// import useRapidAPI from "../../hooks/use-rapidapi";
import useBackend from "../../hooks/use-backend";
import MatchStatisticsRow from "./MatchStatisticsRow";

export default function MatchStatistics(props) {
  const {matchId} = props;
  const [matchStatisticsData, setMatchStatisticsData] = useState([]);
  const {loading, error, sendRequest: fetchMatchStatisticsData} = useBackend();

  useEffect(() => {
      const endpoint = `/soccer/match/${matchId}/stats`;
      fetchMatchStatisticsData(endpoint, setMatchStatisticsData);
  }, [matchId, setMatchStatisticsData, fetchMatchStatisticsData]);

  let content = "";
  if(matchStatisticsData.length > 0){
    content = matchStatisticsData.map(matchStat => {
          return (
            <MatchStatisticsRow key={Math.random()} matchStat={matchStat} />
          )
      })
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
      <div className="bg-danger text-center mt-3">Could not fetch statistics.</div>
    )
  }
  
  return (
    <div className="container">
      <h6 className="text-center">
        <a className="fs-2 link-underline link-underline-opacity-0" 
          data-bs-toggle="collapse" 
          href="#collapseStats" 
          role="button" 
          aria-expanded="false" 
          aria-controls="collapseStats">
          Statistics
        </a>
      </h6>
      
      <div className="collapse" id="collapseStats">
        {content}
      </div>
    </div>
  )
}