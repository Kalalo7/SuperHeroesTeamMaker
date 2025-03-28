import React from 'react';
import './superhero.css';

const TeamStatistics = ({ stats }) => {
  const maxStat = Math.max(...Object.values(stats));
  
  return (
    <div className="team-stats-card">
      {Object.entries(stats).map(([stat, value]) => (
        <div key={stat} className="list-group-item">
          <div className="stat-header">
            <strong>{stat}:</strong>
            <span className="stat-value">{value}</span>
          </div>
          <div className="stat-bar">
            <div 
              className="stat-bar-fill" 
              style={{ 
                width: `${(value / maxStat) * 100}%`,
                background: stat === 'Intelligence' ? 'linear-gradient(90deg, #4facfe, #00f2fe)' :
                           stat === 'Strength' ? 'linear-gradient(90deg, #f093fb, #f5576c)' :
                           stat === 'Speed' ? 'linear-gradient(90deg, #43e97b, #38f9d7)' :
                           'linear-gradient(90deg, #ff758c, #ff7eb3)'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamStatistics;