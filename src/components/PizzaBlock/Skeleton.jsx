import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={460}
		viewBox="0 0 280 460"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<circle cx="131" cy="140" r="118" />
		<rect x="0" y="274" rx="7" ry="7" width="277" height="31" />
		<rect x="0" y="317" rx="7" ry="7" width="278" height="78" />
		<rect x="0" y="408" rx="7" ry="7" width="107" height="36" />
		<rect x="153" y="408" rx="7" ry="7" width="119" height="37" />
	</ContentLoader>
);

export default Skeleton;
