import React, { useState } from 'react';
import {
  Grid, TextField, Button, Typography,
} from '@mui/material';

function App() {
  const [len, setLen] = useState(14);
  const [password, setPassword] = useState('p@ssw0rd');
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
    for (let i = 0; i < l; i += 1) {
      const setIdx = Math.floor(Math.random() * 4);
      const charIdx = Math.floor(Math.random() * sets[setIdx].length);
      let char = sets[setIdx].charAt(charIdx);
      if (i % 2 === 0) char = char.toUpperCase();
      pwd += char;
    }
    return pwd;
  };

  const isValid = (pwd: string) => {
    const valid = [false, false, false, false];
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

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3} style={{ maxWidth: '400px' }}>
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
            <TextField
              id="outlined-number"
              label="Length"
              type="number"
              InputProps={{ inputProps: { min: 8, max: 100 } }}
              InputLabelProps={{
                shrink: true,
              }}
              value={len}
              onChange={handleLenChange}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleSubmit}>Generate</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
