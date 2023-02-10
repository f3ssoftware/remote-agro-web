import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { NewSeparateWeighing } from './NewSeparateWeighing'
import { ManualSeparateWeighing } from '../../../../models/ManualSepareteWeighing'


export function SepareteWeighing() {
  const [newManualSeparateWeighing, setNewManualSeparateWeighing] = useState([new ManualSeparateWeighing(),])





    const onRemoveItem = (index: number) => {
      const separateArr = [...newManualSeparateWeighing];
      separateArr.splice(index, 1);
      setNewManualSeparateWeighing(separateArr);
  }

  const onUpdateItem = (separate: ManualSeparateWeighing , index: number) => {
    const separateArr = [...newManualSeparateWeighing];
    separateArr.splice(index, 1);
    separateArr.push(separate);
    setNewManualSeparateWeighing(separateArr);

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
            {newManualSeparateWeighing.map((newSeparate, index) => {
                return <NewSeparateWeighing onHandleRemove={onRemoveItem} index={index} key={index} onHandleUpdate={onUpdateItem}></NewSeparateWeighing>
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
            <Button variant="primary" onClick={() => setNewManualSeparateWeighing([...newManualSeparateWeighing, new ManualSeparateWeighing()])}>Adicionar Linha</Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
