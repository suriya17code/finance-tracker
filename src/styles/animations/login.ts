import { keyframes } from "@emotion/react";
import { Card, Paper, Typography, TextField, Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@mui/system/styled";

// Keyframe animations
export const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
export const float = keyframes`
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
`;
export const characterBounce = keyframes`
  0%, 100% { transform: translateY(0px) rotateY(0deg); }
  50% { transform: translateY(-20px) rotateY(10deg); }
`;
export const wave = keyframes`
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(20deg); }
`;
export const cardFloat = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-15px) rotate(2deg); }
  66% { transform: translateY(10px) rotate(-1deg); }
`;
export const chartGrow = keyframes`
  0%, 100% { transform: scaleY(0.8); }
  50% { transform: scaleY(1.2); }
`;
export const slideInRight = keyframes`
  0% { transform: translateX(100px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;
export const rippleEffect = keyframes`
  to {
    transform: scale(2);
    opacity: 0;
  }
`;
// Styled components
export const RootContainer = styled(Box)(({  }) => ({
  minHeight: '100vh',
  overflow: 'hidden',
  position: 'relative',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}));
export const AnimatedBackground = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
//   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  background: "linear-gradient(135deg, #6b8e23 0%, #556b2f 50%,rgb(195, 219, 186) 100%)", 
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 15s ease infinite`,
});
export const Particle = styled(Box)<{ delay: number }>(({ delay }) => ({
  position: 'absolute',
  width: '4px',
  height: '4px',
  background: 'rgba(255, 255, 255, 0.6)',
  borderRadius: '50%',
  animation: `${float} 20s infinite linear`,
  animationDelay: `${delay}s`,
}));
export const Character = styled(Box)({
  width: 200,
  height: 300, 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  borderRadius: '20px 20px 40px 40px',
  position: 'relative',
  animation: `${characterBounce} 3s ease-in-out infinite`,
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  transformStyle: 'preserve-3d',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1) rotateY(15deg)',
  }, 
  '&::after': {
    content: '"👋"',
    position: 'absolute',
    top: 120,
    right: -30,
    fontSize: 30,
    animation: `${wave} 2s ease-in-out infinite`,
  },
});
export const FloatingCard = styled(Card)<{animationDelay:unknown}>(({ animationDelay }) => ({
  position: 'absolute',
  backdropFilter: 'blur(20px)',
  background: 'rgba(255, 255, 255, 0.15)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 20,
  color: 'white',
  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
  animation: `${cardFloat} 6s ease-in-out infinite`,
  animationDelay: `${animationDelay}s`,
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.05)',
  },
}));
export const MiniChart = styled(Box)({
  width: 60,
  height: 30,
  marginTop: 10,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'flex-end',
  gap: 4,
});
export const ChartLine = styled(Box)<{height:unknown,delay:number}>(({ height, delay }) => ({
  width: 8,
  height: `${height}%`,
  background: 'linear-gradient(to top, transparent, rgba(255, 255, 255, 0.6))',
  borderRadius: 2,
  animation: `${chartGrow} 3s ease-in-out infinite`,
  animationDelay: `${delay}s`,
}));
export const LoginContainer = styled(Paper)({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 30,
  padding: 50,
  maxWidth: 400,
  width: '100%',
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
  animation: `${slideInRight} 1s ease-out`,
});
export const LogoText = styled(Typography)({
  fontSize: 32,
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 10,
  background: 'linear-gradient(45deg,rgb(193, 255, 107), #feca57)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});
// #6c5ce7, #a29bfe
export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    color: 'white',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&.Mui-focused': {
      borderColor: '#ff6b6b',
    //   boxShadow: '0 0 20px #a29bfe',
      transform: 'translateY(-2px)',
       border: '2px solid rgba(255, 255, 255, 0.29)',
    },
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputBase-input': {
    color: 'white',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.6)',
      opacity: 1,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.6)',
  },
});
export const LoginButton = styled(Button)({
  width: '100%',
  padding: 15,
  background: 'linear-gradient(45deg,rgb(178, 238, 83),rgb(237, 250, 209))',
  border: 'none',
  borderRadius: 15,
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg,rgb(181, 237, 48),rgb(230, 250, 202))',
    transform: 'translateY(-3px)',
    boxShadow: '0 15px 30px rgba(78, 98, 76, 0.4)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  },
});
export const SocialButton = styled(IconButton)({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  margin: '0 8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  },
});