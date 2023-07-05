import RedCircle from '../assets/red-circle.svg';
import YellowCircle from '../assets/yellow-circle.svg';
import GreenCircle from '../assets/green-circle.svg';

export default function TeamForm(props){
  return (
    <>
    {props.form.map(result => {
      if(result === "W"){
        return <img key={Math.random()} src={GreenCircle} alt="" width="10px" height="auto" />
      } else if (result === "L") {
        return <img key={Math.random()} src={RedCircle} alt="" width="10px" height="auto" />
      } else {
        return <img key={Math.random()} src={YellowCircle} alt="" width="10px" height="auto" />
      }
    })}
    </>
    
  )

}