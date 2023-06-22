import { Box } from "@mui/material";
import { styled } from "@emotion/styled";

// Reusing CSS as a component (styled component)

const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

export default FlexBetween;