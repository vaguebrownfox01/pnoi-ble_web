import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import * as React from "react";
import useTones from "../hooks/useTones";
import ToneModal from "./ToneModal";

const Item = styled(Button)(({ theme }) => ({
	textAlign: "center",
	color: theme.palette.text.secondary,
	background: theme.palette.secondary.main,
	textTransform: "none",
	"&:hover": {
		backgroundColor: theme.palette.primary.accent,
		color: theme.palette.primary.main,
	},
	height: "100%",
}));

const Tones = React.memo(function Tones() {
	const {
		stimTones,
		currTone,
		errorTone,
		modalOpen,
		buttonDisable,
		handleStartTone,
		handleStopTone,
		handleToneError,
	} = useTones();

	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
				filter: `blur(${modalOpen ? 4 : 0}px)`,
			}}
		>
			<ToneModal
				open={modalOpen}
				info={currTone}
				{...{
					handleError: handleToneError.bind({ ...errorTone }),
					handleFinish: handleStopTone,
				}}
			/>
			<Typography variant="h6" gutterBottom>
				Record locations
			</Typography>
			<Grid
				container
				rowSpacing={1}
				columnSpacing={{ xs: 1, sm: 1, md: 1 }}
			>
				{stimTones.map((tone, i) => (
					<Grid
						alignContent="stretch"
						xs={6}
						key={`${tone.type}-${i}`}
					>
						<Item
							onClick={handleStartTone.bind({ ...tone })}
							disabled={buttonDisable}
							fullWidth
						>
							<ToneInfo {...tone} />
						</Item>
					</Grid>
				))}
			</Grid>
		</Box>
	);
});

export default Tones;

const ToneInfo = React.memo(function ToneInfo({
	type,
	label,
	note,
	octave,
	duration,
}) {
	return (
		<Box sx={{ width: "100%", padding: [2, 0] }}>
			<Typography variant="body1">{label}</Typography>
		</Box>
	);
});
