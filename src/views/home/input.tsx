import { Box, IconButton, TextField, useTheme } from "@mui/material";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { IconRenderer } from "../../components/icon_renderer";

function InputBar(props: { onPost: (todo: string) => void }) {
  const [stagedTodo, setStagedTodo] = useState<string>("");
  const { palette } = useTheme();

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <TextField
        fullWidth
        placeholder="'Do the dishes'..."
        value={stagedTodo}
        onChange={(e) => setStagedTodo(e.target.value)}
      />

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={() => {
            props.onPost(stagedTodo);
            setStagedTodo("");
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            padding: "1.5rem",
          }}
        >
          <IconRenderer
            color={palette.primary.main}
            widthHeight="2rem"
            sx={{ position: "absolute", ml: "16%" }}
            i={<AiOutlineSend />}
          />
        </IconButton>
      </Box>
    </Box>
  );
}

export default InputBar;
