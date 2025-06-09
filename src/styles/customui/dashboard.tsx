import { Box } from "@mui/material"
export const FloatingShapes = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: -1,
      overflow: 'hidden',
      '& .floating-shape': {
        position: 'absolute',
        borderRadius: '50%',
        filter: 'blur(60px)',
        opacity: 0.2,
      },
    }}
  >
    <Box 
      className="floating-shape"
      sx={{
        width: 300,
        height: 300,
        top: '10%',
        left: '10%',
        background: 'linear-gradient(45deg, #6b8e23, #8fbc8f)',
      }}
    />
    <Box 
      className="floating-shape"
      sx={{
        width: 400,
        height: 400,
        top: '60%',
        right: '15%',
        background: 'linear-gradient(45deg, #556b2f, #6b8e23)',
      }}
    />
    <Box 
      className="floating-shape"
      sx={{
        width: 200,
        height: 200,
        bottom: '20%',
        left: '80%',
        background: 'linear-gradient(45deg, #8fbc8f, #98fb98)',
      }}
    />
  </Box>
);