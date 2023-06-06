import { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import pt from 'date-fns/locale/pt-BR'
import { Good } from '../../../../models/Good'
import { asyncNewGoods } from '../../../../stores/maintenance.store'
import { useDispatch } from 'react-redux'

export function NewRichesModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const [name, setName] = useState('')
  const [goodType, setGoodType] = useState('')
  const [insurance, setInsurance] = useState(false)
  const [policyName, setPolicyName] = useState('')
  const [policyExpDate, setPolicyExpDate] = useState(new Date())
  const [ipva, setIpva] = useState('')
  const [ipvaExpDate, setIpvaExpDate] = useState(new Date())
  const dispatch = useDispatch<any>()

  const register = () =>{
    const good: Good = {
      name: name,
      type: goodType,
      is_insured: insurance,
      insurance_policy: policyName,
      insurance_ends_at: policyExpDate.toISOString(),
      ipva: ipva,
      ipva_ends_at: ipvaExpDate.toISOString(),
    }
    dispatch(asyncNewGoods(good))
  }
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
                      return setInsurance(Boolean(e.target.value))
                    }}
                  >
                    <option value={'false'}></option>
                    <option value={'true'}>Sim</option>
                    <option value={'false'}>Não</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                {insurance === true ? (
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
              {goodType === 'Movel' ? (
                <Col>
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label style={{ color: '#fff' }}>IPVA</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setIpva(e.target.value)
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
                      selected={ipvaExpDate}
                      onChange={(date: Date) => setIpvaExpDate(date)}
                    />
                  </Form.Group>
                </Col>
              ) : (
                <div></div>
              )}
            </Row>
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
              onClick={() => {
                register()
                handleClose()
              }}
            >
              Registrar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  )
}


