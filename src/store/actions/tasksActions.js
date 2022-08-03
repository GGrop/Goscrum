//las acciones tienen un tipo y un payload q es opcional


import { TASKS_FAILURE,TASKS_SUCCESS,TASKS_REQUEST } from "../types"

const {REACT_APP_API_ENDPOINT:API_ENDPOINT}= process.env

export const tasksRequest = ()=> ({
    type: TASKS_REQUEST,
})

export const tasksSuccess = (data)=> ({
    type: TASKS_SUCCESS,
    payload: data,
})

export const tasksFailure = (error)=> ({
    type: TASKS_FAILURE,
    payload: error,
})

export const getTasks = (path)=> dispatch =>{
    dispatch(tasksRequest()) //despachamos tasksrequest q lo q va a hacer es generar el loading poniendolo en true
    fetch(`${API_ENDPOINT}task/${path}`,{ //llamado a la API
        headers: {'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("token")
    },
    })
        .then(response=>response.json()) 
        .then(data=>dispatch(tasksSuccess(data.result))) //si da bien la respuesta despachamos  el dato en la funcion
        .catch(error=>dispatch(tasksFailure(error))) //si da MAL despachamos el error
    
}


export const deleteTask = (id)=> dispatch =>{
    dispatch(tasksRequest()) //despachamos tasksrequest q lo q va a hacer es generar el loading poniendolo en true
    fetch(`${API_ENDPOINT}task/${id}`,{ //llamado a la API
        method:"DELETE",
        headers: {'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("token")
    },
    })
        .then(response=>response.json()) 
        .then(()=>dispatch(getTasks(""))) //si da bien la respuesta despachamos  el dato en la funcion
        .catch(error=>dispatch(tasksFailure(error))) //si da MAL despachamos el error
    
}

export const editTaskStatus = (data)=> dispatch =>{
    const statusArray=["NEW","IN PROGRESS","FINISHED",]
    const newStatusIndex=
        statusArray.indexOf(data.status) >1
            ? 0 :
        statusArray.indexOf(data.status)+1

    fetch(`${API_ENDPOINT}task/${data._id}`,{ //llamado a la API
        method:"PATCH",
        headers: {'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("token")
    },
    body:JSON.stringify({
        "task":{
            "title":data.title,
            "importance":data.importance,
            "status":statusArray[newStatusIndex],
            "description":data.description
        }
    })
    })
        .then(response=>response.json()) 
        .then(()=>dispatch(getTasks(""))) //si da bien la respuesta despachamos  el dato en la funcion
        .catch(error=>dispatch(tasksFailure(error))) //si da MAL despachamos el error
    
}