import React, {useState, useEffect} from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png'

import { Link, useNavigate, useLocation} from 'react-router-dom';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
  const user = profile?.result || profile

  const logout = () => {
      dispatch({ type: "LOGOUT",});      
      navigate('/auth');
      setProfile(null)
  }

  useEffect(() => {
    const token = user?.token;
    if(token){
      const decodedToken = decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setProfile(JSON.parse(localStorage.getItem('profile')));

  }, [location])

  return(
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
          <img src={memoriesText} alt="icon" height="45" />
          <img className={classes.image} src={memoriesLogo} alt="icon" height="40" />
        </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.displayName} src={user?.photoURL} >{user?.displayName.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.displayName}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ): (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>

)

}

export default Navbar