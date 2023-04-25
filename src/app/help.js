import Accordion from 'react-bootstrap/Accordion';

export default function Help(props) {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>How to use</Accordion.Header>
        <Accordion.Body>
          {props.text}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}