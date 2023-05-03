import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './Pages/Home/App'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Error from './Component/Error/Error'
import List, {loader as listLoader} from './Pages/List/List'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
    },
    {
        path: 'list/:listId',
        element: <List />,
        errorElement: <Error />,
        loader: listLoader,
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
