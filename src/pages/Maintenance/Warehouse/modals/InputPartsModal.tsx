import 'react-datepicker/dist/react-datepicker.css'
import { NewInputParts } from '../components/NewInputParts'
import { Modal, Tab, Tabs } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import { useDispatch, useSelector } from 'react-redux'
import { asyncFetchInvoices } from '../../../../stores/input.store'
import { RootState } from '../../../..'
import { Invoice } from '../../../../models/Invoice'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Part } from '../../../../models/Part'
import {
  asyncInputParts,
  asyncNewParts,
} from '../../../../stores/maintenance.store'
import { NewParts } from '../components/NewParts'
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { Toast } from 'primereact/toast'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { classNames } from 'primereact/utils'
import { Dialog } from 'primereact/dialog'
import { Checkbox } from 'primereact/checkbox'
import { Calendar } from 'primereact/calendar'

let emptyDate: Date
export function InputPartsModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const { input } = useSelector((state: RootState) => state)
  const [linkInvoice, setLinkInvoice] = useState(false)
  const [showFormLinkInvoice, setShowFormLinkInvoice] = useState(false)
  const [startDate, setStartDate] = useState(emptyDate)
  const [endDate, setEndDate] = useState(emptyDate)
  const dispatch = useDispatch<any>()
  const [invoices, setInvoices] = useState(input.invoices)
  const [selectedInvoice, setSelectedInvoice] = useState(new Invoice())
  const [products, setProducts] = useState([new Part()])
  const [key, setKey] = useState(0)
  const [newInvoiceValidation, setNewInvoiceValidation] =
    useState<boolean>(false)
  const [inputAddLineValidation, setInputAddLineValidation] = useState<any[]>([
    false,
  ])
  const [inputAddLineCompsValidation, setInputAddLineCompsValidation] =
    useState<any[]>([false])
  const [isRegisterClicked, setIsRegisterClicked] = useState(false)
  const [selectedInvoiceVinculation, setSelectedInvoiceVinculation] =
    useState<Invoice | null>(null)
  const toast = useRef<Toast>(null)
  const [newProductValidation, setNewProductValidation] = useState<any[]>([
    false,
  ])
  const [isNewPart, setIsNewPart] = useState(false)
  const [isInput, setIsInput] = useState(false)

  const onUpdateItem = (product: Part, index: number) => {
    const productsArr = [...products]
    productsArr.splice(index, 1)
    productsArr.push(product)
    setProducts(productsArr)
  }

  const onRemoveItem = (index: number) => {
    const productsArr = [...products]
    productsArr.splice(index, 1)
    setProducts(productsArr)
  }

  const search = (start: Date, end: Date) => {
    const invoices = input.invoices.filter((invoice: Invoice) => {
      return (
        new Date(invoice?.due_date!).getTime() >= start.getTime() &&
        new Date(invoice?.due_date!).getTime()! <= end.getTime()
      )
    })
    setInvoices(invoices)
  }

  const autoComplete = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const resultSet = invoices.filter((invoice) =>
      invoice.reference?.toLowerCase().includes(query),
    )
    setInvoices(resultSet)
  }

  const register = () => {
    dispatch(asyncInputParts(selectedInvoice.id!, products))

    handleClose()
  }
  const registerNew = () => {
    dispatch(asyncNewParts(selectedInvoice.id!, products))
    handleClose()
  }

  useEffect(() => {
    dispatch(asyncFetchInvoices())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setInvoices(input.invoices)
  }, [input])

  useEffect(() => {
    if (selectedInvoiceVinculation !== null) {
      setNewInvoiceValidation(true)
    } else {
      setNewInvoiceValidation(false)
    }
  }, [selectedInvoiceVinculation])

  // useEffect(() => {
  //   if(input.userProduct == true) {
  //     handleClose()
  //     dispatch(setUserProduct(false))
  //   }
  // }, [input])

  useEffect(() => {
    if (isRegisterClicked) {
      formik.handleSubmit()
    }
  }, [isRegisterClicked])

  const initialValues = {
    invoiceVinculation: null,
  }

  const validationSchemaWithInvoice = Yup.object({
    invoiceVinculation: Yup.mixed().required('Necessário preencher'),
  })

  const validationSchemaWithoutInvoice = Yup.object({})

  const validationSchema = showFormLinkInvoice
    ? validationSchemaWithInvoice
    : validationSchemaWithoutInvoice

  const onSubmit = (values: any, { setSubmitting }: any) => {
    const falseValidationsInput = inputAddLineValidation.filter(
      (validation: { response: boolean }) => validation.response === false,
    )
    const falseValidationOfinputAddLineCompsValidation =
      inputAddLineCompsValidation.filter(
        (validation: { response: boolean }) => validation.response === false,
      )
    isNewPart ? registerNew() : isInput ? register() : <></>

    if (
      newInvoiceValidation &&
      falseValidationsInput.length === 0 &&
      falseValidationOfinputAddLineCompsValidation.length === 0
    ) {
      setTimeout(() => {
        setSubmitting(false)
      }, 400)
    } else if (newInvoiceValidation) {
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
      header="Entrada de peça"
      headerStyle={{ backgroundColor: '#7C5529', color: '#FFF' }}
      contentStyle={{ backgroundColor: '#7C5529' }}
      visible={show}
      style={{ width: '80vw' }}
      onHide={() => {
        handleClose()
      }}
    >
      <div>
        <Toast ref={toast} />
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className="flex align-items-center">
            <Checkbox
              inputId="invoice"
              name="linkInvoice"
              value={linkInvoice}
              onChange={() => {
                setLinkInvoice(!linkInvoice)
                setShowFormLinkInvoice(!linkInvoice)
                dispatch(asyncFetchInvoices())
              }}
              checked={linkInvoice}
            />
            <label htmlFor="invoice" className="ml-2">
              Vincular Nota
            </label>
          </div>
          {/* <Form.Check
            style={{ color: '#fff', marginBottom: '2%' }}
            type="switch"
            checked={linkInvoice}
            onChange={() => {
              setLinkInvoice(!linkInvoice)
              setShowFormLinkInvoice(!linkInvoice)
              dispatch(asyncFetchInvoices())
            }}
            id={`default-checkbox`}
            label={`Vincular Nota`}
          /> */}
          {showFormLinkInvoice ? (
            <div>
              <Row>
                <Col>
                  <span className="p-float-label">
                    <Calendar
                      value={startDate}
                      onChange={(e: any) => {
                        setStartDate(e.value!)
                        search(e.value, endDate)
                      }}
                      locale="en"
                      dateFormat="dd/mm/yy"
                      style={{ width: '100%' }}
                    />
                    <label htmlFor="totalValue">De</label>
                  </span>
                  {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label>De</Form.Label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date: any) => {
                        console.log('changing')
                        setStartDate(date)
                        search(date, endDate)
                      }}
                      locale={pt}
                      dateFormat="dd/MM/yyyy"
                    />
                  </Form.Group> */}
                </Col>
                <Col>
                  <span className="p-float-label">
                    <Calendar
                      value={endDate}
                      onChange={(e: any) => {
                        setEndDate(e.value)
                        search(startDate, e.value)
                      }}
                      locale="en"
                      dateFormat="dd/mm/yy"
                      style={{ width: '100%' }}
                      minDate={startDate}
                    />
                    <label htmlFor="endDate">Até</label>
                  </span>
                  {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label>Até</Form.Label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date: any) => {
                        setEndDate(date)
                        search(startDate, date)
                      }}
                      locale={pt}
                      dateFormat="dd/MM/yyyy"
                    />
                  </Form.Group> */}
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <span className="p-float-label">
                    <AutoComplete
                      value={formik.values.invoiceVinculation}
                      suggestions={invoices.map(
                        (invoice) => `${invoice.number} - ${invoice.reference}`,
                      )}
                      completeMethod={autoComplete}
                      onChange={(e) => {
                        setSelectedInvoice(e.value)
                        setInvoices(input.invoices)
                        formik.setFieldValue(
                          'invoiceVinculation',
                          e.target.value,
                        )
                      }}
                      dropdown
                      className={classNames({
                        'p-invalid':
                          formik.touched.invoiceVinculation &&
                          formik.errors.invoiceVinculation,
                      })}
                    />
                    {formik.touched.invoiceVinculation &&
                    formik.errors.invoiceVinculation ? (
                      <div
                        style={{
                          color: 'orange',
                          fontSize: '12px',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {formik.errors.invoiceVinculation}
                      </div>
                    ) : null}
                    <label htmlFor="endDate">Vinculação de nota</label>
                  </span>
                  {/* <Form.Group className="mb-3" controlId="">
                    <Form.Label>Vinculação de Nota</Form.Label>
                    <Typeahead
                      id="invoice"
                      onChange={(selected) => {
                        if (selected.length > 0) {
                          const invoiceSelected = selected[0] as Invoice
                          setSelectedInvoice(invoiceSelected)
                        }
                      }}
                      options={invoices.map((invoice) => {
                        return { ...invoice, label: invoice.reference }
                      })}
                    />
                  </Form.Group> */}
                </Col>
              </Row>
              <hr />
            </div>
          ) : (
            <></>
          )}
          <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k: any) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="input" title={'Entrada de peça'}>
              {products.map((p, index) => {
                return (
                  <NewInputParts
                    index={index}
                    key={index}
                    onHandleRemove={onRemoveItem}
                    onHandleUpdate={onUpdateItem}
                    isRegisterClicked={isRegisterClicked}
                    inputAddLineCompsValidation={inputAddLineCompsValidation}
                    setInputAddLineCompsValidation={
                      setInputAddLineCompsValidation
                    }
                    newInvoiceValidation={newInvoiceValidation}
                    inputAddLineValidation={inputAddLineValidation}
                    setInputAddLineValidation={setInputAddLineCompsValidation}
                  ></NewInputParts>
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
                  onClick={() => setProducts([...products, new Part()])}
                >
                  Adicionar Linha
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  onClick={() => {
                    setIsRegisterClicked(true)
                    setIsInput(true)
                    setTimeout(() => {
                      setIsRegisterClicked(false)
                    }, 1000)
                  }}
                >
                  Registrar
                </Button>
              </div>
            </Tab>
            <Tab eventKey="newPart" title={'Nova peça'}>
              {products.map((p, index) => {
                return (
                  <NewParts
                    index={index}
                    key={index}
                    onHandleRemove={onRemoveItem}
                    onHandleUpdate={onUpdateItem}
                  ></NewParts>
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
                  onClick={() => setProducts([...products, new Part()])}
                >
                  Adicionar Linha
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  onClick={() => {
                    setIsRegisterClicked(true)
                    setIsNewPart(true)
                    setTimeout(() => {
                      setIsRegisterClicked(false)
                    }, 1000)
                  }}
                >
                  Registrar
                </Button>
              </div>
            </Tab>
          </Tabs>
        </form>
      </div>
    </Dialog>
  )
}
