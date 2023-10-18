import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../App";
import { useState } from "react";
import { Box, Button, ButtonBase, Menu } from "@mui/material";
import WelcomeMessage from "./welcome_message";

function UserBar() {
  const [user] = useAuthState(auth);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ mt: ".5rem" }}
      >
        <Box sx={{ padding: ".5rem 1rem", width: "15rem" }}>
          <Button
            variant="contained"
            sx={{ color: "white", boxShadow: 0, textTransform: "unset", width: "100%" }}
            onClick={() => auth.signOut()}
          >
            Sign out
          </Button>
        </Box>
      </Menu>
      <Box
        mb="4rem"
        sx={{ width: "100%", alignItems: "center", justifyContent: "space-between", display: "flex" }}
      >
        <WelcomeMessage />
        <Avatar
          onClick={(event) => setAnchorEl(event.currentTarget)}
          src={user!.photoURL!}
          widthHeight="3rem"
        />
      </Box>
    </>
  );
}

function Avatar(props: {
  src: string;
  widthHeight: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <ButtonBase
      onClick={(event) => props.onClick(event)}
      sx={{
        borderRadius: 999,
        overflow: "hidden",
        width: props.widthHeight,
        height: props.widthHeight,
        ":hover": { filter: "brightness(90%)" },
      }}
    >
      <Box component="img" src={props.src} sx={{ width: props.widthHeight, height: props.widthHeight }} />
    </ButtonBase>
  );
}

export default UserBar;
