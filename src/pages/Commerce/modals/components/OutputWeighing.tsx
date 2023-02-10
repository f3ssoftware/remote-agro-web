import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { NewManualOutputWeighing } from './NewManualOutputWeighing'
import { ManualOutputWeighing } from '../../../../models/ManualOutputWeighing'
import { ManualInputWeighing } from '../../../../models/ManualInputWeighing'


export function OutputWeighing() {
  const [newManualOuputWeighing, setNewManualOutputWeighing] = useState([new ManualOutputWeighing(),])





    const onRemoveItem = (index: number) => {
      const mOutputArr = [...newManualOuputWeighing];
      mOutputArr.splice(index, 1);
      setNewManualOutputWeighing(mOutputArr);
  }

  const onUpdateItem = (mOutput: ManualOutputWeighing, index: number) => {
    const mOutputArr = [...newManualOuputWeighing];
    mOutputArr.splice(index, 1);
    mOutputArr.push(mOutput);
    setNewManualOutputWeighing(mOutputArr);

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
            {newManualOuputWeighing.map((newMOutput, index) => {
                return <NewManualOutputWeighing onHandleRemove={onRemoveItem} index={index} key={index} onHandleUpdate={onUpdateItem}></NewManualOutputWeighing>
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
            <Button variant="primary" onClick={() => setNewManualOutputWeighing([...newManualOuputWeighing, new ManualInputWeighing()])}>Adicionar Linha</Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
