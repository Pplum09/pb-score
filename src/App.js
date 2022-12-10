import './App.css';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Confetti from 'react-confetti'



function App() {
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [serve, setServe] = useState(false);
  const [side, setSide] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [runConfetti, setRunConfetti] = useState(false);

  useEffect(() => {
    isGameOver();
  });

  const isGameOver = () => {
    let message = 'BLAH BOOM';
    if (score1 == 11 && score2 <=9) {
      message = 'Home team wins!';
    } else if (score2 == 11 && score1 <=9) {
      message = 'Away team wins!';
    } else if (score1 > 11 && score1 - score2 >= 2) {
      message = 'Home team wins!';
    } else if (score2 > 11 && score2 - score1 >= 2) {
      message = 'Away team wins!';
    } else {
      return;
    }
    setRunConfetti(true);
    setDialogOpen(true);
  }

  const scoreUp = (score, callback) => {
    callback(score + 1);
  }
  const scoreDown = (score, callback) => {
    if (score >= 1) callback(score - 1);
  }
  const handlePoint = (isHome) => {
    if (isHome === side) {
      isHome ? scoreUp(score1, setScore1) : scoreUp(score2, setScore2);
    } else {
      if (!serve) {
        setSide(!side);
        setSnackOpen(true);
      }
      setServe(!serve);
    }
  }

  const resetState = () => {
    setScore1(0);
    setScore2(0);
    setServe(false);
    setSide(true);
    setSnackOpen(false);
    setDialogOpen(false);
    setRunConfetti(false);
  }

  const handleDialogClose = () => {
    resetState();
    setDialogOpen(false);
  }

  return (
    <div className="App">
          <Confetti run={runConfetti} recycle={false}/>
      <div className="top">
        <div className="container">
          <div className="section">
            <h1 style={{color: 'green'}}>Home {score1}</h1>
            <Button
              variant="contained"
              startIcon={<ArrowDownwardIcon />}
              onClick={() => scoreDown(score1, setScore1)}></Button>
            <Button
              variant="contained"
              startIcon={<ArrowUpwardIcon />}
              onClick={() => scoreUp(score1, setScore1)}></Button>
            <Button variant="contained" startIcon={<ControlPointIcon />} onClick={() =>handlePoint(true)}></Button>
          </div>

          <div className="section">
            <h1 style={{color: 'red'}}>Away {score2}</h1>
            <Button
              variant="contained"
              startIcon={<ArrowDownwardIcon />}
              onClick={() => scoreDown(score2, setScore2)}></Button>
            <Button
              variant="contained"
              startIcon={<ArrowUpwardIcon />}
              onClick={() => scoreUp(score2, setScore2)}></Button>
            <Button variant="contained" startIcon={<ControlPointIcon />} onClick={() =>handlePoint(false)}></Button>
          </div>
        </div>
      </div>
      <div className="bottom">
        <h1 style={{color: side ? 'green' : 'red'}}>{side ? score1 : score2} - {side ? score2 : score1} - {serve ? 1 : 2}</h1>
        <Button variant="contained" onClick={resetState}>Reset</Button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message={side ? "Home now serving!" : "Away now serving!"}></Snackbar>

      <Dialog open={dialogOpen}>
        <DialogTitle>
          {side ? "Home team wins!" : "Away team wins!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {side ? score1 : score2} - {side ? score2 : score1} - {serve ? 1 : 2}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Reset</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
