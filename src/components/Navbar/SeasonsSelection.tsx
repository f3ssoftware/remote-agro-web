import { Modal, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";
import { selectSeason } from "../../stores/seasons.store";

export function SeasonSelection({ show, handleClose }: any) {
    const { seasons } = useSelector((state: RootState) => state);
    const dispatch = useDispatch<any>();
    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: "#7C5529" }}>
            <Modal.Title>Escolha da safra</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#7C5529" }}>
            {seasons.seasons.map((season: any, index) => {
                return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '1%', }} key={index}>
                    <Button style={{ backgroundColor: '#243C74', border: 'none' }} onClick={() => { dispatch(selectSeason(season)); handleClose(); }}>{`${season.type} - ${season.year}`}</Button>
                </div>
            })}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#7C5529" }}>

        </Modal.Footer>
    </Modal>
}