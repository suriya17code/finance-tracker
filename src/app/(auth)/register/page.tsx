'use client';

import React, { useState } from 'react';
import {Box,Container,Button,Typography,Select,MenuItem,InputLabel,Checkbox,FormControlLabel,Grid,Link,Step,StepButton,useTheme,useMediaQuery,Fade} from '@mui/material';
import {  CustomStepper, FloatingParticle, GlassmorphicPaper, GradientButton, LogoText, RootContainer, StyledSelect, StyledTextField } from '@/styles/auth/register';
import backbutton from "../../../../public/assets/imgs/back-arrow.png";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SignupRightside from '@/components/auth/register/signup-rightside';
 import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SignUp } from '@/lib/fakeAuthApi';
import { useSnackbar } from '@/components/common/snackBar';
 
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  income: string;
  goal: string;
  termsAccepted: boolean;
  emailUpdates: boolean;
}

const TrackFinSignup = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
 
  const [activeStep, setActiveStep] = useState(0);
  // const [isLoading, setIsLoading] = useState(false); 
  const router=useRouter()
  const {showSnackbar}=useSnackbar()           
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    income: Yup.string().required('Income range is required'),
    goal: Yup.string().required('Financial goal is required'),
    termsAccepted: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
    emailUpdates: Yup.boolean(),
  });
    const formik = useFormik<FormValues>({
    initialValues: {
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
    } as FormValues,
    validationSchema,
    onSubmit: async (values) => {
      try {  
        await SignUp(
          values.firstName,
          values.email,
          values.password
        );
        router.push('/dashboard');
      } catch (error) {
       let errorMessage = 'An unknown error occurred';
   
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (error && typeof error === 'object' && 'message' in error) {
    errorMessage = error.message as string;
  }
 
  showSnackbar(errorMessage, "warning");
        console.error('Submission error:', error);
      }
    },
  });
  const handleNext=()=>{
   // Validate current step before proceeding
    if (activeStep === 0) {
      const errors = {
        firstName: !formik.values.firstName ? 'Required' : '',
        lastName: !formik.values.lastName ? 'Required' : '',
        email: !formik.values.email ? 'Required' : '',
        phone: !formik.values.phone ? 'Required' : '',
        password: !formik.values.password ? 'Required' : '',
        confirmPassword: !formik.values.confirmPassword ? 'Required' : '',
      };

      // formik.setErrors(errors as any);
      
      if (Object.values(errors).some(error => error)) {
        showSnackbar("fill the form","warning");
        return
      }
    }
    setActiveStep(prev => prev + 1);
  }
  const handleBack=()=>{
      setActiveStep(prev => prev - 1);
  }


 
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
                    <Box sx={{ width: { xs: '100%', md: '50%' }}}>
                      <StyledTextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formik.values.firstName}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        onBlur={formik.handleBlur} 
                        helperText={formik.touched.firstName && formik.errors.firstName}         
                        onChange={formik.handleChange}
                        required
                      />
                     </Box>
                    <Box sx={{ width: { xs: '100%', md: '45%' }}}>
                      <StyledTextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}      
                        onBlur={formik.handleBlur}                   
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                        required
                      />
                    </Box>
                  </Box>

                  <StyledTextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email &&Boolean(formik.errors.email)}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.email &&formik.errors.email}
                    required
                    sx={{ mb: 2 }}
                  />

                  <StyledTextField
                    fullWidth
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}            
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.phone && formik.errors.phone}
                            
                    required
                    sx={{ mb: 2 }}
                  />

                  <Grid  sx={{display: 'flex',flexWrap: 'wrap',gap: 2,mb: 2, }}>
                    <Box sx={{ width: { xs: '100%', md: '47%' }}}>
                      <StyledTextField
                        fullWidth
                        label="Password"
                        type="password"
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}     
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.password && formik.errors.password} 
                       required
                      />
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: '48%' }}}>
                      <StyledTextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}                        
                        error={formik.touched.confirmPassword &&  Boolean(formik.errors.confirmPassword)}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                      value={formik.values.income}
                      label="Monthly Income Range"
                      name='income'
                      onChange={formik.handleChange}                    
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
                      value={formik.values.goal}
                      label="Primary Financial Goal"
                      name='goal'
                      onChange={formik.handleChange}                       
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
                      checked={formik.values.termsAccepted}
                      onChange={formik.handleChange}
                      name="termsAccepted"
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
                    checked={formik.values.emailUpdates}
                    onChange={formik.handleChange}
                    name="emailUpdates"
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
                <Box textAlign="center"  >
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
 
                <Box component="form" onSubmit={formik.handleSubmit}>
                  {steppercomponent()}
       { activeStep===0?
                 ( <GradientButton 
                    onClick={()=>handleNext()}
                    fullWidth
                    variant="contained"
                    size="large"
                    // disabled={isLoading}
                  >
                    {"Next Step"}
                  </GradientButton>
                  ):( 
                    <GradientButton
                    type="submit" 
                    fullWidth
                    variant="contained"
                    size="large"
                    // disabled={isLoading}
                  >
                    {'Create Account'}
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
