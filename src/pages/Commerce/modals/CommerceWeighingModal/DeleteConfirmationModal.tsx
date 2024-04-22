import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { asyncDeleteInputWeighing, asyncDeleteOutputWeighing, asyncDeleteSeparateWeighing, removeInputWeighRow, removeOutputWeighRow, removeSeparateWeighRow } from '../../../../stores/commerce.store'
import { Dialog } from 'primereact/dialog'
import { dialogContentSyle, dialogHeaderStyle } from '../../../../utils/modal-style.util'


export function DeleteConfirmationModal({
  show,
  handleClose,
  id,
  index,
  weighingType
}: {

  show: boolean
  handleClose: any
  id: number
  index: number,
  weighingType: string
}) {
  const dispatch = useDispatch<any>();

  const deleteAutoInputWeighing = (id: number) => {
    switch(weighingType) {
      case 'Entrada': {
        if (id) {
          dispatch(asyncDeleteInputWeighing(id, index));
        } else {
          dispatch(removeInputWeighRow({ index }));
        }
      } break;
      case 'Saída': {
        if (id) {
          dispatch(asyncDeleteOutputWeighing(id, index));
        } else {
          dispatch(removeOutputWeighRow({ index }));
        }
      } break; 
      case 'Única': {
        if (id) {
          dispatch(asyncDeleteSeparateWeighing(id, index));
        } else {
          dispatch(removeSeparateWeighRow({ index }));
        }
      }
    }
    

  }

  return (
    <Dialog
      header="Confirmar exclusão?"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      
        {' '}
        <Button
          variant="success"
          onClick={() => {
            handleClose()
            deleteAutoInputWeighing(id)
          }}
        >
          Confirmar
        </Button>
        <Button variant="danger" style={{marginLeft: '2%'}} onClick={handleClose}>
          Cancelar
        </Button>
    </Dialog>
    // <Modal show={show} onHide={handleClose} backdrop={'static'} size={'xl'}>
    //   <Modal.Header
    //     closeButton
    //     style={{ backgroundColor: '#7C5529', border: 'none' }}
    //   >
    //     <Modal.Title>
    //       {' '}
    //       <span style={{ color: '#fff' }}>Confirmar exclusão?</span>
    //     </Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body style={{ backgroundColor: '#7C5529' }}>

    //   </Modal.Body>
    //   <Modal.Footer style={{ backgroundColor: '#7C5529', border: 'none' }}>
    //   </Modal.Footer>
    // </Modal>
  )
}


