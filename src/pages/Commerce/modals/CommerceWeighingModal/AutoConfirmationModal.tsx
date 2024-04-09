import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { asyncFetchWeighingData } from '../../../../stores/commerce.store'
import { useEffect } from 'react'
import { RootState } from '../../../..'
import { Dialog } from 'primereact/dialog'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../../utils/modal-style.util'

export function AutoConfirmationModal({
  show,
  handleClose,
  setValue,
  setWeightDate,
}: {
  show: boolean
  handleClose: any
  setValue: any
  setWeightDate: any
}) {
  const dispatch = useDispatch<any>()
  const { commerce, loading } = useSelector((state: RootState) => state)

  const confirmation = () => {
    setValue(commerce?.autoInputWeighing?.Peso!)
    setWeightDate(commerce?.autoInputWeighing?.Horario!)
  }

  useEffect(() => {
    dispatch(
      asyncFetchWeighingData(
        JSON.parse(sessionStorage.getItem('user')!).user_id,
      ),
    )
  }, [show])

  return (
    <Dialog
      header={
        loading.requests.filter((r) => r === 'weighings').length > 0 ? (
          'Carregando'
        ) : (
          <span>
            Dados da balança foram obtidos com sucesso. Por favor, verifique o
            valor: {commerce.autoInputWeighing.Peso}. Se o valor estiver
            correto, pressione 'OK', caso contrário, cancele e pressione
            novamente o botão 'Receber'.
          </span>
        )
      }
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
          confirmation()
        }}
      >
        OK
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
    //       {loading.requests.filter(r => r === 'weighings').length > 0 ? 'Carregando' : <span style={{ color: '#fff' }}>
    //         Dados da balança foram obtidos com sucesso. Por favor, verifique o
    //         valor: {commerce.autoInputWeighing.Peso}. Se o valor estiver correto, pressione 'OK', caso
    //         contrário, cancele e pressione novamente o botão 'Receber'.
    //       </span>}

    //     </Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body style={{ backgroundColor: '#7C5529' }}></Modal.Body>
    //   <Modal.Footer style={{ backgroundColor: '#7C5529', border: 'none' }}>
    //   </Modal.Footer>
    // </Modal>
  )
}
