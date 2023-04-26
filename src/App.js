import React, {useEffect, useState} from 'react'
import './App.scss'
import Model from './Model/Model'
import AuthForm from './Component/AuthForm/AuthForm'
import CreateListForm from './Component/CreateListForm/CreateListForm'
import Lists from './Component/Lists/Lists'
import Toast from './Component/Toast/Toast'
import Loader from './Component/Loader/Loader'
export const userContext = React.createContext({})

function App() {
    const [data, setData] = useState({})
    const [auth, setAuth] = useState(false)
    const [addList, setAddList] = useState(false)
    const [pending, setPending] = useState(true)
    const [toastText, setToastText] = useState('')
    let token = localStorage.getItem('token')

    useEffect(() => {
        const responce = Model.getUser(token)
            .then((res) => {
                if (res.code === 1) {
                    setAuth(false)
                } else {
                    setData(res)
                    setAuth(true)
                }
            })
            .then((res) => {
                setPending(false)
            })
    }, [auth])
    if (pending) {
        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <div
                    style={{
                        width: '50vw',
                        height: '50vw',
                    }}>
                    <Loader />
                </div>
            </div>
        )
    } else if (!auth) {
        return (
            <>
                <AuthForm auth={setAuth} toast={setToastText} />
                <Toast text={toastText} setText={setToastText} />
            </>
        )
    }
    return (
        <userContext.Provider
            value={{data, auth, setAuth, addList, setAddList, setToastText}}>
            <section class='section__home'>
                <div class='home'>
                    <div class='home__item'>
                        <div class='hero__title'>{data.username}</div>
                        <CreateListForm />
                    </div>
                    <div class='home__item'>
                        <Lists />
                        <button
                            class='home__btn'
                            onClick={(e) => {
                                localStorage.removeItem('token')
                                setAuth(false)
                            }}>
                            logout
                        </button>
                    </div>
                </div>
                <Toast text={toastText} setText={setToastText} />
            </section>
        </userContext.Provider>
    )
}

export default App
