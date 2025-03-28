import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import heroService from '../services/heroService';
import { TeamContext } from '../context/TeamContext';

const HeroSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [heroes, setHeroes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToTeam } = useContext(TeamContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');
    try {
      const results = await heroService.searchHeroes(searchTerm);
      setHeroes(results);
    } catch (err) {
      setError('Failed to search heroes. Please try again.');
    }
    setLoading(false);
  };

  const handleAddToTeam = (hero) => {
    try {
      addToTeam(hero);
      // Mostrar feedback de éxito
      alert(`${hero.name} added to team!`);
    } catch (error) {
      // Mostrar error si no se puede agregar
      alert(error.message);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search for a hero..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="hero-grid" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '30px',  // Increased gap
        padding: '30px'  // Increased padding
      }}>
        {heroes.map(hero => (
          <div key={hero.id} className="hero-card" style={{
            width: '600px',  // Tripled from 200px to 600px
            flexShrink: 0,
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px'  // Increased padding
          }}>
            <img src={hero.image.url} alt={hero.name} style={{
              width: '450px',  // Tripled from 150px to 450px
              height: '450px',  // Tripled from 150px to 450px
              objectFit: 'cover',
              margin: '0 auto'
            }} />
            
            <div style={{ padding: '12px' }}>
              <h3 style={{
                color: hero.biography.alignment === 'good' ? '#0064ff' : '#ff0000',
                textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
                marginBottom: '10px',
                fontSize: '1.2rem', // Tamaño de fuente más pequeño
                textAlign: 'center'
              }}>{hero.name}</h3>
              
              <div className="hero-stats" style={{
                background: 'rgba(0,0,0,0.7)',
                color: '#fff',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '12px'
              }}>
                <div><strong>Intelligence:</strong> {hero.powerstats.intelligence}</div>
                <div><strong>Strength:</strong> {hero.powerstats.strength}</div>
                <div><strong>Speed:</strong> {hero.powerstats.speed}</div>
                <div><strong>Power:</strong> {hero.powerstats.power}</div>
                <div><strong>Alignment:</strong> {hero.biography.alignment}</div>
              </div>

              <button 
                className="add-to-team-btn"
                onClick={() => handleAddToTeam(hero)}
                style={{
                  background: hero.biography.alignment === 'good' ? '#0064ff' : '#ff0000',
                  color: 'white',
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Add to Team
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSearch;