import {useState, useEffect, useContext} from 'react'
import {listContext} from '../List/List'
import Model from '../../Model/Model'
import {Navigate} from 'react-router-dom'
import './Todo.scss'

export default function Todo(props) {
    const [data, setData] = useState([])
    const [panding, setPanding] = useState(true)
    const value = useContext(listContext)

    const checkboxHandler = (e, a) => {
        Model.todoCheck(a._id, window.localStorage.getItem('token')).then(
            (res) => {
                if (res.code === 1) {
                    value.navigate('/')
                }
                //toast
                value.setAddTodo(true)
                value.setToastText('todo check')
            }
        )
    }
    const removeHandler = (e, a) => {
        Model.removeTodo(a._id, window.localStorage.getItem('token')).then(
            (res) => {
                if (res.code === 1) {
                    value.navigate('/')
                }
                //toast
                value.setAddTodo(true)
                value.setToastText('todo remove')
            }
        )
    }

    useEffect(() => {
        Model.getTodo(value.list, window.localStorage.getItem('token'))
            .then((res) => {
                if (res.code === 1) {
                    value.navigate('/')
                }
                setData(res)
            })
            .then((res) => {
                value.setAddTodo(false)
                setPanding(false)
            })
    }, [value.addTodo])
    if (panding) {
        return (
            <div class='todo'>
                <h1>Loading...</h1>
            </div>
        )
    }
    if (!data.length) {
        return (
            <div class='todo'>
                <h2>Empty</h2>
            </div>
        )
    }
    return (
        <div class='todo'>
            {[...data].reverse().map((a) => {
                return (
                    <div key={a._id} class='todo__item'>
                        <input
                            class='todo__checkbox'
                            type='checkbox'
                            defaultChecked={a.active}
                            onChange={(e) => checkboxHandler(e, a)}
                        />
                        <h2 class={`todo__text ${a.active ? 'active' : ''}`}>
                            {a.content}
                        </h2>
                        <button
                            class='todo__btn'
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
