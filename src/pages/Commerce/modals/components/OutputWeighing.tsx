import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { NewManualOutputWeighing } from './NewManualOutputWeighing'
import { ManualOutputWeighing } from '../../../../models/ManualOutputWeighing'
import { NewAutoOutputWeighing } from './NewAutoOutputWeighing'


export function OutputWeighing() {
  const [newManualOutputWeighing, setNewManualOutputWeighing] = useState<any[]>([])
  const [newAutoOutputWeighing, setNewAutoOutputWeighing] = useState([new ManualOutputWeighing()])





    const onRemoveItem = (index: number) => {
      const mOutputArr = [...newManualOutputWeighing];
      mOutputArr.splice(index, 1);
      setNewManualOutputWeighing(mOutputArr);
  }

  const onRemoveItemA = (index: number) => {
    const aOutputArr = [...newAutoOutputWeighing];
    aOutputArr.splice(index, 1);
    setNewAutoOutputWeighing(aOutputArr);
}

  const onUpdateItem = (mOutput: ManualOutputWeighing, index: number) => {
    const mOutputArr = [...newManualOutputWeighing];
    mOutputArr.splice(index, 1);
    mOutputArr.push(mOutput);
    setNewManualOutputWeighing(mOutputArr);

  }

  const onUpdateItemA = (aOutput: ManualOutputWeighing, index: number) => {
    const aOutputArr = [...newAutoOutputWeighing];
    aOutputArr.splice(index, 1);
    aOutputArr.push(aOutput);
    setNewAutoOutputWeighing(aOutputArr);

  }

  return (
    <Container>
      <div className="main-boxW">
        <Row>
          <Col md={4} className="title-boxW">
            <span>Pesagens de Saída</span>
          </Col>
        </Row>
        <div>
          <Row style={{ marginTop: '2%', paddingLeft: '1%', paddingRight: '1%' }}>
            {newManualOutputWeighing.map((newMOutput, index) => {
                return <NewManualOutputWeighing onHandleRemove={onRemoveItem} index={index} key={index} onHandleUpdate={onUpdateItem}></NewManualOutputWeighing>
            })}
            {newAutoOutputWeighing.map((newAOutput, index) => {
                return <NewAutoOutputWeighing onHandleRemove={onRemoveItemA} index={index} key={index} onHandleUpdate={onUpdateItemA}></NewAutoOutputWeighing>
            })}
          </Row>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: '2%',
            }}
          >
            <Button variant="secondary" onClick={() => setNewManualOutputWeighing([...newManualOutputWeighing, new ManualOutputWeighing()])}>Adicionar linha manual</Button>
            <Button variant="primary" onClick={() => setNewAutoOutputWeighing([...newAutoOutputWeighing, new ManualOutputWeighing()])}>Adicionar linha automática</Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
