import { Button, Modal } from 'react-bootstrap'
import { NewSeasonsSelection } from '../NewSeasonsSelection'
import { Dialog } from 'primereact/dialog'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../utils/modal-style.util'

export function SeasonsSelectionModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  return (
    <Dialog
      header="Nova Temporada"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      <NewSeasonsSelection></NewSeasonsSelection>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '2%',
        }}
      >
        <Button
          style={{ color: '#000' }}
          variant="success"
          onClick={() => {
            handleClose()
          }}
        >
          Confirmar
        </Button>
      </div>
    </Dialog>
  )
  //     <Modal backdrop = {'static'} show={show} onHide={handleClose} size={'xl'}>
  //     <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
  //         <Modal.Title> <span style={{ color: '#fff' }}>Nova Temporada</span></Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body style={{ backgroundColor: "#7C5529" }}>
  //     </Modal.Body>
  // </Modal >
}
