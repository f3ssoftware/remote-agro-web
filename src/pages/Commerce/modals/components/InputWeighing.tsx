import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NewInputWeighing } from './NewInputWeighing'
import { ManualInputWeighing } from '../../../../models/ManualInputWeighing'
import { setManualInputWeighing } from '../../../../stores/commerce.store'

export function InputWeighing() {
  const [newManualInputWeighing, setNewManualInputWeighing] = useState([
    new ManualInputWeighing(),
  ])

  const onRemoveItem = (index: number) => {
    const mInputArr = [...newManualInputWeighing]
    mInputArr.splice(index, 1)
    setManualInputWeighing(mInputArr)
  }

  const onUpdateItem = (minput: ManualInputWeighing, index: number) => {
    const mInputArr = [...newManualInputWeighing]
    mInputArr.splice(index, 1)
    mInputArr.push(minput)
    setManualInputWeighing(mInputArr)
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
                <NewInputWeighing
                  index={index}
                  key={index}
                  onHandleUpdate={onUpdateItem}
                  onHandleRemove={onRemoveItem}
                ></NewInputWeighing>
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
