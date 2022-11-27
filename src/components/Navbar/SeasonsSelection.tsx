import { useState } from 'react'
import { Modal, Button, Row, Col, Form, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../..'
import { selectSeason } from '../../stores/seasons.store'
import { SeasonsSelectionModal } from './Modals/SeasonsSelectionModal'

export function SeasonSelection({ show, handleClose }: any) {
  const { seasons } = useSelector((state: RootState) => state)
  const [selectedSeason, setSelectedSeason]: any = useState({});
  const dispatch = useDispatch<any>()
  const confirm = () => {
    console.log(selectedSeason);
    dispatch(selectSeason(selectedSeason));
    handleClose()
  }
  const [showSeasonsSelectionModal, setShowSeasonsSelectionModal] = useState(false)

  return (
    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: '#7C5529', border: 'none' }}
        >
          <Modal.Title>Temporada</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#7C5529', border: 'none' }}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>
                  Selecione a temporada
                </Form.Label>
                <Form.Select
                  aria-label=""
                  onChange={(e) => {
                    // dispatch(selectSeason(e.target.value))
                    // handleClose()
                    console.log(e.target.value);
                    setSelectedSeason(JSON.parse(e.target.value));
                  }}
                >
                  {seasons.seasons.map((season, index) => {
                    return (
                      <option
                        key={index}
                        value={JSON.stringify(season)}
                      >{`${season.type} - ${season.year}`}</option>
                    )
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#7C5529', border: 'none' }}>
          <Row>
            <Col>
              <Button
                style={{ border: 'none', backgroundColor: '#243C74' }}
                variant="success"
                onClick={() => setShowSeasonsSelectionModal(true)}
              >
                Adicionar
              </Button>
            </Col>
            <Col>
              <Button style={{ color: '#000' }}
                variant="success"
                onClick={() => {
                  confirm()
                  handleClose()
                }}
              >
                Confirmar
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
      <SeasonsSelectionModal show={showSeasonsSelectionModal} handleClose={() => setShowSeasonsSelectionModal(false)}></SeasonsSelectionModal>
    </Container>
  )
}
