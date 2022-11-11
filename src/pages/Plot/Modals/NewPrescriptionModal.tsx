import { Button, Modal } from 'react-bootstrap'
import { NewPrescription } from '../components/NewPrescription'

export function NewPrescriptionModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  return (
    <Modal show={show} onHide={handleClose} size={'xl'}>
      <Modal.Header
        closeButton
        style={{ backgroundColor: '#7C5529', border: 'none' }}
      >
        <Modal.Title>
          {' '}
          <span style={{ color: '#fff' }}>Receituário</span>
          <div>Info receituario anterior</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#7C5529' }}>
        <NewPrescription></NewPrescription>
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
              handleClose()
            }}
          >
            Confirmar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
