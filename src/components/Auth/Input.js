import React from 'react'
import { Grid, InputAdornment, IconButton, TextField} from '@material-ui/core';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({name, handelChange, label, half, autoFocus, type, handelShowPassword}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}> 
      <TextField 
        name={name}
        onChange={handelChange}
        variant="outlined"
        fullWidth
        required
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={name === 'password' ? {
          endAdornment : (
            <InputAdornment position="end">
              <IconButton onClick={handelShowPassword}>
                {type === "password" ? <Visibility /> : <VisibilityOff /> }
              </IconButton>
            </InputAdornment>
          ),  
        } : null }
      />
    </Grid>
  )
}

export default Input

// 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