import { useEffect, useRef, useState } from 'react'
import { Row, Col, Button, Form, Modal } from 'react-bootstrap'
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
import { Toast } from 'primereact/toast'
import { Formik, useFormik } from 'formik'
import { InputText } from 'primereact/inputtext'
import * as Yup from 'yup'
import { classNames } from 'primereact/utils'
import { Dropdown } from 'primereact/dropdown'

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
  const toast = useRef<Toast>(null)
  const [isRegisterClicked, setIsRegisterClicked] = useState(false)
  const [inputAddLineValidation, setInputAddLineValidation] = useState<any[]>([
    false,
  ])
  const [inputAddLineCompsValidation, setInputAddLineCompsValidation] =
    useState<any[]>([false])

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
    if (planning.editPlannings && Object.keys(planning.editPlannings).length > 0) {
      setPlannings(planning.editPlannings?.plannings_indirect_costs!)
      setSelectedSeason(planning.editPlannings?.season_year!)
      setReferenceName(planning.editPlannings?.name!)
    }
  }, [planning])

  if (!planning.editPlannings || Object.keys(planning.editPlannings).length === 0) {
    return null; 
  }

  useEffect(() => {
    if (isRegisterClicked) {
      formik.handleSubmit()
    }
  }, [isRegisterClicked])

  const initialValues = {
    referenceName: referenceName,
  }

  const validationSchema = Yup.object({
    referenceName: Yup.string().required('Necessário preencher'),
  })

  const onSubmit = (values: any, { setSubmitting }: any) => {
    const falseValidationsInput = inputAddLineValidation.filter(
      (validation: { response: boolean }) => validation.response === false,
    )
    const falseValidationOfinputAddLineCompsValidation =
      inputAddLineCompsValidation.filter(
        (validation: { response: boolean }) => validation.response === false,
      )
    register()

    if (
      referenceName &&
      falseValidationsInput.length === 0 &&
      falseValidationOfinputAddLineCompsValidation.length === 0
    ) {
      setTimeout(() => {
        setSubmitting(false)
      }, 400)
    } else if (referenceName) {
      setTimeout(() => {
        setSubmitting(false)
      }, 400)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

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
        <Toast ref={toast} />
        <form onSubmit={formik.handleSubmit}>
          <Row style={{ marginTop: '4%' }}>
            <Row>
              <Col md={3}>
                <span className="p-float-label">
                  <InputText
                    id="ReferenceName"
                    name="ReferenceName"
                    style={{ width: '100%' }}
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
                    value={selectedSeason}
                    options={seasons?.seasons?.map((season) => ({
                      label: `${season.type} - ${season.year}`,
                      value: season?.year,
                    }))}
                    onChange={(e) => {
                      setSelectedSeason(e.value)
                    }}
                    placeholder="Selecione a temporada"
                  />
                  <label htmlFor="season">Ano agrícola</label>
                </span>
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
                variant="primary"
                onClick={() =>
                  setPlannings([...plannings, new PlanningInput()])
                }
              >
                Adicionar Linha
              </Button>
              <Button
                variant="success"
                type="submit"
                onClick={() => {
                  setIsRegisterClicked(true)
                  setTimeout(() => {
                    setIsRegisterClicked(false)
                  }, 1000)
                }}
              >
                Registrar
              </Button>
            </div>
          </Row>
          <Row style={{ marginTop: '2%' }}>
            {/* <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Ano agrícola</Form.Label>
                  <Form.Select
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
              </Col> */}
          </Row>
          {plannings.map((newPlanning, index) => {
            return (
              <EditPlanningItem
                onHandleRemove={onRemoveItem}
                index={index}
                key={index}
                onHandleUpdate={onUpdateItem}
                isRegisterClicked={isRegisterClicked}
                inputAddLineCompsValidation={inputAddLineCompsValidation}
                setInputAddLineCompsValidation={setInputAddLineCompsValidation}
                referenceName={referenceName}
                inputAddLineValidation={inputAddLineValidation}
                setInputAddLineValidation={setInputAddLineCompsValidation}
              ></EditPlanningItem>
            )
          })}
        </form>
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
