import React, {useEffect} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { useDispatch, useSelector} from 'react-redux';

import { getPosts } from '../actions/posts';

import { Link } from 'react-router-dom';

import useStyles from './styles';

const Paginate = ({page}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts)

  useEffect(() => {
    if(page) dispatch(getPosts(page))
  }, [page])
  
  return (
    <Pagination 
      classes={{ ul: classes.ul}}
      count={numberOfPages}
      page={Number(page)}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  )
}

export default Paginate