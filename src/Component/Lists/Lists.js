import {useState, useEffect, useContext} from 'react'
import {userContext} from '../../App'
import Model from '../../Model/Model'
import './Lists.scss'
import {NavLink} from 'react-router-dom'

export default function Lists(props) {
    const [data, setData] = useState([])
    const [panding, setPanding] = useState(true)
    const value = useContext(userContext)
    useEffect(() => {
        Model.getList(window.localStorage.getItem('token'))
            .then((res) => {
                setData(res.reverse())
            })
            .then((res) => {
                value.setAddList(false)
                setPanding(false)
            })
    }, [value.addList])

    const removeHandler = (e, a) => {
        Model.removeList(a._id, window.localStorage.getItem('token')).then(
            (res) => {
                if (res.code === 1) {
                    value.setAuth(false)
                }
                //toast
                value.setAddList(true)
                value.setToastText('list remove')
            }
        )
    }
    if (panding) {
        return (
            <div class='lists'>
                <h1>Loading...</h1>
            </div>
        )
    }
    if (!data.length) {
        return (
            <div class='lists'>
                <h2>Empty</h2>
            </div>
        )
    }
    return (
        <div class='lists'>
            {data.map((a, index) => {
                return (
                    <div key={index} class='lists__item'>
                        <NavLink
                            className={({isActive, isPending}) =>
                                isActive ? 'active' : isPending ? 'pending' : ''
                            }
                            to={`list/${a._id}`}
                            state={{data: value.data, name: a.listName}}>
                            {a.listName}
                        </NavLink>
                        <button
                            class='lists__btn'
                            onClick={(e) => removeHandler(e, a)}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='36'
                                height='36'
                                fill='currentColor'
                                class='bi bi-trash'
                                viewBox='0 0 16 16'>
                                <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                                <path
                                    fill-rule='evenodd'
                                    d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                                />
                            </svg>
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
