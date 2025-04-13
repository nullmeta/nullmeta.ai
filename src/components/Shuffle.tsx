import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";
import { shuffle } from "../utilities/shuffle";
import { useAlerts } from "@/context/AlertContext";
import { useTheme as useCustomTheme } from '@/context/ThemeContext';
const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300,
  };
  
  const containerStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    position: "relative",
    display: "grid",
    gridTemplateRows: "repeat(2, 1fr)",
    gap: "0.5em",
    placeItems: "center",
  } as const;
  
  const letterStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2em",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "1",
  } as const;
  
  interface Combo {
    letters: { char: string; id: number }[];
    message?: string;
    points?: number;
    reset?: boolean;
    wrap?: number;
  }
  
  const combos = [{
    letters: [
      { char: "n", id: 0 },
      { char: "u", id: 1 },
      { char: "l", id: 2 },
      { char: "l", id: 3 },
      { char: "m", id: 4 },
      { char: "e", id: 5 },
      { char: "t", id: 6 },
      { char: "a", id: 7 }
    ]},
    {
      reset: true,
      points: 9000,
      message: `for the casuals`,
      letters: [
        { char: "f", id: 0 },
        { char: "u", id: 1 },
        { char: "l", id: 2 },
        { char: "l", id: 3 },
        { char: "b", id: 4 },
        { char: "e", id: 5 },
        { char: "t", id: 6 },
        { char: "a", id: 7 }
      ]},
    {
      points: 100000000,
      message: `business in the front, party in the back`,
      letters: [{ char: "a", id: 0 },
      { char: "n", id: 1 },
      { char: " ", id: 2 },
      { char: " ", id: 3 },
      { char: " ", id: 4 },
      { char: " ", id: 5 },
      { char: "m", id: 6 },
      { char: "u", id: 7 },
      { char: "l", id: 8 },
      { char: "l", id: 9 },
      { char: "e", id: 10 },
      { char: "t", id: 11 }],
      wrap: 6,
      reset: true
    },
    {
      points: 1000,
      message: `lol whats a lune`,
      letters: [{ char: "m", id: 0 },
      { char: "a", id: 1 },
      { char: "l", id: 2 },
      { char: "t", id: 3 },
      { char: "l", id: 4 },
      { char: "u", id: 5 },
      { char: "n", id: 6 },
      { char: "e", id: 7 }]
    },
    {
      points: 10000,
      message: `muzaak`,
      letters: [{ char: "m", id: 0 },
      { char: "a", id: 1 },
      { char: "l", id: 2 },
      { char: "l", id: 3 },
      { char: "t", id: 4 },
      { char: "u", id: 5 },
      { char: "n", id: 6 },
      { char: "e", id: 7 }]
    },
    {
      points: 5000,
      message: `something's fishy...`,
      letters: [{ char: "t", id: 0 },
      { char: "u", id: 1 },
      { char: "n", id: 2 },
      { char: "a", id: 3 },
      { char: "m", id: 4 },
      { char: "e", id: 5 },
      { char: "l", id: 6 },
      { char: "t", id: 7 }],
      reset: true
    },
    {
      points: 11000,
      message: `for tall orders`,
      letters: [{ char: "t", id: 0 },
      { char: "a", id: 1 },
      { char: "l", id: 2 },
      { char: "l", id: 3 },
      { char: "m", id: 4 },
      { char: "e", id: 5 },
      { char: "n", id: 6 },
      { char: "u", id: 7 }]
    },
    {
      points: 1,
      message: `cheater!`,
      letters: [{ char: "a", id: 0 },
      { char: "m", id: 1 },
      { char: "u", id: 2 },
      { char: "l", id: 3 },
      { char: "e", id: 4 },
      { char: "t", id: 5 }],
      wrap: 6,
      reset: true
    }
  ];

const Shuffle = () => {
  const [letters, setLetters] = useState(combos[0].letters);
  const [shuffleCount, setShuffleCount] = useState(0);
  const [currentCombo, setCurrentCombo] = useState<Combo | null>(null);

  const { showAlert } = useAlerts();
  const { isDarkMode } = useCustomTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (shuffleCount % 3 === 2) {
        const randomCombo = combos[Math.floor(Math.random() * combos.length)];
        setCurrentCombo(randomCombo);
        setLetters(randomCombo.letters);

        if (typeof randomCombo.points === 'number') {
          showAlert({ message: `${randomCombo.points} points!`, severity: 'success', source: 'application' });
        }
        if (randomCombo.message) {
          setTimeout(() => {
            showAlert({ message: randomCombo.message, severity: 'info', source: 'application' });
          }, 500);
        }
      } else {
        if (currentCombo?.reset) {
          // Directly set to base letters for reset combos
          setLetters(combos[0].letters);
        } else {
          // Animate back to base letters for non-reset combos
          const baseLetters = combos[0].letters;
          const shuffledLetters = shuffle([...baseLetters]);
          setLetters(shuffledLetters);
        }
        setCurrentCombo(null);
      }
      setShuffleCount(prev => prev + 1);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [letters, shuffleCount, showAlert, currentCombo]);
  const dynamicContainerStyle = {
    ...containerStyle,
    gridTemplateColumns: currentCombo?.wrap 
      ? `repeat(${currentCombo.wrap}, 1fr)`
      : "repeat(4, 1fr)",
    gridTemplateRows: currentCombo?.wrap 
      ? `repeat(${Math.ceil(letters.length / currentCombo.wrap)}, 1fr)`
      : "repeat(2, 1fr)"
  };
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      duration: 2.5,
      delay: 0.5,
      ease: "easeOut"
    }}
  >
    <Typography
      variant="h2"
      component="h1"
      gutterBottom
      sx={{
        color: isDarkMode ? '#1e1e1e' : 'inherit',
      }}
    >
      <motion.ul style={dynamicContainerStyle}>
        {letters.map(({ char, id }) => (
          <motion.li
            key={id}
            layout
            transition={spring}
            style={{
              ...letterStyle,
              color: isDarkMode ? 'white' : 'black',
            }}
          >
            {char}
          </motion.li>
        ))}
      </motion.ul>
    </Typography>
  </motion.div>
  );
};  

export default Shuffle;