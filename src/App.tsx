import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "./views/home/home";
import SignIn from "./views/sign_in";
import { Box, Typography } from "@mui/material";
import { BsLightningCharge } from "react-icons/bs";
import { IconRenderer } from "./components/icon_renderer";

firebase.initializeApp({
  apiKey: import.meta.env.VITE_VERCEL_MY_FIREBASE_APIKEY,
  authDomain: "sso-todo.firebaseapp.com",
  projectId: "sso-todo",
  storageBucket: "sso-todo.appspot.com",
  messagingSenderId: "287486305676",
  appId: "1:287486305676:web:0c439505af37c4f935e2a9",
  measurementId: import.meta.env.VITE_VERCEL_MY_FIREBASE_MESSAGINGSENDERID,
});

export const auth = firebase.auth() as any;
export const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "1rem",
          gap: ".3rem",
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
          TodoShredder
        </Typography>
        <IconRenderer
          widthHeight="1.3rem"
          color="#2D2D2D"
          i={<BsLightningCharge />}
        />
      </Box>
      {user ? <Home /> : <SignIn />}
    </>
  );
}

export default App;
