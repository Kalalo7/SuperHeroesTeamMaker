import React, { useState } from 'react';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { TeamContext } from '../../context/TeamContext';
import heroService from '../../services/heroService';

const HeroSearch = ({ setSearchResults, searchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addError, setAddError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const { addToTeam } = useContext(TeamContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setAddError(null);
    setNoResults(false);

    try {
      const results = await heroService.searchHeroes(searchTerm);
      setSearchResults(results);
      
      // Verificar si no se encontraron resultados
      if (results.length === 0) {
        setNoResults(true);
      }
    } catch (err) {
      setError('Error searching heroes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToTeam = (hero) => {
    try {
      addToTeam(hero);
      setAddError(null);
    } catch (err) {
      setAddError(err.message);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="mb-3">Search Heroes</h3>
      
      <Form onSubmit={handleSearch} className="mb-4">
        <div className="d-flex">
          <Form.Control
            type="text"
            placeholder="Search for a hero..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="me-2"
          />
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}
      {addError && <Alert variant="danger">{addError}</Alert>}
      {noResults && (
        <Alert variant="warning">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          No heroes found matching "{searchTerm}". Try a different search term.
        </Alert>
      )}

      {searchResults.length > 0 && (
        <div>
          <h4 className="mb-3 text-center" style={{ 
            textTransform: 'uppercase', 
            letterSpacing: '2px',
            color: '#343a40',
            textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
            borderBottom: '3px solid #dc3545',
            paddingBottom: '10px',
            display: 'inline-block'
          }}>
            Results ({searchResults.length})
          </h4>
          <Row xs={1} md={2} lg={3} className="g-4">
            {searchResults.map(hero => (
              <Col key={hero.id}>
                <Card className="h-100 border-0" style={{ 
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s ease',
                  transform: 'translateY(0)',
                  ':hover': {
                    transform: 'translateY(-10px)'
                  }
                }}>
                  <div style={{ position: 'relative' }}>
                    <Card.Img 
                      variant="top" 
                      src={hero.image.url} 
                      style={{ 
                        height: '280px', 
                        objectFit: 'cover',
                        filter: 'brightness(0.9)'
                      }} 
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      padding: '20px 15px 10px'
                    }}>
                      <h4 className="text-white mb-0" style={{ textShadow: '1px 1px 3px #000' }}>
                        {hero.name}
                      </h4>
                    </div>
                  </div>
                  
                  <Card.Body style={{ padding: '1.5rem' }}>
                    <div className="text-center mb-3">
                      <span className={`badge ${hero.biography.alignment === 'good' ? 'bg-success' : 'bg-danger'}`} style={{ 
                        fontSize: '0.9rem', 
                        padding: '8px 15px',
                        borderRadius: '20px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                      }}>
                        {hero.biography.alignment.toUpperCase()}
                      </span>
                    </div>
                    
                    {/* Mostrar las principales estadísticas */}
                    {Object.entries(hero.powerstats)
                      .filter(([_, value]) => value !== 'null')
                      .slice(0, 3) // Mostrar solo las 3 principales estadísticas
                      .map(([stat, value]) => (
                        <div key={stat} className="mb-2">
                          <div className="d-flex justify-content-between mb-1">
                            <strong style={{ textTransform: 'capitalize', width: '100px' }}>{stat}:</strong>
                            <span>{value}</span>
                          </div>
                          <div style={{
                            height: '10px',
                            background: '#e9ecef',
                            borderRadius: '5px',
                            overflow: 'hidden'
                          }}>
                            <div 
                              style={{
                                height: '100%',
                                width: `${value}%`,
                                background: stat === 'intelligence' ? 'linear-gradient(90deg, #4facfe, #00f2fe)' :
                                          stat === 'strength' ? 'linear-gradient(90deg, #f093fb, #f5576c)' :
                                          stat === 'speed' ? 'linear-gradient(90deg, #43e97b, #38f9d7)' :
                                          'linear-gradient(90deg, #ff758c, #ff7eb3)',
                                transition: 'width 0.5s ease'
                              }}
                            />
                          </div>
                        </div>
                      ))
                    }
                    
                    <div className="d-flex gap-2 mt-4">
                      <Button 
                        variant="success" 
                        onClick={() => handleAddToTeam(hero)}
                        className="flex-grow-1"
                        style={{ 
                          borderRadius: '8px',
                          fontWeight: 'bold',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          background: 'linear-gradient(135deg, #28a745, #20c997)'
                        }}
                      >
                        Add to Team
                      </Button>
                      <Link 
                        to={`/hero/${hero.id}`} 
                        className="btn btn-primary flex-grow-1"
                        style={{ 
                          borderRadius: '8px',
                          fontWeight: 'bold',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          background: 'linear-gradient(135deg, #0d6efd, #0a58ca)'
                        }}
                      >
                        Details
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default HeroSearch;