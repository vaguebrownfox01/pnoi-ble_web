import * as React from "react";

const { PnoiPhoneBLE } = require("../bluetooth/PnoiBLE");
const useBLE = () => {
	const [modalOpen, setModalOpen] = React.useState(false);
	const [time, setTimer] = React.useState(0);
	const [currLoc, setCurrLoc] = React.useState({ label: "" });

	const [bleDev, setBLEDev] = React.useState();
	const pnoiBLE = React.useRef();
	const interval = React.useRef(null);

	function handleBLEConnect() {
		if (!bleDev) {
			pnoiBLE.current
				.request()
				.then(() => pnoiBLE.current.connect())
				.then(() => {
					setBLEDev(pnoiBLE.current.device);
					console.log("pnoi connected");
				});
		} else {
			pnoiBLE.current.disconnect();
			console.log("pnoi disconnected");
		}
	}

	function handleRecord() {
		if (!bleDev) return;

		setCurrLoc({
			...this,
		});

		switch (this.action) {
			case "start":
				pnoiBLE.current.writeLed("start");
				setModalOpen(true);
				break;

			case "stop":
				pnoiBLE.current.writeLed("stop");
				setModalOpen(false);
				break;

			case "error":
				pnoiBLE.current.writeLed("error");
				setModalOpen(false);
				break;

			default:
				break;
		}
	}

	function onConnectionLost() {
		setBLEDev(null);
	}

	React.useEffect(() => {
		if (modalOpen) {
			setTimer(0);
			interval.current = setInterval(() => {
				console.log("ssss");
				setTimer((prev) => prev + 1);
			}, 1000);
		} else {
			clearInterval(interval.current);
		}

		return clearInterval(interval.current);
	}, [modalOpen]);

	React.useEffect(() => {
		pnoiBLE.current = new PnoiPhoneBLE(onConnectionLost);
	}, []);

	return {
		handleBLEConnect,
		handleRecord,
		modalOpen,

		time,
		bleDev,
		currLoc,
	};
};

export default useBLE;
