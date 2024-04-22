import { useEffect, useRef, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Silo } from '../../../../models/Silo'
import {
  asyncCreateCommercePlot,
  asyncFetchSiloData,
} from '../../../../stores/commerce.store'
import { Toast } from 'primereact/toast'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
// import { Button } from 'primereact/button'

export function NewCommercePlot({ handleClose }: { handleClose: any }) {
  const [siloName, setSiloName] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch<any>()
  const toast = useRef<Toast>(null)

  const register = async () => {
    const silo: Silo = {
      name: siloName,
      description: description,
    }
    await dispatch(asyncCreateCommercePlot(silo))
    dispatch(asyncFetchSiloData())
    handleClose()
  }

  return (
    <div>
      <Toast ref={toast} />
      <Formik
        initialValues={{
          siloName: ''
        }}
        validationSchema={Yup.object({
          siloName: Yup.string().required('Necessário preencher')
        })}
        onSubmit={() => {
          register()
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Row style={{ marginTop: '2%' }}>
              <Col>
                <span className="p-float-label">
                  <InputText
                    id="siloName"
                    name="siloName"
                    value={formik.values.siloName}
                    onChange={(e) => {
                      formik.setFieldValue('siloName', e.target.value)
                      setSiloName(e.target.value)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.siloName && formik.errors.siloName,
                    })}
                  />
                  {formik.touched.siloName && formik.errors.siloName ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.siloName}
                    </div>
                  ) : null}
                  <label htmlFor="siloName">Nome para o silo</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Nome para o silo
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setSiloName(e.target.value)
                    }}
                  />
                </Form.Group> */}
              </Col>
              <Col>
                <span className="p-float-label">
                  <InputText
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value)
                    }}
                  />
                  <label htmlFor="description">Descrição adicional</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Descrição adicional
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setDescription(e.target.value)
                    }}
                  />
                </Form.Group> */}
              </Col>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: '2%',
                }}
              >
                <Button variant="success" type="submit">
                Enviar
              </Button>
              </div>
            </Row>
          </form>
        )}
      </Formik>
    </div>
  )
}
