'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { login } from '@/lib/fakeAuthApi';
// import { Paper, Typography, TextField, Button, Box } from '@mui/material';

// export default function LoginPage() {
//   const router = useRouter();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     try {
//       await login(username, password);
//       router.push('/dashboard');
//     } catch (err: any) {
//       setError(err.message);
//     }
//   }

//  const handleSignup=()=>{
//      router.replace('/register');
//  }
//   return (
//    <form onSubmit={handleSubmit}>
//   <Paper
//     elevation={3}
//     sx={{
//       width: '100%',
//       maxWidth: 400,
//       margin: '0 auto',
//       padding: 4,
//       backgroundColor: 'white',
//       color: 'black',
//       display: 'flex',
//       flexDirection: 'column',
//       gap: 2,
//       height: 500,
//       justifyContent: 'center',
//       borderRadius: 2,
//     }}
//   >
//     <Typography variant="h5" align="center" gutterBottom>
//       Login
//     </Typography>

//     <TextField
//       label="Username"
//       variant="outlined"
//       fullWidth
//       onChange={e => setUsername(e.target.value)}
//     />
//     <TextField
//       label="Password"
//       type="password"
//       variant="outlined"
//       fullWidth
//       onChange={e => setPassword(e.target.value)}
//     />

//     {error && (
//       <Typography variant="body2" color="error" align="center">
//         {error}
//       </Typography>
//     )}

//     <Button
//       type="submit"
//       variant="contained"
//       fullWidth
//       sx={{
//         mt: 2,
//         fontWeight: 600,
//         textTransform: 'none',
//       }}
//     >
//       Login
//     </Button>
//      <Box sx={{display:"flex",}}>
//             <Typography variant="caption"> dont have a Account? </Typography>
//              <Typography variant="caption" sx={{color:"orange"}} onClick={handleSignup}> Sign up </Typography>
//         </Box>
//   </Paper>
// </form>
//   );
// }
import React, { useState, useEffect } from 'react';
import {Box,Container,Typography,Link,Divider,CardContent,useTheme,useMediaQuery,Fade} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useRouter } from 'next/navigation'; 
import { login } from '@/lib/fakeAuthApi';
import {  RootContainer, Character, FloatingCard, MiniChart, LogoText, StyledTextField,
  rippleEffect, AnimatedBackground, Particle, ChartLine, LoginContainer, LoginButton, SocialButton } from '@/styles/animations/login';




