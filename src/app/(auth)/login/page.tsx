'use client';
import React, { useState } from 'react';
import {Box,Container,Typography,Link,Divider,useTheme,useMediaQuery,Fade} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useRouter } from 'next/navigation'; 
import { login } from '@/lib/fakeAuthApi';
import {  RootContainer,  LogoText, StyledTextField,
  AnimatedBackground, Particle, LoginContainer, LoginButton, SocialButton } from '@/styles/animations/login';
import { useSnackbar } from '@/components/common/snackBar';
import LeftsideComponent from '@/components/auth/login/left-side-UI';


const TrackFinLogin = () => { 
 const {showSnackbar}=useSnackbar()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
 const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  
 
  const particles = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    left: `${(i + 1) * 10}%`,
    delay: i * 0.5,
  }));
  const handleSignup=()=>{
     router.replace('/register');
 }
 
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'message' in err) {
        showSnackbar("Invalid credentials","error");
      } else {
        showSnackbar("An unknown error occurred","error");
      }
    }  
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
           <LeftsideComponent/>
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
                
                <Box component="form" onSubmit={handleSubmit}>
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
                   
                  
                  <LoginButton type="submit" variant="contained"> 
                   { 'Sign In'}
                  </LoginButton>
                </Box>
                
                <Box sx={{ textAlign: 'center', my: 3 }}>
                  <Divider sx={{ color: 'rgba(255, 255, 255, 0.3)', '&::before, &::after': { borderColor: 'rgba(255, 255, 255, 0.3)' } }}>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, px: 2 }}>
                      Or continue with
                    </Typography>
                  </Divider>
                </Box>
                
                {/* Social Media Login */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <SocialButton> <GoogleIcon /> </SocialButton>
                  <SocialButton> <FacebookIcon /> </SocialButton>
                  <SocialButton> <TwitterIcon /> </SocialButton>
                  <SocialButton> <GitHubIcon /> </SocialButton>
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
                        color: 'rgb(137, 7, 230)',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {'Create Account'}
                  </Link>
                </Box>
              </LoginContainer>
            </Fade>
          </Box>
        </Box>
      </Container>
    </RootContainer>
  );
};

export default TrackFinLogin;