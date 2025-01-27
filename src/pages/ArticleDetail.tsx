import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { Container, Card, Spinner } from 'react-bootstrap';
import * as React from 'react';

const ArticleDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [article, setArticle] = useState<any>(null);

    useEffect(() => {
        fetchArticle();
    }, [slug]);

    const fetchArticle = async () => {
        try {
            const response = await api.get(`/articles/${slug}`);
            setArticle(response.data);
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    };

    if (!article)
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );

    return (
        <Container className="py-5">
            <Card className="shadow-lg">
                <Card.Body>
                    <Card.Title className="mb-3">{article.title}</Card.Title>
                    <Card.Text className="mb-4">{article.content}</Card.Text>
                    <Card.Footer className="text-muted">
                        Published at: {new Date(article.published_at).toLocaleDateString()}
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ArticleDetail;
