import {useState, useEffect, useContext} from 'react'
import {listContext} from '../../Pages/List/List'
import Model from '../../Model/Model'
import './CreateTodoForm.scss'

export default function CreateTodoForm(props) {
    const [content, setContent] = useState('')
    const [todoCreate, setTodoCreate] = useState(false)
    const value = useContext(listContext)
    useEffect(() => {
        if (todoCreate) {
            Model.addTodo(
                content,
                value.list,
                window.localStorage.getItem('token')
            )
                .then((res) => {
                    if (res.code === 1) {
                        value.navigate('/')
                    }
                })
                .then((res) => {
                    value.setAddTodo(true)
                    setTodoCreate(false)
                    value.setToastText('todo create')
                })
        }
    }, [todoCreate])

    const listHandler = (e) => {
        if (content) {
            setTodoCreate(true)
        }
        e.preventDefault()
    }
    return (
        <form class='list__form' onSubmit={listHandler}>
            <input
                class='list__input'
                value={content}
                placeholder='todo name'
                onChange={(e) => setContent(e.target.value)}
            />
            <input class='list__btn' type='submit' value='create todo' />
        </form>
    )
}
