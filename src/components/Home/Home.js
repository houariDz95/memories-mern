import React, {useState } from 'react'
import { Container, Grow, Grid , Paper, AppBar, TextField, Button} from '@material-ui/core';
import {useNavigate, useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Form from '../form/Form';
import Posts from '../posts/Posts';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import { getPostsBySearch} from '../../actions/posts';
import Pagination from '../Pagination';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


const Home = () => {
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState('');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const classes = useStyles();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const handelKeyPress = (e) => {
    if(e.KeyCode === 13){

    }
  }
  const searchPost = () => {
    if(search.trim() || tags){
    dispatch(getPostsBySearch({search, tags: tags.join(',')}))
    navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    }else {
      navigate('/')
    }
  }
  const handelAdd = (tag) => setTags([...tags, tag]);
  const handelDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
  return (
    <Grow in>
        <Container maxWidth="xl">
          <Grid container   justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField 
                name="search" 
                variant="outlined" 
                label="Search Memories"
                fullWidth
                value={search}
                onKeyPress={handelKeyPress}
                onChange={(e) => setSearch(e.target.value)} />
                <ChipInput 
                style={{ margin: '10px 0'}}
                value={tags}
                onAdd={handelAdd}
                onDelete={handelDelete}
                label="Search Tags"
                variant="outlined"
                />
                <Button className={classes.searchButton} onClick={searchPost} variant="contained" color="primary">Search</Button>
              </AppBar>
              <Form setCurrentId={setCurrentId} currentId={currentId} />
              {(!searchQuery && !tags.length) && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    ) 
}

export default Home