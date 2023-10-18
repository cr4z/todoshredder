import { Box, ButtonBase, CircularProgress, Container, Typography, useTheme } from "@mui/material";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { auth } from "../App";
import { useState } from "react";
//@ts-ignore
import { ReactComponent as GoogleLogo } from "../svg/google.svg";

function SignIn() {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  const [loadingSpinner, setLoadingSpinner] = useState<boolean>(false);

  return (
    <Container
      maxWidth="xs"
      sx={{ mt: "10rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
    >
      <Typography sx={{ color: "#222", fontWeight: 400 }} variant="h5">
        Welcome!
      </Typography>
      <Typography pb="3rem" variant="h6">
        Ready to crush some tasks?
      </Typography>

      <SignInButton
        disabled={loadingSpinner}
        onClick={() => {
          signInWithGoogle();
          setLoadingSpinner(true);
        }}
      />
      {loadingSpinner && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography color="#676767" variant="h6">
            Logging you in...
          </Typography>
          <CircularProgress size="1.8rem" sx={{ color: "#676767" }} />
        </Box>
      )}
    </Container>
  );
}

function SignInButton(props: { onClick: () => void; disabled: boolean }) {
  const { palette } = useTheme();

  return (
    <ButtonBase
      onClick={() => props.onClick()}
      disabled={props.disabled}
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        padding: ".5rem",
        border: "1px solid #E6E6E6",
        borderRadius: "6px",
        justifyContent: "flex-start",
        alignItems: "center",
        ":hover": {
          bgcolor: palette.grey[100],
        },
        ":disabled": { bgcolor: palette.grey[100], color: palette.grey[500] },
      }}
    >
      <GoogleLogo width="40px" height="40px" />
      <Typography sx={{ position: "absolute", width: "100%", textAlign: "center" }}>
        Continue with Google
      </Typography>
    </ButtonBase>
  );
}

export default SignIn;
