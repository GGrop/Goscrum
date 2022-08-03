import './TaskFormStyles.css'
import "react-toastify/dist/ReactToastify.css"

import React from 'react'
import {useFormik} from 'formik'
import * as Yup from "yup"
import {ToastContainer, toast} from 'react-toastify'

const {REACT_APP_API_ENDPOINT:API_ENDPOINT}=process.env


export const TaskForm = () => {
    const initialValues={
        title:"",
        status:"",
        importance:"",
        description:"",
    }


    const onSubmit = () => {

        fetch(`${API_ENDPOINT}task`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                Authorization:"Bearer " + localStorage.getItem("token"),
            },
            body:JSON.stringify({task:values}),
        }).then(response=>response.json())
        .then(data=>{
            resetForm()
            toast("Creaste una Tarea")
        })
    }

    const required= "* Campo obligatorio"

    const validationSchema =()=> 
    Yup.object().shape({
        title: Yup.string()
            .min(6, "La cantidad minima de caracteres es 6")
            .required(required),
        status:Yup.string().required(required),
        importance:Yup.string().required(required),
        description:Yup.string().required(required),
    })

    const formik = useFormik({ initialValues,validationSchema, onSubmit})

    const {
        handleSubmit,
        handleChange,
        errors,
        touched,
        handleBlur,
        values,
        resetForm
    } = formik

    return (
        <section className="task-form">
            <h2>Crear Tarea</h2>
            <p>Crea tus tareas</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Titulo..."
                        className={errors.title && touched.title ? "error" : ""}
                        value={values.title}
                    />
                        {errors.title && touched.title && (
                            <span className='error-message'>{errors.title}</span>
                        )}
                    </div>
                    <div>
                        <select
                            name="status"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.status && touched.status ? "error" : ""}
                            value={values.status}
                        >
                            <option value="">Seleccionar un estado</option>
                            <option value="NEW">New</option>
                            <option value="IN PROGRESS">En proceso</option>
                            <option value="FINISHED">Terminada</option>
                        </select>
                        {errors.status && touched.status && (
                            <span className='error-message'>{errors.status}</span>
                        )}
                    </div>
                    <div>
                        <select
                            name="importance"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.importance && touched.importance ? "error" : ""}
                            value={values.importance}
                        >
                            <option value="">Seleccionar prioridad</option>
                            <option value="LOW">baja</option>
                            <option value="MEDIUM">media</option>
                            <option value="HIGH">alta</option>
                        </select>
                        {errors.importance && touched.importance && (
                            <span className='error-message'>{errors.importance}</span>
                        )}
                    </div>
                </div>
                <div>
                    <textarea
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Descripcion..."
                        className={errors.description && touched.description ? "error" : ""}
                        value={values.description}
                    />
                    {errors.description && touched.description && <span className='error-message'>{errors.description}</span>}
                </div>
                <button type='submit'>Crear</button>
            </form>
            <ToastContainer/>
        </section>
    )
}
