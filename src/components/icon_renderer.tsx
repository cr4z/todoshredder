import { SxProps } from "@mui/material";
import { Box } from "@mui/system";

interface IconRendererProps {
  color?: string;
  widthHeight: string;
  i: JSX.Element;
  left?: boolean;
  right?: boolean;
  up?: boolean;
  down?: boolean;
  strokeWidth?: string;
  sx?: SxProps;
}
export function IconRenderer(props: IconRendererProps) {
  const size = props.widthHeight;
  const dir = props.down ? 90 : props.left ? 180 : props.up ? 270 : 0;

  return (
    <Box
      sx={{
        display: "flex" + "!important",
        justifyContent: "center" + "!important",
        alignItems: "center" + "!important",
        minWidth: size + "!important",
        minHeight: size + "!important",
        transform: `rotate(${dir}deg)` + "!important",
        svg: {
          strokeWidth: props.strokeWidth,
          width: size + "!important",
          height: size + "!important",
          color: props.color,
        },
        maxWidth: size + "!important",
        maxHeight: size + "!important",
        ...props.sx,
      }}
    >
      {props.i}
    </Box>
  );
}
