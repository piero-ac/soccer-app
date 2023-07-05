import { useEffect, useState } from 'react';
import useRapidAPI from '../../hooks/use-rapidapi';
import TeamLineup from './TeamLineup';

export default function MatchLineups(props) {
  const {matchId} = props;
  const [matchLineupsData, setMatchLineupsData] = useState([]);
  const {loading, error, sendRequest: fetchMatchLineupsData} = useRapidAPI();

  useEffect(() => {
    const key = `lineups-mid=${matchId}`;
    const savedData = localStorage.getItem(key);
    console.log('Applying use effect')

    if(savedData) {
      console.log(`Using cached match lineups info for ${matchId}`);
      const cachedData = JSON.parse(savedData);
      setMatchLineupsData(cachedData);
    } else {
      const parseMatchLineupsData = (dataObj) => {
        const data = dataObj.response;
        const [team1, team2] = data;
        const parsedData = [team1, team2];
        localStorage.setItem(key, JSON.stringify(parsedData));
        setMatchLineupsData(parsedData);
      };
      console.log(`Fetching new match lineups info for ${matchId}`);
      const endpoint = `https://api-football-v1.p.rapidapi.com/v3/fixtures/lineups?fixture=${matchId}`;
      fetchMatchLineupsData(endpoint, parseMatchLineupsData);
    }
    
  }, [matchId, setMatchLineupsData, fetchMatchLineupsData]);

  let content = '';
  if(matchLineupsData.length > 0){
    content = <>
      <TeamLineup teamLineup={matchLineupsData[0]} />
      <TeamLineup teamLineup={matchLineupsData[1]} />
    </>
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
      <div className='bg-danger text-center mt-3'>Could not fetch lineups.</div>
    )
  }
  
  return (
    <div className="container">
      <h6 className='text-center'>
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