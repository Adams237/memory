import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'


import useStyles from './styles'
import { commentPost } from '../../actions/posts'

function CommentSection({ post }) {
    const classes = useStyles()
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const dispach = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const commentsRef = useRef()


    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`
        const newComment = await dispach(commentPost(finalComment, post._id))
        setComments(newComment)
        setComment('')
        commentsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div className={classes.commentsOuterContainer} >
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant='h6'>Comments</Typography>
                {comments.map((comment, index) => (
                    <Typography key={index} gutterBottom variant='subtitle1'>
                        <strong>{comment.split(': ')[0]}</strong>
                        { comment.split(':')[1] }
                    </Typography>
                ))}
                <div ref={commentsRef}/>
            </div>
            {user?.result?.name && (
                <div style={{ width: '70%' }}>
                    <Typography gutterBottom variant='h6'>Write comment</Typography>
                    <TextField
                        fullWidth
                        rows={4}
                        variant='outlined'
                        label='comment'
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{ marginTop: '10px', cursor: 'pointer' }} color='primary' fullWidth disabled={!comment} variant="contained" onClick={handleClick}>
                        Comment
                    </Button>
                </div>
            )}

        </div>
    )
}

export default CommentSection