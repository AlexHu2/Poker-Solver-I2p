import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PokerTable from './components/PokerTable/PokerTable';
import Home from './Home';
import Settings from './Settings';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createPokerPuzzle1, createPokerPuzzle2, createPokerPuzzle3 } from './createPokerPuzzle'; // Use named import

const App = () => {
  const [hintsEnabled, setHintsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(false);
  const [tableTheme, setTableTheme] = useState('G');
  const [showHelpModal, setShowHelpModal] = useState(false);

  const buttonStyle = { fontSize: '0.75rem', padding: '0.25rem 0.5rem' };
  const dropdownItemStyle = { fontSize: '0.875rem' };

  const handleHelpClick = () => setShowHelpModal(true);
  const handleClose = () => setShowHelpModal(false);

  return (
    <Router>
      {/* Navbar is outside the Routes */}
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Poker Puzzle</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Puzzles" id="basic-nav-dropdown">
                <NavDropdown.Item href="/daily-puzzle1" style={dropdownItemStyle}>Puzzle #1</NavDropdown.Item>
                <NavDropdown.Item href="/daily-puzzle2" style={dropdownItemStyle}>Puzzle #2</NavDropdown.Item>
                <NavDropdown.Item href="/daily-puzzle3" style={dropdownItemStyle}>Puzzle #3</NavDropdown.Item>
              </NavDropdown>
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
              <Nav.Link onClick={handleHelpClick}>Help</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Routes are defined below */}
      <Routes>
        <Route path="/" element={<Container className="mt-4"><Home /></Container>} />
        <Route path="/daily-puzzle1" element={<PokerTable pokerPuzzle={createPokerPuzzle1()} initialPokerPuzzle={createPokerPuzzle1()}/>} />
        {/* need to add functionality to this page */}
        <Route path="/daily-puzzle2" element={<PokerTable pokerPuzzle={createPokerPuzzle2()} initialPokerPuzzle={createPokerPuzzle2()}/>} />
        {/* need to add functionality to this page */}
        <Route path="/daily-puzzle3" element={<PokerTable pokerPuzzle={createPokerPuzzle3()} initialPokerPuzzle={createPokerPuzzle3()}/>} />
        <Route path="/settings" element={<Container className="mt-4"><Settings /></Container>} />
      </Routes>

      {/* Help Modal */}
      <Modal show={showHelpModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>How to Play</h5>
          <p>
            In this poker puzzle game, players try to guess the best move
            for a given poker scenario, receiving feedback to guide them towards the optimal decision within a limited number of attempts.<br /><br />
            Points and streaks are awarded based on accuracy and speed, with options for more complex multi-round challenges for advanced players.
          </p>
          <h5>FAQ</h5>
          <p><strong>Q:</strong> How do I start a new game?<br />
             <strong>A:</strong> Click "Daily Puzzle" from the main menu.</p>
          <p><strong>Q:</strong> Can I save my progress?<br />
             <strong>A:</strong> Currently, saving is not available. Each session is separate.</p>
          <h5>Contact Support</h5>
          <p>If you have any questions or need assistance, please contact our support team at <a href="dyu318@gatech.edu">dyu318@gatech.edu</a>.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Router>
  );
};

export default App;
