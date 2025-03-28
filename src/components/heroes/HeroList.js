import React from 'react';
import { Row, Col } from 'react-bootstrap';
import HeroCard from './HeroCard';

const HeroList = ({ heroes }) => {
  if (!heroes || heroes.length === 0) {
    return <p>No heroes found.</p>;
  }

  return (
    <Row>
      {heroes.map(hero => (
        <Col key={hero.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <HeroCard hero={hero} />
        </Col>
      ))}
    </Row>
  );
};

export default HeroList;