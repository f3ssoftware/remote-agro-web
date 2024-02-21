import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Cultivar } from '../../../models/Cultivar'
import { Checkbox } from 'primereact/checkbox'
import { InputNumber } from 'primereact/inputnumber'
import { Slider, SliderChangeEvent } from 'primereact/slider'

export function CultivarItem({
  cultivar,
  index,
  onHandleUpdate,
  onHandleRemove,
  maxArea,
}: {
  cultivar: Cultivar
  index: number
  onHandleUpdate: any
  onHandleRemove: any
  maxArea: number
}) {
  const [showArea, setShowArea] = useState(false)
  const [area, setArea] = useState(0)

  return (
    <div style={{ color: 'white' }}>
      <Checkbox
        style={{ marginTop: '3%' }}
        id={`default-cultivar-${cultivar.id}`}
        onChange={(e) => {
          if (e.target.checked) {
            setShowArea(true)
          } else {
            setShowArea(false)
            onHandleRemove(cultivar.id)
          }
        }}
        checked={showArea}
      ></Checkbox>
      <label style={{marginRight: '2%'}} className="ml-2">{cultivar.name}</label>
      {showArea ? (
        <>
          <span >Área aplicada do cultivar:</span>
          <InputNumber
          style={{marginTop:'2%'}}
            value={area}
            onChange={(e) => {
              setArea(Number(e.value))
              onHandleUpdate(cultivar.id, e.value)
            }}
            className="w-full"
            min={0}
            max={maxArea}
          />
          <span>{`${area}/${maxArea}`}{' '}
          {maxArea === 0 ? ` - Informe a área do talhão` : ``}</span>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
