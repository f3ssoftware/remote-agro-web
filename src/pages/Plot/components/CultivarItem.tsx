import { useState } from "react";
import { Form } from "react-bootstrap";
import { Cultivar } from "../../../models/Cultivar";

export function CultivarItem({ cultivar, index, onHandleUpdate, onHandleRemove, maxArea }: {cultivar: Cultivar, index: number, onHandleUpdate: any, onHandleRemove: any, maxArea: number }) {
    const [showArea, setShowArea] = useState(false);
    const [area, setArea] = useState(0);
   
    return <div style={{color: "white"}}>
        <Form.Check
            type="checkbox"
            id={`default-cultivar-${cultivar.id}`}
            label={cultivar.name}
            onChange={(e) => {
                if (e.target.checked) {
                    setShowArea(true);
                } else {
                    setShowArea(false);
                    onHandleRemove(cultivar.id);
                }
            }}
        />
        {showArea ? <Form.Group className="mb-3" controlId="">
            <Form.Label> Área aplicada do cultivar {cultivar.name}</Form.Label>
            <Form.Control type="number" defaultValue={area} min={0} max={maxArea} onChange={(e) => {
                setArea(Number(e.target.value));
                onHandleUpdate(cultivar.id, e.target.value);
            }}  />
            {`${area}/${maxArea}`}  {maxArea === 0 ? ` - Informe a área do talhão` : ``}
        </Form.Group> : <></>}

    </div>
}

