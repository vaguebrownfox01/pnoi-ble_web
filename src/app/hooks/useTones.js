import * as React from "react";
import * as Tone from "tone";
import { stimTones, errorTone } from "../appconfig/stims";

const useTones = () => {
	const [modalOpen, setModalOpen] = React.useState(false);
	const [currTone, setCurrTone] = React.useState({ label: "" });
	const [isToning, setIsToning] = React.useState(false);
	const [buttonDisable, setButtonDisable] = React.useState(false);

	function playTone(note, duration) {
		setIsToning(true);

		const synth = new Tone.Synth({
			onsilence: () => {
				setIsToning(false);
			},
		}).toDestination();

		const now = Tone.now();
		synth.triggerAttackRelease(note, duration, now); // Play tone
	}

	function handleStartTone() {
		setModalOpen(true);
		setButtonDisable(true);

		const note = `${this.note}${this.octave}`;
		const duration = `${this.duration / 1000}s`;

		setCurrTone({
			...this,
		});

		playTone(note, duration);
	}

	function handleStopTone() {
		setModalOpen(false);
		setButtonDisable(true);

		const note = `${currTone.note}${currTone.octave}`;
		const duration = `${currTone.duration / 2 / 1000}s`;

		setCurrTone({});

		playTone(note, duration);
	}

	function handleToneError() {
		setModalOpen(false);
		setButtonDisable(true);

		const note = `${this.note}${this.octave}`;
		const duration = `${this.duration / 1000}s`;

		playTone(note, duration);
	}

	React.useEffect(() => {
		setButtonDisable(isToning);
		return () => {};
	}, [isToning]);

	return {
		stimTones,
		currTone,
		errorTone,
		modalOpen,
		buttonDisable,
		handleStartTone,
		handleStopTone,
		handleToneError,
	};
};

export default useTones;
