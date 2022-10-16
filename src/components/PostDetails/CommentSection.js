import React, {useRef, useState} from 'react';
import {Typography, TextField, Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';

import useStyles from './styles';
import { commentPost} from '../../actions/posts';

const CommentSection = ({post}) => {
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'))?.result || JSON.parse(localStorage.getItem('profile'));
  const commentRef = useRef()
  const dispatch = useDispatch();
  const classes = useStyles();

  const handelClick = async () => {
    const finalComment = `${user.displayName} : ${comment}`;
    const newComment = await dispatch(commentPost(finalComment, post._id));
    setComments(newComment);
    setComment('')
    commentRef.scrollIntoView({ behavior: 'smooth'})
  }

  return(
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterButtom variant="h6">Comments</Typography>
          {comments.map((comment, i) => (
            <Typography key={i} gutterButtom variant="subtitle1">
               <strong>{comment.split(': ')[0]}</strong>
              {comment.split(':')[1]} 
            </Typography>
          ))}
        </div>
        <div ref={commentRef}></div>
        {user?.displayName && (
          <div style={{ width: '70%'}}>
            <Typography variant="h6" gutterButtom>Write A Comment</Typography>
            <TextField 
              fullWidth 
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button 
            style={{ marginTop: '10px'}} 
            fullWidth 
            disabled={!comment} 
            variant="contained" 
            onClick={handelClick}
            color="primary"
            >COMMENT</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentSection