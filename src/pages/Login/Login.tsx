import { Button } from 'react-bootstrap'
import logo from '../../assets/images/logoLogin.png'
import Form from 'react-bootstrap/Form'
import './Login.scss'
import { useEffect, useState } from 'react'
import { asyncFetchUser } from '../../stores/user.store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../..'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'

export function Login() {
  let navigate = useNavigate()
  const dispatch = useDispatch<any>()
  const { loading } = useSelector((state: RootState) => state)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    // console.log(`Usuário: ${username} / Senha: ${password}`);
    await dispatch(asyncFetchUser(username, password))
    navigate('/')
  }

  return (
    <div className="background-img">
      <div className="login-square">
        <img className="login-logo" src={logo} alt="" />
        <Form
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              login()
            }
          }}
        >
          <Form.Group className="mb-2 user-box" controlId="formBasicEmail">
            <span className="p-float-label">
              <InputText
                style={{ width: '100%' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={
                  loading.requests.filter((r) => r === 'sessions').length > 0
                }
              />
              <label htmlFor="username">Usuário</label>
            </span>
            {/* <Form.Label>Usuário</Form.Label>
                        <Form.Control type="text" onChange={e => setUsername(e.target.value)} disabled={loading.requests.filter(r => r === 'sessions').length > 0} /> */}
          </Form.Group>

          <Form.Group
            className="mb-2 password-box"
            controlId="formBasicPassword"
            style={{ marginTop: '7%' }}
          >
            <span className="p-float-label">
              <Password
                feedback={false}
                style={{ width: '100%' }}
                inputStyle={{ width: '100%' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                toggleMask
                disabled={
                  loading.requests.filter((r) => r === 'sessions').length > 0
                }
              />
              {/* <InputText value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading.requests.filter(r => r === 'sessions').length > 0} /> */}
              <label htmlFor="username">Senha</label>
            </span>
            {/* <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" onChange={e => setPassword(e.target.value)} /> */}
          </Form.Group>
        </Form>
        <div className="square-text">
          <a className="forgot-text">Esqueceu a senha?</a>
        </div>
        <Button className="btn-login" onClick={() => login()}>
          Entrar
        </Button>
      </div>
    </div>
  )
}
