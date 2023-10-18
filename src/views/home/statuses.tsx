import { Box, Typography } from "@mui/material";

function CompletedRemainingStatuses(props: { completed: number; remaining: number }) {
  return (
    <Box sx={{ display: "flex", gap: "3rem" }}>
      <Typography variant="h6" color="primary">
        Completed: {props.completed}
      </Typography>
      <Typography variant="h6" sx={{ color: "#333" }}>
        Remaining: {props.remaining}
      </Typography>
    </Box>
  );
}

export default CompletedRemainingStatuses;
