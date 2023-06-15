import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { OutputTank } from '../components/OutputTank'

export function OutputTankModal({
  show,
  handleClose,
  id
}: {
  show: boolean
  handleClose: any
  id: number
}) {
  const [quantity, setQuantity] = useState(0)
  const [date, setDate] = useState(new Date())
  const dispatch = useDispatch<any>()


  return (
    <Container>
      <Modal backdrop={'static'} show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: '#7C5529', border: 'none' }}
        >
          <Modal.Title>
            {' '}
            <span style={{ color: '#fff' }}>Tanques</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#7C5529' }}>
          <div>
            <Row style={{ marginTop: '2%' }}>

                <OutputTank id={id}></OutputTank>

            </Row>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: '2%',
            }}
          >
            <Button
              variant="success"
              onClick={() => {
                handleClose()
              }}
            >
              Adicionar linha
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  )
}


