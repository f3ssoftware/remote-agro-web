import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { Toast } from "primereact/toast";
import * as Yup from "yup";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Installments } from "./Installments";
import { MensalExpense } from "./MensalExpense";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../..";
import { ExpenseInvoice } from "../../../../models/ExpenseInvoice";
import { useNavigate } from "react-router-dom";
import { asyncManualRegisterExpense } from "../../../../stores/financial.store";

interface Type {
  name: string;
  code: string;
}
interface Planning {
  name: string;
  id: number;
}
export function PrimeReactOutcomeForm({ costType, costAction, sefaz }: { costType: string, costAction: string, sefaz?: any }) {
  const [outcomeYear, setOutcomeYear] = useState("");
  const [reference, setReference] = useState("");
  const [amount, setAmount] = useState<Number>();
  const [observation, setObservation] = useState("");
  const [number, setNumber] = useState(0);
  const [plan, setPlan] = useState(0);
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [installmentsQuantity, setInstallmentsQuantity] = useState(0);
  const [installments, setInstallments]: any = useState({});
  const [externalInvoiceId, setExternalInvoiceId] = useState(0);
  const [recurrencyDate, setRecurrencyDate] = useState(new Date());
  const [recurrencyQuantity, setRecurrencyQuantity] = useState(1);
  const toast = useRef<Toast>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>();
  const type: Type[] = [
    { name: "Á vista", code: "one_time" },
    { name: "A prazo", code: "installments" },
    { name: "Gasto mensal", code: "recurrency" },
    { name: "Sem necessidade de pagamento", code: "none" },
  ];
  const { financial, seasons } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const planninglist: Planning[] = [
    // financial.plannings.map((plannings)=>{return{ name: plannings.name, id: plannings.id}})
  ];

  const updateInstallments = (installmentsFromChildren: any[]) => {
    setInstallments(installmentsFromChildren);
  };

  const register = async () => {
    const exp: ExpenseInvoice = {
      amount: Number(amount),
      number: number.toString(),
      reference: reference,
      cost_type: costType,
      due_date: expirationDate.toISOString(),
      cost_action: costAction,
      payment_method: paymentMethod,
      year: outcomeYear.toString(),
      external_expenses_invoice_id: externalInvoiceId,
      observations: observation,
    }

    console.log(exp);

    switch (paymentMethod) {
      case 'one_time': {
        await dispatch(asyncManualRegisterExpense(exp));
        navigate('financial/balance');
      } break;
      case 'installments': {
        exp.installments = installments;
        await dispatch(asyncManualRegisterExpense(exp));
        navigate('financial/balance');
      } break;
      case 'recurrency': {
        for (let i = 0; i < recurrencyQuantity; i++) {
          exp.due_date = new Date(recurrencyDate.getFullYear(), recurrencyDate.getMonth() + i, recurrencyDate.getDate()).toISOString();
          await dispatch(asyncManualRegisterExpense(exp));
          navigate('financial/balance');
        }
      } break;
      default: {
        await dispatch(asyncManualRegisterExpense(exp));
        navigate('financial/balance');
      }
    }

  }

  const renderPaymentConditionForm = () => {
    switch (paymentMethod) {
      case "none": {
        return <></>;
      }
      case "one_time": {
        return (
          <div className="field col-6">
            <span className="p-float-label">
              <Calendar
                onChange={(e: any) => {
                  setExpirationDate(e.value!);
                }}
                locale="en"
                dateFormat="dd/mm/yy"
                style={{ width: '100%' }}
              />
              <label htmlFor="date">Data de Pagamento</label>
            </span>
          </div>
        );
      }
      case "installments": {
        return (
          <div className="field col">
            <span className="p-float-label">
              <InputNumber
                inputId=""
                onValueChange={(e) => {
                  setInstallmentsQuantity(Number(e.value));
                }}
                locale="pt-BR"
                min={2}
                style={{ width: '100%' }}
              />
              <label htmlFor="totalValue">Quantidade de parcelas</label>
            </span>
            <Installments
              installmentsQuantity={installmentsQuantity}
              onUpdateInstallments={updateInstallments}
              totalAmount={Number(amount)}
            ></Installments>
          </div>
        );
      }
      case "recurrency": {
        return (
          <div className="field col-6">
            <MensalExpense
              onHandleUpdate={(
                paymentDate: Date,
                recurrencyQuantity: number
              ) => {
                setRecurrencyDate(paymentDate);
                setRecurrencyQuantity(recurrencyQuantity);
              }}
            ></MensalExpense>
          </div>
        );
      }
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <Formik
        initialValues={{
          reference: "",
          outcomeYear: "",
          number: null,
          amount: null,
          paymentMethod: "",
        }}
        validationSchema={Yup.object({
          reference: Yup.string().required("Necessário preencher"),
          outcomeYear: Yup.string().required("Necessário preencher"),
          paymentMethod: Yup.string().required("Necessário preencher"),
          number: Yup.string().required("Necessário preencher"),
          amount: Yup.string().required("Necessário preencher"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 400);
          register();
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div
              className="formgrid grid"

            >
              <div className="field col-12">
                <Dropdown
                  value={formik.values.outcomeYear}
                  onChange={(e) => {
                    formik.setFieldValue("outcomeYear", e.target.value);
                    setOutcomeYear(e.target.value);
                  }}
                  className={classNames({
                    "p-invalid":
                      formik.touched.outcomeYear && formik.errors.outcomeYear,
                  })}
                  style={{ width: '100%' }}
                  options={seasons.seasons}
                  optionLabel="year"
                  optionValue="year"
                  placeholder="Ano agrícola"
                />
                {formik.touched.outcomeYear && formik.errors.outcomeYear ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "Roboto",
                    }}
                  >
                    {formik.errors.outcomeYear}
                  </div>
                ) : null}
              </div>
            </div>
            <div
              className="formgrid grid"
            // style={{ marginTop: "2%", marginLeft: "2%" }}
            >
              <div className="field col-6">
                <span className="p-float-label">
                  <InputText
                    id="reference"
                    name="reference"
                    value={formik.values.reference}
                    onChange={(e) => {
                      formik.setFieldValue("reference", e.target.value);
                      setReference(e.target.value);
                    }}
                    className={classNames({
                      "p-invalid":
                        formik.touched.reference && formik.errors.reference,
                    })}
                    style={{ width: '100%' }}
                  />
                  {formik.touched.reference && formik.errors.reference ? (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Roboto",
                      }}
                    >
                      {formik.errors.reference}
                    </div>
                  ) : null}
                  <label htmlFor="reference">Referência</label>
                </span>
              </div>
              <div className="field col-6">
                <span className="p-float-label">
                  <InputNumber
                    inputId="currency-br"
                    value={formik.values.amount}
                    onValueChange={(e) => {
                      formik.setFieldValue("amount", e.target.value);
                      setAmount(Number(e.value));
                    }}
                    className={classNames({
                      "p-invalid":
                        formik.touched.amount && formik.errors.amount,
                    })}
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                    style={{ width: '100%' }}
                  />
                  {formik.touched.amount && formik.errors.amount ? (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Roboto",
                      }}
                    >
                      {formik.errors.amount}
                    </div>
                  ) : null}
                  <label htmlFor="totalValue">Valor</label>
                </span>
              </div>
            </div>
            <div
              className="formgrid grid"

            >
              <div className="field col-12">
                <span className="p-float-label">
                  <InputTextarea
                    value={observation}
                    id="description"
                    onChange={(e) => setObservation(e.target.value)}
                    style={{ width: '100%' }}
                  />
                  <label htmlFor="observation">Observações</label>
                </span>
              </div>
            </div>
            <div
              className="formgrid grid"
            >
              <div className="field col-6">
                <span className="p-float-label">
                  <InputNumber
                    id="number"
                    locale="pt-BR"
                    useGrouping={false}
                    value={formik.values.number}
                    onValueChange={(e) => {
                      formik.setFieldValue("number", e.target.value);
                      setNumber(Number(e.value));
                    }}
                    className={classNames({
                      "p-invalid":
                        formik.touched.number && formik.errors.number,
                    })}
                    style={{ width: '100%' }}
                  />
                  {formik.touched.number && formik.errors.number ? (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Roboto",
                      }}
                    >
                      {formik.errors.number}
                    </div>
                  ) : null}
                  <label htmlFor="number">Número</label>
                </span>
              </div>
              <div className="field col-6">
                <Dropdown
                  value={plan}
                  onChange={(e) => {
                    formik.setFieldValue("planning", e.target.value);
                    setPlan(e.target.value);
                  }}
                  options={financial.plannings}
                  optionLabel="name"
                  optionValue="id"
                  placeholder="Vincular Planejamento"
                  style={{ width: '100%' }}
                />
                {/* {formik.touched.planning && formik.errors.planning ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "Roboto",
                    }}
                  >
                    {formik.errors.planning}
                  </div>
                ) : null} */}
              </div>
            </div>
            <div
              className="formgrid grid"
            >
              <div className="field col-6">
                <Dropdown
                  value={formik.values.paymentMethod}
                  onChange={(e: DropdownChangeEvent) => {
                    formik.setFieldValue("paymentMethod", e.target.value);
                    setPaymentMethod(e.target.value);
                  }}
                  options={type}
                  optionLabel="name"
                  optionValue="code"
                  className={classNames({
                    "p-invalid":
                      formik.touched.paymentMethod &&
                      formik.errors.paymentMethod,
                  })}
                  placeholder="Método de pagamento"
                  style={{ width: '100%' }}
                />
                {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "Roboto",
                    }}
                  >
                    {formik.errors.paymentMethod}
                  </div>
                ) : null}
              </div>
              {renderPaymentConditionForm()}
            </div>
            <div
              className="formgrid grid"
              style={{ marginTop: "2%", justifyContent: "center" }}
            >
              <div className="flex justify-content-end">
                <Button
                  type="submit"
                  label="Registrar"
                  style={{ backgroundColor: "#198754" }}
                // onClick={() => register()}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

