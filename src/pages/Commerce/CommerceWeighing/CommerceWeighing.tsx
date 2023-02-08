import { Container, Button, Row, Col } from 'react-bootstrap'
import '../CommerceWeighing/CommerceWeighing.scss'
import { useState } from 'react'
import { TransferWeighingModal } from '../modals/CommerceWeighingModal/TransferWeighingModal'
import { InputWeighing } from '../modals/components/InputWeighing'
import { useNavigate } from 'react-router-dom'

export function CommerceWeighing() {
  const [showInputWheighing, setShowInputWeighing] = useState(false)
  const [showOutputWheighingModal, setShowOutputWeighingModal] = useState(false)
  const [showSepareteWeighingModal, setShowSepareteWeighingModal] = useState(false)
  const [showTransferWeighingModal, setShowTransferWeighingModal] = useState(false)
  const navigate = useNavigate()

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
              onClick={() => navigate("commerce/weighing/input")}
            >
              Entrada
            </Button>
          </Col>
          <Col md={1}>
            <Button className="inputs-btnW"
            onClick={() => navigate("commerce/weighing/output")}
            >Saída</Button>
          </Col>
          <Col md={1}>
            <Button className="inputs-btnW"
            onClick={() => navigate("commerce/weighing/separete")}>Avulsa</Button>
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
      <TransferWeighingModal show={showTransferWeighingModal} handleClose={()=> setShowTransferWeighingModal(false)}></TransferWeighingModal>
    </Container>
  )
}
