import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { NewManualInputWeighing } from './NewManualInputWeighing'

import { NewAutoInputWeighing } from './NewAutoInputWeighing'
import { WeighingRow } from '../../../../models/WeighingRow'
import { InputWeighingRow } from '../../../../models/InputWeighingRow';
import { WeighingRowType } from '../../../../utils/WeighingRowType.enum'
import { useDispatch, useSelector } from 'react-redux'
import { addInputWeighRow } from '../../../../stores/commerce.store'
import { RootState } from '../../../..'

export function InputWeighing() {
  const [inputWeighingRows, setInputWeighingRows] = useState<WeighingRow[]>([]);
  const dispatch = useDispatch<any>();
  const { commerce } = useSelector((state: RootState) => state);
  const [weighingDate, setWeighingDate] = useState<Date>();



  useEffect(() => {
    const firstWeighing = commerce?.inputWeighingRows[0] as InputWeighingRow;
    if (firstWeighing?.weighing_date) {
      setWeighingDate(new Date(firstWeighing.weighing_date!));
    } else {
      setWeighingDate(new Date());
    }


    setInputWeighingRows(
      commerce?.inputWeighingRows
    );
  }, [commerce]);

  return (
    <Container>
      <div className="main-boxW">
        <Row>
          <Col md={12} className="title-boxW">
            <span>Pesagens de entrada - {weighingDate?.toLocaleDateString('pt-BR')}</span>
          </Col>
        </Row>
        <div>
          <Row
            style={{ marginTop: '2%', paddingLeft: '1%', paddingRight: '1%' }}
          >
            {inputWeighingRows.map((row: InputWeighingRow, index: number) => {
              switch (row.rowType) {
                case WeighingRowType.MANUAL: {
                  return <NewManualInputWeighing
                    index={index}
                    key={index}
                    manualInputWeigh={commerce.inputWeighingRows[index]}
                  ></NewManualInputWeighing>
                }
                case WeighingRowType.AUTOMATIC: {
                  return (
                    <NewAutoInputWeighing
                      index={index}
                      key={index}
                      autoInputWeighing={commerce.inputWeighingRows[index]}
                    ></NewAutoInputWeighing>
                  )
                }
                default: {

                }
              }
            })}
          </Row>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: '2%',
            }}
          >
            <Button
              variant="secondary"
              onClick={() => {
                const inputWeighRow: InputWeighingRow = {
                  rowType: WeighingRowType.MANUAL,
                  type: 'Entrada'
                };
                dispatch(addInputWeighRow(inputWeighRow));
              }}
            >
              Adicionar linha manual
            </Button>

            <Button
              variant="primary"
              onClick={() => {
                const inputWeighRow: InputWeighingRow = {
                  rowType: WeighingRowType.AUTOMATIC,
                  type: 'Entrada'
                };
                dispatch(addInputWeighRow(inputWeighRow));
              }}
            >
              Adicionar linha automática
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
