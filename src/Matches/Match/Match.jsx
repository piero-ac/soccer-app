import { useState } from "react";
import MatchModal from "../MatchModal";

export default function Match(props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="col-12 col-md-5 mx-0 mb-2 border-top bg-primary-subtle border-bottom border-primary border-2 rounded-1 shadow-lg d-flex justify-content-between"
    onClick={() => setShowModal(true)}> 
        {props.children}
    {showModal && <MatchModal 
      matchId={props.matchId} 
      title={props.title} 
      onClose={() => setShowModal(false)}/>}
    </div>
  )
}