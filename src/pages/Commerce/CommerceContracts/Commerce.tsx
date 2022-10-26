import "./Commerce.scss";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

export function Commerce() {
    return (
        <div className="container">
            <div className="frist-column">
                <div className="frist-card">
                    <Dropdown className="frist-card-dropdown">
                        <span className="frist-card-text">Cultura</span>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Milho
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Cultura1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Cultura2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Cultura3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="second-card">
                    <span className="second-card-text">Contratos</span>
                    <div>
                        <Button variant="success" className="second-card-button">+</Button>{' '}
                    </div>

                </div>
            </div>
        </div>

    )
}