import { useEffect, useRef, useState } from 'react'
import { Row, Col, Button, Form, Modal } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { Planning } from '../../../models/Planning'
import {
  asyncEditPlannings,
  asyncFetchPlanningData,
  asyncNewPlannings,
} from '../../../stores/planning.store'
import { PlanningCost } from '../../../models/PlanningCost'
import { EditPlanningTab } from './EditPlanningTab'
import { Dialog } from 'primereact/dialog'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../utils/modal-style.util'
import { Dropdown } from 'primereact/dropdown'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Toast } from 'primereact/toast'

export function EditPlanningCost({
  show,
  handleClose,
  id,
}: {
  show: boolean
  handleClose: any
  id: number
}) {
  const [referenceName, setReferenceName] = useState('')
  const [key, setKey] = useState(0)
  const [plannings, setPlannings] = useState<any[]>([])
  const dispatch = useDispatch<any>()
  const { seasons } = useSelector((state: RootState) => state)
  const { planning } = useSelector((state: RootState) => state)
  const [outcomeYear, setOutcomeYear] = useState<string>('')
  const toast = useRef<Toast>(null)

  const edit = () => {
    const planning: Planning = {
      name: referenceName,
      season_year: outcomeYear,
      type: 'Custos Indiretos',
      plannings: plannings,
    }
    dispatch(asyncEditPlannings(id, planning))

    handleClose()
  }

  useEffect(() => {
      setPlannings(planning?.editPlannings?.plannings_indirect_costs!)
      setOutcomeYear(planning?.editPlannings?.season_year!)
      setReferenceName(planning?.editPlannings?.name!)
  }, [planning])

  const onUpdateItem = (planning: PlanningCost, index: number) => {
    const planningArr = [...plannings]
    planningArr.splice(index, 1)
    planningArr.push(planning)
    setPlannings(planningArr)
  }
  const onRemoveItem = (index: number) => {
    const planningsArr = [...plannings]
    planningsArr.splice(index, 1)
    setPlannings(planningsArr)
  }

  return (
    <Dialog
      header={<span>Planejamento - {planning.editPlannings.name}</span>}
      visible={show}
      style={{ width: '80vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      <div>
        <Toast ref={toast} />
        <Formik
        enableReinitialize={true}
          initialValues={{
            referenceName: referenceName,
          }}
          validationSchema={Yup.object({
            referenceName: Yup.string().required('Necessário preencher'),
          })}
          onSubmit={() => {
            edit()
            handleClose()
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Row style={{ marginTop: '2%' }}>
                <Col md={3}>
                  <span className="p-float-label">
                    <InputText
                      id="referenceName"
                      name="referenceName"
                      value={formik.values.referenceName}
                      onChange={(e) => {
                        formik.setFieldValue('referenceName', e.target.value)
                        setReferenceName(e.target.value)
                      }}
                      className={classNames({
                        'p-invalid':
                          formik.touched.referenceName &&
                          formik.errors.referenceName,
                      })}
                    />
                    {formik.touched.referenceName &&
                    formik.errors.referenceName ? (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {formik.errors.referenceName}
                      </div>
                    ) : null}
                    <label htmlFor="referenceName">Nome</label>
                  </span>
                </Col>
                <Col md={3}>
                  <span className="p-float-label">
                    <Dropdown
                      value={outcomeYear}
                      options={seasons?.seasons?.map((season) => ({
                        label: `${season?.type} - ${season?.year}`,
                        value: season?.year,
                      }))}
                      onChange={(e) => {
                        setOutcomeYear(e.value)
                      }}
                      placeholder="Selecione a temporada"
                    />
                    <label htmlFor="season">Ano agrícola</label>
                  </span>
                </Col>
              </Row>
              <div>
                {plannings.map((month, index) => {
                  return (
                    <EditPlanningTab
                      index={index}
                      onHandleUpdate={onUpdateItem}
                      onHandleRemove={onRemoveItem}
                    ></EditPlanningTab>
                  )
                })}
              </div>

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
                  type="submit"
                  // onClick={() => {
                  //   register()
                  // }}
                >
                  Registrar
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>
                    setPlannings([...plannings, new PlanningCost()])
                  }
                >
                  Adicionar Linha
                </Button>
              </div>
            </form>
          )}
        </Formik>
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
