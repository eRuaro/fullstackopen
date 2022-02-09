import axios from "axios";

// from part3
const baseUrl = "/api/notes";

const getAll = () => {
    const request = axios.get(baseUrl);
    // const nonExisting = {
    //     id: 100,
    //     content: 'Not saved',
    //     date: '2019-05-30T17:30:31.098Z',
    //     important: true,
    // }

    // nonExisting doesn't exist on the server and thus cannot be edited
    return request.then(response => response.data);
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

export default {
    getAll: getAll,
    create: create,
    update: update
}