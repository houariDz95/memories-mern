import React,{useState} from 'react'
import { Container, Avatar, Paper, Button , Typography, Grid} from "@material-ui/core"; 
import useStyles from './styles';
import Input from './Input';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signIn, signUp} from '../../actions/auth';
import Icon from './Icon'

const initialState = { firstName: '', lastName: '', password: '', confirmPassword: '', email: ''}

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState)
  const  classes = useStyles();
const history = useNavigate();
  const dispatch = useDispatch();

  const handelSubmit = (e) => {
    e.preventDefault();
    if(isSignup){
      dispatch(signUp(formData, history));
    }else {
      dispatch(signIn(formData, history));
    }
  }

  const handelChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const switchMode = () => {
    setIsSignup((prev) => !prev)
    setShowPassword(false);
  }
  const handelShowPassword = () => setShowPassword((prev) => !prev);

  const googleSuccess = async (res) => {
    signInWithPopup(auth, provider)
    .then((result) => {
      history('/');
      console.log(result)
      dispatch({type: "AUTH", data: result = { 
        token: result.user.stsTokenManager.accessToken,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        googleId: result.user.uid,
      }})
    });
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar} >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handelSubmit}>
          <Grid container spacing={2}>
          {
            isSignup && (
              <>
                  <Input name="firstName" label="First Name" handelChange={handelChange}  autoFocus half/>
                  <Input name="lastName" label="Last Name" handelChange={handelChange}  half/>
              </>
            )
          }
          <Input name="email" label="Email Adress" handelChange={handelChange} type="email"/>
          <Input name="password" label="Password" handelChange={handelChange} type={showPassword ? 'text' : 'password'} handelShowPassword={handelShowPassword} />
          {isSignup && <Input name="confirmPassword" label="Repeat Password" handelChange={handelChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Button className={classes.googleButton} 
              color="primary" 
              fullWidth 
              onClick={googleSuccess} 
              variant="contained"
              >
                <Icon />
                Google Sign In
              </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In' : "don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid> 
        </form>
      </Paper>
    </Container>
  )
}

export default Auth

// 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