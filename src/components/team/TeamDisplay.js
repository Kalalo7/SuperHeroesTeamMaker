import React, { useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { TeamContext } from '../../context/TeamContext';
import HeroCard from '../heroes/HeroCard';

const TeamDisplay = () => {
  const { team } = useContext(TeamContext);

  return (
    <div className="mb-4">
      <h2>My Team ({team.length}/6)</h2>
      <Row>
        {team.map(hero => (
          <Col key={hero.id} xs={12} md={6} lg={4}>
            <HeroCard hero={hero} isInTeam={true} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TeamDisplay;