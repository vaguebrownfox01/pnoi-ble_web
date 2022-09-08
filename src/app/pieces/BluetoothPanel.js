import BluetoothIcon from "@mui/icons-material/Bluetooth";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Box, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import * as React from "react";

const BluetoothPanel = React.memo(function BluetoothPanel({
	bleDev,
	handleBLEConnect,
}) {
	return (
		<Box sx={{ display: "flex", mb: 4 }}>
			<Button
				sx={{ color: blue[200], mr: 1 }}
				variant="contained"
				startIcon={<BluetoothIcon />}
				fullWidth
			>
				{bleDev ? "Connected" : "Connecting..."}
			</Button>
			<IconButton
				onClick={handleBLEConnect}
				sx={{ color: blue[200], mr: 1 }}
			>
				<PowerSettingsNewIcon />
			</IconButton>
		</Box>
	);
});

export default BluetoothPanel;
