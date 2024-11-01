import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PokerTable from './PokerTable';
import Home from './Home';
import Settings from './Settings';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [hintsEnabled, setHintsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(false);
  const [tableTheme, setTableTheme] = useState('G'); // Default theme is Green

  const buttonStyle = { fontSize: '0.75rem', padding: '0.25rem 0.5rem' };
  const dropdownItemStyle = { fontSize: '0.875rem' }; // Smaller font size for dropdown items

  return (
    <Router>
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Poker Puzzle</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/daily-puzzle">Daily Puzzle</Nav.Link>
              <NavDropdown title="Leaderboard" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1" style={dropdownItemStyle}>Daily</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" style={dropdownItemStyle}>Weekly</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" style={dropdownItemStyle}>All-time</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Settings" id="settings-nav-dropdown">
                
                {/* Hints Setting */}
                <NavDropdown.Item style={dropdownItemStyle}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Hints:</span>
                    <ButtonGroup size="sm">
                      <Button 
                        variant={hintsEnabled ? "outline-secondary" : "primary"} 
                        onClick={() => setHintsEnabled(false)}
                        style={buttonStyle}
                      >
                        N
                      </Button>
                      <Button 
                        variant={hintsEnabled ? "primary" : "outline-secondary"} 
                        onClick={() => setHintsEnabled(true)}
                        style={buttonStyle}
                      >
                        Y
                      </Button>
                    </ButtonGroup>
                  </div>
                </NavDropdown.Item>

                {/* Dark Mode Setting */}
                <NavDropdown.Item style={dropdownItemStyle}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Dark Mode:</span>
                    <ButtonGroup size="sm">
                      <Button 
                        variant={darkModeEnabled ? "outline-secondary" : "primary"} 
                        onClick={() => setDarkModeEnabled(false)}
                        style={buttonStyle}
                      >
                        N
                      </Button>
                      <Button 
                        variant={darkModeEnabled ? "primary" : "outline-secondary"} 
                        onClick={() => setDarkModeEnabled(true)}
                        style={buttonStyle}
                      >
                        Y
                      </Button>
                    </ButtonGroup>
                  </div>
                </NavDropdown.Item>

                {/* Sound Effects Setting */}
                <NavDropdown.Item style={dropdownItemStyle}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Sound Effects:</span>
                    <ButtonGroup size="sm">
                      <Button 
                        variant={soundEffectsEnabled ? "outline-secondary" : "primary"} 
                        onClick={() => setSoundEffectsEnabled(false)}
                        style={buttonStyle}
                      >
                        N
                      </Button>
                      <Button 
                        variant={soundEffectsEnabled ? "primary" : "outline-secondary"} 
                        onClick={() => setSoundEffectsEnabled(true)}
                        style={buttonStyle}
                      >
                        Y
                      </Button>
                    </ButtonGroup>
                  </div>
                </NavDropdown.Item>

                {/* Table Theme Setting */}
                <NavDropdown.Item style={dropdownItemStyle}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Table Theme:</span>
                    <ButtonGroup size="sm">
                      <Button 
                        variant={tableTheme === 'G' ? "primary" : "outline-secondary"} 
                        onClick={() => setTableTheme('G')}
                        style={buttonStyle}
                      >
                        G
                      </Button>
                      <Button 
                        variant={tableTheme === 'R' ? "primary" : "outline-secondary"} 
                        onClick={() => setTableTheme('R')}
                        style={buttonStyle}
                      >
                        R
                      </Button>
                    </ButtonGroup>
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Help" id="help-nav-dropdown">
                <NavDropdown.Item href="#action/4.1" style={dropdownItemStyle}>How to Play</NavDropdown.Item>
                <NavDropdown.Item href="#action/4.2" style={dropdownItemStyle}>Rules</NavDropdown.Item>
                <NavDropdown.Item href="#action/4.3" style={dropdownItemStyle}>FAQ</NavDropdown.Item>
                <NavDropdown.Item href="#action/4.4" style={dropdownItemStyle}>Contact Support</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily-puzzle" element={<PokerTable theme={tableTheme} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
