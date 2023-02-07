import { useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { Typeahead } from 'react-bootstrap-typeahead'
import { asyncFetchSiloData, asyncTransferWeighing } from '../../../../stores/commerce.store'
import { asyncFetchContractsData, asyncFetchCultivations } from '../../../../stores/financial.store'
import { Cultivation } from '../../../../models/Cultivation'
import { TransferWeighing } from '../../../../models/TransferWeighing'


export function NewTransferWeighing({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const dispatch = useDispatch<any>()
  const { financial, commerce } = useSelector((state: RootState) => state)
  const [selectedCultivation, setSelectedCultivation]: any = useState({})
  const [selectedSiloInput, setSelectedSiloInput]: any = useState({})
  const [selectedSiloOutput, setSelectedSiloOutput]: any = useState({})
  const [quantity, setQuantity] = useState(0)


  useEffect(() => {
    dispatch(asyncFetchContractsData())
    dispatch(asyncFetchSiloData())
    dispatch(asyncFetchCultivations())
  }, [])

  const save = () =>{
    const transfer = {
      weighings: {
        cultivation_id: selectedCultivation.id,
        input_silo_id: selectedSiloInput.id,
        weighing_date: new Date().toISOString(),
        output_silo_id: selectedSiloOutput.id,
        transfer_quantity: quantity,
        type: 'Transferência'
      }
    }
    dispatch(asyncTransferWeighing(transfer))
  }


  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
      <Col>
        <Form.Group className="mb-3" controlId="">
            <Form.Label style={{color: '#fff'}}>Silo de Saída</Form.Label>
            <Typeahead
              id="siloOutput"
              onChange={(selected: any) => {
                setSelectedSiloOutput(selected[0]);
              }}
              options={commerce?.silo?.map((silo: any) => {
                return { id: silo.id, label: silo.name, ...silo }
              })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{color:'#fff'}}>Cultura</Form.Label>
            <Typeahead
              id="cultivation"
              onChange={(selected: any) => {
                setSelectedCultivation(selected[0]);
              }}
              options={financial.cultivations.map((cultivation: Cultivation) => {
                return { id: cultivation.id, label: cultivation.name, ...cultivation }
              })}
            />
          </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="">
            <Form.Label style={{color: '#fff'}}>Silo de Entrada</Form.Label>
            <Typeahead
              id="siloInput"
              onChange={(selected: any) => {
                setSelectedSiloInput(selected[0]);
              }}
              options={commerce?.silo?.map((silo: any) => {
                return { id: silo.id, label: silo.name, ...silo }
              })}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Quantidade</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(Number(e.target.value))
              }}
            />
          </Form.Group>
        </Col>
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
          variant="success"
          onClick={() => {
            save()
          }}
        >
          Salvar
        </Button>
      </div>
    </div>
  )
}
