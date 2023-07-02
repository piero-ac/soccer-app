import { Fragment } from 'react';
import ReactDOM  from 'react-dom';
import Card from '../UI/Card';
import classes from './MatchModal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={(event) => {event.stopPropagation(); props.onClose();}} />;
}

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal} >
      <header className="text-bg-primary p-1 m-0" onClick={props.onClose}>
        <h2 className='fs-5 mt-2'>{props.matchId}</h2>
      </header>
      <div className="p-2">
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <footer className="d-flex justify-content-end p-1">
      <button className="btn btn-primary"onClick={(event) => {event.stopPropagation(); props.onClose();}}>Close</button>
      </footer>
    </Card>
  );
}

const MatchModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,
       document.getElementById('backdrop-root'))}
      {ReactDOM.createPortal(<ModalOverlay 
      matchId={props.matchId}
      onClose={props.onClose}/>, 
      document.getElementById('overlay-root'))} 
    </Fragment>
  )
}

export default MatchModal;