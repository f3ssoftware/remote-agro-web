import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { NewManualOutputWeighing } from './NewManualOutputWeighing'
import { ManualOutputWeighing } from '../../../../models/ManualOutputWeighing'
import { NewAutoOutputWeighing } from './NewAutoOutputWeighing'
import { addOutputWeighRow, setOutputWeighing } from '../../../../stores/commerce.store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { OutputWeighingRow } from '../../../../models/OutputWeighingRow'
import { WeighingRowType } from '../../../../utils/WeighingRowType.enum'

export function OutputWeighing() {
  const [newManualOutputWeighing, setNewManualOutputWeighing] = useState<any[]>([])
  const [newAutoOutputWeighing, setNewAutoOutputWeighing] = useState([new ManualOutputWeighing()])
  const [weighingDate, setWeighingDate] = useState<Date>();
  const { commerce } = useSelector((state: RootState) => state);
  const [outputWeighingRows, setOutputWeighingRows] = useState<OutputWeighingRow[]>();
  const dispatch = useDispatch<any>();

  const onRemoveItem = (index: number) => {
    const mOutputArr = [...newManualOutputWeighing];
    mOutputArr.splice(index, 1);
    setNewManualOutputWeighing(mOutputArr);
  }

  const onRemoveItemA = (index: number) => {
    const aOutputArr = [...newAutoOutputWeighing];
    aOutputArr.splice(index, 1);
    setNewAutoOutputWeighing(aOutputArr);
  }

  const onUpdateItem = (mOutput: ManualOutputWeighing, index: number) => {
    const mOutputArr = [...newManualOutputWeighing];
    mOutputArr.splice(index, 1);
    mOutputArr.push(mOutput);
    setNewManualOutputWeighing(mOutputArr);

  }

  const onUpdateItemA = (aOutput: ManualOutputWeighing, index: number) => {
    const aOutputArr = [...newAutoOutputWeighing];
    aOutputArr.splice(index, 1);
    aOutputArr.push(aOutput);
    setNewAutoOutputWeighing(aOutputArr);

  }

  useEffect(() => {
    const weighing = commerce?.outputWeighingRows[0] as OutputWeighingRow;
    if (weighing?.weighing_date) {
      setWeighingDate(new Date(weighing?.weighing_date)!);
    } else {
      setWeighingDate(new Date());
    }
    setOutputWeighingRows(commerce?.outputWeighingRows);
  }, [commerce]);

  return (
    <Container>
      <div className="main-boxW">
        <Row>
          <Col md={4} className="title-boxW">
            <span>Pesagens de Saída - {weighingDate?.toLocaleDateString('pt-BR')}</span>
          </Col>
        </Row>
        <div>
          <Row style={{ marginTop: '2%', paddingLeft: '1%', paddingRight: '1%' }}>
            {outputWeighingRows?.map((row: OutputWeighingRow, index: number) => {
              switch (row.rowType) {
                case WeighingRowType.MANUAL: {
                  return <NewManualOutputWeighing manualOutputWeigh={row} onHandleRemove={onRemoveItem} index={index} key={index} onHandleUpdate={onUpdateItem}></NewManualOutputWeighing>
                }
                case WeighingRowType.AUTOMATIC: {
                  return (
                    <NewAutoOutputWeighing autoOutputWeighing={row} onHandleRemove={onRemoveItemA} index={index} key={index} onHandleUpdate={onUpdateItemA}></NewAutoOutputWeighing>
                  )
                }
                default: {

                }
              }
            })}
            {/* {newManualOutputWeighing.map((newMOutput, index) => {
              return <NewManualOutputWeighing onHandleRemove={onRemoveItem} index={index} key={index} onHandleUpdate={onUpdateItem}></NewManualOutputWeighing>
            })}
            {newAutoOutputWeighing.map((newAOutput, index) => {
              return <NewAutoOutputWeighing onHandleRemove={onRemoveItemA} index={index} key={index} onHandleUpdate={onUpdateItemA}></NewAutoOutputWeighing>
            })} */}
          </Row>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: '2%',
            }}
          >
            <Button variant="secondary" onClick={() => {
              const outputWeighRow: OutputWeighingRow = {
                rowType: WeighingRowType.MANUAL
              };
              dispatch(addOutputWeighRow(outputWeighRow));
            }}>Adicionar linha manual</Button>
            <Button variant="primary" onClick={() => {
              const outputWeighRow: OutputWeighingRow = {
                rowType: WeighingRowType.AUTOMATIC
              };
              dispatch(addOutputWeighRow(outputWeighRow));
            }}>Adicionar linha automática</Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
