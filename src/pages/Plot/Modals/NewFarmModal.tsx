import { Button, Modal } from "react-bootstrap";
import { NewFarm } from "../components/NewFarm";
import { Dialog } from "primereact/dialog";

export function NewFarmModal({show, handleClose}: {show: boolean, handleClose: any}){



    return  <Dialog
      header="Cadastro de nova propriedade"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={{ backgroundColor: '#7C5529' }}
      contentStyle={{ backgroundColor: '#7C5529' }}
    >
      <NewFarm handleClose={handleClose}></NewFarm>
    </Dialog>
}