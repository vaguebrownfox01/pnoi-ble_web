import * as React from "react";
import Layout from "./components/Layout";
import Locations from "./pieces/Locations";

const App = React.memo(function App() {
	return (
		<Layout>
			<Locations />
		</Layout>
	);
});

export default App;
