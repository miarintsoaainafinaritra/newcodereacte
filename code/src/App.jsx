import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  FaSearch, 
  FaTimes, 
  FaInfoCircle, 
  FaStar,
  FaLeaf,
  FaSkull,
  FaRulerVertical,
  FaWeight,
  FaHeart,
  FaBolt,
  FaShieldAlt,
  FaFire,
  FaTint,
  FaRunning,
  FaChartLine
} from 'react-icons/fa';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await response.json();
        const pokemonWithDetails = await Promise.all(
          data.results.map(async (pokemon, index) => {
            const detailsResponse = await fetch(pokemon.url);
            const details = await detailsResponse.json();
            return {
              id: index + 1,
              name: pokemon.name,
              image: details.sprites.other['official-artwork'].front_default,
              types: details.types.map(type => type.type.name),
              stats: details.stats,
              height: details.height / 10, 
              weight: details.weight / 10 
            };
          })
        );
        setPokemonList(pokemonWithDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pokemon.types.some(type => type.toLowerCase().includes(searchTerm.toLowerCase())) ||
    pokemon.id.toString().includes(searchTerm)
  );

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  
  const getStatColor = (statName) => {
    switch(statName) {
      case 'hp': return '#ff6b6b';
      case 'attack': return '#feca1b';
      case 'defense': return '#6c79db';
      case 'special-attack': return '#f9a825';
      case 'special-defense': return '#6c79db';
      case 'speed': return '#ee99ac';
      default: return '#a4a4a4';
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pokémon</h1>
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <FaTimes />
            </button>
          )}
        </div>
      </header>

      <main className="main-content">
        {loading ? (
          <div className="loading">
            <div className="pokeball-loading"></div>
            <p>Chargement des Pokémon...</p>
          </div>
        ) : filteredPokemon.length > 0 ? (
          <div className="pokemon-grid">
            {filteredPokemon.map(pokemon => (
              <div 
                key={pokemon.id} 
                className="pokemon-card"
                onClick={() => setSelectedPokemon(pokemon)}
              >
                <div className="pokemon-image-container">
                  <img 
                    src={pokemon.image} 
                    alt={pokemon.name} 
                    className="pokemon-image"
                    loading="lazy"
                  />
                  <button 
                    className={`favorite-btn ${favorites.includes(pokemon.id) ? 'favorited' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(pokemon.id);
                    }}
                  >
                    <FaStar />
                  </button>
                </div>
                <div className="pokemon-info">
                  <h3>{pokemon.name}</h3>
                  <p className="pokemon-number">#{pokemon.id.toString().padStart(3, '0')}</p>
                  <div className="pokemon-types">
                    {pokemon.types.map(type => (
                      <span key={type} className={`type-badge type-${type}`}>
                        {type === 'grass' && <FaLeaf className="type-icon" />}
                        {type === 'poison' && <FaSkull className="type-icon" />}
                        {type === 'fire' && <FaFire className="type-icon" />}
                        {type === 'water' && <FaTint className="type-icon" />}
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <FaSearch className="no-results-icon" />
            <h3>Aucun Pokémon trouvé</h3>
            <p>Essayez avec un autre terme de recherche</p>
          </div>
        )}
      </main>

      {selectedPokemon && (
        <div className="pokemon-modal" onClick={() => setSelectedPokemon(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedPokemon(null)}>
              <FaTimes />
            </button>
            
            <div className="modal-header">
              <img 
                src={selectedPokemon.image} 
                alt={selectedPokemon.name}
                className="modal-pokemon-image"
              />
              <div className="modal-header-info">
                <h2>{selectedPokemon.name}</h2>
                <p className="pokemon-number">#{selectedPokemon.id.toString().padStart(3, '0')}</p>
                <div className="pokemon-types">
                  {selectedPokemon.types.map(type => (
                    <span key={type} className={`type-badge type-${type}`}>
                      {type === 'grass' && <FaLeaf className="type-icon" />}
                      {type === 'poison' && <FaSkull className="type-icon" />}
                      {type === 'fire' && <FaFire className="type-icon" />}
                      {type === 'water' && <FaTint className="type-icon" />}
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="modal-stats">
              <div className="stat-item">
                <h4><FaRulerVertical className="stat-icon" /> Taille</h4>
                <p>{selectedPokemon.height} m</p>
              </div>
              <div className="stat-item">
                <h4><FaWeight className="stat-icon" /> Poids</h4>
                <p>{selectedPokemon.weight} kg</p>
              </div>
            </div>
            
            <div className="modal-section">
              <h4>Statistiques</h4>
              <div className="stats-container">
                {selectedPokemon.stats.map(stat => {
                
                  let statIcon;
                  let statLabel;
                  
                  switch(stat.stat.name) {
                    case 'hp':
                      statIcon = <FaHeart className="stat-icon" />;
                      statLabel = 'PV';
                      break;
                    case 'attack':
                      statIcon = <FaBolt className="stat-icon" />;
                      statLabel = 'Attaque';
                      break;
                    case 'defense':
                      statIcon = <FaShieldAlt className="stat-icon" />;
                      statLabel = 'Défense';
                      break;
                    case 'special-attack':
                      statIcon = <FaBolt className="stat-icon" />;
                      statLabel = 'Att. Spé.';
                      break;
                    case 'special-defense':
                      statIcon = <FaShieldAlt className="stat-icon" />;
                      statLabel = 'Déf. Spé.';
                      break;
                    case 'speed':
                      statIcon = <FaRunning className="stat-icon" />;
                      statLabel = 'Vitesse';
                      break;
                    default:
                      statIcon = <FaChartLine className="stat-icon" />;
                      statLabel = stat.stat.name;
                  }

                  return (
                    <div key={stat.stat.name} className="stat-bar">
                      <span className="stat-name">
                        {statIcon}
                        {statLabel}
                      </span>
                      <div className="stat-bar-container">
                        <div 
                          className="stat-bar-fill" 
                          style={{ 
                            width: `${Math.min(100, stat.base_stat)}%`,
                            backgroundColor: getStatColor(stat.stat.name)
                          }}
                        ></div>
                        <span className="stat-value">{stat.base_stat}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>Pokémon - Génération 1 (20 Pokémon)</p>
        <p><FaInfoCircle /> Cliquez sur un Pokémon pour voir ses détails</p>
      </footer>
    </div>
  );
}

export default App;
