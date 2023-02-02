import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { NewOutputWeighing } from './NewOutputWeighing'


export function OutputWeighing({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const dispatch = useDispatch<any>()
  const { farm, commerce } = useSelector((state: RootState) => state)





//     const onRemoveItem = (index: number) => {
//       const inputArr = [...];
//       planningsArr.splice(index, 1);
//       setPlannings(planningsArr);
//   }

  // const onUpdateItem = (planning: PlanningInput, index: number) => {
  //   const planningsArr = [...plannings];
  //   planningsArr.splice(index, 1);
  //   planningsArr.push(planning);
  //   setPlannings(planningsArr);

  // }

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <NewOutputWeighing show={false} handleClose={undefined}></NewOutputWeighing>
      </Row>
      {/* {plannings.map((newPlanning, index) => {
            return <NewPlanningItem onHandleRemove={onRemoveItem} index={index} key={index} onHandleUpdate={onUpdateItem}></NewPlanningItem>
        })} */}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '2%',
        }}
      >
        {/* <Button variant="primary" onClick={() => setPlannings([...plannings, new PlanningInput()])}>Adicionar Linha</Button> */}
      </div>
    </div>
  )
}
