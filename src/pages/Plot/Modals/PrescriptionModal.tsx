import { useState } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import { Prescription } from '../components/Prescription'
import { NewPrescriptionModal } from './NewPrescriptionModal'

export function PrescriptionModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const [showNewPrescriptionModal, setShowNewPrescriptionModal] =
    useState(false)
  return (
    <Container>
      <Modal show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: '#7C5529', border: 'none' }}
        >
          <Modal.Title>
            {' '}
            <span style={{ color: '#fff' }}>Receituário</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#7C5529' }}>
          <Prescription></Prescription>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: '2%',
            }}
          >
            <Button
              style={{ backgroundColor: '#A5CD33', color: '#000' }}
              variant="success"
              onClick={() => {
                handleClose(), setShowNewPrescriptionModal(true)
              }}
            >
              Avançar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <NewPrescriptionModal show={showNewPrescriptionModal} handleClose={() => setShowNewPrescriptionModal(false)}></NewPrescriptionModal>
    </Container>
  )
}
