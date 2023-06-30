export default function LeagueTableHeader() {
	return (
		<div id="table-headers" className="row text-center border border-secondary-subtle text-bg-primary rounded-1 py-2 px-1 fw-bold">
			<div className="col-8 col-sm-6 col-md-3">Club</div>
			<div className="d-none d-sm-block col-sm-1">MP</div>
			<div className="d-none d-sm-block col-sm-1">W</div>
			<div className="d-none d-sm-block col-sm-1">D</div>
			<div className="d-none d-sm-block col-sm-1">L</div>
			<div className="d-none d-md-block col-md-1">GF</div>
			<div className="d-none d-md-block col-md-1">GA</div>
			<div className="d-none d-md-block col-md-1">GD</div>
			<div className="col-4 col-sm-2 col-md-1">Pts</div>
			<div className="d-none d-md-block col-md-1">Form</div>
		</div>
	);
}
