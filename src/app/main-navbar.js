import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import projects from '../shared/project-list';

let navLinks = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Linkedin',
    link: 'https://www.linkedin.com/in/hugo-munoz-de-morales-grado/',
  },
  {
    name: 'GitHub',
    link: '',
  },
  {
    name: 'CV',
    link: 'cv',
  },
]



function MainNavBar(props) {
  return (
    <>
      <Navbar bg="light" expand='false' className="mb-3">
        <Container fluid>
          <Navbar.Brand href="/">Hugomdmg</Navbar.Brand>
          {navLinks.map((link) => (
            <Nav.Link href={link.link} key={link.name}>{link.name}</Nav.Link>
          ))}
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} >Projects</Navbar.Toggle>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-false`}
            aria-labelledby={`offcanvasNavbarLabel-expand-false`}
          // placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                My projects
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {projects.map((project) => (
                  <Nav.Link href={project.link} key={project.name}
                    onClick={() => {
                      console.log(props.selectedPage)
                    }
                    }>{project.name}</Nav.Link>
                ))}

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>



        </Container>
      </Navbar>
    </>
  );
}

export default MainNavBar;