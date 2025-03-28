import React from 'react';
import { Card } from 'react-bootstrap';

const HeroCard = ({ hero, actionButton, statsDisplay }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={hero.image.url} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center">{hero.name}</Card.Title>
        <div className="flex-grow-1">
          {statsDisplay}
        </div>
        <div className="mt-auto">
          {actionButton}
        </div>
      </Card.Body>
    </Card>
  );
};

export default HeroCard;