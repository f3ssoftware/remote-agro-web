import { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { useDispatch } from 'react-redux'
import { BankAccountDTO } from '../../../../models/dtos/BankAccountsDTO'
import { asyncCreateBankAccount } from '../../../../stores/financial.store'
import { banks } from '../../../../utils/banks'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { classNames } from 'primereact/utils'
import { Toast } from 'primereact/toast'
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'

export function CreateBankAccount({ handleClose }: { handleClose: any }) {
  const [accountNickname, setAccountNickname] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [bankId, setBankId] = useState('')
  const toast = useRef<Toast>(null)
  const [bankList, setBankList] = useState<any[]>([])

  const dispatch = useDispatch<any>()
  useEffect(() => {
    console.log(bankId)
  }, [bankId])

  const register = () => {
    const bankAccountDTO: BankAccountDTO = {
      bank_id: bankId,
      owner_name: ownerName,
      nickname: accountNickname,
    }

    dispatch(asyncCreateBankAccount(bankAccountDTO))
    handleClose()
  }

  const autoCompleteParts = (event: AutoCompleteCompleteEvent) => {
    const query = event.query.toLowerCase()
    const resultSet = bankList.filter((bank) =>
      bank.name.toLowerCase().includes(query),
    )
    if (resultSet.length > 0) {
      setBankList(resultSet)
    } else {
      setBankList(fetchBanks())
    }
  }

  const fetchBanks = () => {
    return banks.map((banks: any) => {
      return { id: banks.COMPE, label: banks?.LongName, ...banks }
    })
  }

  return (
    <div>
      <Toast ref={toast} />
      <Formik
        initialValues={{
          accountNickname: '',
          ownerName: '',
          bank: null,
        }}
        validationSchema={Yup.object({
          accountNickname: Yup.string().required('Necessário preencher'),
          ownerName: Yup.string().required('Necessário preencher'),
          bank: Yup.mixed().required('Necessário preencher'),
        })}
        onSubmit={() => {
          register()
          handleClose()
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Row style={{ marginTop: '2%' }}>
              <Col>
                <span className="p-float-label">
                  <InputText
                    id="accountNickname"
                    name="accountNickname"
                    value={formik.values.accountNickname}
                    onChange={(e) => {
                      formik.setFieldValue('accountNickname', e.target.value)
                      setAccountNickname(e.target.value)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.accountNickname &&
                        formik.errors.accountNickname,
                    })}
                  />
                  {formik.touched.accountNickname &&
                  formik.errors.accountNickname ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.accountNickname}
                    </div>
                  ) : null}
                  <label htmlFor="accountNickname">Apelido para a conta</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Apelido para a conta
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setAccountNickname(e.target.value)
                    }}
                  />
                </Form.Group> */}
              </Col>
              <Col>
                <span className="p-float-label">
                  <InputText
                    id="ownerName"
                    name="ownerName"
                    value={formik.values.ownerName}
                    onChange={(e) => {
                      formik.setFieldValue('ownerName', e.target.value)
                      setOwnerName(e.target.value)
                    }}
                    className={classNames({
                      'p-invalid':
                        formik.touched.ownerName && formik.errors.ownerName,
                    })}
                  />
                  {formik.touched.ownerName && formik.errors.ownerName ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.ownerName}
                    </div>
                  ) : null}
                  <label htmlFor="ownerName">Nome do Proprietário</label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Nome do Proprietário
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => {
                      setOwnerName(e.target.value)
                    }}
                  />
                </Form.Group> */}
              </Col>
              <Col>
                <span className="p-float-label">
                  <AutoComplete
                    field="label"
                    value={formik.values.bank}
                    suggestions={bankList}
                    completeMethod={autoCompleteParts}
                    onChange={(e: any) => {
                      formik.setFieldValue('bank', e.target.value)
                      setBankId(e.value)
                    }}
                    className={classNames({
                      'p-invalid': formik.touched.bank && formik.errors.bank,
                    })}
                    dropdown
                    forceSelection
                    style={{ width: '100%' }}
                  />
                  {formik.touched.bank && formik.errors.bank ? (
                    <div
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontFamily: 'Roboto',
                      }}
                    >
                      {formik.errors.bank}
                    </div>
                  ) : null}
                  <label htmlFor="parts" style={{ color: 'black' }}>
                    Selecione o banco
                  </label>
                </span>
                {/* <Form.Group className="mb-3" controlId="">
                  <Form.Label style={{ color: '#fff' }}>
                    Selecione o banco
                  </Form.Label>
                  <Typeahead
                    id="bank"
                    onChange={(selected: any) => {
                      if (selected.length > 0) {
                        setBankId(selected[0].id)
                      }
                    }}
                    options={banks.map((bank) => {
                      return { id: bank.COMPE, label: bank?.LongName }
                    })}
                  />
                </Form.Group> */}
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
              <Button variant="success" type="submit">
                Enviar
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
