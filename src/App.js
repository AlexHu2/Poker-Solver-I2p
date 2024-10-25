import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PokerTable from './PokerTable';
import Home from './Home';
import Settings from './Settings';

const App = () => (
  <Router>
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Poker Puzzle</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/daily-puzzle">Daily Puzzle</Nav.Link>
            <NavDropdown title="Leaderboard" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Daily</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Weekly</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">All-time</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Settings" id="settings-nav-dropdown">
              <NavDropdown.Item>Hints: On/Off</NavDropdown.Item>
              <NavDropdown.Item>Dark Mode: On/Off</NavDropdown.Item>
              <NavDropdown.Item>Sound Effects: On/Off</NavDropdown.Item>
              <NavDropdown.Item>Card Animation Speed</NavDropdown.Item>
              <NavDropdown.Item>Language Selection</NavDropdown.Item>
              <NavDropdown.Item>Table Theme</NavDropdown.Item>
              <NavDropdown.Item>Player Avatars</NavDropdown.Item>
              <NavDropdown.Item>Notification Settings</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Help" id="help-nav-dropdown"> {/* Help Dropdown */}
              <NavDropdown.Item href="#action/4.1">How to Play</NavDropdown.Item>
              <NavDropdown.Item href="#action/4.2">Rules</NavDropdown.Item>
              <NavDropdown.Item href="#action/4.3">FAQ</NavDropdown.Item>
              <NavDropdown.Item href="#action/4.4">Contact Support</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Container className="mt-4">
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/daily-puzzle" element={<PokerTable />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Container>
  </Router>
);

export default App;
