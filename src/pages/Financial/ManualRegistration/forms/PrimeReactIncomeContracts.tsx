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
import {
  asyncFetchCultivations,
  asyncRegisterContract,
} from '../../../../stores/financial.store'
import { useNavigate } from 'react-router-dom'

interface Type {
  name: string
  id: number
}

export function PrimeReactIncomeContracts({
  isUpdate,
  contract,
}: {
  isUpdate?: boolean
  contract?: Contract
}) {
  const { financial, seasons } = useSelector((state: RootState) => state)
  const [contractName, setContractName] = useState('')
  const [contractId, setContractId] = useState<number>()
  const [sacks, setSacks] = useState<number>()
  const [contractValue, setContractValue] = useState<number>()
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [payDate, setPayDate] = useState<Date | null>(null)
  const [description, setDescription] = useState('')
  const [cultivation, setCultivation] = useState<any>()
  const toast = useRef<Toast>(null)
  const dispatch = useDispatch<any>()
  const cultivationlist: Type[] = [
    // financial.cultivations.map((cultivation: Cultivation,index)=>{return{ name: cultivation.name, id: cultivation.id }})
  ]

  const navigate = useNavigate()

  const register = async () => {
    const contract: Contract = {
      amount: contractValue! * 100,
      code: contractId?.toString(),
      cultivation_id: cultivation,
      description,
      end_date: new Date().toISOString(),
      start_date: startDate?.toString(),
      name: contractName,
      payment_date: payDate?.toString(),
      sacks: sacks?.toString(),
      season_id: seasons.selectedSeason.id,
      type: 'CONTRACT',
    }

    await dispatch(asyncRegisterContract(contract))
    navigate('/financial/balance')
  }

  useEffect(() => {
    if (isUpdate) {
      setContractId(contract?.id!)
      setContractName(contract?.name!)
      setContractValue(contract?.amount!)
      setCultivation(
        financial.cultivations.filter((c) => {
          return cultivation.id === c.id
        })[0],
      )
      setStartDate(new Date(contract?.start_date!))
      setPayDate(new Date(contract?.payment_date!))
      setDescription(contract?.description!)
      setSacks(Number(contract?.sacks!))
    }
    dispatch(asyncFetchCultivations())
  }, [])

  return (
    <div>
      <Toast ref={toast} />
      <Formik
        initialValues={{
          contractName: '',
          contractId: null,
          cultivation: '',
          sacks: null,
          contractValue: null,
          startDate: null,
          payDate: null,
        }}
        validationSchema={Yup.object({
          contractName: Yup.string().required('Necessário preencher'),
          contractId: Yup.string().required('Necessário preencher'),
          cultivation: Yup.string().required('Necessário preencher'),
          sacks: Yup.string().required('Necessário preencher'),
          contractValue: Yup.string().required('Necessário preencher'),
          startDate: Yup.date().required('Necessário preencher'),
          payDate: Yup.string().required('Necessário preencher'),
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
            <div className="formgrid grid">
              <div className="field col-3 ">
                <span className="p-float-label">
                  <InputText
                    id="contractName"
                    name="contractName"
                    value={formik.values.contractName}
                    onChange={(e) => {
                      formik.setFieldValue('contractName', e.target.value)
                      setContractName(e.target.value)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.contractName &&
                        formik.errors.contractName,
                    })}
                    style={{ width: '100%' }}
                  />
                  {formik.touched.contractName && formik.errors.contractName ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.contractName}
                    </div>
                  ) : null}
                  <label htmlFor="contractName">Nome</label>
                </span>
              </div>
              <div className="field col-3">
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

              <div className="field col-3">
                <Dropdown
                  value={formik.values.cultivation}
                  onChange={(e) => {
                    formik.setFieldValue('cultivation', e.value)
                    setCultivation(e.value)
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
              <div className="field col-3">
                <span className="p-float-label">
                  <InputNumber
                    id="sacks"
                    locale="pt-BR"
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
            </div>

            <div className="formgrid grid">
              <div className="field col-4">
                <span className="p-float-label">
                  <InputNumber
                    inputId="currency-br"
                    value={formik.values.contractValue}
                    onValueChange={(e) => {
                      formik.setFieldValue('contractValue', e.target.value)
                      setContractValue(Number(e.value))
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.contractValue &&
                        formik.errors.contractValue,
                    })}
                    mode="currency"
                    currency="BRL"
                    minFractionDigits={2}
                    maxFractionDigits={2}
                    locale="pt-BR"
                    style={{ width: '100%' }}
                  />
                  {formik.touched.contractValue &&
                  formik.errors.contractValue ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.contractValue}
                    </div>
                  ) : null}
                  <label htmlFor="contractId">Valor do contrato</label>
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
              <div className="field col">
                <span className="p-float-label">
                  <Calendar
                    onChange={(e: any) => {
                      formik.setFieldValue('payDate', e.target.value)
                      setPayDate(e.value!)
                    }}
                    locale="en"
                    value={payDate}
                    dateFormat="dd/mm/yy"
                    style={{ width: '100%' }}
                  />
                  {formik.touched.payDate && formik.errors.payDate ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.payDate}
                    </div>
                  ) : null}
                  <label htmlFor="date">Data de pagamento</label>
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
                  <label htmlFor="contractNames">Descrição</label>
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
