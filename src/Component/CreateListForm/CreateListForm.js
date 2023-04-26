import React, {useEffect, useState, useContext} from 'react'
import Model from '../../Model/Model'
import './CreateListForm.scss'
import {userContext} from '../../App'
export default function CreateListForm(props) {
    const [listName, setListName] = useState('')
    const [listCreate, setListCreate] = useState(false)
    const value = useContext(userContext)
    useEffect(() => {
        if (listCreate) {
            Model.addList(listName, window.localStorage.getItem('token'))
                .then((res) => {
                    if (res.code === 1) {
                        value.setAuth(false)
                    }
                })
                .then((res) => {
                    value.setToastText('list create')
                    value.setAddList(true)
                    setListCreate(false)
                })
        }
    }, [listCreate])

    const listHandler = (e) => {
        if (listName) {
            setListCreate(true)
        }
        e.preventDefault()
    }
    return (
        <form class='list__form' onSubmit={listHandler}>
            <input
                class='list__input'
                value={listName}
                placeholder='list name'
                onChange={(e) => setListName(e.target.value)}
            />
            <input class='list__btn' type='submit' value='create list' />
        </form>
    )
}
