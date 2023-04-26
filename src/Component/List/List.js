import React, {useContext, useState} from 'react'
import {useLoaderData, useLocation, useNavigate} from 'react-router-dom'
import Model from '../../Model/Model'
import Error from '../Error/Error'
import CreateTodoForm from '../CreateTodoForm/CreateTodoForm'
import Todo from '../Todo/Todo'
import './List.scss'
import Toast from '../Toast/Toast'
export const listContext = React.createContext({})

export async function loader({params}) {
    const list = params.listId
    return {list}
}

export default function List(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const {list} = useLoaderData()
    const [addTodo, setAddTodo] = useState(false)
    const [toastText, setToastText] = useState('')

    if (!location.state) {
        return <div>error</div>
    }
    return (
        <listContext.Provider
            value={{list, addTodo, setAddTodo, navigate, setToastText}}>
            <section class='section__list'>
                <div class='list'>
                    <div class='list__item'>
                        <button
                            class='list__arrow'
                            onClick={(e) => navigate('/')}>
                            <svg
                                width='30'
                                height='30'
                                viewBox='0 0 10 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    class='slider__btn-path'
                                    d='M9 18.43L1 10.1164L9 1.80273'
                                    stroke='white'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                        </button>
                        <div class='list__title'>{location.state.name}</div>
                        <CreateTodoForm />
                    </div>
                    <div class='list__item'>
                        <Todo />
                    </div>
                </div>
            </section>
            <Toast text={toastText} setText={setToastText} />
        </listContext.Provider>
    )
}
