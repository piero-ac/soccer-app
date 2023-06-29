export default function LeagueTableHeader() {
	return (
		<div id="table-headers" className="row text-center border border-secondary-subtle text-bg-primary rounded-1 py-2 px-1 fw-bold">
			<div className="col-5 col-md-3">Club</div>
			<div className="col col-md-1">MP</div>
			<div className="col col-md-1">W</div>
			<div className="col col-md-1">D</div>
			<div className="col col-md-1">L</div>
			<div className="d-none d-md-block col-md-1">GF</div>
			<div className="d-none d-md-block col-md-1">GA</div>
			<div className="d-none d-md-block col-md-1">GD</div>
			<div className="col col-md-1">Pts</div>
			<div className="d-none d-md-block col-md-1">Form</div>
		</div>
	);
}
