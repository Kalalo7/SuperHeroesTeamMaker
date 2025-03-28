import React, { useState, useContext } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      login(email, password);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #1a237e, #311b92)',
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("https://wallpaperaccess.com/full/93912.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0" style={{
              borderRadius: '15px',
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.85)',
            }}>
              <Card.Header className="text-center p-4 bg-dark text-white border-0">
                <h2 className="mb-0" style={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                }}>
                  Superhero Team Builder
                </h2>
                <p className="mt-2 text-warning">Login to assemble your team</p>
              </Card.Header>
              
              <Card.Body className="p-4">
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="py-2"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="py-2"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Group>
                  
                  <div className="d-grid">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg"
                      className="py-2"
                      style={{
                        borderRadius: '8px',
                        background: 'linear-gradient(to right, #dc3545, #fd7e14)',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Login
                    </Button>
                  </div>
                </Form>
                
                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    <small>Use email: challenge@alkemy.org and password: react</small>
                  </p>
                </div>
              </Card.Body>
              
              <Card.Footer className="text-center py-3 bg-light border-0">
                <p className="mb-0">
                  <a href="https://github.com/kalalo7" 
                     className="text-decoration-none" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ color: '#dc3545' }}
                  >
                    Coded by Kalalo7
                  </a>
                </p>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;