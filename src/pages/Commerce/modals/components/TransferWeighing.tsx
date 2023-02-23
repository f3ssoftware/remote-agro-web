import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { NewTransferWeighing } from './NewTransferWeighing'


export function TransferWeighing({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const dispatch = useDispatch<any>()

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <NewTransferWeighing show={false} handleClose={handleClose}></NewTransferWeighing>
      </Row>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '2%',
        }}
      >
      </div>
    </div>
  )
}
