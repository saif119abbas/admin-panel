import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  useTheme
} from '@mui/material';

const LoginFrequencyChart = () => {
  const [timeFilter, setTimeFilter] = useState('Monthly');
  const theme = useTheme();

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setTimeFilter(newFilter);
    }
  };

  const loginData = [
    { month: 'JAN', value: 22 },
    { month: 'FEB', value: 26 },
    { month: 'MAR', value: 35 },
    { month: 'APR', value: 21 },
    { month: 'MAY', value: 20 },
    { month: 'JUN', value: 30 },
    { month: 'JUL', value: 30 },
    { month: 'AUG', value: 21 },
    { month: 'SEP', value: 30 },
    { month: 'OCT', value: 38 },
    { month: 'NOV', value: 40 },
    { month: 'DEC', value: 26 }
  ];

  const maxValue = 50; // Fixed max value as shown in the image

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        bgcolor: 'background.paper',
        width: '100%',
        maxWidth: 800,
        mx: 'auto'
      }}
    >
      {/* Header with title and filter buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Login Frequency
        </Typography>
        
        <ToggleButtonGroup
          value={timeFilter}
          exclusive
          onChange={handleFilterChange}
          aria-label="time filter"
          size="small"
        >
          {['Weekly', 'Monthly', 'Yearly'].map((period) => (
            <ToggleButton
              key={period}
              value={period}
              sx={{
                px: 2,
                py: 0.5,
                fontSize: '0.75rem',
                fontWeight: 500,
                textTransform: 'none',
                border: 'none',
                color: timeFilter === period ? 'white' : 'grey.600',
                bgcolor: timeFilter === period ? 'grey.900' : 'grey.100',
                '&:hover': {
                  bgcolor: timeFilter === period ? 'grey.800' : 'grey.200'
                },
                '&:not(:first-of-type)': {
                  ml: 0.5
                }
              }}
            >
              {period}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Chart Container */}
      <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
        {/* Y-axis labels */}
        <Box sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          pr: 1,
          width: 30
        }}>
          {[50, 40, 30, 20, 10, 0].map((value) => (
            <Typography
              key={value}
              variant="caption"
              sx={{
                color: 'grey.500',
                fontSize: '0.75rem',
                fontWeight: 400
              }}
            >
              {value}
            </Typography>
          ))}
        </Box>

        {/* Chart Area */}
        <Box sx={{ ml: 4, height: '100%', position: 'relative' }}>
          {/* Grid lines */}
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            {[0, 10, 20, 30, 40, 50].map((line, index) => (
              <Box
                key={line}
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `${(line / 50) * 100}%`,
                  height: '1px',
                  bgcolor: index === 0 ? 'transparent' : 'grey.100',
                  transform: 'translateY(-50%)'
                }}
              />
            ))}
          </Box>

          {/* SVG Chart */}
          <svg width="100%" height="100%" viewBox="0 0 600 160">
            <defs>
              <linearGradient id="loginGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Area fill */}
            <path
              d={`M 0 ${160 - (loginData[0].value / maxValue) * 160} ${loginData.map((point, index) => 
                `L ${(index / (loginData.length - 1)) * 600} ${160 - (point.value / maxValue) * 160}`
              ).join(' ')} L 600 160 L 0 160 Z`}
              fill="url(#loginGradient)"
            />
            
            {/* Line */}
            <polyline
              points={loginData.map((point, index) => 
                `${(index / (loginData.length - 1)) * 600},${160 - (point.value / maxValue) * 160}`
              ).join(' ')}
              fill="none"
              stroke="#06B6D4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            
            {/* Data points */}
            {loginData.map((point, index) => (
              <circle
                key={index}
                cx={(index / (loginData.length - 1)) * 600}
                cy={160 - (point.value / maxValue) * 160}
                r="3"
                fill="#06B6D4"
                stroke="white"
                strokeWidth="2"
              />
            ))}
            
            {/* Peak indicator for NOV */}
            <circle
              cx={(10 / (loginData.length - 1)) * 600}
              cy={160 - (40 / maxValue) * 160}
              r="6"
              fill="#1f2937"
              stroke="white"
              strokeWidth="2"
            />
            <text
              x={(10 / (loginData.length - 1)) * 600}
              y={160 - (40 / maxValue) * 160 - 12}
              textAnchor="middle"
              style={{
                fontSize: '10px',
                fontWeight: '600',
                fill: '#1f2937'
              }}
            >
              40
            </text>
          </svg>

          {/* X-axis labels */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 0.5,
            px: 0.5
          }}>
            {loginData.map((point) => (
              <Typography
                key={point.month}
                variant="caption"
                sx={{
                  color: 'grey.500',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  flex: 1,
                  textAlign: 'center',
                  minWidth: 0
                }}
              >
                {point.month}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default LoginFrequencyChart;