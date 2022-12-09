import { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { NewPlanning } from '../components/NewPlanning'
import { NewPlanningCost } from '../components/NewPlanningCost';

export function NewPlanningModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
    const [registrationType, setRegistrationType] = useState(1);

  return (
    <Modal show={show} onHide={handleClose} backdrop={'static'} size={'xl'}>
      <Modal.Header
        closeButton
        style={{ backgroundColor: '#7C5529', border: 'none' }}
      >
        <Modal.Title>
          {' '}
          <span style={{ color: '#fff' }}>Novo Planejamento</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#7C5529' }}>
        <Row style={{ marginTop: '2%' }}>
          <Col>
            <Form.Group className="mb-3" controlId="">
              <Form.Select
                aria-label=""
                onChange={(e) => {
                  return setRegistrationType(Number(e.target.value))
                }}
              >
                <option value={1}>Insumos</option>
                <option value={2}>Outros Custos</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            {registrationType === 1 ? (
              <NewPlanning show={false} handleClose={undefined}></NewPlanning>
            ) : (
              <NewPlanningCost show={false} handleClose={undefined}></NewPlanningCost>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}
