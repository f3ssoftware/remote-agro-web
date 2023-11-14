import { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Farm } from '../../../models/Farm'
import { useDispatch, useSelector } from 'react-redux'
import { asyncRegisterFarm } from '../../../stores/farm.store'
import { RootState } from '../../..'
import { Toast } from 'primereact/toast'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { InputNumber } from 'primereact/inputnumber'

export function NewFarm({ handleClose }: { handleClose: any }) {
  const [propName, setPropName] = useState('')
  const [totalArea, setTotalArea] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch<any>()
  const { seasons } = useSelector((state: RootState) => state)
  const toast = useRef<Toast>(null)

  const register = () => {
    const farm: Farm = {
      name: propName,
      total_area: totalArea,
      fields_quantity: quantity,
      season_id: seasons.selectedSeason.id,
    }
    dispatch(asyncRegisterFarm(farm))
  }

  return (
    <div>
      <Toast ref={toast} />
      <Formik
        initialValues={{
          propName: '',
          totalArea: null,
          quantity: null,
        }}
        validationSchema={Yup.object({
          propName: Yup.string().required('Necessário preencher'),
          totalArea: Yup.string().required('Necessário preencher'),
          quantity: Yup.string().required('Necessário preencher'),
        })}
        onSubmit={(values, { setSubmitting } ) => {
          register()
          handleClose()
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Row style={{ marginTop: '2%' }}>
              <Row>
                <Col>
                <span className="p-float-label">
                    <InputText
                      id="propName"
                      name="propName"
                      value={formik.values.propName}
                      onChange={(e) => {
                        formik.setFieldValue("propName", e.target.value);
                        setPropName(e.target.value);
                      }}
                      className={classNames({
                        "p-invalid":
                          formik.touched.propName && formik.errors.propName,
                      })}
                    />
                    {formik.touched.propName && formik.errors.propName ? (
                      <div
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Roboto",
                        }}
                      >
                        {formik.errors.propName}
                      </div>
                    ) : null}
                    <label htmlFor="propName" style={{color: 'black'}}>Nome da propriedade</label>
                  </span>
                </Col>
                <Col>
                <span className="p-float-label">
                  <InputNumber
                    id="totalArea"
                    value={formik.values.totalArea}
                    onValueChange={(e) => {
                      formik.setFieldValue("totalArea", e.target.value);
                      setTotalArea(Number(e.value));
                    }}
                    className={classNames({
                      "p-invalid":
                        formik.touched.totalArea && formik.errors.totalArea,
                    })}
                  />
                  {formik.touched.totalArea && formik.errors.totalArea ? (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Roboto",
                      }}
                    >
                      {formik.errors.totalArea}
                    </div>
                  ) : null}
                  <label htmlFor="totalArea" style={{color: 'black'}}>Area total (ha)</label>
                </span>
                </Col>
                <Col>
                <span className="p-float-label">
                  <InputNumber
                    id="quantity"
                    value={formik.values.quantity}
                    onValueChange={(e) => {
                      formik.setFieldValue("quantity", e.target.value);
                      setQuantity(Number(e.value));
                    }}
                    className={classNames({
                      "p-invalid":
                        formik.touched.quantity && formik.errors.quantity,
                    })}
                  />
                  {formik.touched.quantity && formik.errors.quantity ? (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Roboto",
                      }}
                    >
                      {formik.errors.quantity}
                    </div>
                  ) : null}
                  <label htmlFor="quantity" style={{color: 'black'}}>Quantidade de talhões</label>
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
                  variant="success"
                  type='submit'
                >
                  Cadastrar
                </Button>
              </div>
            </Row>
          </form>
        )}
      </Formik>
    </div>
  )
}
