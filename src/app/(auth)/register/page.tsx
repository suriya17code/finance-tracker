'use client';
// import { Box, TextField, Button, Typography, Paper } from '@mui/material';
// import React, { useState } from 'react';
// import { SignUp } from '@/lib/fakeAuthApi';
// import { useRouter } from 'next/navigation';
// const SignUpForm = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router=useRouter();
//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       // Call your signup function here
//       await SignUp(username, email, password);
//        router.push('/dashboard');
//       // Optionally redirect or show success message
//     } catch (err: any) {
//       setError(err.message || 'Something went wrong');
//     }
//   };
// const handleLogin=()=>{
//      router.replace('/login');
// }
//   return (
//     <form onSubmit={handleSignUp}>
//       <Paper
//         elevation={3}
//         sx={{
//           width: '100%',
//           maxWidth: 400,
//           margin: '0 auto',
//           padding: 4,
//           backgroundColor: 'white',
//           color: 'black',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 2,
//           height: 500,
//           justifyContent: 'center',
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h5" align="center" gutterBottom>
//           Sign Up
//         </Typography>

//         <TextField
//           label="Username"
//           variant="outlined"
//           fullWidth
//           onChange={e => setUsername(e.target.value)}
//         />
//         <TextField
//           label="Email"
//           type="email"
//           variant="outlined"
//           fullWidth
//           onChange={e => setEmail(e.target.value)}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           variant="outlined"
//           fullWidth
//           onChange={e => setPassword(e.target.value)}
//         />

//         {error && (
//           <Typography variant="body2" color="error" align="center">
//             {error}
//           </Typography>
//         )}

//         <Button
//           type="submit"
//           variant="contained"
//           fullWidth
//           sx={{
//             mt: 2,
//             fontWeight: 600,
//             textTransform: 'none',
//           }}
//         >
//           Sign Up
//         </Button>

//         <Box sx={{display:"flex",}}>
//             <Typography variant="caption"> Already have Account? </Typography>
//              <Typography variant="caption" sx={{color:"orange"}} onClick={handleLogin}> login </Typography>
//         </Box>
//       </Paper>
//     </form>
//   );
// };

// export default SignUpForm;

import React, { useState, useEffect } from 'react';
import {Box,Container,TextField,Button,Typography,Select,MenuItem,FormControl,InputLabel,Checkbox,FormControlLabel,Grid,Paper,LinearProgress,Link,Stepper,Step,StepButton,useTheme,useMediaQuery,Fade,Zoom,Slide} from '@mui/material';
import { Character, CharacterContainer, ChartBar, CustomStepper, FloatingCard, FloatingParticle, GlassmorphicPaper, GradientButton, LogoText, MiniChart, RootContainer, StyledSelect, StyledTextField } from '@/styles/auth/register';
import backbutton from "../../../../public/assets/imgs/back-arrow.png";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SignupRightside from '@/components/auth/signup-rightside';
interface fromdata{
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
    income: string,
    goal: string,
    termsAccepted: boolean,
    emailUpdates: boolean,
}


