import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  Modal,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Switch,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

const settingsStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 220,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [len, setLen] = useState(14);
  const [password, setPassword] = useState('p@ssw0rd');
  const [openSettings, setOpenSettings] = useState(false);
  const [needsUpper, setNeedsUpper] = useState(true);
  const [needsNums, setNeedsNums] = useState(true);
  const [needsSpecial, setNeedsSpecial] = useState(true);
  const sets = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789', '!"#$%&\'()*+,-./:;=?@[]\\^_{}|~'];

  const generate = () => {
    let l = len;
    if (l < 8) {
      l = 8;
      setLen(l);
    } else if (len > 100) {
      l = 100;
      setLen(l);
    }
    let pwd = '';
    const currentSets = [true, needsUpper, needsNums, needsSpecial];
    for (let i = 0; i < l; i += 1) {
      let setIdx = Math.floor(Math.random() * 4);
      while (!currentSets[setIdx]) {
        setIdx = Math.floor(Math.random() * 4);
      }
      const charIdx = Math.floor(Math.random() * sets[setIdx].length);
      pwd += sets[setIdx].charAt(charIdx);
    }
    return pwd;
  };

  const isValid = (pwd: string) => {
    const valid = [false, !needsUpper, !needsNums, !needsSpecial];
    for (let i = 0; i < pwd.length; i += 1) {
      if (sets[0].includes(pwd.charAt(i))) valid[0] = true;
      else if (sets[1].includes(pwd.charAt(i))) valid[1] = true;
      else if (sets[2].includes(pwd.charAt(i))) valid[2] = true;
      else if (sets[3].includes(pwd.charAt(i))) valid[3] = true;
    }
    return !valid.includes(false);
  };

  const handleSubmit = () => {
    let pwd = '';
    while (!isValid(pwd)) {
      pwd = generate();
    }
    setPassword(pwd);
  };

  const handleLenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLen(parseInt(event.target.value, 10));
  };

  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  const handleChangeUpper = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsUpper(event.target.checked);
  };

  const handleChangeNums = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsNums(event.target.checked);
  };

  const handleChangeSpecial = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsSpecial(event.target.checked);
  };

  return (
    <>
      <IconButton color="primary" aria-label="settings" style={{ position: 'absolute', top: '10px', right: '10px' }} size="large" onClick={handleOpenSettings}>
        <SettingsIcon fontSize="inherit" />
      </IconButton>
      <Modal
        open={openSettings}
        onClose={handleCloseSettings}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={settingsStyle}>
          <IconButton style={{ position: 'absolute', top: '5px', right: '5px' }} onClick={handleCloseSettings}>
            <CloseIcon />
          </IconButton>
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Password constraints</FormLabel>
            <FormGroup>
              <FormControlLabel control={<Switch onChange={handleChangeUpper} checked={needsUpper} />} label="Uppercase letters" />
              <FormControlLabel control={<Switch onChange={handleChangeNums} checked={needsNums} />} label="Numbers" />
              <FormControlLabel control={<Switch onChange={handleChangeSpecial} checked={needsSpecial} />} label="Special chars" />
              <TextField
                id="outlined-number"
                label="Length"
                type="number"
                variant="standard"
                InputProps={{ inputProps: { min: 8, max: 100 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={len}
                onChange={handleLenChange}
                style={{ marginTop: '5px' }}
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Modal>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3} style={{ maxWidth: '400px', padding: '0 10px' }}>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4" style={{ wordBreak: 'break-all', marginBottom: '10px' }}>{password}</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleSubmit}>Generate</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
