import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { asyncFetchWeighingData } from '../../../../stores/commerce.store'
import { useEffect } from 'react'
import { RootState } from '../../../..'

export function AutoConfirmationModal({
  show,
  handleClose,
  setValue
}: {
  show: boolean
  handleClose: any
  setValue: any
}) {
  const dispatch = useDispatch<any>()
  const { commerce } = useSelector((state: RootState) => state)

  const confirmation = () =>{
    setValue(commerce?.autoInputWeighing?.Peso!)
  }

  useEffect(()=>{
    dispatch(asyncFetchWeighingData())
  }, [])

  return (
    <Modal show={show} onHide={handleClose} backdrop={'static'} size={'xl'}>
      <Modal.Header
        closeButton
        style={{ backgroundColor: '#7C5529', border: 'none' }}
      >
        <Modal.Title>
          {' '}
          <span style={{ color: '#fff' }}>
            Dados da balança foram obtidos com sucesso. Por favor, verifique o
            valor: {commerce.autoInputWeighing.Peso}. Se o valor estiver correto, pressione 'OK', caso
            contrário, cancele e pressione novamente o botão 'Receber'.
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#7C5529' }}></Modal.Body>
      <Modal.Footer style={{ backgroundColor: '#7C5529', border: 'none' }}>
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
        <Button variant="danger" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
