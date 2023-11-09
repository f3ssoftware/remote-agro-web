import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Farm } from '../../../models/Farm'
import { useDispatch, useSelector } from 'react-redux'
import { asyncRegisterFarm } from '../../../stores/farm.store'
import { RootState } from '../../..'

export function NewFarm({handleClose}:{handleClose: any}) {
    const [propName,setPropName] = useState('')
    const [totalArea,setTotalArea] = useState(0)
    const [quantity,setQuantity] = useState(0)
    const dispatch = useDispatch<any>()
    const {seasons } = useSelector((state: RootState) => state)

    const register = () => {
      const farm: Farm = {
        name: propName,
        total_area: totalArea,
        fields_quantity: quantity,
        season_id: seasons.selectedSeason.id
        
      }
      dispatch(asyncRegisterFarm(farm))
    }
    
  return (
    <Row style={{ marginTop: '2%' }}>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Nome da proriedade
            </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setPropName(e.target.value)
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Área total (ha)
            </Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setTotalArea(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Quantidade de talhões
            </Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setQuantity(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%' }}>
                <Button variant="success" onClick={() => {register();handleClose();}}>Cadastrar</Button>
            </div>
    </Row>
    
  )
}


