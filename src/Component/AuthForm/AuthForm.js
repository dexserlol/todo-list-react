import {useState} from 'react'
import './AuthForm.scss'
import Model from '../../Model/Model'

export default function AuthForm(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const loginHandler = () => {
        if (!username && !password) return
        Model.Login(username, password).then((res) => {
            if (res.code === 1) {
                props.toast(res.message)
            } else if (res.code === 5) {
                props.toast(res.message)
            } else {
                localStorage.setItem('token', res.token)
                props.auth(true)
            }
        })
    }
    const registerHandler = () => {
        if (!username && !password) return
        Model.register(username, password).then((res) => {
            if (res.code === 2) {
                props.toast(res.message)
            } else {
                localStorage.setItem('token', res.token)
                props.auth(true)
            }
        })
    }
    return (
        <section class='section__auth'>
            <div class='auth'>
                <div class='auth__username'>
                    <h2 class='auth__title'>username:</h2>
                    <input
                        class='auth__input'
                        placeholder='enter the username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div class='auth__password'>
                    <h2 class='auth__title'>password:</h2>
                    <input
                        type='password'
                        class='auth__input'
                        placeholder='enter the password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button class='auth__btn' onClick={loginHandler}>
                    Login
                </button>
                <button class='auth__btn' onClick={registerHandler}>
                    Register
                </button>
            </div>
        </section>
    )
}
