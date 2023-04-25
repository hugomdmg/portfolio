import Card from 'react-bootstrap/Card';
import projects from '../shared/project-list';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';


function ProjectCardDescriptions() {

  return (
    <>
      <Row xs={1} md={2} className="g-4">
        {projects.map((project) => (
          <Card className="text-center" key={project.name} bg='light'>
            <Card.Body>
              <Card.Img class='card-images' variant="top" src={`images-app/${project.link}.png`} />
              <Card.Title>{project.name}</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
              <Link to={project.link}>go</Link>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </>
  );
}

export default ProjectCardDescriptions;