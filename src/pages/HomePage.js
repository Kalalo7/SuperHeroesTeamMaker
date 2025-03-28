import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeroSearch from '../components/heroes/HeroSearch';
import TeamList from '../components/team/TeamList';
import TeamStats from '../components/team/TeamStats';
import { TeamContext } from '../context/TeamContext';  // Corregida la ruta de importación

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { team } = useContext(TeamContext);

  return (
    <>
      <header className="bg-dark text-white py-4 mb-4" style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://wallpapercave.com/wp/wp2646303.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
      }}>
        <Container>
          <h1 className="mb-0 display-4 fw-bold text-center" style={{ 
            textTransform: 'uppercase',
            letterSpacing: '3px',
            textShadow: '2px 2px 8px rgba(255, 0, 0, 0.7)'
          }}>
            Superhero Team Builder
          </h1>
          <p className="text-center lead mt-2 text-warning">Assemble your ultimate team of heroes and villains</p>
        </Container>
      </header>
      <Container className="py-4">
        <Row>
          <Col lg={8}>
            <HeroSearch setSearchResults={setSearchResults} searchResults={searchResults} />
          </Col>
          <Col lg={4}>
            <TeamStats team={team} />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <TeamList />
          </Col>
        </Row>
      </Container>
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <Container>
          <p className="mb-0">
            © 2023 Superhero Team Builder | Powered by Superhero API | 
            <a href="https://github.com/kalalo7" 
               className="text-warning ms-1" 
               target="_blank" 
               rel="noopener noreferrer">
              Coded by Kalalo7
            </a>
          </p>
        </Container>
      </footer>
    </>
  );
};

export default HomePage;