import { useEffect, useRef, useState } from 'react'
import { Row, Col, Button, Form, Dropdown } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead'
import { RootState } from '../../..'
import { PlanningInput } from '../../../models/PlanningInput'
import { NewPlanningItem } from './NewPlanningItem'
import { Planning } from '../../../models/Planning'
import { asyncNewPlannings } from '../../../stores/planning.store'
import { Toast } from 'primereact/toast'
import { Formik } from 'formik'
import { InputText } from 'primereact/inputtext'
import * as Yup from 'yup'
import { classNames } from 'primereact/utils'
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete'

export function NewPlanning({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const [referenceName, setReferenceName] = useState('')
  const dispatch = useDispatch<any>()
  const [plannings, setPlannings] = useState([new PlanningInput()])
  const { seasons } = useSelector((state: RootState) => state)
  const [selectedSeason, setSelectedSeason] = useState('')
  const toast = useRef<Toast>(null)
  const [seasonList, setSeasonList] = useState<any[]>([])

  const register = () => {
    const p: Planning = {
      name: referenceName,
      season_year: selectedSeason,
      type: 'Insumos',
      plannings: plannings,
    }
    dispatch(asyncNewPlannings(p))
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

  const autoCompleteSeason = (event: AutoCompleteCompleteEvent) => {
    const resultSet = seasonList.filter((p: any) =>
      p?.label?.includes(event.query),
    )
    if (resultSet.length > 0) {
      setSeasonList(resultSet)
    } else {
      setSeasonList(fetchSeason())
    }
  }

  const fetchSeason = () => {
    return seasons.seasons.map((season: any) => {
      return { name: season.year, label: season.type - season.year, ...season }
    })
  }

  return (
    <div>
      <Toast ref={toast} />
      <Formik
        initialValues={{
          referenceName: '',
          totalArea: null,
          quantity: null,
          season: '',
        }}
        validationSchema={Yup.object({
          referenceName: Yup.string().required('Necessário preencher'),
          totalArea: Yup.string().required('Necessário preencher'),
          quantity: Yup.string().required('Necessário preencher'),
          season: Yup.object().required('Necessário preencher'),
        })}
        onSubmit={() => {
          register()
          handleClose()
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Row style={{ marginTop: '4%' }}>
              <Row>
                <Col md="auto">
                  <span className="p-float-label">
                    <InputText
                      id="ReferenceName"
                      name="ReferenceName"
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
                <Col>
                <span className="p-float-label">
                  <AutoComplete
                    field="label"
                    value={formik.values.season}
                    suggestions={seasonList}
                    completeMethod={autoCompleteSeason}
                    onChange={(e: any) => {
                      setSelectedSeason(e.target.value)
                      formik.setFieldValue('season', e.target.value)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.season && formik.errors.season,
                    })}
                    dropdown
                    forceSelection
                    style={{ width: '100%' }}
                  />
                  {formik.touched.season && formik.errors.season ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.season}
                    </div>
                  ) : null}
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
                    register()
                  }}
                >
                  Registrar
                </Button>
              </div>
            </Row>
          </form>
        )}
      </Formik>
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
          <NewPlanningItem
            onHandleRemove={onRemoveItem}
            index={index}
            key={index}
            onHandleUpdate={onUpdateItem}
          ></NewPlanningItem>
        )
      })}
    </div>
  )
}
