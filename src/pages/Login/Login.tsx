import { Button } from "react-bootstrap";
import  logo from  "../../assets/images/logoLogin.png";
import Form from 'react-bootstrap/Form';
import "./Login.scss"
import { useEffect, useState } from "react";
import { asyncFetchUser } from "../../stores/user.store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Login() {
    let navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');

    const login = () => {
        // console.log(`Usuário: ${username} / Senha: ${password}`);
        dispatch(asyncFetchUser(username, password));
        navigate("/");
    }

    return (
        <div className="background-img">
            <div className="login-square">
                <img className="login-logo" src={logo} alt="" />
                <Form>
                    <Form.Group className="mb-2 user-box" controlId="formBasicEmail">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control type="text" onChange={e => setUsername(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-2 password-box" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                </Form>
                <div className="square-text">
                    <a className="forgot-text">Esqueceu a senha?</a>
                </div>
                <Button className="btn-login" onClick={() => login()}>Entrar</Button>
            </div>
        </div>

    ) 
}