import { useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { Typeahead } from 'react-bootstrap-typeahead'
import {
  asyncFetchSiloData,
  asyncTransferWeighing,
} from '../../../../stores/commerce.store'
import {
  asyncFetchContractsData,
  asyncFetchCultivations,
} from '../../../../stores/financial.store'
import { Cultivation } from '../../../../models/Cultivation'
import { TransferWeighing } from '../../../../models/TransferWeighing'
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { InputNumber } from 'primereact/inputnumber'

export function NewTransferWeighing({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const dispatch = useDispatch<any>()
  const { financial, commerce } = useSelector((state: RootState) => state)
  const [selectedCultivation, setSelectedCultivation]: any = useState(null)
  const [selectedSiloInput, setSelectedSiloInput]: any = useState(null)
  const [selectedSiloOutput, setSelectedSiloOutput]: any = useState(null)
  const [quantity, setQuantity] = useState(0)
  const [siloList, setSiloList] = useState<any[]>([])
  const [cultivationList, setCultivationList] = useState<any[]>([])

  useEffect(() => {
    dispatch(asyncFetchContractsData())
    dispatch(asyncFetchSiloData())
    dispatch(asyncFetchCultivations())
  }, [])

  const fetchSilo = () => {
    return commerce?.silo?.map((silo: any) => {
      return { id: silo.id, label: silo.name, ...silo }
    })
  }

  const fetchCultivation = () => {
    return financial?.cultivations?.map((cultivation: Cultivation) => {
      return { id: cultivation.id, label: cultivation.name, ...cultivation }
    })
  }

  const autoCompleteSilo = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const resultSet = siloList.filter((p: any) =>
      p?.label?.toLowerCase().includes(query),
    )
    if (resultSet.length > 0) {
      setSiloList(resultSet)
    } else {
      setSiloList(fetchSilo())
    }
  }

  const autoCompleteCultivations = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const resultSet = cultivationList.filter((p: any) =>
      p?.label?.toLowerCase().includes(query),
    )
    if (resultSet.length > 0) {
      setCultivationList(resultSet)
    } else {
      setCultivationList(fetchCultivation())
    }
  }

  const save = () => {
    const transfer = {
      weighings: {
        cultivation_id: selectedCultivation.id,
        input_silo_id: selectedSiloInput.id,
        weighing_date: new Date().toISOString(),
        output_silo_id: selectedSiloOutput.id,
        transfer_quantity: quantity,
        type: 'Transferência',
      },
    }
    dispatch(asyncTransferWeighing(transfer))
  }

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <span className="p-float-label">
            <AutoComplete
              field="label"
              suggestions={siloList}
              value={selectedSiloOutput}
              completeMethod={autoCompleteSilo}
              onChange={(e: any) => {
                setSelectedSiloOutput(e.value)
              }}
              dropdown
              forceSelection
              style={{ width: '100%' }}
            />
            <label htmlFor="silo">Silo de saída</label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
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
          </Form.Group> */}
        </Col>
        <Col>
          <span className="p-float-label">
            <AutoComplete
              field="label"
              suggestions={cultivationList}
              value={selectedCultivation}
              completeMethod={autoCompleteCultivations}
              onChange={(e: any) => {
                setSelectedCultivation(e.value)
              }}
              dropdown
              forceSelection
              style={{ width: '100%' }}
            />
            <label htmlFor="farm">Cultivo</label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Cultura</Form.Label>
            <Typeahead
              id="cultivation"
              onChange={(selected: any) => {
                setSelectedCultivation(selected[0])
              }}
              options={financial.cultivations.map(
                (cultivation: Cultivation) => {
                  return {
                    id: cultivation.id,
                    label: cultivation.name,
                    ...cultivation,
                  }
                },
              )}
            />
          </Form.Group> */}
        </Col>
        <Col>
        <span className="p-float-label">
            <AutoComplete
              field="label"
              suggestions={siloList}
              value={selectedSiloInput}
              completeMethod={autoCompleteSilo}
              onChange={(e: any) => {
                setSelectedSiloInput(e.value)
              }}
              dropdown
              forceSelection
              style={{ width: '100%' }}
            />
            <label htmlFor="silo">Silo de Entrada</label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Silo de Entrada</Form.Label>
            <Typeahead
              id="siloInput"
              onChange={(selected: any) => {
                setSelectedSiloInput(selected[0])
              }}
              options={commerce?.silo?.map((silo: any) => {
                return { id: silo.id, label: silo.name, ...silo }
              })}
            />
          </Form.Group> */}
        </Col>
        <Col>
        <span className="p-float-label">
            <InputNumber
              value={quantity}
              onChange={(e) => {
                setQuantity(e.value!)
              }}
              mode="decimal"
              locale="pt-BR"
              style={{ width: '100%' }}
              minFractionDigits={0}
              maxFractionDigits={3}
            />

            <label htmlFor="company">Quantidade</label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Quantidade</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(Number(e.target.value))
              }}
            />
          </Form.Group> */}
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
