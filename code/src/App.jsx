import React, { useState } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [showSettings, setShowSettings] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'pokedex':
        return (
          <div className="content-section">
            <h2>Pokédex</h2>
            <div className="pokemon-grid">
              <div className="pokemon-card">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" 
                  alt="Bulbizarre" 
                />
                <p>Bulbizarre</p>
              </div>
              <div className="pokemon-card">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" 
                  alt="Salamèche" 
                />
                <p>Salamèche</p>
              </div>
              <div className="pokemon-card">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" 
                  alt="Carapuce" 
                />
                <p>Carapuce</p>
              </div>
            </div>
          </div>
        );
      case 'battle':
        return (
          <div className="content-section battle-section">
            <h2>Arène Pokémon</h2>
            <div className="battle-area">
              <div className="player-pokemon">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png" 
                  alt="Player Pokemon" 
                />
                <div className="health-bar">
                  <div className="health-fill"></div>
                </div>
              </div>
              <div className="enemy-pokemon">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" 
                  alt="Enemy Pokemon" 
                />
                <div className="health-bar">
                  <div className="health-fill enemy"></div>
                </div>
              </div>
            </div>
            <div className="battle-actions">
              <button className="action-btn">Attaque</button>
              <button className="action-btn">Défense</button>
              <button className="action-btn">Objet</button>
              <button className="action-btn">Fuite</button>
            </div>
          </div>
        );
      case 'team':
        return (
          <div className="content-section">
            <h2>Mon Équipe</h2>
            <div className="team-display">
              <div className="team-slot">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" 
                  alt="Team Pokemon 1" 
                />
              </div>
              <div className="team-slot">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" 
                  alt="Team Pokemon 2" 
                />
              </div>
              <div className="team-slot">
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" 
                  alt="Team Pokemon 3" 
                />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="content-section home-section">
            <h1>Bienvenue dans le monde Pokémon !</h1>
            <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" 
              alt="Pikachu" 
              className="main-pokemon" 
            />
            <p>Commencez votre aventure et capturez des Pokémon !</p>
          </div>
        );
    }
  };

  return (
    <div className={`app ${theme}-theme`}>
      {/* Header */}
      <header className="app-header">
        <h1 className="logo">Pokémon Adventure</h1>
        <button 
          className="settings-btn"
          onClick={() => setShowSettings(!showSettings)}
        >
          <span className="settings-icon">⚙️</span>
        </button>
      </header>

      {/* Menu de navigation */}
      <nav className="main-nav">
        <button 
          className={`nav-btn ${activeSection === 'home' ? 'active' : ''}`}
          onClick={() => setActiveSection('home')}
        >
          <span className="nav-icon">🏠</span>
          <span>Accueil</span>
        </button>
        <button 
          className={`nav-btn ${activeSection === 'pokedex' ? 'active' : ''}`}
          onClick={() => setActiveSection('pokedex')}
        >
          <span className="nav-icon">📚</span>
          <span>Pokédex</span>
        </button>
        <button 
          className={`nav-btn ${activeSection === 'battle' ? 'active' : ''}`}
          onClick={() => setActiveSection('battle')}
        >
          <span className="nav-icon">⚔️</span>
          <span>Combat</span>
        </button>
        <button 
          className={`nav-btn ${activeSection === 'team' ? 'active' : ''}`}
          onClick={() => setActiveSection('team')}
        >
          <span className="nav-icon">👥</span>
          <span>Équipe</span>
        </button>
      </nav>

      {/* Contenu principal */}
      <main className="main-content">
        {renderContent()}
      </main>

      {/* Menu des paramètres */}
      {showSettings && (
        <div className="settings-modal">
          <div className="settings-content">
            <h3>Paramètres</h3>
            <div className="theme-selector">
              <h4>Thèmes</h4>
              <div className="theme-options">
                <button 
                  className={`theme-btn ${theme === 'light' ? 'selected' : ''}`}
                  onClick={() => toggleTheme('light')}
                >
                  Thème Gris
                </button>
                <button 
                  className={`theme-btn ${theme === 'dark' ? 'selected' : ''}`}
                  onClick={() => toggleTheme('dark')}
                >
                  Thème Sombre
                </button>
                <button 
                  className={`theme-btn ${theme === 'blue' ? 'selected' : ''}`}
                  onClick={() => toggleTheme('blue')}
                >
                  Thème Bleu
                </button>
              </div>
            </div>
            <button 
              className="close-settings"
              onClick={() => setShowSettings(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;