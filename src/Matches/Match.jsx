
export default function Match(props) {
  return (
    <div className="col-12 col-md-5 mx-0 mb-2 border-top bg-primary-subtle border-bottom border-primary border-2 rounded-1 shadow-lg d-flex justify-content-between"> 
        {props.children}
    </div>
  )
}