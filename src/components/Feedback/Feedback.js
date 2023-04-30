import {Container, Divider, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Paper, Rating, Tooltip, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SendIcon from '@mui/icons-material/Send';

export default function Feedback() {
    const [value, setValue] = useState(0);
    const [review, setReview] = useState('');
    const [reviewsList, setReviewsList] = useState([]);

    useEffect(() => {
        const storedReviews = JSON.parse(localStorage.getItem('reviewsList'));
        if (storedReviews) {
            setReviewsList(storedReviews);
        }
    }, []);

    const handleReviewSubmit = () => {
        const newReview = { value, review };
        const updatedReviewsList = [...reviewsList, newReview];
        localStorage.setItem('reviewsList', JSON.stringify(updatedReviewsList));
        setValue(0);
        setReview('');
        setReviewsList(updatedReviewsList);
    };

    return (
        <Container sx={{ marginBottom: "2%"}}>
            <Typography variant="h6" component="h6" style={{ color: "#464E2E", marginBottom: "1%", marginTop: '1%' }}>
                Write a Review
            </Typography>
            <Paper variant='outlined' sx={{ padding: "2%" }}>
                <Typography component="legend">Rate the challenge</Typography>
                <Rating name="simple-controlled" value={value} precision={0.5}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    sx={{ color: "#ACB992" }}
                />
                <Grid>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                        <InputLabel htmlFor="review" sx={{ color: "#ACB992" }}>Write a Review</InputLabel>
                        <Input id="review" type='text' value={review} onChange={(e) => setReview(e.target.value)} endAdornment={
                            <InputAdornment position="end">
                                <Tooltip title="Upload Review">
                                    <IconButton aria-label="review" onClick={handleReviewSubmit}>
                                        <SendIcon />
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        }
                        />
                    </FormControl>
                </Grid>
            </Paper>
            {reviewsList.length > 0 && (
                <Paper variant='outlined' sx={{ padding: "2%", marginTop: '2%' }}>
                    <Typography variant="h6" component="h6" style={{ color: "#464E2E", marginBottom: "1%" }}>
                        Reviews
                    </Typography>
                    {reviewsList.map((item, index) => (
                        <div key={index} style={{ marginBottom: "1%" }}>
                            <Rating name={`rating-${index}`} value={item.value} precision={0.5} readOnly
                                sx={{ color: "#ACB992" }}
                            />
                            <Typography variant="body1" style={{ marginTop: "0.5%" }}>{item.review}</Typography>
                        </div>
                    ))}
                </Paper>
            )}
        </Container>
    )
}
