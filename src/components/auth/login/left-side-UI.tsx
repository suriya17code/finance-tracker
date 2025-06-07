import { Character, FloatingCard, MiniChart, ChartLine } from '@/styles/animations/login'
import { CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const LeftsideComponent = () => {
  return (
    <>
     <Box sx={{ width: { xs: '100%', md: '40%' }, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', p: 5 }}>
              <Character >
                <Box component={"img"} src={"/assets/auth-v2-login-illustration-bordered-dark.png"} width={"345px"} sx={{marginTop:"40px"}}></Box>
              </Character>
              
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

    </>
  )
}

export default LeftsideComponent