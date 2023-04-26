import {useRouteError} from 'react-router-dom'
import './Error.scss'
export default function Error(props) {
    const error = useRouteError()
    return (
        <section class='section__error'>
            <div class='error'>
                <h1 class='error__title'>Error</h1>
                <p class='error__text'>{error.statusText || error.message}</p>
            </div>
        </section>
    )
}
