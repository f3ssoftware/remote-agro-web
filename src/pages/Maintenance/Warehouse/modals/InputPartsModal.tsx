import 'react-datepicker/dist/react-datepicker.css'
import { NewInputParts } from '../components/NewInputParts'
import { Modal, Tab, Tabs } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import { useDispatch, useSelector } from 'react-redux'
import { asyncFetchInvoices } from '../../../../stores/input.store'
import { RootState } from '../../../..'
import { Invoice } from '../../../../models/Invoice'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Part } from '../../../../models/Part'
import { asyncInputParts, asyncNewParts } from '../../../../stores/maintenance.store'
import { NewParts } from '../components/NewParts'

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

  const register = () => {
    dispatch(asyncInputParts(selectedInvoice.id!, products))

    handleClose()
  }
  const register1 = () => {

    dispatch(asyncNewParts(selectedInvoice.id!, products));
    handleClose();

}

  useEffect(() => {
    dispatch(asyncFetchInvoices())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setInvoices(input.invoices)
  }, [input])

  useEffect(() => {
    console.log(products)
  }, [products])
  return (
    <Modal backdrop={'static'} show={show} onHide={handleClose} size={'xl'}>
      <Modal.Header
        closeButton
        style={{ backgroundColor: '#7C5529', border: 'none' }}
      >
        <Modal.Title>
          {' '}
          <span style={{ color: '#fff' }}>Entrada de Peça</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#7C5529' }}>
        <div>
          <Form.Check
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
          />
          {showFormLinkInvoice ? (
            <div>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="">
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
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="">
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
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3" controlId="">
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
                  </Form.Group>
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
            <Tab  eventKey="input" title={'Entrada de peça'}>
              {products.map((p, index) => {
                return (
                  <NewInputParts
                    index={index}
                    key={index}
                    onHandleRemove={onRemoveItem}
                    onHandleUpdate={onUpdateItem}
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
                <Button variant="success" onClick={() => register()}>
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
                <Button variant="success" onClick={() => register1()}>
                  Registrar
                </Button>
              </div>
            </Tab>
          </Tabs>
        </div>
      </Modal.Body>
    </Modal>
  )
}
