import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";

const ToneModal = React.memo(function ToneModal({
	open,
	info,
	time,
	buttonDisable,
	handleFinish,
	handleError,
}) {
	return (
		<Modal
			sx={{ tabIndex: "-1" }}
			open={open}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography
					id="modal-modal-title"
					variant="h6"
					component="h2"
					gutterBottom
				>
					{info.label}
				</Typography>

				<>
					<Typography
						sx={{ pt: 2 }}
						variant="h5"
						color={red[400]}
						textAlign="center"
					>{`${time}s`}</Typography>
				</>

				<Stack direction="row" spacing={2} pt={4}>
					<Button
						onClick={handleError}
						variant="outlined"
						color="error"
						disabled={buttonDisable}
					>
						Error
					</Button>
					<Button
						onClick={handleFinish}
						variant="contained"
						color="success"
						disabled={buttonDisable}
					>
						Finish
					</Button>
				</Stack>
			</Box>
		</Modal>
	);
});

export default ToneModal;

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	// filter: "blur(8px)",
	// border: "2px solid #000",
	boxShadow: 24,
	tabIndex: "-1",
	p: 4,
};
