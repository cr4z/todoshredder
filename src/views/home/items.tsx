import { Box, ButtonBase, Checkbox, IconButton, Typography, useTheme } from "@mui/material";
import { FirestoreTodo } from "./types";
import { IconRenderer } from "../../components/icon_renderer";
import { BsFillTrash3Fill } from "react-icons/bs";

function TodoItems(props: {
  items: FirestoreTodo[];
  onItemClick: (uid: string) => void;
  onItemDelete: (uid: string) => void;
}) {
  const { palette } = useTheme();

  return (
    <>
      {props.items.map((todo: FirestoreTodo, i) => (
        <ButtonBase
          key={i}
          onClick={() => props.onItemClick(todo.uid)}
          sx={{
            display: "flex",
            border: "1px solid gray",
            borderRadius: "6px",
            width: "100%",
            p: "3px",
            justifyContent: "flex-start",
            ":hover": { bgcolor: palette.grey[100], "#trash": { display: "block" } },
            position: "relative",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox checked={todo.checked} />
            <Box sx={{ borderLeft: "1px solid gray", pl: "1rem", width: "100%", textAlign: "left" }}>
              <Typography>{todo.text}</Typography>
            </Box>
          </Box>
          <Box sx={{ width: "3rem", pl: "2rem", height: "100%", display: "flex", alignItems: "center" }}>
            <IconButton
              id="trash"
              sx={{ display: "none", zIndex: 9, position: "absolute", right: ".5rem" }}
              onClick={(e) => {
                e.stopPropagation();
                props.onItemDelete(todo.uid);
              }}
            >
              <IconRenderer widthHeight="1.3rem" i={<BsFillTrash3Fill />} />
            </IconButton>
          </Box>
        </ButtonBase>
      ))}
    </>
  );
}

export default TodoItems;
