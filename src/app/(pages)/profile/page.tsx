'use client';
import React, { useEffect, useState } from 'react';
import {AppBar,Toolbar,Typography,Button,Box,Container,Grid,Avatar,AvatarGroup,Card,CardContent,LinearProgress,IconButton, ClickAwayListener, Grow, Paper, Popper} from '@mui/material';
import {CheckCircle,ArrowForward,TrendingDown,AccountCircle} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2E5B57',
    },
    secondary: {
      main: '#FF6B35',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2E5B57',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '4rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
  },
});

export default function SpeedeLandingPage() {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const username = sessionStorage.getItem("login-token");
       const [currentDate, setCurrentDate] = useState('');
       
      const router =useRouter()
   const handleClose = () => {
    setAnchorEl(null);
  };
   const handleLogout = async () => {
  
      sessionStorage.clear();
      router.replace("/login"); 
      
  };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
      useEffect(() => {
        const updateDateTime = () => {
          const now = new Date();
          setCurrentDate(now.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }));
          
        };
    
        updateDateTime();
        const interval = setInterval(updateDateTime, 60000);
        return () => clearInterval(interval);
      }, []);
  return (
    
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, background:'linear-gradient(135deg, #6b8e23 0%, #556b2f 50%,rgb(95, 170, 95) 100%)', minHeight: '100vh' }}>
        {/* Header */}
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', py: 1 }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" sx={{ color: 'white', fontSize: '1rem' }}>
                  F
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                Finance Tracker
              </Typography>
            </Box>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
              <Button color="inherit" sx={{ textTransform: 'none' }}>Companies</Button>
              <Button color="inherit" sx={{ textTransform: 'none' }}>About Us</Button>
              <Button color="inherit" sx={{ textTransform: 'none' }}>How It Works</Button>
              <Button color="inherit" sx={{ textTransform: 'none' }}>Resources</Button>
              <Button color="inherit" sx={{ textTransform: 'none' }}>Contact</Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                  borderRadius: '20px',
                  px: 3,
                }}
              >
                {username ? JSON.parse(username).user.username : 'Guest'}
              </Button>
              <IconButton sx={{ bgcolor: 'primary.main', color: 'white' }}
               onClick={handleClick}>
                <AccountCircle />
              </IconButton>
              <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} role={undefined} placement="bottom-end" transition disablePortal >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin: placement === 'bottom-end' ? 'left top' : 'left bottom',marginTop: '10px'
                              }}
                            >
                              <Paper sx={{backgroundColor:" #6b8e23", }}>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <Box sx={{display:"flex",flexDirection:"column"}}>
                                <Typography variant="caption" sx={{textAlign:"center",borderBottom:"1px solid white"}}>
                                                  {currentDate}
                                                  </Typography>
                                  <Button
                                    onClick={handleLogout}
                                    sx={{ padding: "2px 5px", color: "whitesmoke", height: '40px' }}
                                    disableRipple
                                    disableFocusRipple
                                    tabIndex={-1}
                                  >
                                    <LogoutIcon sx={{ mr: '6px' }} />
                                    Logout
                                  </Button>
                                    </Box> 
                                </ClickAwayListener>
              
                              </Paper>
              
                            </Grow>
                          )}
                        </Popper>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Grid container spacing={4} alignItems="center" sx={{ minHeight: '80vh' }}>
            {/* Left Content */}
            <Box sx={{width:{xs:"100%",md:"47%"}}}>
              <Box sx={{ pr: { md: 4 } }}>
                <Typography
                  variant="h1"
                  sx={{
                    mb: 3,
                    fontSize: { xs: '3rem', md: '4.5rem' },
                    fontWeight: 400,
                    lineHeight: 1.1,
                  }}
                >
                  Take Control
                  <br />
                  of Your Money
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{ mb: 4, color: 'text.secondary', maxWidth: '500px' }}
                >
                  Achieve Your Dreams One app to track expenses, automate savings,
                  and reach your financial goals stress-free.
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: 'white',
                    color: 'black',
                    borderRadius: '25px',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    mb: 6,
                    '&:hover': {
                      bgcolor: '#f0f0f0',
                    },
                  }}
                >
                  Try It Free
                </Button>

                {/* Trust Indicators */}
                <Box sx={{ mb: 4 }}>
                  <Grid container spacing={3}>
                    <Box sx={{width:{xs:"100%",md:"47%"}}}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircle sx={{ color: '#4CAF50', fontSize: '1.2rem' }} />
                        <Typography variant="body2">Trusted by 2,000+ Savers</Typography>
                      </Box>
                    </Box>
                    <Box sx={{width:{xs:"100%",md:"47%"}}}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircle sx={{ color: '#4CAF50', fontSize: '1.2rem' }} />
                        <Typography variant="body2">No Hidden Fees. Cancel Anytime</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Box>

                {/* Users Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <AvatarGroup max={5} sx={{ '& .MuiAvatar-root': { width: 40, height: 40 } }}>
                    <Avatar src="/api/placeholder/40/40" />
                    <Avatar src="/api/placeholder/40/40" />
                    <Avatar src="/api/placeholder/40/40" />
                    <Avatar src="/api/placeholder/40/40" />
                    <Avatar src="/api/placeholder/40/40" />
                  </AvatarGroup>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      154K+ Users
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      A smarter way to track budget and
                      <br />
                      grow your savings — effortlessly.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Right Content - Phone Mockup */}
            <Box sx={{width:{xs:"100%",md:"47%"}}}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {/* Phone Frame */}
                <Box
                  sx={{
                    width:{ sm:700,lg:300},
                    height:{ sm:500,lg:500},
                    bgcolor: '#1a1a1a',
                    borderRadius: '30px',
                    border: '8px solid #333',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Phone Content */}
                  <Box
                    sx={{
                      height: '100%',
                      background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #F4A460 100%)',
                      position: 'relative',
                      p: 2,
                    }}
                  >
                    {/* Scattered Coins */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '20%',
                        left: '10%',
                        right: '10%',
                        bottom: '30%',
                        backgroundImage: `
                          radial-gradient(circle at 20% 30%, #FFD700 3px, transparent 3px),
                          radial-gradient(circle at 80% 20%, #B8860B 4px, transparent 4px),
                          radial-gradient(circle at 60% 50%, #FFD700 3px, transparent 3px),
                          radial-gradient(circle at 30% 70%, #B8860B 4px, transparent 4px),
                          radial-gradient(circle at 70% 80%, #FFD700 3px, transparent 3px)
                        `,
                        backgroundSize: '40px 40px, 35px 35px, 45px 45px, 38px 38px, 42px 42px',
                      }}
                    />

                    {/* Top Notification */}
                    <Card
                      sx={{
                        position: 'absolute',
                        top: 60,
                        left: 20,
                        right: 20,
                        bgcolor: 'rgba(255,255,255,0.95)',
                        borderRadius: '15px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              bgcolor: '#FF6B35',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <TrendingDown sx={{ color: 'white', fontSize: '1rem' }} />
                          </Box>
                          <Box>
                            <Typography variant="body2" sx={{ color: 'black', fontWeight: 600 }}>
                              Track your spending,
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'black', fontWeight: 600 }}>
                              grow your savings
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>

                    {/* Dollar Bills */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 180,
                        right: 30,
                        width: 80,
                        height: 40,
                        bgcolor: '#228B22',
                        borderRadius: '4px',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: -5,
                          left: -5,
                          width: 80,
                          height: 40,
                          bgcolor: '#32CD32',
                          borderRadius: '4px',
                          zIndex: -1,
                        },
                      }}
                    />

                    {/* Bottom Savings Card */}
                    <Card
                      sx={{
                        position: 'absolute',
                        bottom: 40,
                        left: 20,
                        right: 20,
                        bgcolor: 'rgba(255,255,255,0.95)',
                        borderRadius: '15px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Typography variant="body2" sx={{ color: 'black', mb: 1 }}>
                          Look how much you saved
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{ color: 'black', fontWeight: 700, mb: 1 }}
                        >
                          $245,800.50
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="caption" sx={{ color: '#FF6B35' }}>
                            512 Investors
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'black' }}>
                            76%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={76}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: '#E0E0E0',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: '#FF6B35',
                            },
                          }}
                        />
                        <Typography variant="caption" sx={{ color: 'black', mt: 1, display: 'block' }}>
                          Smart saving starts, here what you built.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}