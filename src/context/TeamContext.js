import React, { createContext, useState, useEffect } from 'react';

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState(() => {
    const savedTeam = localStorage.getItem('hero-team');
    return savedTeam ? JSON.parse(savedTeam) : [];
  });

  useEffect(() => {
    localStorage.setItem('hero-team', JSON.stringify(team));
  }, [team]);

  const addToTeam = (hero) => {
    // Validación 1: Equipo lleno
    if (team.length >= 6) {
      throw new Error('Team is full (max 6 members)');
    }

    // Validación 2: Balance de alineación
    const alignment = hero.biography.alignment;
    const goodCount = team.filter(h => h.biography.alignment === 'good').length;
    const badCount = team.filter(h => h.biography.alignment === 'bad').length;

    if (alignment === 'good' && goodCount >= 3) {
      throw new Error('Cannot add more good heroes (max 3)');
    }

    if (alignment === 'bad' && badCount >= 3) {
      throw new Error('Cannot add more bad heroes (max 3)');
    }

    // Validación 3: Héroe ya en el equipo
    if (team.some(h => h.id === hero.id)) {
      throw new Error('This hero is already in your team');
    }

    // Si pasa todas las validaciones, agregar al equipo
    setTeam(prev => [...prev, hero]);
  };

  // La función se llama removeFromTeam en el contexto
  const removeFromTeam = (heroId) => {
    setTeam(prev => prev.filter(hero => hero.id !== heroId));
  };

  return (
    <TeamContext.Provider value={{ team, addToTeam, removeFromTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export default TeamProvider;