import { useEffect, useRef, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt-BR";
import { asyncFetchCultivations, asyncRegisterContract } from '../../../../stores/financial.store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../index'
import { Contract } from "../../../../models/Contract";
import { Cultivation } from "../../../../models/Cultivation"
import { Typeahead } from "react-bootstrap-typeahead";
import { asyncEditContract, asyncFetchEditContracts } from "../../../../stores/commerce.store";
import { Toast } from "primereact/toast";
import * as Yup from 'yup'
import { Formik } from "formik";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { Dropdown } from 'primereact/dropdown'

export function EditContract({show, handleClose, id}: {show: boolean, handleClose: any, id: number}){
    const [contractName,setContractName] = useState('');
    const [contractId,setContractId] = useState(0);
    const [description,setDescription] = useState('');
    const [bags,setBags] = useState(0);
    const [contractPrice,setContractPrice] = useState(0);
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [payDate, setPayDate] = useState<Date | null>(null)
    const [selectedCultivations, setSelectedCultivations] = useState<any>()
    const { financial,seasons, commerce } = useSelector((state: RootState) => state)
    const dispatch = useDispatch<any>()
    const toast = useRef<Toast>(null)

    const edit = () => {
        const contract: Contract = {
            name: contractName,
            code: contractId.toString(),
            description: description,
            sacks: bags.toString(),
            amount: contractPrice*100,
            cultivation_id: selectedCultivations,
            payment_date: payDate?.toISOString(),
            start_date: startDate?.toISOString(),
            end_date: endDate?.toISOString(),
            type: "CONTRACT",
            season_id: seasons.selectedSeason.id
            
        }
        dispatch(asyncEditContract(id, contract));
    }
    useEffect(() => {
        setContractName(commerce.editContracts.name!);
        console.log(selectedCultivations)
        setContractId(Number(commerce.editContracts.code!))
        setDescription(commerce.editContracts.description!)
        setBags(Number(commerce.editContracts.sacks!))
        setContractPrice(Number(commerce.editContracts.amount!))
        setSelectedCultivations(commerce.editContracts.cultivation_id!)
        if(commerce.editContracts.payment_date && commerce.editContracts.start_date && commerce.editContracts.end_date != null ){
            setPayDate(new Date(commerce.editContracts.payment_date!))
            setStartDate(new Date(commerce.editContracts.start_date!))
            setEndDate(new Date(commerce.editContracts.end_date!))
        }
      }, [commerce])

    useEffect(() => {
        dispatch(asyncFetchCultivations())
        dispatch(asyncFetchEditContracts(id))
        setSelectedCultivations(financial?.cultivations[0])
      }, [])

      
    return <div>
        <Toast ref={toast} />
      <Formik
        initialValues={{
          contractName: contractName,
          contractId: contractId,
          cultivation: selectedCultivations,
          bags: bags,
          contractPrice: contractPrice,
          startDate: startDate,
          endDate: endDate,
          payDate: payDate,
        }}
        validationSchema={Yup.object({
          contractName: Yup.string().required('Necessário preencher'),
          contractId: Yup.number().required('Necessário preencher'),
          cultivation: Yup.string().required('Necessário preencher'),
          bags: Yup.number().required('Necessário preencher'),
          contractPrice: Yup.number().required('Necessário preencher'),
          startDate: Yup.string().required('Necessário preencher'),
          endDate: Yup.string().required('Necessário preencher'),
          payDate: Yup.string().required('Necessário preencher'),
        })}
        onSubmit={() => {
          edit()
          handleClose()
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Row style={{ marginTop: '2%' }}>
              <Col>
                <span className="p-float-label">
                  <InputText
                    value={contractName}
                    onChange={(e) => {
                      // formik.setFieldValue('contractName', e.target.value)
                      setContractName(e.target.value)
                    }}
                    // className={classNames({
                    //   'p-invalid':
                    //     formik.touched.contractName &&
                    //     formik.errors.contractName,
                    // })}
                    // style={{ width: '100%' }}
                  />
                  {/* {formik.touched.contractName && formik.errors.contractName ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.contractName}
                    </div>
                  ) : null} */}
                  <label htmlFor="product">Nome para o contrato</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Nome para o contrato
            </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setContractName(e.target.value)
              }}
            />
          </Form.Group> */}
              </Col>
              <Col>
                <span className="p-float-label">
                  <InputNumber
                    value={contractId}
                    onChange={(e) => {
                      // formik.setFieldValue('contractId', e.value)
                      setContractId(e.value!)
                    }}
                    style={{ width: '100%' }}
                    // className={classNames({
                    //   'p-invalid':
                    //     formik.touched.contractId && formik.errors.contractId,
                    // })}
                  />
                  {/* {formik.touched.contractId && formik.errors.contractId ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.contractId}
                    </div>
                  ) : null} */}
                  <label htmlFor="product">Código do contrato</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Codigo do contrato
            </Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setContractId(Number(e.target.value))
              }}
            />
          </Form.Group> */}
              </Col>
              <Row style={{ marginTop: '2%' }}>
                <Col>
                  <span className="p-float-label">
                    <Dropdown
                      value={selectedCultivations}
                      onChange={(e) => {
                        setSelectedCultivations(e.target.value);
                        // formik.setFieldValue('cultivation', e.target.value)
                      }}
                      optionLabel="name"
                      optionValue="id"
                      placeholder="Cultivo"
                      options={financial.cultivations}
                      style={{ width: '100%' }}
                      // className={classNames({
                      //   'p-invalid':
                      //     formik.touched.cultivation &&
                      //     formik.errors.cultivation,
                      // })}
                    />
                    {/* {formik.touched.cultivation && formik.errors.cultivation ? (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {formik.errors.cultivation}
                      </div>
                    ) : null} */}
                    <label htmlFor="product">Cultivo</label>
                  </span>
                  {/* <Form.Group as={Col} controlId="formGridState">
              <Form.Label style={{ color: '#fff' }}>Cultivo</Form.Label>
              <Typeahead
                id="cultivation"
                onChange={(selected: any) => {
                  setSelectedCultivations(selected[0])
                }}
                options={financial.cultivations.map(
                  (cultivation: Cultivation, index) => {
                    return { id: cultivation.id, label: cultivation?.name }
                  },
                )}
              />
            </Form.Group> */}
                </Col>
                <Col>
                  <span className="p-float-label">
                    <InputNumber
                      value={bags}
                      onChange={(e) => {
                        setBags(e.value!)
                        formik.setFieldValue('bags', e.value)
                      }}
                      style={{ width: '100%' }}
                      className={classNames({
                        'p-invalid': formik.touched.bags && formik.errors.bags,
                      })}
                    />
                    {formik.touched.bags && formik.errors.bags ? (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {formik.errors.bags}
                      </div>
                    ) : null}
                    <label htmlFor="product">Sacas Totais</label>
                  </span>
                  {/* <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>Sacas Totais</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  setBags(Number(e.target.value))
                }}
              />
            </Form.Group> */}
                </Col>
                <Col>
                  <span className="p-float-label">
                    <InputNumber
                      value={contractPrice}
                      onChange={(e) => {
                        setContractPrice(e.value!)
                        // formik.setFieldValue('contractPrice', e.value)
                      }}
                      style={{ width: '100%' }}
                      mode="currency"
                      currency="BRL"
                      locale="pt-BR"
                      className={classNames({
                        'p-invalid':
                          formik.touched.contractPrice &&
                          formik.errors.contractPrice,
                      })}
                    />
                    {/* {formik.touched.contractPrice &&
                    formik.errors.contractPrice ? (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {formik.errors.contractPrice}
                      </div>
                    ) : null} */}
                    <label htmlFor="product">Valor total do contrato</label>
                  </span>
                  {/* <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>
                Valor total do contrato
              </Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  setContractPrice(Number(e.target.value))
                }}
              />
            </Form.Group> */}
                </Col>
              </Row>
              <Row style={{ marginTop: '2%' }}>
                <Col>
                  <span className="p-float-label">
                    <Calendar
                      onChange={(e: any) => {
                        setStartDate(e.value!)
                        // formik.setFieldValue('startDate', e.target.value)
                      }}
                      value={startDate}
                      locale="en"
                      dateFormat="dd/mm/yy"
                      style={{ width: '100%' }}
                      // className={classNames({
                      //   'p-invalid':
                      //     formik.touched.startDate && formik.errors.startDate,
                      // })}
                    />
                    {/* {formik.touched.startDate && formik.errors.startDate ? (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {formik.errors.startDate}
                      </div>
                    ) : null} */}
                    <label htmlFor="product">Início do contrato</label>
                  </span>
                  {/* <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>
                Inicio do contrato
              </Form.Label>
              <DatePicker
                locale={pt}
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
              />
            </Form.Group> */}
                </Col>
                <Col>
                  <span className="p-float-label">
                    <Calendar
                      onChange={(e: any) => {
                        setEndDate(e.value!)
                        // formik.setFieldValue('endDate', e.target.value)
                      }}
                      value={endDate}
                      locale="en"
                      dateFormat="dd/mm/yy"
                      style={{ width: '100%' }}
                      // className={classNames({
                      //   'p-invalid':
                      //     formik.touched.endDate && formik.errors.endDate,
                      // })}
                    />
                    {/* {formik.touched.endDate && formik.errors.endDate ? (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {formik.errors.endDate}
                      </div>
                    ) : null} */}
                    <label htmlFor="product">Fim do contrato</label>
                  </span>
                  {/* <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>Fim do contrato</Form.Label>
              <DatePicker
                locale={pt}
                dateFormat="dd/MM/yyyy"
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
              />
            </Form.Group> */}
                </Col>
                <Col>
                  <span className="p-float-label">
                    <Calendar
                      onChange={(e: any) => {
                        setPayDate(e.value!)
                        // formik.setFieldValue('payDate', e.target.value)
                      }}
                      locale="en"
                      value={payDate}
                      dateFormat="dd/mm/yy"
                      style={{ width: '100%' }}
                      // className={classNames({
                      //   'p-invalid':
                      //     formik.touched.payDate && formik.errors.payDate,
                      // })}
                    />
                    {/* {formik.touched.payDate && formik.errors.payDate ? (
                      <div
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {formik.errors.payDate}
                      </div>
                    ) : null} */}
                    <label htmlFor="product">Data de pagamento</label>
                  </span>
                  {/* <Form.Group className="mb-3" controlId="">
              <Form.Label style={{ color: '#fff' }}>
                Data de pagamento
              </Form.Label>
              <DatePicker
                locale={pt}
                dateFormat="dd/MM/yyyy"
                selected={payDate}
                onChange={(date: Date) => setPayDate(date)}
              />
            </Form.Group> */}
                </Col>
              </Row>
              <Row style={{marginTop: '2%'}}>
                <Col>
                  <span className="p-float-label">
                    <InputText
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value)
                      }}
                      style={{ width: '100%' }}
                    />

                    <label htmlFor="product">Descrição adicional</label>
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
              </Row>
            </Row>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: '2%',
              }}
            >
              <Button variant="success" type="submit">
                Registrar
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
}