import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './DetailsPage.css';

function DetailsPage({ details }) {
    const [localDetails, setLocalDetails] = useState(details || JSON.parse(localStorage.getItem('details')) || []);
    const [rtDisplayCount, setRtDisplayCount] = useState(5);
    const [imdbDisplayCount, setImdbDisplayCount] = useState(5);

    useEffect(() => {
        if (details) {
            localStorage.setItem('details', JSON.stringify(details));
            setLocalDetails(details);
        }
    }, [details]);

    // Extract title from the first detail entry, assuming all entries have the same title
    const movieTitle = localDetails.length > 0 ? localDetails[0].title : 'Movie';

    // Filter reviews and stats based on the source
    const rtStats = localDetails.find(detail => detail.source === 'RT' && detail.avg_rating !== null);
    const imdbStats = localDetails.find(detail => detail.source === 'IMDb' && detail.avg_rating !== null);
    const rtReviews = localDetails.filter(detail => detail.source === 'RT' && detail.avg_rating === null);
    const imdbReviews = localDetails.filter(detail => detail.source === 'IMDb' && detail.avg_rating === null);

    const loadMoreRt = () => {
        setRtDisplayCount(prevCount => prevCount + 5);
    };

    const loadMoreImdb = () => {
        setImdbDisplayCount(prevCount => prevCount + 5);
    };

    const hideRtReviews = () => {
        setRtDisplayCount(5);
    };

    const hideImdbReviews = () => {
        setImdbDisplayCount(5);
    };

    const backToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getSentimentStyle = (sentiment) => {
        if (sentiment === 'POS') {
            return { borderRadius: '20px', border: '2px solid #1a8754' };
        } else if (sentiment === 'NEG') {
            return { borderRadius: '20px', border: '2px solid #871a1a' };
        } else {
            return {};
        }
    };

    return (
        <Container className="details-page mt-4">
            <h2>{movieTitle} Reviews</h2>
            <Row>
                <Col md={6}>
                    <h3>Rotten Tomatoes</h3>
                    {rtStats && (
                        <div className="stats-container mb-3 p-3">
                            <h4>Review Stats</h4>
                            <p><strong>Average Adjusted Score:</strong> {rtStats.avg_rating}</p>
                            <p><strong>Average Word Count:</strong> {rtStats.avg_word_count}</p>
                        </div>
                    )}
                    {rtReviews.length > 0 ? (
                        <>
                            {rtReviews.slice(0, rtDisplayCount).map((detail, index) => (
                                <div key={index} className="detail-item mb-3 p-3" style={getSentimentStyle(detail.Sentiment)}>
                                    <h5 className="reviewer-name">{detail.reviewer}</h5>
                                    <p><strong>Rating:</strong> {detail.rating}</p>
                                    <p><strong>Review Text:</strong> {detail.reviewText}</p>
                                    <p><strong>Sentence:</strong> {detail.Sentence}</p>
                                    <p><strong>Aspect:</strong> {detail.Aspect}</p>
                                    <p><strong>Sentiment:</strong> {detail.Sentiment}</p>
                                    <p><strong>Extracted Keywords:</strong> {detail.extracted_keywords}</p>
                                </div>
                            ))}
                            {rtReviews.length > rtDisplayCount && (
                                <Button onClick={loadMoreRt} className="load-more-button">Load More Rotten Tomatoes Reviews</Button>
                            )}
                            <Button onClick={hideRtReviews} className="hide-button">Hide Rotten Tomatoes Reviews</Button>
                        </>
                    ) : (
                        <p>No Rotten Tomatoes reviews available.</p>
                    )}
                </Col>
                <Col md={6}>
                    <h3>IMDb</h3>
                    {imdbStats && (
                        <div className="stats-container mb-3 p-3">
                            <h4>Review Stats</h4>
                            <p><strong>Average Rating:</strong> {imdbStats.avg_rating}</p>
                            <p><strong>Average Word Count:</strong> {imdbStats.avg_word_count}</p>
                        </div>
                    )}
                    {imdbReviews.length > 0 ? (
                        <>
                            {imdbReviews.slice(0, imdbDisplayCount).map((detail, index) => (
                                <div key={index} className="detail-item mb-3 p-3" style={getSentimentStyle(detail.Sentiment)}>
                                    <h5 className="reviewer-name">{detail.reviewer}</h5>
                                    <p><strong>Rating:</strong> {detail.rating}</p>
                                    <p><strong>Review Text:</strong> {detail.reviewText}</p>
                                    <p><strong>Sentence:</strong> {detail.Sentence}</p>
                                    <p><strong>Aspect:</strong> {detail.Aspect}</p>
                                    <p><strong>Sentiment:</strong> {detail.Sentiment}</p>
                                    <p><strong>Extracted Keywords:</strong> {detail.extracted_keywords}</p>
                                </div>
                            ))}
                            {imdbReviews.length > imdbDisplayCount && (
                                <Button onClick={loadMoreImdb} className="load-more-button">Load More IMDb Reviews</Button>
                            )}
                            <Button onClick={hideImdbReviews} className="hide-button">Hide IMDb Reviews</Button>
                        </>
                    ) : (
                        <p>No IMDb reviews available.</p>
                    )}
                </Col>
            </Row>
            <Button onClick={backToTop} className="back-to-top-button">Back to Top</Button>
        </Container>
    );
}

export default DetailsPage;
