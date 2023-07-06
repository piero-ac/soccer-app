import { Fragment } from "react";
import ReactDOM  from "react-dom";
import Card from "../UI/Card";
import classes from "./MatchModal.module.css";
import MatchEvents from "./MatchEvents/MatchEvents";
import MatchStatistics from "./MatchStatistics/MatchStatistics";
import MatchLineups from "./MatchLineups/MatchLineups";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={(event) => {event.stopPropagation(); props.onClose();}} />;
}

const ModalOverlay = (props) => {
  
  return (
    <Card className={classes.modal} >
      <header className="d-flex flex-row text-bg-primary p-1 m-0 ">
        <h2 className="fs-5 mt-2 ms-3 flex-fill">{props.title}</h2>
        <button className="btn btn-sm btn-outline-light"onClick={(event) => {event.stopPropagation(); props.onClose();}}>Close</button>
      </header>
      <div className="p-2">
        <MatchLineups matchId={props.matchId}/>
        <MatchEvents matchId={props.matchId}/>
        <MatchStatistics matchId={props.matchId}/>
      </div>
    </Card>
  );
}

const MatchModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,
       document.getElementById("backdrop-root"))}
      {ReactDOM.createPortal(<ModalOverlay 
      matchId={props.matchId}
      title={props.title}
      onClose={props.onClose}/>, 
      document.getElementById("overlay-root"))} 
    </Fragment>
  )
}

export default MatchModal;