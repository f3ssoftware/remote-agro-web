import { Container, Button, Row, Col } from 'react-bootstrap'
import '../CommerceWeighing/CommerceWeighing.scss'
import { useState } from 'react'
import { TransferWeighingModal } from '../modals/CommerceWeighingModal/TransferWeighingModal'
import { useNavigate } from 'react-router-dom'
import { WeighingCalendar } from '../modals/components/WeighingCalendar'
import { useDispatch } from 'react-redux'
import { resetInputWeighingRows, resetOutputWeighingRows, setInputWeighingRows } from '../../../stores/commerce.store'

export function CommerceWeighing() {
  const [showTransferWeighingModal, setShowTransferWeighingModal] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch<any>();

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
              onClick={() => {
                dispatch(resetInputWeighingRows(null));
                navigate("commerce/weighing/input");
              }}
            >
              Entrada
            </Button>
          </Col>
          <Col md={1}>
            <Button className="inputs-btnW"
              onClick={() => {
                dispatch(resetOutputWeighingRows(null));
                navigate("commerce/weighing/output");
              }}
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
        <Row>
          <WeighingCalendar></WeighingCalendar>
        </Row>
      </div>
      <TransferWeighingModal show={showTransferWeighingModal} handleClose={() => setShowTransferWeighingModal(false)}></TransferWeighingModal>
    </Container>
  )
}
