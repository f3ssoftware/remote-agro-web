import { Button, Modal } from 'react-bootstrap'
import { NewPlot } from '../components/NewPlot'
import { Dialog } from 'primereact/dialog'
import '../Plot.scss'
import { dialogContentSyle, dialogHeaderStyle } from '../../../utils/modal-style.util'

export function NewPlotModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  return (
    <Dialog
      header="Cadastro de novo talhão"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      <NewPlot handleClose={handleClose}></NewPlot>
    </Dialog>
  )
}
