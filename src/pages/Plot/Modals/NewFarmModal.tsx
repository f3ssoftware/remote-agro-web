import { Button, Modal } from "react-bootstrap";
import { NewFarm } from "../components/NewFarm";
import { Dialog } from "primereact/dialog";
import { dialogContentSyle, dialogHeaderStyle } from "../../../utils/modal-style.util";

export function NewFarmModal({show, handleClose}: {show: boolean, handleClose: any}){



    return  <Dialog
      header="Cadastro de nova propriedade"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      <NewFarm handleClose={handleClose}></NewFarm>
    </Dialog>
}