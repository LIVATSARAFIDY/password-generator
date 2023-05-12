// import logo from './logo.svg';
// import './App.css';
import {useState, useRef, useEffect} from 'react'
import {Container, Box, Grid, Typography, IconButton, Tooltip, Slider, Alert, Snackbar,
  FormControl, RadioGroup, Radio, FormControlLabel, Checkbox, FormGroup, TextField} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CachedIcon from '@mui/icons-material/Cached';
import InfoIcon from '@mui/icons-material/Info';
const App = ()=>{
  const majChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const minChar = 'abcdefghijklmnopqrstuvwxyz'
  const numberChar = '1234567890'
  const sepcialChar = `[!@#$%^&*()_+\-=[]{};':"|,.<>/?]`
  const passToCopy = useRef(null)
  const [open, setOpen] = useState(false)
  const [passGenerated, setPassGenerated] = useState('')
  const [type, setType] = useState(1)
  const [nbChar, setNbChar] = useState(12)
  const [maj,setMaj] = useState(true)
  const [min,setMin] = useState(true)
  const [chiffre,setChiffre] = useState(false)
  const [symbole,setSymbole] = useState(false)

  useEffect(() => {},[])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  const handleChange = (e,value) => {
    setType(+value)
  }

  const changeNbChar = (e) => {
    const value = parseInt(e.target.value)
    if(value >= 12 && value<=45){
      setNbChar(parseInt(e.target.value))
    }
  }
  
  const generatePass = () => {
    if(type === 1){// que des lettres
      let passTem = ''
      let i = 0
      while(i < nbChar){
        const cotinueLoop = Math.random() < 0.5
        if(maj){
          if(cotinueLoop) continue
          let randomNumberCharcter = Math.floor(Math.random() * majChar.length)
          passTem += majChar.substring(randomNumberCharcter,randomNumberCharcter+1)
          i++
        }
        if(min){
          if(cotinueLoop) continue
          let randomNumberCharcter = Math.floor(Math.random() * minChar.length)
          passTem += minChar.substring(randomNumberCharcter,randomNumberCharcter+1)
          i++
        }
      }
      setPassGenerated(passTem)
    }
    else if(type === 2){ // eviter les caractères ambigus
      let passTem = ''
      while(passTem.length < nbChar){
        const continueIterationMajChar = Math.random() < 0.6
        const continueIterationMinChar = Math.random() < 0.6
        const continueIterationNumber = Math.random() < 0.4
        const continueIterationSymbole = Math.random() < 0.4
        if(maj){
          if(continueIterationMajChar) continue
          let randomNumberCharcter = Math.floor(Math.random() * majChar.length)
          passTem += majChar.substring(randomNumberCharcter,randomNumberCharcter+1)
        }
        if(min){
          if(continueIterationMinChar) continue
          let randomNumberCharcter = Math.floor(Math.random() * minChar.length)
          passTem += minChar.substring(randomNumberCharcter,randomNumberCharcter+1)
         
        }
        if(chiffre){
          if(continueIterationNumber) continue
          let randomNumberCharcter = Math.floor(Math.random() * numberChar.length)
          passTem += numberChar.substring(randomNumberCharcter,randomNumberCharcter+1)
       
        }
        if(symbole){
          if(continueIterationSymbole) continue
          let randomNumberCharcter = Math.floor(Math.random() * sepcialChar.length)
          passTem += sepcialChar.substring(randomNumberCharcter,randomNumberCharcter+1)
 
        }
        const regex = /0O|O0|1i|i1|I1|1I|l1|1l|5S|S5|8B|B8/g
        passTem.replace(regex,'')
      }
      setPassGenerated(passTem)
    }
    else if(type == 3){
      

      let passTem = ''
      let i = 0
      while(i < nbChar){
        const continueIterationMajChar = Math.random() < 0.6
        const continueIterationMinChar = Math.random() < 0.6
        const continueIterationNumber = Math.random() < 0.4
        const continueIterationSymbole = Math.random() < 0.4
        if(maj){
          if(continueIterationMajChar) continue
          let randomNumberCharcter = Math.floor(Math.random() * majChar.length)
          passTem += majChar.substring(randomNumberCharcter,randomNumberCharcter+1)
          i++
        }
        if(min){
          if(continueIterationMinChar) continue
          let randomNumberCharcter = Math.floor(Math.random() * minChar.length)
          passTem += minChar.substring(randomNumberCharcter,randomNumberCharcter+1)
          i++
        }
        if(chiffre){
          if(continueIterationNumber) continue
          let randomNumberCharcter = Math.floor(Math.random() * numberChar.length)
          passTem += numberChar.substring(randomNumberCharcter,randomNumberCharcter+1)
          i++
        }
        if(symbole){
          if(continueIterationSymbole) continue
          let randomNumberCharcter = Math.floor(Math.random() * sepcialChar.length)
          passTem += sepcialChar.substring(randomNumberCharcter,randomNumberCharcter+1)
          i++
        }
      }
      setPassGenerated(passTem)
    }
  }
  const copyPassword =  () => {
    navigator.clipboard.writeText(passToCopy.current.innerText)
    .then(_ => { console.log('text copié avec succé'); setOpen(true)})
    .catch(error => console.log('error = ',error))
  }
  return (
    <Container sx={{mt: 10}}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Le mot de passe a été copié
        </Alert>
      </Snackbar>
      <Box>
        <Grid container spacing={2} sx={{pt:5, pl:2 }}>
          <Grid item xs={6}>
              <Typography ref={passToCopy} variant='h4' gutterBottom>{passGenerated}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid  container justifyContent="flex-end" >
              <Tooltip title='Copier'>
                <IconButton 
                  onClick={ copyPassword }
                  sx={{position:'relative' , bottom:12 }}
                >
                  <ContentCopyIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Générer">
                <IconButton 
                  sx={{position:'relative' , bottom:12 }}
                  onClick={ generatePass }
                >
                  <CachedIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          
        </Grid>
      </Box>
      <Box sx={{  mt:2}} >
        <Typography variant='h5' gutterBottom sx={{fontWeight:'900', pb:1, borderBottom:'2px solid black', mb:3}} >
          Personnalisez votre mot de passe
        </Typography>
        <Grid container spacing={2} sx={{ pl:2 }}>
          <Grid item xs={12} lg={4}>
            <Typography>Longeur du mot de passe</Typography>
            <TextField
              type='number'
              value={nbChar}
              onChange={(e) => changeNbChar(e) }
            >

            </TextField>
            <Slider 
              defaultValue={8} 
              value={nbChar}
              aria-label="Default" 
              valueLabelDisplay="auto" 
              color="secondary"
             
              max={45}
              onChange={ (e) => changeNbChar(e)  }
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={type}
                onChange={ handleChange }
              >
                <span style={{display:'inline-block'}}>
                  <FormControlLabel value={1} control={<Radio />} label="Facile à dire" /> 
                  <Tooltip title="Evitez les chiffres et les caractères péciaux"  placement="right-start">
                    <InfoIcon sx={{position:'relative', top:8}} />
                  </Tooltip>
                </span>
                <span style={{display:'inline-block'}}>
                  <FormControlLabel value={2} control={<Radio />} label="Facile à lire" />  
                  <Tooltip title="Evitez caractères ambigus consecutif comme O, 0 et o"  placement="right-start">
                    <InfoIcon sx={{position:'relative', top:8}} />
                  </Tooltip>
                </span>
                <span style={{display:'inline-block'}}>
                  <FormControlLabel value={3} control={<Radio />} label="Tous les caractères" />
                  <Tooltip title="Toute combinaisons de caractères"  placement="right-start">
                    <InfoIcon sx={{position:'relative', top:8}} />
                  </Tooltip>
                </span>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={4}>
            <FormGroup>
              <FormControlLabel 
                control={
                  <Checkbox checked={maj} onChange={() => setMaj(!maj)} />
                } 
                label="Majuscule" 
              />
              <FormControlLabel 
                control={
                  <Checkbox checked={min} onChange={() => setMin(!min)} />
                } 
                label="Minuscule" 
              />
              <FormControlLabel 
                control={
                  <Checkbox checked={chiffre} disabled={(type === 1) ? true : false} onChange={() => setChiffre(!chiffre)} />
                } 
                label="Chiffre" 
              />
              <FormControlLabel 
                control={
                  <Checkbox checked={symbole} disabled={(type === 1) ? true : false} onChange={() => setSymbole(!symbole)}/>
                } 
                label="Symboles" 
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
