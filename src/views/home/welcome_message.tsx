import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../App";

function WelcomeMessage() {
  const [user] = useAuthState(auth);

  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  useEffect(() => {
    const messages = ["Welcome, ", "Hey there, ", "Nice to see you, ", "Glad you're here, "];
    const randomIndex = Math.floor(Math.random() * messages.length);
    setWelcomeMessage(messages[randomIndex]);
  }, []);

  return (
    <Box>
      <Typography variant="h5" display="inline">
        {welcomeMessage}
      </Typography>
      <Typography
        sx={{ textTransform: "capitalize", color: "#333", fontWeight: 500 }}
        variant="h5"
        display="inline"
      >
        {user!.displayName}
      </Typography>
      <Typography variant="h5" display="inline">
        !
      </Typography>
    </Box>
  );
}

export default WelcomeMessage;
