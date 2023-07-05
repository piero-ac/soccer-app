import { useEffect, useState } from 'react';
import useRapidAPI from '../../hooks/use-rapidapi';
import MatchStatisticsRow from './MatchStatisticsRow';

export default function MatchStatistics(props) {
  const {matchId} = props;
  const [matchStatisticsData, setMatchStatisticsData] = useState([]);
  const {loading, error, sendRequest: fetchMatchStatisticsData} = useRapidAPI();

  useEffect(() => {
    const key = `stats-mid=${matchId}`;
    const savedData = localStorage.getItem(key);
    console.log('Applying use effect')

    if(savedData) {
      console.log(`Using cached match stats info for ${matchId}`);
      const cachedData = JSON.parse(savedData);
      setMatchStatisticsData(cachedData);
    } else {
      const parseMatchStatisticsData = (dataObj) => {
        const data = dataObj.response;
        const parsedData = [];
        const [team1, team2] = data;
        const team1Stats = team1.statistics, team2Stats = team2.statistics;
        for(let i = 0; i < team1Stats.length; i++){
          const type = team1Stats[i].type.split(" ").map(word => word[0].toUpperCase() + word.substring(1)).join(" ");
          parsedData.push({type, 
            hVal: team1Stats[i].value || 0,
            aVal: team2Stats[i].value || 0
          })
        }

        localStorage.setItem(key, JSON.stringify(parsedData));
        setMatchStatisticsData(parsedData);
      };
      console.log(`Fetching new match stats info for ${matchId}`);
      const endpoint = `https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics?fixture=${matchId}`;
      fetchMatchStatisticsData(endpoint, parseMatchStatisticsData);
    }
    
  }, [matchId, setMatchStatisticsData, fetchMatchStatisticsData]);

  let content = '';
  if(matchStatisticsData.length > 0){
    content = matchStatisticsData.map(matchStat => {
          return (
            <MatchStatisticsRow key={Math.random()} matchStat={matchStat} />
          )
      })
  }

  if(loading) {
    content = (
    <div className='text-center mt-3'>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>)
  }

  if(error) {
    content = (
      <div className='bg-danger text-center mt-3'>Could not fetch statistics.</div>
    )
  }
  
  return (
    <div className="container">
      <h6 className='text-center'>
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