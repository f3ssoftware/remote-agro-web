import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { NewManualSeparateWeighing } from './NewManualSeparateWeighing'
import { SeparateWeighingRow } from '../../../../models/SepareteWeighingRow'
import { NewAutoSeparateWeighing } from './NewAutoSeparateWeighing'
import { WeighingRow } from '../../../../models/WeighingRow'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { WeighingRowType } from '../../../../utils/WeighingRowType.enum'
import { addSeparateWeighRow } from '../../../../stores/commerce.store'

export function SeparateWeighing() {
  const [separateWeighingRows, setSeparateWeighingRows] = useState<
    WeighingRow[]
  >([])
  const dispatch = useDispatch<any>()
  const { commerce } = useSelector((state: RootState) => state)
  const [weighingDate, setWeighingDate] = useState<Date>()

  useEffect(() => {
    const firstWeighing = commerce
      ?.separateWeighingRows[0] as SeparateWeighingRow
    if (firstWeighing?.weighing_date) {
      setWeighingDate(new Date(firstWeighing.weighing_date!))
    } else {
      setWeighingDate(new Date())
    }

    setSeparateWeighingRows(commerce?.separateWeighingRows)
  }, [commerce])

  return (
    <Container>
      <div className="main-boxW">
        <Row>
          <Col md={12} className="title-boxW">
            <span>
              Pesagens Avulsas - {weighingDate?.toLocaleDateString('pt-BR')}
            </span>
          </Col>
        </Row>
        <div>
          <Row
            style={{ marginTop: '2%', paddingLeft: '1%', paddingRight: '1%' }}
          >
            {separateWeighingRows.map(
              (row: SeparateWeighingRow, index: number) => {
                switch (row.rowType) {
                  case WeighingRowType.MANUAL: {
                    return (
                      <NewManualSeparateWeighing
                        index={index}
                        key={index}
                        manualSeparateWeigh={
                          commerce.separateWeighingRows[index]
                        }
                      ></NewManualSeparateWeighing>
                    )
                  }
                  case WeighingRowType.AUTOMATIC: {
                    return (
                      <NewAutoSeparateWeighing
                        index={index}
                        key={index}
                        autoSeparateWeighing={commerce.separateWeighingRows[index]}
                      ></NewAutoSeparateWeighing>
                    )
                  }
                  default: {
                  }
                }
              },
            )}
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
                const separateWeighRow: SeparateWeighingRow = {
                  rowType: WeighingRowType.MANUAL,
                }
                dispatch(addSeparateWeighRow(separateWeighRow))
              }}
            >
              Adicionar linha manual
            </Button>
            <Button
              variant="primary"
              onClick={() =>{
                const separateWeighRow: SeparateWeighingRow = {
                  rowType: WeighingRowType.AUTOMATIC,
                }
                dispatch(addSeparateWeighRow(separateWeighRow))
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
