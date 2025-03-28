import React from 'react';
import { Card } from 'react-bootstrap';

const TeamStats = ({ team }) => {
  const calculateAverageStats = () => {
    if (!team || team.length === 0) return {
      intelligence: 0,
      strength: 0,
      speed: 0,
      durability: 0,
      power: 0,
      combat: 0
    };

    const totalStats = team.reduce((acc, hero) => {
      if (!hero || !hero.powerstats) return acc;
      
      return {
        intelligence: acc.intelligence + (parseInt(hero.powerstats.intelligence) || 0),
        strength: acc.strength + (parseInt(hero.powerstats.strength) || 0),
        speed: acc.speed + (parseInt(hero.powerstats.speed) || 0),
        durability: acc.durability + (parseInt(hero.powerstats.durability) || 0),
        power: acc.power + (parseInt(hero.powerstats.power) || 0),
        combat: acc.combat + (parseInt(hero.powerstats.combat) || 0)
      };
    }, {
      intelligence: 0,
      strength: 0,
      speed: 0,
      durability: 0,
      power: 0,
      combat: 0
    });

    const teamSize = team.length;
    return {
      intelligence: Math.round(totalStats.intelligence / teamSize),
      strength: Math.round(totalStats.strength / teamSize),
      speed: Math.round(totalStats.speed / teamSize),
      durability: Math.round(totalStats.durability / teamSize),
      power: Math.round(totalStats.power / teamSize),
      combat: Math.round(totalStats.combat / teamSize)
    };
  };

  const averageStats = calculateAverageStats();

  return (
    <Card className="mb-4" style={{ 
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
      border: 'none'
    }}>
      <Card.Header style={{ 
        background: 'linear-gradient(135deg, #343a40, #212529)',
        color: 'white',
        borderBottom: 'none',
        padding: '15px 20px'
      }}>
        <h4 className="mb-0" style={{ 
          textTransform: 'uppercase', 
          letterSpacing: '1px',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>
          Team Stats
        </h4>
      </Card.Header>
      <Card.Body style={{ padding: '1.5rem' }}>
        {Object.entries(averageStats).map(([stat, value]) => (
          <div key={stat} className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <strong style={{ textTransform: 'capitalize', width: '100px' }}>{stat}:</strong>
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
        ))}
      </Card.Body>
    </Card>
  );
};

export default TeamStats;