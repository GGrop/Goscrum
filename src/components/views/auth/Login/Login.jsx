import '../AuthStyles.css';


import React from 'react'

import {useNavigate, Link} from 'react-router-dom'
import {useFormik} from 'formik'
import * as Yup from "yup"
import { swal } from '../../../../utils/swal';


const {REACT_APP_API_ENDPOINT:API_ENDPOINT}=process.env

export const Login = () => {

    const navigate=useNavigate()

    const initialValues={
        userName:"",
        password:"",
    }

    const required= "* Campo obligatorio"

    const validationSchema =()=> 
    Yup.object().shape({
        userName: Yup.string()
            .min(3, "La cantidad minima de caracteres es 3")
            .required(required),
            password:Yup.string().required(required),
    })

    const onSubmit = () => {
        fetch(`${API_ENDPOINT}auth/login`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                    userName:values.userName,
                    password:values.password,
            }),
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.status_code === 200) {
                localStorage.setItem("token", data?.result?.token)
                localStorage.setItem("userName", data?.result?.user.userName)
                localStorage.setItem("teamID", data?.result?.user.teamID)
                navigate("/", {
                    replace:true,
                })
            }else{
                swal()
            }
        })
    }

    const formik = useFormik({ initialValues,validationSchema, onSubmit})

    const {
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        handleBlur
    } = formik

    return (
        <div className='auth'>
            <form onSubmit={handleSubmit}>
                <h1>Iniciar Sesion</h1>
                <div>
                    <label>Nombre de usuario</label>
                        <input type="text"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.userName && touched.userName ? "error" : ""}
                        />
                {errors.userName && touched.userName && <div>{errors.userName}</div>}
                </div>
                <div>
                    <label>Contraseña</label>
                        <input 
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password ? "error" : ""}
                        />
                {errors.password && touched.password && <div>{errors.password}</div>}
                </div>
                <button type="submit"> Enviar</button>
                <div>
                    <Link to='/register'>Registrarse</Link>
                </div>
            </form>
        </div>
    )
}