import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { OutputTank } from '../components/OutputTank'
import { Fuel } from '../../../../models/Fuel'
import { setFuellings } from '../../../../stores/maintenance.store'
import { RootState } from '../../../..'

export function OutputTankModal({
  show,
  handleClose,
  id
}: {
  show: boolean
  handleClose: any
  id: number
}) {
 
  const [outputTankRows, setOutputTankRows] = useState([new Fuel()])
  const dispatch = useDispatch<any>()


  const onUpdateItem = (fuel: Fuel, index: number) => {
    const fuelArr = [...outputTankRows];
    fuelArr.splice(index, 1);
    fuelArr.push(fuel);
    setOutputTankRows(fuelArr);

}
const onRemoveItem = (index: number) => {
  const fuelArr = [...outputTankRows];
  fuelArr.splice(index, 1);
  setOutputTankRows(fuelArr);
}


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

              {outputTankRows.map((o,index)=>{
                return <OutputTank id={id} index={index} key={index} onHandleUpdate={onUpdateItem} onHandleRemove={onRemoveItem}></OutputTank>
              })}

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
                setOutputTankRows([...outputTankRows, new Fuel()])
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


