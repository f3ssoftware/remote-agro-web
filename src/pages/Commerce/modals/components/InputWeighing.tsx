import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { NewManualInputWeighing } from './NewManualInputWeighing'
import { ManualInputWeighing } from '../../../../models/ManualInputWeighing'

export function InputWeighing() {
  const [newManualInputWeighing, setNewManualInputWeighing] = useState([new ManualInputWeighing(),])

  const onRemoveItem = (index: number) => {
    const mInputArr = [...newManualInputWeighing]
    mInputArr.splice(index, 1)
    setNewManualInputWeighing(mInputArr)
  }

  const onUpdateItem = (minput: ManualInputWeighing, index: number) => {
    const mInputArr = [...newManualInputWeighing]
    mInputArr.splice(index, 1)
    mInputArr.push(minput)
    setNewManualInputWeighing(mInputArr)
  }

  return (
    <Container>
      <div className="main-boxW">
        <Row>
          <Col md={4} className="title-boxW">
            <span>Pesagens de entrada</span>
          </Col>
        </Row>
        <div>
          <Row
            style={{ marginTop: '2%', paddingLeft: '1%', paddingRight: '1%' }}
          >
            {newManualInputWeighing.map((newMInput, index) => {
              return (
                <NewManualInputWeighing
                  index={index}
                  key={index}
                  onHandleUpdate={onUpdateItem}
                  onHandleRemove={onRemoveItem}
                ></NewManualInputWeighing>
              )
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
            <Button
              variant="primary"
              onClick={() =>
                setNewManualInputWeighing([
                  ...newManualInputWeighing,
                  new ManualInputWeighing(),
                ])
              }
            >
              Adicionar linha manual
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
