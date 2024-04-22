import { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Dropdown, Modal } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead'
import { RootState } from '../../..'
import { PlanningInput } from '../../../models/PlanningInput'
import { NewPlanningItem } from './NewPlanningItem'
import { Planning } from '../../../models/Planning'
import {
  asyncEditPlannings,
  asyncNewPlannings,
} from '../../../stores/planning.store'
import { EditPlanningItem } from './EditPlanningItem'
import { Dialog } from 'primereact/dialog'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../utils/modal-style.util'

export function EditPlanningProducts({
  show,
  handleClose,
  id,
}: {
  show: boolean
  handleClose: any
  id: number
}) {
  const [referenceName, setReferenceName] = useState('')
  const dispatch = useDispatch<any>()
  const [plannings, setPlannings] = useState<any[]>([])
  const { seasons, planning } = useSelector((state: RootState) => state)
  const [selectedSeason, setSelectedSeason] = useState('')

  const register = () => {
    const p: Planning = {
      name: referenceName,
      season_year: selectedSeason,
      type: 'Insumos',
      plannings: plannings,
    }
    dispatch(asyncEditPlannings(id, p))
    handleClose()
  }

  const onRemoveItem = (index: number) => {
    const planningsArr = [...plannings]
    planningsArr.splice(index, 1)
    setPlannings(planningsArr)
  }

  const onUpdateItem = (planning: PlanningInput, index: number) => {
    const planningsArr = [...plannings]
    planningsArr.splice(index, 1)
    planningsArr.push(planning)
    setPlannings(planningsArr)
  }

  useEffect(() => {
    setPlannings(planning.editPlannings?.plannings_products!)
    setSelectedSeason(planning.editPlannings?.season_year!)
    setReferenceName(planning.editPlannings?.name!)
  }, [planning])

  return (
    <Dialog
      header={<span>Planejamento - {planning.editPlannings.name}</span>}
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      <div>
        <Row style={{ marginTop: '2%' }}>
          <Col>
            <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>Nome</Form.Label>
              <Form.Control
                type="text"
                value={referenceName}
                onChange={(e) => {
                  setReferenceName(e.target.value)
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Ano agrícola</Form.Label>
              <Form.Select
                value={selectedSeason}
                aria-label=""
                onChange={(e) => {
                  return setSelectedSeason(e.target.value)
                }}
              >
                {' '}
                <option value={0} key={0}>
                  "Selecione um ano agrícola"
                </option>
                {seasons.seasons.map((season, index) => {
                  return (
                    <option value={season.year} key={index}>
                      {season.type} - {season.year}
                    </option>
                  )
                })}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {plannings?.map((newPlanning, index) => {
          return (
            <EditPlanningItem
              onHandleRemove={onRemoveItem}
              index={index}
              key={index}
              onHandleUpdate={onUpdateItem}
            ></EditPlanningItem>
          )
        })}

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
            onClick={() => setPlannings([...plannings, new PlanningInput()])}
          >
            Adicionar Linha
          </Button>
          <Button
            variant="success"
            onClick={() => {
              register()
            }}
          >
            Registrar
          </Button>
        </div>
      </div>
    </Dialog>
    // <Modal backdrop={'static'} show={show} onHide={handleClose} size={'xl'}>
    //   <Modal.Header
    //     closeButton
    //     style={{ backgroundColor: '#7C5529', border: 'none' }}
    //   >
    //     <Modal.Title>
    //       {' '}
    //       <span style={{ color: '#fff' }}>
    //         Planejamento - {planning.editPlannings.name}
    //       </span>
    //     </Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body style={{ backgroundColor: '#7C5529' }}>
    //   </Modal.Body>
    // </Modal>
  )
}
