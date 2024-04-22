import { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Form, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../..'
import { selectSeason } from '../../stores/seasons.store'
import { SeasonsSelectionModal } from './Modals/SeasonsSelectionModal'
import { asyncFetchInputWeighingData, asyncFetchOutputWeighingData, asyncFetchWeighingData } from '../../stores/commerce.store'
import { Dialog } from 'primereact/dialog'
import { dialogContentSyle, dialogHeaderStyle } from '../../utils/modal-style.util'

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

  useEffect(() => {
    dispatch(asyncFetchInputWeighingData(seasons?.selectedSeason?.id));
    dispatch(asyncFetchOutputWeighingData(seasons?.selectedSeason?.id));

    if (selectedSeason?.id !== seasons.selectedSeason.id) {
      setSelectedSeason(seasons.selectedSeason)
    }

  }, [seasons])
  return (
    <Container>
      <Dialog
      header="Temporada"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="">
                <Form.Label style={{ color: '#fff' }}>
                  Selecione a temporada
                </Form.Label>
                <Form.Select
                  value={JSON.stringify(selectedSeason)}
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
    </Dialog>
      <SeasonsSelectionModal show={showSeasonsSelectionModal} handleClose={() => setShowSeasonsSelectionModal(false)}></SeasonsSelectionModal>
    </Container>
  )
}
