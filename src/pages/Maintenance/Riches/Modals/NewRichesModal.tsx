import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import pt from 'date-fns/locale/pt-BR'

export function NewRichesModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const [name, setName] = useState('')
  const [goodType, setGoodType] = useState('')
  const [insurance, setInsurance] = useState('')
  const [policyName, setPolicyName] = useState('')
  const [policyExpDate, setPolicyExpDate] = useState(new Date())
  const [ipva, setIpva] = useState('')
  const [ipvaExpDate, setIpvaExpDate] = useState(new Date())

  useEffect(() => {}, [])

  return (
    <Container>
      <Modal backdrop={'static'} show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: '#7C5529', border: 'none' }}
        >
          <Modal.Title>
            {' '}
            <span style={{ color: '#fff' }}>Cadastrar Bem</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#7C5529' }}>
          <div>
            <Row style={{ marginTop: '2%' }}>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>Nome do bem</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>Tipo do bem</Form.Label>
                  <Form.Select
                    aria-label=""
                    onChange={(e) => {
                      return setGoodType(e.target.value)
                    }}
                  >
                    <option value={''}></option>
                    <option value={'Imovel'}>Imovel</option>
                    <option value={'Movel'}>Movel</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ marginTop: '2%' }}>
              <Col>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>Segurado</Form.Label>
                  <Form.Select
                    aria-label=""
                    onChange={(e) => {
                      return setInsurance(e.target.value)
                    }}
                  >
                    <option value={''}></option>
                    <option value={'Sim'}>Sim</option>
                    <option value={'Nao'}>Não</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                {insurance === 'Sim' ? (
                  <Col>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>Apólice</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          setPolicyName(e.target.value)
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>
                        Data de vencimento do seguro
                      </Form.Label>
                      <DatePicker
                        locale={pt}
                        dateFormat="dd/MM/yyyy"
                        selected={policyExpDate}
                        onChange={(date: Date) => setPolicyExpDate(date)}
                      />
                    </Form.Group>
                  </Col>
                ) : (
                  <div></div>
                )}
              </Col>
            </Row>
            <Row>
              {goodType === 'Movel' ? (<Col>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>IPVA</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          setPolicyName(e.target.value)
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                      <Form.Label style={{ color: '#fff' }}>
                        Data de vencimento do IPVA
                      </Form.Label>
                      <DatePicker
                        locale={pt}
                        dateFormat="dd/MM/yyyy"
                        selected={policyExpDate}
                        onChange={(date: Date) => setPolicyExpDate(date)}
                      />
                    </Form.Group>
                  </Col>): (<div></div>)}
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  )
}
