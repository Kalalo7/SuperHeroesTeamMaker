import React, { useState, useContext } from 'react';
import { Row, Col, Card, Button, Modal, Badge } from 'react-bootstrap';
import { TeamContext } from '../../context/TeamContext';

const TeamList = () => {
  // Asegúrate de que estamos desestructurando correctamente removeFromTeam
  const { team, removeFromTeam } = useContext(TeamContext);
  const [selectedHero, setSelectedHero] = useState(null);
  const [showModal, setShowModal] = useState(false);

  if (team.length === 0) {
    return (
      <Card className="text-center p-5 mb-4">
        <Card.Body>
          <h3>Your team is empty</h3>
          <p>Search for heroes and add them to your team!</p>
        </Card.Body>
      </Card>
    );
  }

  const openHeroDetails = (hero) => {
    setSelectedHero(hero);
    setShowModal(true);
  };

  const closeHeroDetails = () => {
    setShowModal(false);
  };

  // Color mapping for stats
  const getStatColor = (stat) => {
    switch(stat) {
      case 'intelligence': return '#4facfe';
      case 'strength': return '#f5576c';
      case 'speed': return '#43e97b';
      case 'durability': return '#a18cd1';
      case 'power': return '#ffc3a0';
      case 'combat': return '#ff9a9e';
      default: return '#6c757d';
    }
  };

  return (
    <div className="mb-4">
      <h3 className="mb-3 text-center" style={{ 
        textTransform: 'uppercase', 
        letterSpacing: '2px',
        color: '#343a40',
        textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
        borderBottom: '3px solid #dc3545',
        paddingBottom: '10px',
        display: 'inline-block'
      }}>
        Your Team ({team.length}/6)
      </h3>
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {team.map(hero => (
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
                
                <div className="mb-3">
                  {Object.entries(hero.powerstats)
                    .filter(([_, value]) => value !== 'null')
                    .slice(0, 4) // Show only top 4 stats for compact view
                    .map(([stat, value]) => (
                      <div key={stat} className="mb-2">
                        <div className="d-flex justify-content-between">
                          <small><strong style={{ textTransform: 'capitalize' }}>{stat}</strong></small>
                          <small>{value}</small>
                        </div>
                        <div className="progress" style={{height: '8px'}}>
                          <div 
                            className="progress-bar" 
                            role="progressbar" 
                            style={{
                              width: `${value}%`,
                              backgroundColor: getStatColor(stat)
                            }} 
                          />
                        </div>
                      </div>
                    ))
                  }
                </div>
                
                <div className="d-flex gap-2 mt-auto">
                  <Button 
                    variant="primary" 
                    onClick={() => openHeroDetails(hero)}
                    className="flex-grow-1"
                    style={{ 
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      background: 'linear-gradient(135deg, #0d6efd, #0a58ca)'
                    }}
                  >
                    Details
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => removeFromTeam(hero.id)}
                    className="flex-grow-1"
                    style={{ 
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      background: 'linear-gradient(135deg, #dc3545, #b02a37)'
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Hero Details Modal */}
      <Modal 
        show={showModal} 
        onHide={closeHeroDetails} 
        size="lg" 
        centered
      >
        {selectedHero && (
          <>
            <Modal.Header closeButton className="bg-dark text-white">
              <Modal.Title>{selectedHero.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-5 text-center mb-4 mb-md-0">
                  <img 
                    src={selectedHero.image.url} 
                    alt={selectedHero.name} 
                    className="img-fluid rounded shadow" 
                    style={{ maxHeight: '400px' }}
                  />
                  <div className="mt-3">
                    <h5>Power Stats</h5>
                    {Object.entries(selectedHero.powerstats).map(([stat, value]) => (
                      <div key={stat} className="mb-2">
                        <div className="d-flex justify-content-between">
                          <span style={{ textTransform: 'capitalize' }}><strong>{stat}</strong></span>
                          <span>{value}</span>
                        </div>
                        <div className="progress" style={{height: '10px'}}>
                          <div 
                            className="progress-bar" 
                            role="progressbar" 
                            style={{
                              width: `${value}%`,
                              backgroundColor: getStatColor(stat)
                            }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="col-md-7">
                  <div className="card mb-3">
                    <div className="card-header bg-primary text-white">
                      <h5 className="mb-0">Biography</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between">
                          <strong>Full Name:</strong> 
                          <span>{selectedHero.biography['full-name'] || 'Unknown'}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                          <strong>Alter Egos:</strong> 
                          <span>{selectedHero.biography['alter-egos'] || 'None'}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                          <strong>Place of Birth:</strong> 
                          <span>{selectedHero.biography['place-of-birth'] || 'Unknown'}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                          <strong>First Appearance:</strong> 
                          <span>{selectedHero.biography['first-appearance'] || 'Unknown'}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                          <strong>Publisher:</strong> 
                          <span>{selectedHero.biography.publisher || 'Unknown'}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                          <strong>Alignment:</strong> 
                          <span>
                            <Badge bg={selectedHero.biography.alignment === 'good' ? 'success' : 'danger'}>
                              {selectedHero.biography.alignment}
                            </Badge>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="card">
                    <div className="card-header bg-info text-white">
                      <h5 className="mb-0">Appearance</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between">
                              <strong>Gender:</strong> 
                              <span>{selectedHero.appearance.gender || 'Unknown'}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                              <strong>Race:</strong> 
                              <span>{selectedHero.appearance.race || 'Unknown'}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                              <strong>Height:</strong> 
                              <span>{selectedHero.appearance.height[1] || 'Unknown'}</span>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between">
                              <strong>Weight:</strong> 
                              <span>{selectedHero.appearance.weight[1] || 'Unknown'}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                              <strong>Eye Color:</strong> 
                              <span>{selectedHero.appearance['eye-color'] || 'Unknown'}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                              <strong>Hair Color:</strong> 
                              <span>{selectedHero.appearance['hair-color'] || 'Unknown'}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeHeroDetails}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default TeamList;