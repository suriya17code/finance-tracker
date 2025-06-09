import { styled } from '@mui/material/styles';
import {Box,Paper,TextField,Button,Typography,FormControl,Stepper} from '@mui/material';
import { gradientShift, particleFloat, characterBounce, floatAnimation, chartGrow } from '../animations/register';

// Styled components
export const RootContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 50%, #667eea 100%)',
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 18s ease infinite`,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

export const FloatingParticle = styled(Box)(({ delay = 0, size = 6 } :{ delay:number, size:number})=> ({
  position: 'absolute',
  width: size,
  height: size,
  background: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '50%',
  animation: `${particleFloat} 25s infinite linear`,
  animationDelay: `${delay}s`,
  left: `${Math.random() * 100}%`,
}));

export const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.12)',
  backdropFilter: 'blur(25px)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  borderRadius: 35,
  padding: theme.spacing(5),
  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.25)',
  color: 'white',
  width: '100%',
  maxWidth: 450,
  maxHeight: '90vh',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 6,
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.5)',
    },
  },
}));

export const StyledTextField = styled(TextField)(({  }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(15px)',
    borderRadius: 18,
    transition: 'all 0.4s ease',
    '& fieldset': {
      border: '2px solid rgba(255, 255, 255, 0.25)',
      borderRadius: 18,
    },
    '&:hover fieldset': {
      border: '2px solid rgba(255, 255, 255, 0.4)',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #00b894',
      boxShadow: '0 0 25px rgba(0, 184, 148, 0.4)',
    },
    '&.Mui-focused': {
      transform: 'translateY(-3px)',
      background: 'rgba(255, 255, 255, 0.18)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.65)',
    '&.Mui-focused': {
      color: '#00cec9',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: 'white',
    padding: '16px 22px',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.65)',
      opacity: 1,
    },
  },
}));

export const StyledSelect = styled(FormControl)(({  }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(15px)',
    borderRadius: 18,
    transition: 'all 0.4s ease',
    '& fieldset': {
      border: '2px solid rgba(255, 255, 255, 0.25)',
      borderRadius: 18,
    },
    '&:hover fieldset': {
      border: '2px solid rgba(255, 255, 255, 0.4)',
    },
    '&.Mui-focused fieldset': {
      border: '2px solid #00b894',
      boxShadow: '0 0 25px rgba(0, 184, 148, 0.4)',
    },
    '&.Mui-focused': {
      transform: 'translateY(-3px)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.65)',
    '&.Mui-focused': {
      color: '#00cec9',
    },
  },
  '& .MuiSelect-select': {
    color: 'white',
    padding: '16px 22px',
  },
  '& .MuiSvgIcon-root': {
    color: 'rgba(255, 255, 255, 0.65)',
  },
}));

export const GradientButton = styled(Button)(({  }) => ({
  background: 'linear-gradient(45deg, #00b894, #00cec9)',
  borderRadius: 18,
  padding: '18px',
  fontSize: '18px',
  fontWeight: 'bold',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #00a085, #00b7b3)',
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 40px rgba(0, 184, 148, 0.5)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.6s',
  },
  '&:hover::before': {
    left: '100%',
  },
}));

export const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: '34px',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #00b894, #00cec9)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: theme.spacing(1),
}));

export const CharacterContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 300,
  height: 400,
  [theme.breakpoints.down('md')]: {
    width: 200,
    height: 250,
  },
}));

export const Character = styled(Box)(({ variant = 'main' }:{ variant:string }) => ({
  width: variant === 'main' ? 160 : 100,
  height: variant === 'main' ? 240 : 150,
  background: 'linear-gradient(145deg, #00b894, #00cec9)',
  borderRadius: '18px 18px 35px 35px',
  position: 'absolute',
  boxShadow: '0 25px 70px rgba(0, 0, 0, 0.35)',
  ...(variant === 'main' && {
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    animation: `${characterBounce} 4s ease-in-out infinite`,
    zIndex: 3,
    // '&::before': {
    //   content: '""',
    //   position: 'absolute',
    //   top: 25,
    //   left: '50%',
    //   transform: 'translateX(-50%)',
    //   width: 50,
    //   height: 50,
    //   background: '#ffeaa7',
    //   borderRadius: '50%',
    //   boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.1)',
    // },
    '&::after': {
      content: '"🎯"',
      position: 'absolute',
      top: 100,
      right: -25,
      fontSize: 25,
    },
  }),
  ...(variant === 'left' && {
    left: 0,
    top: '60%',
    transform: 'translateY(-50%) scale(0.7)',
    animation: `${floatAnimation} 5s ease-in-out infinite`,
    animationDelay: '1s',
    opacity: 0.8,
    zIndex: 1,
    '&::after': {
      content: '"💰"',
      position: 'absolute',
      top: 80,
      right: -20,
      fontSize: 20,
    },
  }),
  ...(variant === 'right' && {
    right: 70,
    top: '40%',
    transform: 'translateY(-50%) scale(0.8)',
    animation: `${floatAnimation} 6s ease-in-out infinite reverse`,
    animationDelay: '2s',
    opacity: 0.9,
    zIndex: 2,
    '&::after': {
      content: '"📈"',
      position: 'absolute',
      top: 90,
      left: -20,
      fontSize: 22,
    },
  }),
}));

export const FloatingCard = styled(Paper)(({ purpose }:{ purpose:string }) => ({
  position: 'absolute',
  backdropFilter: 'blur(25px)',
  background: 'rgba(255, 255, 255, 0.18)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: 22,
  padding: 18,
  color: 'white',
  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.15)',
  animation: `${floatAnimation} 7s ease-in-out infinite`,
  ...(purpose === 'goals' && {
    top: '10%',
    left: '5%',
    animationDelay: '0s',
  }),
  ...(purpose === 'budget' && {
    bottom: '25%',
    left: '0%',
    animationDelay: '2.5s',
  }),
  ...(purpose === 'portfolio' && {
    top: '20%',
    right: '8%',
    animationDelay: '5s',
  }),
  ...(purpose === 'analytics' && {
    bottom: '15%',
    right: '5%',
    animationDelay: '7.5s',
  }),
}));

export const MiniChart = styled(Box)(({ }) => ({
  width: 70,
  height: 35,
  marginTop: 8,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'end',
  gap: 2,
}));

export const ChartBar = styled(Box)(({ height, delay }:{ height:number, delay:number }) => ({
  width: 6,
  height: `${height}%`,
  background: 'linear-gradient(to top, transparent, rgba(255, 255, 255, 0.7))',
  borderRadius: 3,
  animation: `${chartGrow} 4s ease-in-out infinite`,
  animationDelay: `${delay}s`,
}));

export const CustomStepper = styled(Stepper)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: 0,
    justifyContent:"center",
  background: 'transparent',
  '& .MuiStep-root': { 
    padding: "0px 10px",
    flex: '0 0 auto', // prevents stretching
  },
  '& .MuiStepConnector-root': {
    display:"none",
  },
  '& .MuiStepLabel-root': {
    padding: 0,
    margin: 0,
  },
  '& .MuiStepButton-root': {
    padding: 0,
    borderRadius: '50%',
    minWidth: 'auto',
    width: 12,
    height: 12,
    margin: 0,
    '& .MuiStepLabel-iconContainer': {
      padding: 0,
      margin: 0,
    },
  },
  '& .MuiStepIcon-root': {
    width: 12,
    height: 12,
    borderRadius: '50%',
    color: 'rgba(255, 255, 255, 0.3)',
    transition: 'transform 0.3s',
    '&.Mui-active': {
      background: 'linear-gradient(45deg, #00b894, #00cec9)',
      color: 'transparent',
      transform: 'scale(1.3)',
    },
    '&.Mui-completed': {
      background: 'linear-gradient(45deg, #00b894, #00cec9)',
      color: 'transparent',
    },
  },
}));

// export const CustomStepper = styled(Stepper)(({ theme }) => ({
//   marginBottom: theme.spacing(3),
//   '& .MuiStep-root': {
//     padding: 0,
//   },
//   '& .MuiStepButton-root': {
//     padding: 0,
//     borderRadius: '50%',
//     minWidth: 'auto',
//     width: 10,
//     height: 10,
//     '& .MuiStepLabel-root': {
//       padding: 0,
//     },
//     '& .MuiStepIcon-root': {
//       width: 10,
//       height: 10,
//       borderRadius: '50%',
//       color: 'rgba(255, 255, 255, 0.3)',
//       '&.Mui-active': {
//         background: 'linear-gradient(45deg, #00b894, #00cec9)',
//         color: 'transparent',
//         transform: 'scale(1.2)',
//       },
//     },
//   },
// }));