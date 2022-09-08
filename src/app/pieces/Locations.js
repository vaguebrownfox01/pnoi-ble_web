import { Button, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import * as React from "react";
import { stimLoc } from "../appconfig/stims";
import useBLE from "../hooks/useBLE";
import BluetoothPanel from "./BluetoothPanel";
import RecordModal from "./RecordModal";

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

const Locations = React.memo(function Locations() {
	const { handleRecord, handleBLEConnect, bleDev, currLoc, modalOpen, time } =
		useBLE();

	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
				filter: `blur(${modalOpen ? 4 : 0}px)`,
			}}
		>
			<RecordModal
				open={modalOpen}
				info={currLoc}
				{...{
					handleError: handleRecord.bind({ action: "error" }),
					handleFinish: handleRecord.bind({ action: "stop" }),
					// buttonDisable,
					time,
				}}
			/>
			<BluetoothPanel {...{ bleDev, handleBLEConnect }} />
			<Typography variant="h6" gutterBottom>
				Choose Record Location:
			</Typography>
			<Grid
				container
				rowSpacing={1}
				columnSpacing={{ xs: 1, sm: 1, md: 1 }}
			>
				{stimLoc.map((tone, i) => (
					<Grid
						alignContent="stretch"
						xs={6}
						key={`${tone.type}-${i}`}
					>
						<Item
							onClick={handleRecord.bind({ action: "start" })}
							// disabled={buttonDisable}
							fullWidth
						>
							<LocInfo {...tone} />
						</Item>
					</Grid>
				))}
			</Grid>
			<Stack direction="row" alignSelf="center" spacing={2} pt={8}>
				<Button
					variant="outlined"
					color="success"
					href="/pnoi-breath-rec-0004.wav"
					fullWidth
				>
					Transfer
				</Button>
			</Stack>
		</Box>
	);
});

export default Locations;

const LocInfo = React.memo(function LocInfo({ label }) {
	return (
		<Box sx={{ width: "100%", padding: [2, 0] }}>
			<Typography variant="body1">{label}</Typography>
		</Box>
	);
});
