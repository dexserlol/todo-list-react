import {useEffect, useState} from 'react'
import './Toast.scss'
export default function Toast(props) {
    const [text, setText] = useState('')
    const [disable, setDisable] = useState(false)
    useEffect(() => {
        if (!props.text) return
        setText(props.text)
        let timer2 = setTimeout(() => {
            setDisable(true)
        }, 2700)
        let timer = setTimeout(() => {
            setText('')
            setDisable(false)
            props.setText('')
        }, 3000)

        return () => {
            clearTimeout(timer)
            clearTimeout(timer2)
        }
    }, [props.text])
    if (!text) {
        return <div class='toast'></div>
    }
    return <div class={`toast active ${disable ? 'disable' : ''}`}>{text}</div>
}
