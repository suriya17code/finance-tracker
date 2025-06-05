import { keyframes } from "@mui/material/styles";

// Animated background gradient
export const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Floating animation
export const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 1; }
  25% { transform: translateY(-18px) rotate(1deg); }
  50% { transform: translateY(8px) rotate(-1deg); }
  75% { transform: translateY(-12px) rotate(2deg); }
`;

// Character bounce animation
export const characterBounce = keyframes`
  0%, 100% { transform: translate(-50%, -50%) rotateY(0deg) scale(1); }
  50% { transform: translate(-50%, -60%) rotateY(15deg) scale(1.05); }
`;

// Chart grow animation
export const chartGrow = keyframes`
  0%, 100% { transform: scaleY(0.6); opacity: 0.6; }
  50% { transform: scaleY(1.3); opacity: 1; }
`;

// Particle float animation
export const particleFloat = keyframes`
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
`;