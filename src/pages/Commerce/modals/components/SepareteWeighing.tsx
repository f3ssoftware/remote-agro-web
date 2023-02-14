import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { NewManualSeparateWeighing } from './NewManualSeparateWeighing'
import { ManualSeparateWeighing } from '../../../../models/ManualSepareteWeighing'
import { NewAutoSeparateWeighing } from './NewAutoSeparateWeighing'


export function SepareteWeighing() {
  const [newManualSeparateWeighing, setNewManualSeparateWeighing] = useState<any[]>([])
  const [newAutoSeparateWeighing, setNewAutoSeparateWeighing] = useState([new ManualSeparateWeighing()])





    const onRemoveItem = (index: number) => {
      const separateArr = [...newManualSeparateWeighing];
      separateArr.splice(index, 1);
      setNewManualSeparateWeighing(separateArr);
  }
  const onRemoveItemA = (index: number) => {
    const aSeparateArr = [...newAutoSeparateWeighing];
    aSeparateArr.splice(index, 1);
    setNewAutoSeparateWeighing(aSeparateArr);
}

  const onUpdateItem = (mSeparate: ManualSeparateWeighing , index: number) => {
    const separateArr = [...newManualSeparateWeighing];
    separateArr.splice(index, 1);
    separateArr.push(mSeparate);
    setNewManualSeparateWeighing(separateArr);

  }

  const onUpdateItemA = (aSeparate: ManualSeparateWeighing , index: number) => {
    const aSeparateArr = [...newAutoSeparateWeighing];
    aSeparateArr.splice(index, 1);
    aSeparateArr.push(aSeparate);
    setNewAutoSeparateWeighing(aSeparateArr);

  }


  return (
    <Container>
      <div className="main-boxW">
        <Row>
          <Col md={4} className="title-boxW">
            <span>Pesagens Avulsas</span>
          </Col>
        </Row>
        <div>
          <Row style={{ marginTop: '2%', paddingLeft: '1%', paddingRight: '1%' }}>
            {newManualSeparateWeighing.map((newMSeparate, index) => {
                return <NewManualSeparateWeighing onHandleRemove={onRemoveItem} index={index} key={index} onHandleUpdate={onUpdateItem}></NewManualSeparateWeighing>
            })}
            {newAutoSeparateWeighing.map((newASeparate, index) => {
                return <NewAutoSeparateWeighing onHandleRemove={onRemoveItemA} index={index} key={index} onHandleUpdate={onUpdateItemA}></NewAutoSeparateWeighing>
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
            <Button variant="secondary" onClick={() => setNewManualSeparateWeighing([...newManualSeparateWeighing, new ManualSeparateWeighing()])}>Adicionar linha manual</Button>
            <Button variant="primary" onClick={() => setNewAutoSeparateWeighing([...newAutoSeparateWeighing, new ManualSeparateWeighing()])}>Adicionar linha automática</Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
