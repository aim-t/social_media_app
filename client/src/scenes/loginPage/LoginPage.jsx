import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

function LoginPage() {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box pb="2rem">
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
        >
          LifeStory
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "35%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{ mb: "1.5rem", textAlign: "center" }}
        >
          Share your life, one story at a time!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
}
export default LoginPage;

