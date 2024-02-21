import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";

export function MensalExpense({ onHandleUpdate }: { onHandleUpdate: any }) {
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [monthsQuantity, setMonthsQuantity] = useState(1);

  useEffect(() => {
    onHandleUpdate(paymentDate, monthsQuantity);
  }, [paymentDate, monthsQuantity]);

  return <div className="formgrid grid">
    <div className="field col-6">
      <span className="p-float-label">
        <Calendar
          onChange={(e: any) => {
            setPaymentDate(e.value!);
          }}
          locale="en"
          dateFormat="dd/mm/yy"
          style={{ width: '100%' }}
        />
        <label htmlFor="date">Data de Pagamento</label>
      </span>
    </div>
    <div className="field col">
      <span className="p-float-label">
        <InputNumber
          inputId="months"
          onValueChange={(e) => {
            setMonthsQuantity(Number(e.value));
          }}
          locale="pt-BR"
          min={1}
          style={{ width: '100%' }}
        />
        <label htmlFor="months">Quantidade de meses</label>
      </span>
    </div>
  </div>
}