'use client';

import { Container, Box } from '@mui/material';
import { motion } from 'framer-motion';

import Shuffle from '@/components/Shuffle';

const MotionBox = motion(Box);


const Home = () => {
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
      <MotionBox
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          sx={{
            width: 250,
            height: 250,
            backgroundColor: 'primary.main',
            borderRadius: '50%',
            m: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img 
            src="/birb.svg" 
            alt="birb" 
            style={{ 
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }} 
          />
        </MotionBox>
     
        <Shuffle />
      </Box>
    </Container>
  );
}

export default Home;
