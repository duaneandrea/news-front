import { useEffect, useState } from 'react';
import api from '../api/api';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import * as React from "react";
import { Link } from 'react-router-dom';

const PersonalizedFeed: React.FC = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPersonalizedFeed();
    }, []);

    const fetchPersonalizedFeed = async () => {
        setLoading(true);
        try {
            const response = await api.get('/articles/p/personalized', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setArticles(response.data.data);
        } catch (error) {
            console.error('Error fetching personalized feed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="blog-page-sec sp">
            <Container className="py-5">
                <h1 className="mb-4 text-center">My Personalized Feed</h1>

                {/* Loading Spinner */}
                {loading && (
                    <div className="d-flex justify-content-center my-4">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                )}

                {/* Articles Section */}
                <Row>
                    {articles.map((article: any) => (
                        <Col md={6} lg={4} className="mb-4" key={article.id} data-aos="fade-up" data-aos-offset="50" data-aos-duration="400" data-aos-delay="100">
                            <div className="blog1-single-box">
                                <div className="thumbnail image-anime">
                                    {/* Use image from API or a default image */}
                                    <img src={article.image || 'https://placehold.co/600x400'} alt={article.title} />
                                </div>
                                <div className="heading1">
                                    <div className="social-area">
                                        {/* You can customize this further */}
                                        <a href="#" className="social">{article.source.name}</a>
                                        <a href="#" className="time">
                                            <img src="assets/img/icons/time1.svg" alt="vexon" /> 3 min read
                                        </a>
                                    </div>
                                    <h4>
                                        <Link to={`/articles/${article.slug}`}>{article.title}</Link>
                                    </h4>
                                    <p className="mt-16">{article.content.substring(0, 100)}...</p>
                                    <div className="author-area">
                                        <div className="author">
                                            <div className="author-tumb">
                                                <img src={article.author_image || 'https://avatar.iran.liara.run/username?username=SA'} alt={article.author} />
                                            </div>
                                            <a href="author.html" className="author-text">{article.author}</a>
                                        </div>
                                        <div className="date">
                                            <a href="#">
                                                <img src="assets/img/icons/date1.svg" alt="vexon" /> {new Date(article.published_at).toLocaleDateString()}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                    {!loading && articles.length === 0 && (
                        <Alert variant="info" className="w-100 text-center">
                            No personalized articles found. Try adjusting your preferences.
                        </Alert>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default PersonalizedFeed;
