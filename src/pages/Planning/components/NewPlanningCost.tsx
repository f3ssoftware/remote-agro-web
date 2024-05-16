import { useEffect, useRef, useState } from 'react'
import { Row, Col, Button, Tabs, Tab } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { Planning } from '../../../models/Planning'
import { asyncNewPlannings } from '../../../stores/planning.store'
import { PlanningCost } from '../../../models/PlanningCost'
import { NewPlanningTab } from './NewPlanningTab'
import { Toast } from 'primereact/toast'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Dropdown } from 'primereact/dropdown'

export function NewPlanningCost({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const [referenceName, setReferenceName] = useState('')
  const [plannings, setPlannings] = useState<any[]>([])
  const dispatch = useDispatch<any>()
  const { seasons } = useSelector((state: RootState) => state)
  const [selectedSeason, setSelectedSeason]: any = useState({})
  const toast = useRef<Toast>(null)

  const register = () => {
    const planning: Planning = {
      name: referenceName,
      season_year: selectedSeason.year,
      type: 'Custos Indiretos',
      plannings: plannings,
    }
    dispatch(asyncNewPlannings(planning))
    handleClose()
  }


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
    <>
      <Toast ref={toast} />
      <Formik
        initialValues={{
          referenceName: '',
        }}
        validationSchema={Yup.object({
          referenceName: Yup.string().required('Necessário preencher'),
        })}
        onSubmit={() => {
          register()
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
                value={selectedSeason}
                options={seasons.seasons.map((season) => ({
                  label: `${season.type} - ${season.year}`,
                  value: season,
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
            <div>
              {plannings.map((month, index) => {
                return (
                  <NewPlanningTab
                    index={index}
                    onHandleUpdate={onUpdateItem}
                    onHandleRemove={onRemoveItem}
                  ></NewPlanningTab>
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
                type='submit'
                // onClick={() => {
                //   register()
                // }}
              >
                Registrar
              </Button>
              <Button
                variant="primary"
                onClick={() => setPlannings([...plannings, new PlanningCost()])}
              >
                Adicionar Linha
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  )
}
