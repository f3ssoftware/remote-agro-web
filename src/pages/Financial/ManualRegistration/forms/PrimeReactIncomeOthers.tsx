import { Formik } from 'formik'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Toast } from 'primereact/toast'
import { classNames } from 'primereact/utils'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { RootState } from '../../../..'
import { Contract } from '../../../../models/Contract'
import { Cultivation } from '../../../../models/Cultivation'
import {
  asyncFetchCultivations,
  asyncRegisterContract,
} from '../../../../stores/financial.store'
import { useNavigate } from 'react-router-dom'

interface Type {
  name: string
  id: number
}

export function PrimeReactIncomeOthers() {
  const { financial, seasons } = useSelector((state: RootState) => state)
  const [reference, setReference] = useState('')
  const [contractId, setContractId] = useState<number>()
  const [sacks, setSacks] = useState<number>()
  const [totalValue, setTotalValue] = useState<number>()
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [description, setDescription] = useState('')
  const [cultivation, setCultivation] = useState<any>()
  const toast = useRef<Toast>(null)
  const cultivationlist: Type[] = [
    // financial.cultivations.map((cultivation: Cultivation,index)=>{return{ name: cultivation.name, id: cultivation.id }})
  ]

  const dispatch = useDispatch<any>()
  const navigate = useNavigate()

  const register = async () => {
    const contract: Contract = {
      amount: totalValue!,
      code: contractId?.toString(),
      cultivation_id: cultivation,
      description,
      end_date: new Date().toString(),
      start_date: startDate?.toString(),
      name: reference,
      payment_date: startDate?.toString(),
      sacks: sacks?.toString(),
      season_id: seasons.selectedSeason.id,
      type: 'OTHER',
    }

    await dispatch(asyncRegisterContract(contract))
    navigate('/financial/balance')
  }

  useEffect(() => {
    dispatch(asyncFetchCultivations())
  }, [])

  return (
    <div>
      <Toast ref={toast} />
      <Formik
        initialValues={{
          reference: '',
          contractId: null,
          cultivation: '',
          sacks: null,
          totalValue: null,
          startDate: null,
        }}
        validationSchema={Yup.object({
          reference: Yup.string().required('Necessário preencher'),
          contractId: Yup.string().required('Necessário preencher'),
          cultivation: Yup.string().required('Necessário preencher'),
          sacks: Yup.string().required('Necessário preencher'),
          totalValue: Yup.string().required('Necessário preencher'),
          startDate: Yup.string().required('Necessário preencher'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 400);
          register()
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div
              className="formgrid grid"
              // style={{ marginTop: "2%", marginLeft: "2%" }}
            >
              <div className="field col-4">
                <span className="p-float-label">
                  <InputText
                    id="reference"
                    name="reference"
                    value={formik.values.reference}
                    onChange={(e) => {
                      formik.setFieldValue('reference', e.target.value)
                      setReference(e.target.value)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.reference && formik.errors.reference,
                    })}
                    style={{ width: '100%' }}
                  />
                  {formik.touched.reference && formik.errors.reference ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.reference}
                    </div>
                  ) : null}
                  <label htmlFor="reference">Referência</label>
                </span>
              </div>
              <div className="field col-4">
                <span className="p-float-label">
                  <InputNumber
                    id="contractId"
                    useGrouping={false}
                    value={formik.values.contractId}
                    onValueChange={(e) => {
                      formik.setFieldValue('contractId', e.target.value)
                      setContractId(Number(e.value))
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.contractId && formik.errors.contractId,
                    })}
                    style={{ width: '100%' }}
                  />
                  {formik.touched.contractId && formik.errors.contractId ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.contractId}
                    </div>
                  ) : null}
                  <label htmlFor="contractId">Código</label>
                </span>
              </div>

              <div className="field col-4">
                <Dropdown
                  value={formik.values.cultivation}
                  onChange={(e) => {
                    formik.setFieldValue('cultivation', e.target.value)
                    setCultivation(e.target.value)
                  }}
                  className={classNames({
                    'p-invalid':
                      formik.touched.cultivation && formik.errors.cultivation,
                  })}
                  optionLabel="name"
                  optionValue="id"
                  placeholder="Cultivo"
                  options={financial.cultivations}
                  style={{ width: '100%' }}
                />
                {formik.touched.cultivation && formik.errors.cultivation ? (
                  <div
                    style={{
                      color: 'red',
                      fontSize: '12px',
                      fontFamily: 'Roboto',
                    }}
                  >
                    {formik.errors.cultivation}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="formgrid grid">
              <div className="field col-4">
                <span className="p-float-label">
                  <InputNumber
                    locale="pt-BR"
                    id="sacks"
                    value={formik.values.sacks}
                    onValueChange={(e) => {
                      formik.setFieldValue('sacks', e.target.value)
                      setSacks(Number(e.value))
                    }}
                    className={classNames({
                      'p-invalid': formik.touched.sacks && formik.errors.sacks,
                    })}
                    style={{ width: '100%' }}
                  />
                  {formik.touched.sacks && formik.errors.sacks ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.sacks}
                    </div>
                  ) : null}
                  <label htmlFor="contractId">Sacas totais</label>
                </span>
              </div>
              <div className="field col-4">
                <span className="p-float-label">
                  <InputNumber
                    inputId="currency-br"
                    value={formik.values.totalValue}
                    onValueChange={(e) => {
                      formik.setFieldValue('totalValue', e.target.value)
                      setTotalValue(Number(e.value))
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.totalValue && formik.errors.totalValue,
                    })}
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                  />
                  {formik.touched.totalValue && formik.errors.totalValue ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.totalValue}
                    </div>
                  ) : null}
                  <label htmlFor="totalValue">Valor total</label>
                </span>
              </div>
              <div className="field col-4">
                <span className="p-float-label">
                  <Calendar
                    onChange={(e: any) => {
                      formik.setFieldValue('startDate', e.target.value)
                      setStartDate(e.value!)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.startDate && formik.errors.startDate,
                    })}
                    locale="en"
                    value={startDate}
                    dateFormat="dd/mm/yy"
                    style={{ width: '100%' }}
                  />
                  {formik.touched.startDate && formik.errors.startDate ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.startDate}
                    </div>
                  ) : null}
                  <label htmlFor="date">Início do contrato</label>
                </span>
              </div>
            </div>

            <div className="formgrid grid">
              <div className="field col-12">
                <span className="p-float-label">
                  <InputTextarea
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: '100%' }}
                  />
                  <label htmlFor="references">Descrição</label>
                </span>
              </div>
            </div>
            <div
              className="formgrid grid"
              style={{ marginTop: '2%', justifyContent: 'center' }}
            >
              <div className="col-12 md:col-3">
                <Button
                  type="submit"
                  label="Registrar"
                  style={{ backgroundColor: '#198754' }}
                  // onClick={() => register()}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
