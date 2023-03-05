import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { NewManualInputWeighing } from './NewManualInputWeighing'

import { NewAutoInputWeighing } from './NewAutoInputWeighing'
import { InputWeighingRow } from '../../../../models/InputWeighingRow'

export function EditInputWeighing() {
  const [newManualInputWeighing, setNewManualInputWeighing] = useState<any[]>([])
  const [newAutoInputWeighing, setNewAutoInputWeighing] = useState([new InputWeighingRow()])

  const onRemoveItem = (index: number) => {
    const mInputArr = [...newManualInputWeighing]
    mInputArr.splice(index, 1)
    setNewManualInputWeighing(mInputArr)
  }

  const onRemoveItemA = (index: number) => {
    const aInputArr = [...newAutoInputWeighing]
    aInputArr.splice(index, 1)
    setNewAutoInputWeighing(aInputArr)
  }

  const onUpdateItem = (minput: InputWeighingRow, index: number) => {
    const mInputArr = [...newManualInputWeighing]
    mInputArr.splice(index, 1)
    mInputArr.push(minput)
    setNewManualInputWeighing(mInputArr)
  }
  const onUpdateItemA = (aInput: InputWeighingRow, index: number) => {
    const aInputArr = [...newAutoInputWeighing]
    aInputArr.splice(index, 1)
    aInputArr.push(aInput)
    setNewAutoInputWeighing(aInputArr)
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
            {/* {newManualInputWeighing.map((newMInput, index) => {
              return (
                <NewManualInputWeighing
                  index={index}
                  key={index}

                  onHandleUpdate={onUpdateItem}
                  onHandleRemove={onRemoveItem}
                ></NewManualInputWeighing>
              )
            })} */}
            {/* {newAutoInputWeighing.map((newAInput, index) => {
              return (
                <NewAutoInputWeighing
                  index={index}
                  key={index}
                  onHandleUpdate={onUpdateItemA}
                  onHandleRemove={onRemoveItemA}
                  autoInputWeighing={}
                ></NewAutoInputWeighing>
              )
            })} */}
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
              variant="secondary"
              onClick={() =>
                setNewManualInputWeighing([
                  ...newManualInputWeighing,
                  new InputWeighingRow(),
                ])
              }
            >
              Adicionar linha manual
            </Button>

            <Button
              variant="primary"
              onClick={() =>
                setNewAutoInputWeighing([
                  ...newAutoInputWeighing,
                  new InputWeighingRow(),
                ])
              }
            >
              Adicionar linha automática
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
