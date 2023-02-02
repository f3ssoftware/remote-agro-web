import { useEffect, useState } from 'react'
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { asyncFetchFarms, selectAFarm } from '../../../../stores/farm.store'

export function InputWeighing({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const dispatch = useDispatch<any>()
  const { farm, seasons } = useSelector((state: RootState) => state)
  const [selectedFarm, setSelectedFarm]: any = useState({})
  const [selectedPlot, setSelectedPlot]: any = useState({})

  const selectFarm = (farm: any) => {
    setSelectedFarm(farm);
    dispatch(selectAFarm(farm));
  }

  useEffect(() => {
    dispatch(asyncFetchFarms());
    setSelectedFarm(farm?.farms[0]);
    dispatch(selectAFarm(farm?.farms[0]));
    // setSelectedPlot(farm?.farms[0].fields[0]);
  }, [])

//     const onRemoveItem = (index: number) => {
//       const inputArr = [...];
//       planningsArr.splice(index, 1);
//       setPlannings(planningsArr);
//   }

  // const onUpdateItem = (planning: PlanningInput, index: number) => {
  //   const planningsArr = [...plannings];
  //   planningsArr.splice(index, 1);
  //   planningsArr.push(planning);
  //   setPlannings(planningsArr);

  // }

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Fazenda</Form.Label>
            <Form.Select
              value={selectedFarm?.name}
              aria-label=""
              onChange={(e) => {
                return setSelectedFarm(e.target.value)
              }}
            >
              {' '}
              {farm?.farms?.map((farm: any, index) => {
                return <option key={index} onClick={() => selectFarm(farm)}>{farm.name}</option>
              })}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Talhões</Form.Label>
            <Form.Select
              value={selectedPlot?.name}
              aria-label=""
              onChange={(e) => {
                return setSelectedPlot(e.target.value)
              }}
            >
              {' '}
              {selectedFarm?.fields?.map((field: any, index: number) => {
                return <option key={index} onClick={() => setSelectedPlot(field)}>{field.name}</option>
              })}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      {/* {plannings.map((newPlanning, index) => {
            return <NewPlanningItem onHandleRemove={onRemoveItem} index={index} key={index} onHandleUpdate={onUpdateItem}></NewPlanningItem>
        })} */}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '2%',
        }}
      >
        {/* <Button variant="primary" onClick={() => setPlannings([...plannings, new PlanningInput()])}>Adicionar Linha</Button> */}
        <Button
          variant="success"
          onClick={() => {
            // register()
          }}
        >
          Registrar
        </Button>
      </div>
    </div>
  )
}
