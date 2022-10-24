import { Button } from "react-bootstrap";
import  logo from  "../../assets/images/logoLogin.png";
import Form from 'react-bootstrap/Form';
import "./Login.scss"

export function Login() {
    return (
        <div className="background-img">
            <div className="login-square">
                <img className="login-logo" src={logo} alt="" />
                <Form>
                    <Form.Group className="mb-3 user-box" controlId="formBasicEmail">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>

                    <Form.Group className="mb-3 password-box" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                </Form>

                <a className="forgot-text">Esqueceu a senha?</a>
                <Button className="btn-login">Entrar</Button>
            </div>
        </div>

    ) 
}