const TrackFinSignup = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [formData, setFormData] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    income: '',
    goal: '',
    termsAccepted: false,
    emailUpdates: false,
  });
  
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false); 
  const router=useRouter()
  // Calculate progress based on filled required fields
  useEffect(() => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword', 'income', 'goal'];
    const filledFields = requiredFields.filter((field:any) => formData[field] && formData[field].trim() !== '');
    const progress = Math.floor((filledFields.length / requiredFields.length) * 3);
    setActiveStep(Math.min(progress, 2));
  }, [formData]);

  const handleNext=()=>{
     setActiveStep(1)
  }
  const handleBack=()=>{
    setActiveStep(0)
  }

  const handleInputChange = (field:any) => (event:any) => {
    setFormData((prev:any) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCheckboxChange = (field:any) => (event:any) => {
    setFormData((prev:any) => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Account created successfully! Welcome to TrackFin!');
    }, 2000);
  };

  const incomeRanges = [
    { value: '0-25000', label: '₹0 - ₹25,000' },
    { value: '25000-50000', label: '₹25,000 - ₹50,000' },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { value: '100000-200000', label: '₹1,00,000 - ₹2,00,000' },
    { value: '200000+', label: '₹2,00,000+' },
  ];

  const financialGoals = [
    { value: 'savings', label: 'Build Emergency Fund' },
    { value: 'investment', label: 'Start Investing' },
    { value: 'debt', label: 'Pay Off Debt' },
    { value: 'retirement', label: 'Retirement Planning' },
    { value: 'property', label: 'Buy Property' },
  ];

  // Generate floating particles
  const particles = Array.from({ length: 10 }, (_, i) => (
    <FloatingParticle
      key={i}
      delay={i * 1.5}
      size={i % 3 === 0 ? 10 : 6}
    />
  ));
  const steppercomponent=()=>{
        switch (activeStep) {
          case 0:
            return(
              <>
              <Box sx={{display: 'flex',flexWrap: 'wrap',gap: 2,mb: 2,}}>
                    <Box sx={{ width: { xs: '100%', md: '40%' }}}>
                      <StyledTextField
                        fullWidth
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange('firstName')}
                        required
                      />
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: '40%' }}}>
                      <StyledTextField
                        fullWidth
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange('lastName')}
                        required
                      />
                    </Box>
                  </Box>

                  <StyledTextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    required
                    sx={{ mb: 2 }}
                  />

                  <StyledTextField
                    fullWidth
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    required
                    sx={{ mb: 2 }}
                  />

                  <Grid  sx={{display: 'flex',flexWrap: 'wrap',gap: 2,mb: 2, }}>
                    <Box sx={{ width: { xs: '100%', md: '40%' }}}>
                      <StyledTextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange('password')}
                        required
                      />
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: '40%' }}}>
                      <StyledTextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange('confirmPassword')}
                        required
                      />
                    </Box>
                  </Grid>
              </>
            );
            case 1:
            return(
              <>
              <StyledSelect fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Monthly Income Range</InputLabel>
                    <Select
                      value={formData.income}
                      label="Monthly Income Range"
                      onChange={handleInputChange('income')}
                      required
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: 'rgba(24, 90, 157, 0.95)',
                            backdropFilter: 'blur(20px)',
                            color: 'white',
                          },
                        },
                      }}
                    >
                      {incomeRanges.map((range) => (
                        <MenuItem key={range.value} value={range.value} sx={{ color: 'white' }}>
                          {range.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </StyledSelect>

                  <StyledSelect fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Primary Financial Goal</InputLabel>
                    <Select
                      value={formData.goal}
                      label="Primary Financial Goal"
                      onChange={handleInputChange('goal')}
                      required
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: 'rgba(24, 90, 157, 0.95)',
                            backdropFilter: 'blur(20px)',
                            color: 'white',
                          },
                        },
                      }}
                    >
                      {financialGoals.map((goal) => (
                        <MenuItem key={goal.value} value={goal.value} sx={{ color: 'white' }}>
                          {goal.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </StyledSelect>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.termsAccepted}
                        onChange={handleCheckboxChange('termsAccepted')}
                        required
                        sx={{
                          color: 'rgba(255, 255, 255, 0.65)',
                          '&.Mui-checked': {
                            color: '#00b894',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        I agree to the{' '}
                        <Link href="#" sx={{ color: '#00cec9', textDecoration: 'none' }}>
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="#" sx={{ color: '#00cec9', textDecoration: 'none' }}>
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
                    sx={{ mb: 2, alignItems: 'flex-start' }}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.emailUpdates}
                        onChange={handleCheckboxChange('emailUpdates')}
                        sx={{
                          color: 'rgba(255, 255, 255, 0.65)',
                          '&.Mui-checked': {
                            color: '#00b894',
                          },
                        }}
                      />
                    }
                    label={<Typography variant="body2" sx={{ color:'rgba(255, 255, 255, 0.8)' }}>
                        Send me financial tips and market updates
                      </Typography>}
                    sx={{ mb: 3 }}
                  />
              </>
            );
          default:
            break;
        }
  } 
  return (
    <RootContainer>
      {particles}
      <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Left Side - Form */}
          <Box sx={{ width: { xs: '100%', md: '45%' },position:"relative"}}>
      {activeStep===1 &&   
      <Button onClick={handleBack}
  style={{
    background: 'none',border: 'none',padding: 0,margin: 0,minWidth:"fit-content",
    cursor: 'pointer',position: 'absolute',top: '20px',left: '20px',zIndex: 999,
  }}
  aria-label="Go back"
>
  <Image src={backbutton} alt="Back" width={32} height={32}/>
</Button>}

            <Fade in timeout={1000}>
              <GlassmorphicPaper elevation={0}>
                <Box textAlign="center" mb={4}>
                  <LogoText variant="h3">TrackFin</LogoText>
                  <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.85)', mb: 1 }}>
                    Start Your Financial Journey
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Join thousands of smart savers
                  </Typography>
                </Box>

                <CustomStepper activeStep={activeStep} alternativeLabel>
                  {[0, 1].map((step) => (
                    <Step key={step} sx={{minWidth:"fit-content"}}>
                      <StepButton />
                    </Step>
                  ))}
                </CustomStepper>
 
                <Box component="form" onSubmit={handleSubmit}>
                  {steppercomponent()}
       { activeStep===0?
                 ( <GradientButton 
                    onClick={()=>handleNext()}
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                  >
                    {"Next Step"}
                  </GradientButton>
                  ):( 
                    <GradientButton
                    type="submit" 
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </GradientButton>
                  )}
                  <Box textAlign="center" mt={2}>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Already have an account?{' '}
                      <Link href={"/login"} sx={{ color: '#00cec9', textDecoration: 'none' }} >
                        Sign In
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </GlassmorphicPaper>
            </Fade>
          </Box>

          {/* Right Side - Animation */}
          {!isMobile && (
          <SignupRightside/>
          )}
        </Box>
      </Container>
    </RootContainer>
  );
};

export default TrackFinSignup;
