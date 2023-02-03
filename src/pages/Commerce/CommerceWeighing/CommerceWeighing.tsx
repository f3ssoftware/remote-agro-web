import { Container, Button, Row, Col } from 'react-bootstrap'
import '../CommerceWeighing/CommerceWeighing.scss'
import { useState } from 'react'
import { InputWeighingModal } from '../modals/CommerceWeighingModal/InputWeighingModal'
import { OutputWeighingModal } from '../modals/CommerceWeighingModal/OutputWeighingModal'
import { SepareteWeighingModal } from '../modals/CommerceWeighingModal/SepareteWeighingModal'
import { TransferWeighingModal } from '../modals/CommerceWeighingModal/TransferWeighingModal'

export function CommerceWeighing() {
  const [showInputWheighingModal, setShowInputWeighingModal] = useState(false)
  const [showOutputWheighingModal, setShowOutputWeighingModal] = useState(false)
  const [showSepareteWeighingModal, setShowSepareteWeighingModal] = useState(false)
  const [showTransferWeighingModal, setShowTransferWeighingModal] = useState(false)

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
            <Button className="inputs-btnW"
            onClick={() => setShowOutputWeighingModal(true)}
            >Saída</Button>
          </Col>
          <Col md={1}>
            <Button className="inputs-btnW"
            onClick={() => setShowSepareteWeighingModal(true)}>Avulsa</Button>
          </Col>
          <Col md={2}>
            <Button className="inputs-btnW"
            onClick={() => setShowTransferWeighingModal(true)}
            >Transferência</Button>
          </Col>
          <Col md={2}>
            <Button variant="success" className="plot-btnW">
              +
            </Button>{' '}
          </Col>
        </Row>
      </div>
      <InputWeighingModal show={showInputWheighingModal} handleClose={() => setShowInputWeighingModal(false)}></InputWeighingModal>
      <OutputWeighingModal show={showOutputWheighingModal} handleClose={()=> setShowOutputWeighingModal(false)}></OutputWeighingModal>
      <SepareteWeighingModal show={showSepareteWeighingModal} handleClose={()=> setShowSepareteWeighingModal(false)}></SepareteWeighingModal>
      <TransferWeighingModal show={showTransferWeighingModal} handleClose={()=> setShowTransferWeighingModal(false)}></TransferWeighingModal>
    </Container>
  )
}
