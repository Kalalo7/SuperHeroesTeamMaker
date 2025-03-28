import React, { useContext } from 'react';
import { TeamContext } from '../context/TeamContext';
import { Card } from 'react-bootstrap';

const TeamStats = () => {
  const { team } = useContext(TeamContext);

  const calculateStats = () => {
    const stats = {
      intelligence: 0,
      strength: 0,
      speed: 0,
      durability: 0,
      power: 0,
      combat: 0,
      height: 0,
      weight: 0
    };

    if (team.length > 0) {
      team.forEach(hero => {
        Object.keys(hero.powerstats).forEach(stat => {
          stats[stat] += parseInt(hero.powerstats[stat]) || 0;
        });
        stats.height += parseInt(hero.appearance.height[1]) || 0;
        stats.weight += parseInt(hero.appearance.weight[1]) || 0;
      });

      // Calculate averages
      stats.height = (stats.height / team.length).toFixed(2);
      stats.weight = (stats.weight / team.length).toFixed(2);
    }

    return stats;
  };

  const teamStats = calculateStats();

  return (
    <Card className="mb-4">
      <Card.Header>
        <h3>Team Statistics</h3>
        <p>Members: {team.length}/6</p>
      </Card.Header>
      <Card.Body>
        <h5>Power Stats</h5>
        {Object.entries(teamStats).map(([stat, value]) => (
          <div key={stat} className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <strong style={{ textTransform: 'capitalize' }}>{stat}:</strong>
              <span>{value}</span>
            </div>
            <div style={{
              height: '20px',
              background: '#e9ecef',
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div 
                style={{
                  height: '100%',
                  width: `${Math.min(100, value)}%`,
                  background: stat === 'intelligence' ? 'linear-gradient(90deg, #4facfe, #00f2fe)' :
                            stat === 'strength' ? 'linear-gradient(90deg, #f093fb, #f5576c)' :
                            stat === 'speed' ? 'linear-gradient(90deg, #43e97b, #38f9d7)' :
                            'linear-gradient(90deg, #ff758c, #ff7eb3)',
                  transition: 'width 0.5s ease'
                }}
              />
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default TeamStats;