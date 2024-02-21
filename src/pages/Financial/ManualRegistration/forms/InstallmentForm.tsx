import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";

export function InstallmentForm({
  index,
  onUpdate,
  initialAmount,
  totalAmount,
}: {
  index: number;
  onUpdate: any;
  initialAmount: number;
  totalAmount: number;
}) {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [selectedDate, setSelectedDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth() + index,
      new Date().getDate()
    )
  );

  useEffect(() => {
    onUpdate(
      {
        amount,
        due_date: selectedDate,
      },
      index
    );
  }, [amount, selectedDate]);


  return (
    <div className="formgrid grid">
      <div className="field col-6">
        <span className="p-float-label">
          <InputNumber
            inputId="currency-br"
            onValueChange={(e) => {
              setAmount(Number(e.value));
            }}
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            style={{ width: '100%' }}
          />
          <label htmlFor="totalValue">Parcela {index + 1}</label>
        </span>
      </div>
      <div className="field col-6">
        <span className="p-float-label">
          <Calendar
            onChange={(e: any) => {
              setSelectedDate(e.value!);
            }}
            locale="en"
            dateFormat="dd/mm/yy"
            style={{ width: '100%' }}
          />
          <label htmlFor="date">Data de Pagamento</label>
        </span>
      </div>
    </div>
  );
}
