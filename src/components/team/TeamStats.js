import React, { useContext } from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { TeamContext } from '../../context/TeamContext';

const TeamStats = () => {
  const { team } = useContext(TeamContext);

  const calculateTeamStats = (team) => {
    if (!team.length) return {};

    // Inicializar objeto para acumular estadísticas
    const totalStats = {
      intelligence: 0,
      strength: 0,
      speed: 0,
      durability: 0,
      power: 0,
      combat: 0
    };

    // Sumar las estadísticas de cada héroe
    team.forEach(hero => {
      Object.keys(totalStats).forEach(stat => {
        // Convertir a número y sumar al total (si es null o NaN, suma 0)
        const statValue = parseInt(hero.powerstats[stat]) || 0;
        totalStats[stat] += statValue;
      });
    });

    return totalStats;
  };

  // Función para determinar el color de la barra de progreso según la estadística
  const getVariantForStat = (stat) => {
    switch (stat) {
      case 'intelligence': return 'info';
      case 'strength': return 'danger';
      case 'speed': return 'success';
      case 'durability': return 'warning';
      case 'power': return 'primary';
      case 'combat': return 'secondary';
      default: return 'info';
    }
  };

  const teamStats = calculateTeamStats(team);
  
  // Ordenar las estadísticas de mayor a menor
  const sortedStats = Object.entries(teamStats).sort((a, b) => b[1] - a[1]);

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="bg-dark text-white">
        <h3 className="mb-0">Team Stats (Total)</h3>
      </Card.Header>
      <Card.Body>
        {sortedStats.map(([stat, value]) => (
          <div key={stat} className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <strong style={{ textTransform: 'capitalize' }}>{stat}:</strong>
              <span>{value}</span>
            </div>
            <ProgressBar 
              now={value} 
              max={600}
              variant={getVariantForStat(stat)}
              style={{ height: '10px' }}
            />
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default TeamStats;