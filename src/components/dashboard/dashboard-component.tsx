import React, { useState, useEffect } from 'react';
import {Box,Container,Typography,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Button,Card,CardContent,Chip,IconButton,Dialog,DialogTitle,DialogContent,DialogActions,TextField,MenuItem, Grid} from '@mui/material';
// import Grid from '@mui/material/Grid';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountBalance as AccountBalanceIcon,
  Add as AddIcon,
  AttachMoney as AttachMoneyIcon,
  CreditCard as CreditCardIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6b8e23',
      light: '#8fbc8f',
      dark: '#556b2f',
    },
    secondary: {
      main: '#8fbc8f',
      light: '#98fb98',
      dark: '#6b8e23',
    },
    background: {
      default: 'linear-gradient(135deg, #6b8e23 0%, #556b2f 50%, #8fbc8f 100%)',
      paper: 'rgba(255, 255, 255, 0.95)',
    },
    success: {
      main: '#8fbc8f',
    },
    warning: {
      main: '#6b8e23',
    }
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#556b2f',
    },
    h5: {
      fontWeight: 600,
      color: '#556b2f',
    },
    h6: {
      fontWeight: 600,
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.95)',
        },
      },
    },
  },
});

const FloatingShapes = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: -1,
      '& .floating-shape': {
        position: 'absolute',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
      },
      '@keyframes float': {
        '0%, 100%': {
          transform: 'translateY(0px)',
        },
        '50%': {
          transform: 'translateY(-20px)',
        },
      },
    }}
  >
    <Box 
      className="floating-shape"
      sx={{
        width: 80,
        height: 80,
        top: '10%',
        left: '10%',
        animationDelay: '0s',
      }}
    />
    <Box 
      className="floating-shape"
      sx={{
        width: 120,
        height: 120,
        top: '60%',
        right: '15%',
        animationDelay: '2s',
      }}
    />
    <Box 
      className="floating-shape"
      sx={{
        width: 60,
        height: 60,
        bottom: '20%',
        left: '80%',
        animationDelay: '4s',
      }}
    />
  </Box>
);

