import * as React from "react";
import * as Tone from "tone";
import { stimTones, errorTone } from "../appconfig/stims";

const useTones = () => {
	const [modalOpen, setModalOpen] = React.useState(false);
	const [currTone, setCurrTone] = React.useState({ label: "" });
	const [isToning, setIsToning] = React.useState(false);
	const [buttonDisable, setButtonDisable] = React.useState(false);

	const [time, setTimer] = React.useState(0);

	const interval = React.useRef(null);

	function playTone(note, duration) {
		setIsToning(true);

		// const synth = new Tone.Synth({
		// 	onsilence: () => {
		// 		setIsToning(false);
		// 	},
		// }).toDestination();

		// const now = Tone.now();
		// synth.triggerAttackRelease(note, duration, now); // Play tone

		const osc = new Tone.Oscillator({
			onstop: () => {
				setIsToning(false);
			},
		}).toDestination();
		osc.frequency.value = note;
		osc.start().stop(`+${duration}`);
	}

	function handleStartTone() {
		setModalOpen(true);

		const note = `${this.note}${this.octave}`;
		const duration = `${this.duration / 1000}s`;

		setCurrTone({
			...this,
		});

		playTone(note, duration);
	}

	function handleStopTone() {
		setModalOpen(false);

		const note = `${currTone.note}${currTone.octave}`;
		const duration = `${currTone.duration / 2 / 1000}s`;

		setCurrTone({});

		playTone(note, duration);
		clearTimeout(interval);
		setTimer(0);
	}

	function handleToneError() {
		const note = `${this.note}${this.octave}`;
		const duration = `${this.duration / 1000}s`;

		setModalOpen(false);

		playTone(note, duration);
	}

	React.useEffect(() => {
		setButtonDisable(isToning);
	}, [isToning]);

	React.useEffect(() => {
		if (modalOpen) {
			setTimer(0);
			interval.current = setInterval(() => {
				setTimer((prev) => prev + 1);
			}, 1000);
		} else {
			clearInterval(interval.current);
		}
	}, [modalOpen]);

	return {
		stimTones,
		currTone,
		errorTone,
		time,
		modalOpen,
		buttonDisable,
		handleStartTone,
		handleStopTone,
		handleToneError,
	};
};

export default useTones;
