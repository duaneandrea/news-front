import { useEffect, useState } from 'react';
import api from '../api/api';
import { Container, Row, Col, Card, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as React from "react";

const Home: React.FC = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [filters, setFilters] = useState({ source_id: '', category_id: '', date: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchArticles();
    }, [filters]);

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const response = await api.get('/articles', { params: filters });
            setArticles(response.data.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="blog-page-sec sp">
            <Container className="py-5">
                <h1 className="mb-4 text-center">News Articles</h1>

                {/* Filters Section */}
                <Row className="mb-4">
                    <Col md={4}>
                        <Form.Group controlId="filterDate">
                            <Form.Label>Search by Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={filters.date}
                                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="filterSource">
                            <Form.Label>Filter by Source</Form.Label>
                            <Form.Control
                                as="select"
                                value={filters.source_id}
                                onChange={(e) => setFilters({ ...filters, source_id: e.target.value })}
                            >
                                <option value="">All Sources</option>
                                <option value="1">News API</option>
                                <option value="2">The Guardian</option>
                                <option value="3">New York Times</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="filterCategory">
                            <Form.Label>Filter by Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={filters.category_id}
                                onChange={(e) => setFilters({ ...filters, category_id: e.target.value })}
                            >
                                <option value="">All Categories</option>
                                <option value="1">Uncategorized</option>
                                <option value="2">Technology</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

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
                                        {/* Add social media if needed */}
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
                                            <a href="#" className="author-text">{article.author}</a>
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
                        <p className="text-center">No articles found. Try adjusting the filters.</p>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default Home;
