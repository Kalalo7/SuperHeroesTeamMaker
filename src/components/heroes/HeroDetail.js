import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col, ListGroup, Badge, Button, Spinner, Container } from 'react-bootstrap';
import heroService from '../../services/heroService';
import { TeamContext } from '../../context/TeamContext';

const HeroDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addError, setAddError] = useState('');
  const { team, addToTeam } = useContext(TeamContext);

  useEffect(() => {
    const fetchHeroDetails = async () => {
      try {
        const data = await heroService.getHeroById(id);
        setHero(data);
      } catch (err) {
        setError('Failed to load hero details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroDetails();
  }, [id]);

  const handleAddToTeam = () => {
    try {
      addToTeam(hero);
      setAddError('');
    } catch (err) {
      setAddError(err.message);
    }
  };

  const isInTeam = team.some(h => h.id === id);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" variant="primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error || !hero) {
    return (
      <Container className="py-5">
        <Card className="text-center p-5 shadow-lg border-0" style={{ borderRadius: '15px' }}>
          <Card.Body>
            <h2 className="text-danger mb-4">Error Loading Hero</h2>
            <p>{error || 'Failed to load hero details'}</p>
            <Button 
              variant="primary" 
              onClick={() => navigate('/')}
              style={{ 
                borderRadius: '8px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(135deg, #0d6efd, #0a58ca)'
              }}
            >
              Back to Home
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate('/')} 
          className="d-flex align-items-center"
          style={{ borderRadius: '8px', fontWeight: 'bold' }}
        >
          <i className="bi bi-arrow-left me-2"></i> Back to Team
        </Button>
        
        {!isInTeam && (
          <Button 
            variant="success" 
            onClick={handleAddToTeam}
            style={{ 
              borderRadius: '8px',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(135deg, #28a745, #20c997)'
            }}
          >
            Add to Team
          </Button>
        )}
      </div>
      
      {addError && <div className="alert alert-danger mb-4">{addError}</div>}
      
      <Card className="border-0 shadow-lg overflow-hidden" style={{ 
        borderRadius: '20px',
        background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)'
      }}>
        <div className="position-relative">
          <div style={{
            height: '300px',
            background: `url(${hero.image.url}) center/cover no-repeat`,
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              padding: '30px 20px 20px'
            }}>
              <h1 className="text-white mb-0" style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                fontWeight: 'bold'
              }}>
                {hero.name}
              </h1>
              <p className="text-light mb-0">
                {hero.biography['full-name']}
              </p>
            </div>
          </div>
        </div>

        <Card.Body className="p-4">
          <div className="mb-4 text-center">
            <Badge 
              bg={hero.biography.alignment === 'good' ? 'success' : 'danger'} 
              className="px-3 py-2"
              style={{ 
                fontSize: '1rem', 
                borderRadius: '20px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              {hero.biography.alignment.toUpperCase()}
            </Badge>
          </div>
          
          <h3 className="mb-4 text-center" style={{ 
            textTransform: 'uppercase', 
            letterSpacing: '2px',
            color: '#343a40',
            textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
            borderBottom: '3px solid #dc3545',
            paddingBottom: '10px',
            display: 'inline-block'
          }}>
            Power Stats
          </h3>
          
          <Row className="mb-4">
            {Object.entries(hero.powerstats).map(([stat, value]) => (
              <Col key={stat} md={6} lg={4} className="mb-3">
                <div className="mb-2">
                  <div className="d-flex justify-content-between mb-1">
                    <strong style={{ textTransform: 'capitalize' }}>{stat}:</strong>
                    <span>{value === "null" ? "0" : value}</span>
                  </div>
                  <div style={{
                    height: '12px',
                    background: '#e9ecef',
                    borderRadius: '6px',
                    overflow: 'hidden'
                  }}>
                    <div 
                      style={{
                        height: '100%',
                        width: `${value === "null" ? 0 : value}%`,
                        background: stat === 'intelligence' ? 'linear-gradient(90deg, #4facfe, #00f2fe)' :
                                  stat === 'strength' ? 'linear-gradient(90deg, #f093fb, #f5576c)' :
                                  stat === 'speed' ? 'linear-gradient(90deg, #43e97b, #38f9d7)' :
                                  stat === 'durability' ? 'linear-gradient(90deg, #a18cd1, #fbc2eb)' :
                                  stat === 'power' ? 'linear-gradient(90deg, #ffc3a0, #ffafbd)' :
                                  'linear-gradient(90deg, #ff758c, #ff7eb3)',
                        transition: 'width 0.5s ease'
                      }}
                    />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          
          <Row>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <Card.Header className="bg-dark text-white" style={{ borderRadius: '15px 15px 0 0' }}>
                  <h4 className="mb-0">Biography</h4>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 px-0">
                      <strong>Full Name:</strong> {hero.biography['full-name']}
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <strong>Alter Egos:</strong> {hero.biography['alter-egos']}
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <strong>Aliases:</strong> {hero.biography.aliases.join(', ')}
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <strong>Place of Birth:</strong> {hero.biography['place-of-birth']}
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <strong>First Appearance:</strong> {hero.biography['first-appearance']}
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <strong>Publisher:</strong> {hero.biography.publisher}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <Card.Header className="bg-dark text-white" style={{ borderRadius: '15px 15px 0 0' }}>
                  <h4 className="mb-0">Appearance</h4>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 px-0">
                      <strong>Gender:</strong> {hero.appearance.gender}
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <strong>Race:</strong> {hero.appearance.race}
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <strong>Height:</strong> {hero.appearance.height[1]}
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <strong>Weight:</strong> {hero.appearance.weight[1]}
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <strong>Eye Color:</strong> {hero.appearance['eye-color']}
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <strong>Hair Color:</strong> {hero.appearance['hair-color']}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <Card.Header className="bg-dark text-white" style={{ borderRadius: '15px 15px 0 0' }}>
                  <h4 className="mb-0">Work</h4>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 px-0">
                      <strong>Occupation:</strong> {hero.work.occupation}
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <strong>Base:</strong> {hero.work.base}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <Card.Header className="bg-dark text-white" style={{ borderRadius: '15px 15px 0 0' }}>
                  <h4 className="mb-0">Connections</h4>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 px-0">
                      <strong>Group Affiliation:</strong> {hero.connections['group-affiliation']}
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0">
                      <strong>Relatives:</strong> {hero.connections.relatives}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HeroDetail;