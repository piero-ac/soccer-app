import React from "react";

const LeagueSeasonContext = React.createContext({
	league: "39", // default league
	season: "2022", // default season
	seasonChangeHandler: () => {},
	leagueChangeHandler: () => {},
});

export default LeagueSeasonContext;