const TrackFinLogin = () => {
//   const [email, setEmail] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
 const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const particles = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    left: `${(i + 1) * 10}%`,
    delay: i * 0.5,
  }));
  const handleSignup=()=>{
     router.replace('/register');
 }
  const handleSubmit = async(e:any) => {
    e.preventDefault();
    // Add ripple effect
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
    const button = e.target.querySelector('button[type="submit"]');
    if (button) {
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ${rippleEffect} 0.6s linear;
        pointer-events: none;
      `;
      
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
    
    // console.log('Form submitted:', { email, password });
  };

  return (
    <RootContainer>
      <AnimatedBackground />
      
      {/* Floating Particles */}
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          delay={particle.delay}
          sx={{ left: particle.left }}
        />
      ))}

      <Container maxWidth="xl" sx={{ height: '100vh', position: 'relative', zIndex: 10 }}>
        <Box  sx={{display:"flex", height: '100vh' }}>
          {/* Left Side - Animation */}
          {!isMobile && (
            <Box sx={{ width: { xs: '100%', md: '40%' }, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', p: 5 }}>
              <Character />
              
              {/* Floating Income Card */}
              <FloatingCard
                animationDelay={0}
                sx={{ top: '20%', left: '10%' }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Typography variant="caption" sx={{ opacity: 0.8, mb: 1, display: 'block' }}>
                    Monthly Income
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    ₹89,240
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#00b894', fontSize: 12 }}>
                    <TrendingUpIcon fontSize="small" />
                    +12.5%
                  </Box>
                  <MiniChart>
                    <ChartLine height={60} delay={0.1} />
                    <ChartLine height={80} delay={0.2} />
                    <ChartLine height={40} delay={0.3} />
                    <ChartLine height={90} delay={0.4} />
                    <ChartLine height={70} delay={0.5} />
                  </MiniChart>
                </CardContent>
              </FloatingCard>
              
              {/* Floating Expense Card */}
              <FloatingCard
                animationDelay={2}
                sx={{ bottom: '30%', left: '5%' }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Typography variant="caption" sx={{ opacity: 0.8, mb: 1, display: 'block' }}>
                    Monthly Expenses
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    ₹54,180
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#e17055', fontSize: 12 }}>
                    <TrendingDownIcon fontSize="small" />
                    -8.2%
                  </Box>
                  <MiniChart>
                    <ChartLine height={50} delay={0.1} />
                    <ChartLine height={70} delay={0.2} />
                    <ChartLine height={30} delay={0.3} />
                    <ChartLine height={60} delay={0.4} />
                    <ChartLine height={45} delay={0.5} />
                  </MiniChart>
                </CardContent>
              </FloatingCard>
              
              {/* Floating Profit Card */}
              <FloatingCard
                animationDelay={4}
                sx={{ top: '15%', right: '10%' }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Typography variant="caption" sx={{ opacity: 0.8, mb: 1, display: 'block' }}>
                    Net Savings
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    ₹35,060
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#00b894', fontSize: 12 }}>
                    <TrendingUpIcon fontSize="small" />
                    +18.7%
                  </Box>
                  <MiniChart>
                    <ChartLine height={65} delay={0.1} />
                    <ChartLine height={85} delay={0.2} />
                    <ChartLine height={55} delay={0.3} />
                    <ChartLine height={95} delay={0.4} />
                    <ChartLine height={75} delay={0.5} />
                  </MiniChart>
                </CardContent>
              </FloatingCard>
            </Box>
          )}
          {/* Right Side - Login Form */}
          <Box sx={{  width: { xs: '100%', md: '50%' },display: 'flex', alignItems: 'center', justifyContent: 'center', p: 5 }}>
            <Fade in timeout={1000}>
              <LoginContainer elevation={0}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <LogoText variant="h3">TrackFin</LogoText>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 16 }}>
                    Smart Financial Management
                  </Typography>
                </Box>
                
                <form onSubmit={handleSubmit}>
                  <Box sx={{ mb: 3 }}>
                    <StyledTextField
                      fullWidth
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <StyledTextField
                      fullWidth
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Box>
                  {error && (
      <Typography variant="body2" color="error" align="center">
        {error}
      </Typography>
    )}
                  {/* {isSignUp && (
                    <Box sx={{ mb: 3 }}>
                      <StyledTextField
                        fullWidth
                        type="password"
                        placeholder="Confirm Password"
                        required
                      />
                    </Box>
                  )} */}
                  
                  <LoginButton type="submit" variant="contained">
                    {/* isSignUp ? 'Create Account' : 'Sign In'*/}
                   { 'Sign In'}
                  </LoginButton>
                </form>
                
                <Box sx={{ textAlign: 'center', my: 3 }}>
                  <Divider sx={{ color: 'rgba(255, 255, 255, 0.3)', '&::before, &::after': { borderColor: 'rgba(255, 255, 255, 0.3)' } }}>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, px: 2 }}>
                      Or continue with
                    </Typography>
                  </Divider>
                </Box>
                
                {/* Social Media Login */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <SocialButton>
                    <GoogleIcon />
                  </SocialButton>
                  <SocialButton>
                    <FacebookIcon />
                  </SocialButton>
                  <SocialButton>
                    <TwitterIcon />
                  </SocialButton>
                  <SocialButton>
                    <GitHubIcon />
                  </SocialButton>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 14, mb: 1 }}>
                    {/* {isSignUp ? 'Already have an account?' : "Don't have an account?"} */}
                    { "Don't have an account?"}
                  </Typography>
                  <Link
                    component="button"
                    type="button"
                    onClick={() =>handleSignup()}
                    sx={{
                      color: 'rgb(132, 63, 223)',
                      textDecoration: 'none',
                      fontSize: 14,
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: 'rgb(132, 254, 87)',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {'Create Account'}
                  </Link>
                </Box>
                
                {/* {!isSignUp && (
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Link
                      href="#"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        fontSize: 14,
                        transition: 'color 0.3s ease',
                        '&:hover': {
                          color: '#ff6b6b',
                        },
                      }}
                    >
                      Forgot your password?
                    </Link>
                  </Box>
                )} */}
              </LoginContainer>
            </Fade>
          </Box>
        </Box>
      </Container>
    </RootContainer>
  );
};

export default TrackFinLogin;