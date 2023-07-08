import { useEffect, useState } from 'react';
// import useRapidAPI from '../../hooks/use-rapidapi';
import useBackend from '../../hooks/use-backend';
import MatchEventRow from './MatchEventRow';

export default function MatchEvents(props) {
  const {matchId} = props;
  const [matchEventsData, setMatchEventsData] = useState([]);
  const {loading, error, sendRequest: fetchMatchEventsData} = useBackend();

  useEffect(() => {
    const endpoint = `/soccer/match/${matchId}/events`;
    fetchMatchEventsData(endpoint, setMatchEventsData);
  }, [matchId, setMatchEventsData, fetchMatchEventsData]);

  let content = '';
  if(matchEventsData.length > 0){
    content = matchEventsData.map(matchEvent => {
          return <MatchEventRow key={Math.random()} matchEvent={matchEvent} />
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
      <div className='bg-danger text-center mt-3'>Could not fetch events.</div>
    )
  }

  return (
    <div className="container">
      <h6 className='text-center'>
        <a className="fs-2 link-underline link-underline-opacity-0" 
          data-bs-toggle="collapse" 
          href="#collapseEvents" 
          role="button" 
          aria-expanded="false" 
          aria-controls="collapseEvents">
          Events
        </a>
      </h6>
      
      <div className="collapse" id="collapseEvents">
        <div className="row text-center border-primary border-bottom border-2 mb-2 fw-bold">
          <div className="col-4 col-md-2">Time</div>
          <div className="col-4 col-md-2">Team</div>
          <div className="col-4 col-md-3">Event</div>
          <div className="d-none d-md-block col-md-5">Info</div>
        </div>
        {content}
      </div>
    </div>
  )
}