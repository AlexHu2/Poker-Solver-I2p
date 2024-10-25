import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';
import PokerTable from './PokerTable';
import Home from './Home';

const App = () => (
  <Router>
    <Navbar expand="lg" className="bg-body-tertiary">
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
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  <Container className="mt-4">
    <Routes>
      {/* Daily Puzzle route */}
      <Route path='' element={<Home/>}/>
      <Route path="/daily-puzzle" element={<PokerTable />} />
    </Routes>
  </Container>
</Router>
);
  
export default App;
