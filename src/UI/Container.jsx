export default function Container(props) {
	let classes = "";

	switch (props.maxWidth) {
		case "sm":
			classes += "container small-max-width";
			break;
		case "md":
			classes += "container medium-max-width";
			break;
		case "lg":
			classes += "container large-max-width";
			break;
		case "xl":
			classes += "container xlarge-max-width";
			break;
		case "xxl":
			classes += "container xxlarge-max-width";
			break;
		case "fluid":
			classes += "container-fluid";
			break;
		default:
			classes = "container";
	}

	return <main className={classes}>{props.children}</main>;
}
