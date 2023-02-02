import { Container, Button, Row, Col } from 'react-bootstrap'
import '../CommerceWeighing/CommerceWeighing.scss'
import { useState } from 'react'
import { InputWeighingModal } from '../modals/CommerceWeighingModal/InputWeighingModal'

export function CommerceWeighing() {
  const [showInputWheighingModal, setShowInputWeighingModal] = useState(false)

  return (
    <Container>
      <div className="main-boxW">
        <Row>
          <Col md={2} className="title-boxW">
            <span>Pesagens</span>
          </Col>
          <Col md={1}>
            <Button
              className="inputs-btnW"
              onClick={() => setShowInputWeighingModal(true)}
            >
              Entrada
            </Button>
          </Col>
          <Col md={1}>
            <Button className="inputs-btnW">Saída</Button>
          </Col>
          <Col md={1}>
            <Button className="inputs-btnW">Avulsa</Button>
          </Col>
          <Col md={2}>
            <Button className="inputs-btnW">Transferência</Button>
          </Col>
          <Col md={2}>
            <Button variant="success" className="plot-btnW">
              +
            </Button>{' '}
          </Col>
        </Row>
      </div>
      <InputWeighingModal show={showInputWheighingModal} handleClose={() => setShowInputWeighingModal(false)}></InputWeighingModal>
    </Container>
  )
}