export default function FinancialDashboard() {
  const [currentDate, setCurrentDate] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false);
  const [outgoingDialogOpen, setOutgoingDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({ source: '', amount: '' });

  const [incomeData, setIncomeData] = useState([
    { source: 'Register Sales', amount: 3568.89 },
    { source: 'Sales Tax', amount: 365.72 },
    { source: 'Lotto', amount: 189.00 },
    { source: 'Instant Lottery', amount: 256.00 },
  ]);

  const [outgoingData, setOutgoingData] = useState([
    { category: 'Cash', amount: 1290.00 },
    { category: 'Credit Card', amount: 2564.27 },
    { category: 'Lotto Payout', amount: 825.00 },
    { category: 'Bank Deposit', amount: 60.00 },
  ]);

  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalOutgoing = outgoingData.reduce((sum, item) => sum + item.amount, 0);
  const netBalance = totalIncome - totalOutgoing;

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }));
      setLastUpdated(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAddIncome = () => {
    if (newEntry.source && newEntry.amount) {
      setIncomeData([...incomeData, { 
        source: newEntry.source, 
        amount: parseFloat(newEntry.amount) 
      }]);
      setNewEntry({ source: '', amount: '' });
      setIncomeDialogOpen(false);
    }
  };

  const handleAddOutgoing = () => {
    if (newEntry.source && newEntry.amount) {
      setOutgoingData([...outgoingData, { 
        category: newEntry.source, 
        amount: parseFloat(newEntry.amount) 
      }]);
      setNewEntry({ source: '', amount: '' });
      setOutgoingDialogOpen(false);
    }
  };

  const incomeCategories = ['Register Sales', 'Sales Tax', 'Lotto', 'Instant Lottery', 'Other'];
  const outgoingCategories = ['Cash', 'Credit Card', 'Lotto Payout', 'Bank Deposit', 'Other'];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #6b8e23 0%, #556b2f 50%, #8fbc8f 100%)',
          py: 3,
        }}
      >
        <FloatingShapes />
        
        <Container maxWidth="xl">
          {/* Header */}
          <Paper
            elevation={10}
            sx={{
              p: 3,
              mb: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 3,
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid>
                <Typography variant="h4" gutterBottom>
                  Welcome Back!
                </Typography>
                <Typography variant="h6" color="primary.main">
                  Your Financial Dashboard
                </Typography>
              </Grid>
              <Grid  sx={{ textAlign: 'right' }}>
                <Chip
                  label={currentDate}
                  sx={{
                    background: 'linear-gradient(45deg, #6b8e23, #8fbc8f)',
                    color: 'white',
                    fontWeight: 600,
                    mb: 1,
                    display: 'block',
                  }}
                />
                <Typography variant="h6" color="primary.dark">
                  UserA
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 4 ,display:"flex",justifyContent:"center" }}>
            <Grid item xs={12} md={4}>
              <Card elevation={8} sx={{ textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main', mr: 1 }} />
                  </Box>
                  <Typography variant="h3" sx={{ color: 'success.main', fontWeight: 800, mb: 1 }}>
                    ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </Typography>
                  <Typography variant="h6">Total Income</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={8} sx={{ textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <TrendingDownIcon sx={{ fontSize: 40, color: 'warning.main', mr: 1 }} />
                  </Box>
                  <Typography variant="h3" sx={{ color: 'warning.main', fontWeight: 800, mb: 1 }}>
                    ${totalOutgoing.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </Typography>
                  <Typography variant="h6">Total Outgoing</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={8} sx={{ textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <AccountBalanceIcon sx={{ fontSize: 40, color: 'primary.dark', mr: 1 }} />
                  </Box>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      color: netBalance >= 0 ? 'success.main' : 'error.main', 
                      fontWeight: 800, 
                      mb: 1 
                    }}
                  >
                    ${netBalance >= 0 ? '' : '-'}${Math.abs(netBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </Typography>
                  <Typography variant="h6">Net Balance</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Main Data Tables */}
          <Grid container spacing={4} sx={{ mb: 4,display:"flex",justifyContent:"center" }} >
            {/* Income Section */}
            <Grid item xs={12} lg={6} sx={{width:"45%"}}>
              <Paper
                elevation={10}
                sx={{
                  p: 3,
                  width:"100%",
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderLeft: '5px solid #8fbc8f',
                  borderRadius: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #6b8e23, #8fbc8f)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <AttachMoneyIcon sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                  <Typography variant="h5">Income</Typography>
                </Box>

                <TableContainer component={Paper} elevation={3}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ background: 'linear-gradient(45deg, #6b8e23, #8fbc8f)' }}>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Source</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {incomeData.map((row, index) => (
                        <TableRow 
                          key={index}
                          sx={{ 
                            '&:hover': { backgroundColor: '#f8fdf8' },
                            cursor: 'pointer',
                          }}
                        >
                          <TableCell>{row.source}</TableCell>
                          <TableCell sx={{ color: 'success.main', fontWeight: 700, fontSize: '1.1rem' }}>
                            ${row.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setIncomeDialogOpen(true)}
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(45deg, #6b8e23, #8fbc8f)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(107, 142, 35, 0.4)',
                    },
                  }}
                >
                  Add Income Entry
                </Button>
              </Paper>
            </Grid>

            {/* Outgoing Section */}
            <Grid item xs={12} lg={6} sx={{width:"45%"}} >
              <Paper
                elevation={10}
                sx={{
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderLeft: '5px solid #6b8e23',
                  borderRadius: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #6b8e23, #8fbc8f)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <CreditCardIcon sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                  <Typography variant="h5">Outgoing</Typography>
                </Box>

                <TableContainer component={Paper} elevation={3}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ background: 'linear-gradient(45deg, #6b8e23, #8fbc8f)' }}>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Category</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 600 }}>Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {outgoingData.map((row, index) => (
                        <TableRow 
                          key={index}
                          sx={{ 
                            '&:hover': { backgroundColor: '#f8fdf8' },
                            cursor: 'pointer',
                          }}
                        >
                          <TableCell>{row.category}</TableCell>
                          <TableCell sx={{ color: 'warning.main', fontWeight: 700, fontSize: '1.1rem' }}>
                            ${row.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOutgoingDialogOpen(true)}
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(45deg, #6b8e23, #8fbc8f)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(107, 142, 35, 0.4)',
                    },
                  }}
                >
                  Add Outgoing Entry
                </Button>
              </Paper>
            </Grid>
          </Grid>

          {/* Footer */}
          <Paper
            elevation={10}
            sx={{
              p: 2,
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 3,
            }}
          >
            <Typography variant="body1" color="primary.main">
              🌿 Financial Management Dashboard • Secure & Intuitive • Last Updated: {lastUpdated}
            </Typography>
          </Paper>
        </Container>

        {/* Add Income Dialog */}
        <Dialog open={incomeDialogOpen} onClose={() => setIncomeDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add Income Entry</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <TextField
                select
                fullWidth
                label="Income Source"
                value={newEntry.source}
                onChange={(e) => setNewEntry({ ...newEntry, source: e.target.value })}
                sx={{ mb: 2 }}
              >
                {incomeCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={newEntry.amount}
                onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIncomeDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleAddIncome} 
              variant="contained"
              sx={{ background: 'linear-gradient(45deg, #6b8e23, #8fbc8f)' }}
            >
              Add Entry
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Outgoing Dialog */}
        <Dialog open={outgoingDialogOpen} onClose={() => setOutgoingDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add Outgoing Entry</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <TextField
                select
                fullWidth
                label="Expense Category"
                value={newEntry.source}
                onChange={(e) => setNewEntry({ ...newEntry, source: e.target.value })}
                sx={{ mb: 2 }}
              >
                {outgoingCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={newEntry.amount}
                onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOutgoingDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleAddOutgoing} 
              variant="contained"
              sx={{ background: 'linear-gradient(45deg, #6b8e23, #8fbc8f)' }}
            >
              Add Entry
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}