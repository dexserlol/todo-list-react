class Model {
    url = 'https://todo-list-back-production.up.railway.app'

    async getUser(token) {
        const response = await fetch(this.url + '/user/getUser', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            //body: JSON.stringify()
        })
        return await response.json()
    }
    async Login(username, password) {
        const response = await fetch(this.url + '/user/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({username: username, password: password}),
        })
        return await response.json()
    }
    async register(username, password) {
        const response = await fetch(this.url + '/user/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                //Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({username: username, password: password}),
        })
        return await response.json()
    }
    async addList(name, token) {
        const response = await fetch(this.url + '/lists/addList', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({name: name}),
        })
        return await response.json()
    }
    async getList(token) {
        const response = await fetch(this.url + '/lists/getList', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
        return await response.json()
    }
    async removeList(id, token) {
        const response = await fetch(this.url + '/lists/removeList', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({id: id}),
        })
        return await response.json()
    }
    async findList(token) {
        const response = await fetch(this.url + '/lists/findList', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
        return await response.json()
    }
    async addTodo(content, id, token) {
        const response = await fetch(this.url + '/todo/addTodo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({content: content, id: id, active: false}),
        })
        return await response.json()
    }
    async getTodo(id, token) {
        const response = await fetch(this.url + '/todo/getTodo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({id: id}),
        })
        return await response.json()
    }
    async todoCheck(id, token) {
        const response = await fetch(this.url + '/todo/TodoActive', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({id: id}),
        })
        return await response.json()
    }
    async removeTodo(id, token) {
        const response = await fetch(this.url + '/todo/TodoRemove', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':
                    'Origin, X-Requested-With, Content-Type, Accept',
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({id: id}),
        })
        return await response.json()
    }
}

export default new Model()
