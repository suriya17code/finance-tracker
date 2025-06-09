import React, { useState, useEffect } from 'react';
import {Box,Card,CardContent,Typography,Container,Paper,Chip,Avatar,alpha, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Table} from '@mui/material';
import {TrendingUp,AlertTriangle,BarChart3,Activity,PiggyBank} from 'lucide-react';
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,BarChart,Bar,Legend} from 'recharts';
import { theme } from '@/styles/theme/dashboard';
import { FloatingShapes } from '@/styles/customui/dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import {  
  Add as AddIcon,
  AttachMoney as AttachMoneyIcon,
  CreditCard as CreditCardIcon,
  TrendingDown, 
} from '@mui/icons-material';
import { analyticsData, iconComponents, incomeCategories, outgoingCategories } from '@/constants/analytic-data';



const AnalyticDataReport = () => { 
   const [lastUpdated, setLastUpdated] = useState('');
    const [incomeDialogOpen, setIncomeDialogOpen] = useState(false);
    const [outgoingDialogOpen, setOutgoingDialogOpen] = useState(false);
    const [newEntry, setNewEntry] = useState<{ 
      source: string; 
      customSource: string;
      amount: string; 
      id: number | null;
    }>({ 
      source: '', 
      customSource: '',
      amount: '', 
      id: null 
    }); 
    
    const [incomeData, setIncomeData] = useState<{id:number,source:string,amount:number}[]>([
      { id: 1, source: 'Register Sales', amount: 3568.89 },
      { id: 2, source: 'Sales Tax', amount: 365.72 },
      { id: 3, source: 'Lotto', amount: 189.00 },
      { id: 4, source: 'Instant Lottery', amount: 256.00 },
    ]);
  
    const [outgoingData, setOutgoingData] = useState<{id:number,category:string,amount:number}[]>([
      { id: 1, category: 'Cash', amount: 1290.00 },
      { id: 2, category: 'Credit Card', amount: 2564.27 },
      { id: 3, category: 'Lotto Payout', amount: 825.00 },
      { id: 4, category: 'Bank Deposit', amount: 60.00 },
    ]); 
    
    const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
    const totalOutgoing = outgoingData.reduce((sum, item) => sum + item.amount, 0);
    const netBalance = totalIncome - totalOutgoing;

    useEffect(() => {
      const updateDateTime = () => {
        const now = new Date();
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
      if (!newEntry.source || !newEntry.amount) return;
      
      const amount = parseFloat(newEntry.amount);
      if (isNaN(amount)) return;
      
      const source = newEntry.source === 'Other' ? newEntry.customSource : newEntry.source;
      
      if (newEntry.id) {
        setIncomeData(incomeData.map(item => 
          item.id === newEntry.id ? { ...item, source, amount } : item
        ));
      } 
      else if (incomeData.some(item => item.source === source)) {
        setIncomeData(incomeData.map(item => 
          item.source === source ? { ...item, amount: item.amount + amount } : item
        ));
      } 
      else {
        setIncomeData([...incomeData, { 
          id: Date.now(),
          source, 
          amount 
        }]);
      }
      
      resetForm();
      setIncomeDialogOpen(false);
    };
  
    const handleAddOutgoing = () => {
      if (!newEntry.source || !newEntry.amount) return;
      
      const amount = parseFloat(newEntry.amount);
      if (isNaN(amount)) return;
      
      const category = newEntry.source === 'Other' ? newEntry.customSource : newEntry.source;
      
      if (newEntry.id) {
        setOutgoingData(outgoingData.map(item => 
          item.id === newEntry.id ? { ...item, category, amount } : item
        ));
      } 
      else if (outgoingData.some(item => item.category === category)) {
        setOutgoingData(outgoingData.map(item => 
          item.category === category ? { ...item, amount: item.amount + amount } : item
        ));
      } 
      else {
        setOutgoingData([...outgoingData, { 
          id: Date.now(),
          category, 
          amount 
        }]);
      }
      
      resetForm();
      setOutgoingDialogOpen(false);
    };
  
    const handleEditIncome = (item:{
    id: number;
    source: string;
    amount: number;
}) => {
      setNewEntry({
        source: incomeCategories.includes(item.source) ? item.source : 'Other',
        customSource: incomeCategories.includes(item.source) ? '' : item.source,
        amount: item.amount.toString(),
        id: item.id
      });
      setIncomeDialogOpen(true);
    };
  
const handleEditOutgoing = (item: {
  id: number;
  category: string;
  amount: number;
}) => {
      setNewEntry({
        source: outgoingCategories.includes(item.category) ? item.category : 'Other',
        customSource: outgoingCategories.includes(item.category) ? '' : item.category,
        amount: item.amount.toString(),
        id: item.id
      });
      setOutgoingDialogOpen(true);
    };
  
    const handleDeleteIncome = (id: number, e: React.MouseEvent) => {
      e.stopPropagation();
       
      setIncomeData(incomeData.filter(item => item.id !== id));
    }; 
  
    const handleDeleteOutgoing = (id:number, e: React.MouseEvent) => {
      e.stopPropagation();

      setOutgoingData(outgoingData.filter(item => item.id !== id));
    };
  
    const resetForm = () => {
      setNewEntry({ 
        source: '', 
        customSource: '',
        amount: '', 
        id: null 
      });
    };

  const [animatedValues, setAnimatedValues] = useState({
    income: 0,
    outgoing: 0,
    balance: 0
  });

  

  // Animate numbers on mount
  useEffect(() => {
    const duration = 800;
    const steps = 30;
    const stepTime = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedValues({
        income: totalIncome * easeOutQuart,
        outgoing: totalOutgoing * easeOutQuart,
        balance: netBalance * easeOutQuart
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedValues({
        income: totalIncome,
        outgoing: totalOutgoing,
        balance: netBalance
      });
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [totalIncome,totalOutgoing]);

  // Analytics data for charts


  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: {color:string,name:string,value:string}[];
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={12}
          sx={{
            p: 2,
            bgcolor: alpha('#000', 0.9),
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 2
          }}
        >
          <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
            {label}
          </Typography>
          {payload.map((entry: { color: string; name: string; value: string }, index: number) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: entry.color
                }}
              />
              <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                {entry.name}: 
                <Typography component="span" sx={{ color: 'white', fontWeight: 600, ml: 0.5 }}>
                  ${entry.value.toLocaleString()}
                </Typography>
              </Typography>
            </Box>
          ))}
        </Paper>
      );
    }
    return null;
  };

  const formatCurrency = (amount:number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  const FinancialCard = ({ title, amount, icon: Icon, trend, gradientColors }: { title: string; amount: number; icon: React.ElementType; trend: number; gradientColors: [string, string];color?:string }) => (
    <Card
      elevation={0}
      sx={{
        background: `linear-gradient(135deg, ${alpha(gradientColors[0], 0.1)}, ${alpha(gradientColors[1], 0.05)})`,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 3,
        transition: 'all 0.3s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
        //   boxShadow: `0 20px 40px ${alpha("black", 0.3)}`,
           boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        //   background: `linear-gradient(135deg, ${alpha(gradientColors[0], 0.15)}, ${alpha(gradientColors[1], 0.08)})`,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, ${gradientColors[0]}, ${gradientColors[1]})`,
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography 
            variant="overline" 
            sx={{ 
              color: '#9CA3AF', 
              fontWeight: 600,
              letterSpacing: 1
            }}
          >
            {title}
          </Typography>
          <Avatar
            sx={{
              bgcolor: alpha(gradientColors[0], 0.2),
              width: 40,
              height: 40
            }}
          >
            <Icon size={20} color={gradientColors[0]} />
          </Avatar>
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: amount < 0 ? '#EF4444' : 'white',
            mb: 2,
            fontFamily: 'monospace'
          }}
        >
          {amount < 0 ? '-' : ''}${formatCurrency(amount).replace('$', '')}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            icon={trend > 0 ? <TrendingUp size={14} /> : <TrendingDown sx={{fontSize:"14px"}} />}
            label={`${Math.abs(trend)}%`}
            size="small"
            sx={{
              bgcolor: trend > 0 ? alpha('#10B981', 0.2) : alpha('#EF4444', 0.2),
              color: trend > 0 ? '#10B981' : '#EF4444',
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: trend > 0 ? '#10B981' : '#EF4444'
              }
            }}
          />
          <Typography variant="caption" sx={{ color: '#6B7280' }}>
            vs last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  const ChartCard = ({ title, subtitle, icon: Icon, children, iconColor }: { title: string, subtitle: string, icon: React.ElementType, children?: React.ReactNode, iconColor?: string }) => {
    const safeIconColor = iconColor ?? '#000';
    return (
      <Card
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 3,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>
                {title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                {subtitle}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: alpha(safeIconColor, 0.2), width: 48, height: 48 }}>
              <Icon size={24} color={safeIconColor} />
            </Avatar>
          </Box>
          {children}
        </CardContent>
      </Card>
    );
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
      linear-gradient(rgba(35, 71, 142, 0.4) 1px, transparent 1px),
      linear-gradient(90deg, rgba(35, 76, 142, 0.33)1px, transparent 1px),
    #6c853e`,
    backgroundSize: '40px 40px',
    position: 'relative',
        overflow: 'hidden'
      }}
    > 
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
        }}
      /> 
      <Container maxWidth="xl" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FFFFFF, #93C5FD, #60A5FA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              letterSpacing: '-0.02em'
            }}
          >
            Financial Overview
          </Typography>
          <Typography variant="h6" sx={{ color: '#9CA3AF', fontWeight: 300, mb: 3 }}>
            Real-time insights into your financial performance
          </Typography>
          <Box
            sx={{
              width: 100,
              height: 1,
              mx: 'auto',
              background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)'
            }}
          />
        </Box>

        {/* Analytics Charts */}
        <Box sx={{ mb: 6 }}>
          <Box  sx={{
                display: 'flex',
                // flexWrap: 'wrap',
                gap: '32px',  
                '& > *': {
                flex: '1 1 calc(50% - 8px)', // equivalent to xs={6}
                minWidth: '300px' // prevents items from getting too small
                }
            }}>
            {/* Line Chart */}
            <Box sx={{width:{lg:"40%"}}}>
              <ChartCard
                title="Income vs Outcome Trend"
                subtitle="Monthly comparison over the year"
                icon={Activity}
                iconColor="#60A5FA"
              >
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        tickFormatter={(value) => `$${(value/1000).toFixed(1)}k`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="income" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#10B981' }}
                        name="Income"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="outcome" 
                        stroke="#EF4444" 
                        strokeWidth={3}
                        dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#EF4444' }}
                        name="Outcome"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </ChartCard>
            </Box>

            {/* Bar Chart */}
             {/* monthly chart */}
            <Box sx={{width:{lg:"40%"}}}>
              <ChartCard
                title="Monthly Financial Breakdown"
                subtitle="Detailed comparison of income, outcome, and net balance"
                icon={BarChart3}
                iconColor="#8B5CF6"
              >
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        tickFormatter={(value) => `$${(value/1000).toFixed(1)}k`}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        wrapperStyle={{ color: '#9CA3AF' }}
                        iconType="circle"
                      />
                      <Bar 
                        dataKey="income" 
                        fill="#10B981" 
                        name="Income"
                        radius={[4, 4, 0, 0]}
                        fillOpacity={0.8}
                      />
                      <Bar 
                        dataKey="outcome" 
                        fill="#EF4444" 
                        name="Outcome"
                        radius={[4, 4, 0, 0]}
                        fillOpacity={0.8}
                      />
                      <Bar 
                        dataKey="net" 
                        fill="#8B5CF6" 
                        name="Net Balance"
                        radius={[4, 4, 0, 0]}
                        fillOpacity={0.8}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </ChartCard>
            </Box>
          </Box>
        </Box>

        {/* Financial Cards */}
        <Box sx={{ mb: 6,gap:3,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center" ,flexWrap:"wrap"}}>
          <Box sx={{width:{xs:"100%",sm:"45%",md:"30%"}}}>
            <FinancialCard
              title="Total Income"
              amount={animatedValues.income}
              icon={TrendingUp}
              color="success"
              trend={12.5}
              gradientColors={['#10B981', '#059669']}
            />
          </Box>
          
          <Box sx={{width:{xs:"100%",sm:"45%",md:"30%"}}}>
            <FinancialCard
              title="Total Outgoing"
              amount={animatedValues.outgoing}
              icon={TrendingDown}
              color="warning"
              trend={-8.2}
              gradientColors={['#F59E0B', '#EF4444']}
            />
          </Box>
          
          <Box sx={{width:{xs:"100%",sm:"100%",md:"30%"}}}>
            <FinancialCard
              title="Net Balance"
              amount={animatedValues.balance}
              icon={AlertTriangle}
              color="error"
              trend={-15.7}
              gradientColors={['#EF4444', '#EC4899']}
            />
          </Box>
        </Box>

        {/* Status Footer */}
        <Box sx={{ textAlign: 'center' }}>
          <Paper
            elevation={0}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              px: 3,
              py: 1.5,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.47)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              borderRadius: 25
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#10B981',
    //               animation: 'pulse 2s infinite',
    //               '@keyframes pulse': {
    //     '0%': { opacity: 0.1 },
    //     '50%': { opacity: 0.4 },
    //     '100%': { opacity: 0.2 }
    //   } 
                }}
              />
              <Typography variant="caption" sx={{ color: '#D1D5DB' }}>
                Live Data
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#6B7280' }}>
              •
            </Typography>
            <Typography variant="caption" sx={{ color: '#D1D5DB' }}>
              Updated just now
            </Typography>
          </Paper>
        </Box>
      </Container>

<ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
           background: `
          linear-gradient(rgba(35, 71, 142, 0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(35, 76, 142, 0.33)1px, transparent 1px),
         #6c853e`,
          backgroundSize: '40px 40px',
          py: 3,
          color: 'text.primary',
        }}
      >
        <FloatingShapes />
        
        <Container maxWidth="xl">

          {/* Main Content */}
          <Box sx={{ mb: 4,gap:4,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center" }}>
            {/* Income Section */}
            <Box sx={{width:{xs:"100%",lg:"46%"}}}>
              <Paper
                elevation={10}
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.9))',
                  borderLeft: '4px solid #10b981',
                }}
              >
              <Box sx={{ display: 'flex',justifyContent:"space-between"}}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(16, 185, 129, 0.2)', 
                    mr: 2,
                    color: 'success.main'
                  }}>
                    <AttachMoneyIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h5">Income</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {incomeData.length} income sources
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{width:"45px",height:"45px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",
                    bgcolor: 'rgba(16, 185, 129, 0.2)',   color: 'success.main'}}>
             <TrendingUp   />
             </Box>
          </Box>
                <TableContainer component={Paper} sx={{ background: 'rgba(15, 23, 42, 0.5)' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.2), transparent)' }}>
                        <TableCell sx={{ fontWeight: 600 }}>Source</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        
                      {incomeData.map((row) => {
                        const IconComponent = iconComponents[row.source as keyof typeof iconComponents] || AttachMoneyIcon;
                        return (
                          <TableRow 
                            key={row.id}
                            hover
                            onClick={() => handleEditIncome(row)}
                            sx={{ 
                              cursor: 'pointer',
                              '&:last-child td': { borderBottom: 0 }
                            }}
                          >
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <IconComponent fontSize="small" color="action" />
                                {row.source}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ color: 'success.main', fontWeight: 700 }}>
                              ${row.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell>
                              <IconButton 
                                onClick={(e) => handleDeleteIncome(row.id, e)}
                                color="error"
                                size="small"
                                disabled={
                                  row.source === 'Register Sales' ||
                                  row.source === 'Sales Tax' ||
                                  row.source === 'Lotto' ||
                                  row.source === 'Instant Lottery'
                                }
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    resetForm();
                    setIncomeDialogOpen(true);
                  }}
                  sx={{
                    mt: 3,
                    background: 'linear-gradient(90deg, #10b981, #34d399)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #0d9f6e, #2bbd8a)',
                    },
                  }}
                  fullWidth
                >
                  Add Income Entry
                </Button>
              </Paper>
            </Box>

            {/* Outgoing Section */}
            <Box sx={{width:{xs:"100%",lg:"46%"}}}>
              <Paper
                elevation={10}
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.9))',
                  borderLeft: '4px solid #f59e0b',
                }}
              >
                 <Box sx={{ display: 'flex',justifyContent:"space-between" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(245, 158, 11, 0.2)', 
                    mr: 2,
                    color: 'warning.main'
                  }}>
                    <CreditCardIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h5">Outgoing</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {outgoingData.length} expense categories
                    </Typography>
                  </Box>
                 
                </Box>
                 <Box sx={{width:"45px",height:"45px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",
                    bgcolor: 'rgba(245, 158, 11, 0.2)', 
                    color: 'warning.main'}}>
             <PiggyBank   />
             </Box>
                 </Box>
                <TableContainer component={Paper} sx={{ background: 'rgba(15, 23, 42, 0.5)' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.2), transparent)' }}>
                        <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {outgoingData.map((row) => {
                        const IconComponent = iconComponents[row.category as keyof typeof iconComponents] || CreditCardIcon;
                        return (
                          <TableRow 
                            key={row.id}
                            hover
                            onClick={() => handleEditOutgoing(row)}
                            sx={{ 
                              cursor: 'pointer',
                              '&:last-child td': { borderBottom: 0 }
                            }}
                          >
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <IconComponent fontSize="small" color="action" />
                                {row.category}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ color: 'warning.main', fontWeight: 700 }}>
                              ${row.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </TableCell>
                            <TableCell> 
                                <span>
                                  <IconButton 
                                    onClick={(e) => handleDeleteOutgoing(row.id, e)}
                                    color="error"
                                    size="small"
                                    disabled={
                                      row.category === 'Cash'||
                                      row.category === 'Credit Card'||
                                      row.category === 'Lotto Payout'||
                                      row.category === 'Bank Deposit'
                                    }
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </span>
                          
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    resetForm();
                    setOutgoingDialogOpen(true);
                  }}
                  sx={{
                    mt: 3,
                    background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #d97706, #f59e0b)',
                    },
                  }}
                  fullWidth
                >
                  Add Outgoing Entry
                </Button>
              </Paper>
            </Box>
          </Box>

          {/* Footer */}
          <Paper
            elevation={10}
            sx={{
              p: 2,
              textAlign: 'center',
              background: 'rgba(30, 41, 59, 0.8)',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              🌿 Financial Management Dashboard • Last Updated: {lastUpdated}
            </Typography>
          </Paper>
        </Container>

        {/* Add Income Dialog */}
        <Dialog 
          open={incomeDialogOpen} 
          onClose={() => setIncomeDialogOpen(false)} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: {
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(30, 41, 59, 1))',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <DialogTitle sx={{ color: 'text.primary' }}>
            {newEntry.id ? 'Edit Income Entry' : 'Add Income Entry'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <TextField
                select
                fullWidth
                label="Income Source"
                value={newEntry.source}
                onChange={(e) => setNewEntry({ ...newEntry, source: e.target.value })}
                sx={{ mb: 2 }}
                variant="outlined"
                color="primary"
              >
                {incomeCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              
              {newEntry.source === 'Other' && (
                <TextField
                  fullWidth
                  label="Custom Source Name"
                  value={newEntry.customSource}
                  onChange={(e) => setNewEntry({ ...newEntry, customSource: e.target.value })}
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
              )}
              
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={newEntry.amount}
                onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
                variant="outlined"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setIncomeDialogOpen(false)}
              sx={{ color: 'text.secondary' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddIncome} 
              variant="contained"
              disabled={!newEntry.source || !newEntry.amount || (newEntry.source === 'Other' && !newEntry.customSource)}
              sx={{ 
                background: 'linear-gradient(90deg, #10b981, #34d399)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #0d9f6e, #2bbd8a)',
                },
              }}
            >
              {newEntry.id ? 'Update Entry' : 'Add Entry'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Outgoing Dialog */}
        <Dialog 
          open={outgoingDialogOpen} 
          onClose={() => setOutgoingDialogOpen(false)} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: {
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(30, 41, 59, 1))',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <DialogTitle sx={{ color: 'text.primary' }}>
            {newEntry.id ? 'Edit Outgoing Entry' : 'Add Outgoing Entry'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <TextField
                select
                fullWidth
                label="Expense Category"
                value={newEntry.source}
                onChange={(e) => setNewEntry({ ...newEntry, source: e.target.value })}
                sx={{ mb: 2 }}
                variant="outlined"
              >
                {outgoingCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              
              {newEntry.source === 'Other' && (
                <TextField
                  fullWidth
                  label="Custom Category Name"
                  value={newEntry.customSource}
                  onChange={(e) => setNewEntry({ ...newEntry, customSource: e.target.value })}
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
              )}
              
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={newEntry.amount}
                onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
                variant="outlined"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setOutgoingDialogOpen(false)}
              sx={{ color: 'text.secondary' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddOutgoing} 
              variant="contained"
              disabled={!newEntry.source || !newEntry.amount || (newEntry.source === 'Other' && !newEntry.customSource)}
              sx={{ 
                background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #d97706, #f59e0b)',
                },
              }}
            >
              {newEntry.id ? 'Update Entry' : 'Add Entry'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
    
    </Box>
  );
};

export default AnalyticDataReport;