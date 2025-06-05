import { CharacterContainer, Character, FloatingCard, MiniChart, ChartBar } from '@/styles/auth/register'
import { Slide, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const SignupRightside = () => {
  return (
    <>
      <Box sx={{ width: { xs: '100%', md: '45%' },}}>
                  <Slide direction="left" in timeout={1500}>
                    <Box sx={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CharacterContainer>
                        <Character variant="main" />
                        <Character variant="left" />
                        <Character variant="right" />
                      </CharacterContainer>
    
                      {/* Floating Cards */}
                      <FloatingCard purpose='goals'>
                        <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, opacity: 0.85 }}>
                          Financial Goals
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', my: 0.5 }}>
                          5 Active
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7, mb: 1, display: 'block' }}>
                          Emergency Fund: 80%
                        </Typography>
                        <MiniChart>
                          {[45, 75, 35, 85, 60].map((height, i) => (
                            <ChartBar key={i} height={height} delay={i * 0.1} />
                          ))}
                        </MiniChart>
                      </FloatingCard>
    
                      <FloatingCard purpose="budget">
                        <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, opacity: 0.85 }}>
                          Budget Tracker
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', my: 0.5 }}>
                          ₹45,280
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7, mb: 1, display: 'block' }}>
                          Remaining this month
                        </Typography>
                        <MiniChart>
                          {[35, 65, 45, 75, 55].map((height, i) => (
                            <ChartBar key={i} height={height} delay={i * 0.1} />
                          ))}
                        </MiniChart>
                      </FloatingCard>
    
                      <FloatingCard purpose="portfolio">
                        <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, opacity: 0.85 }}>
                          Investment Portfolio
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', my: 0.5 }}>
                          ₹2,45,670
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7, mb: 1, display: 'block' }}>
                          +12.5% this year
                        </Typography>
                        <MiniChart>
                          {[40, 70, 50, 80, 65, 90, 75].map((height, i) => (
                            <ChartBar key={i} height={height} delay={i * 0.1} />
                          ))}
                        </MiniChart>
                      </FloatingCard>
    
                      <FloatingCard purpose="analytics">
                        <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, opacity: 0.85 }}>
                          Smart Analytics
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', my: 0.5 }}>
                          AI Insights
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7, mb: 1, display: 'block' }}>
                          Save ₹5,200 more
                        </Typography>
                        <MiniChart>
                          {[50, 80, 60, 85, 70].map((height, i) => (
                            <ChartBar key={i} height={height} delay={i * 0.1} />
                          ))}
                        </MiniChart>
                      </FloatingCard>
                    </Box>
                  </Slide>
                </Box>
    </>
  )
}

export default SignupRightside