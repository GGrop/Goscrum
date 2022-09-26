import '../AuthStyles.css';

import React,{useState,useEffect} from 'react'
import {useFormik} from 'formik'
import {Link} from 'react-router-dom'
import * as Yup from "yup"
import {v4 as uuidv4} from "uuid"
import {Switch,FormControlLabel} from "@mui/material"
import {useNavigate} from 'react-router-dom'

const {REACT_APP_API_ENDPOINT}=process.env

export const Register = () => {


    const [data, setData] = useState()
    const navigate=useNavigate()

    useEffect(()=>{
        fetch(`${REACT_APP_API_ENDPOINT}auth/data`).then(response=>response.json()
        .then(data=>setData(data.result)))
    },[])


    const initialValues={
        userName:"",
        email:"",
        password:"",
        teamId:"",
        role:"",
        continent:"",
        region:"",
        switch:false,
    }

    const required= "* Campo obligatorio"

    const validationSchema =()=> 
    Yup.object().shape({
        userName: Yup.string()
            .min(3, "La cantidad minima de caracteres es 3")
            .required(required),
            password:Yup.string().required(required),
            email:Yup.string().email("debe ser un email valido").required(required),
        role:Yup.string().required(required),
        continent:Yup.string().required(required),
        region:Yup.string().required(required),
    })

    const handleChangeContinent=value=>{
        setFieldValue('continent',value)
        if(value!=="America") setFieldValue('region','Otro')
    }


    const onSubmit = () => {
        const teamID = !values.teamID? uuidv4(): values.teamID
        fetch(`${REACT_APP_API_ENDPOINT}auth/register`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                user:{
                    userName:values.userName,
                    password:values.password,
                    email:values.email,
                    teamID,
                    role:values.role,
                    continent:values.continent,
                    region:values.region,
                },
            }),
        }).then(response=>response.json())
        .then(data=>
            navigate("/login",{replace:true,})
        )
    };
    const formik = useFormik({ initialValues,validationSchema, onSubmit})
    
    const {
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        handleBlur,
        setFieldValue
    } = formik
    // console.log(errors)
    // console.log(values)

    return (
        <div className='auth'>
            <form onSubmit={handleSubmit}>
                <h1>Registro</h1>

                <div>
                    <label>Nombre de Usuario</label>
                    <input
                        type="text"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.userName && touched.userName ? "error" : ""}
                        placeholder="Nombre de Usuario"
                    />
                    {errors.userName && touched.userName && (
                        <div>{errors.userName}</div>
                    )}
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email ? "error" : ""}
                        placeholder="Email"
                    />
                    {errors.email && touched.email && (
                        <div>{errors.email}</div>
                    )}
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
                        placeholder="contraseña"
                    />
                    {errors.password && touched.password && (
                        <div>{errors.password}</div>
                    )}
                </div>

                <div>
                    <label>Rol</label>
                    <select
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.role && touched.role ? "error" : ""}
                    >
                        <option value="">Seleccionar Rol</option>
                        {data?.Rol?.map(option=>(
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    {errors.role && touched.role && (
                        <div>{errors.role}</div>
                    )}
                </div>

                <div>
                    <label>Continent</label>
                    <select
                        name="continent"
                        value={values.continent}
                        onChange={event=>handleChangeContinent(event.currentTarget.value)}
                        onBlur={handleBlur}
                        className={errors.continent && touched.continent ? "error" : ""}
                    >
                        <option value="">Seleccionar Continente</option>
                        {data?.continente?.map(option=>(
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    {errors.continent && touched.continent && (
                        <div>{errors.continent}</div>
                    )}
                </div>
                {values.continent == "America" && (
                    <div>
                        <label>Region</label>
                        <select
                            name="region"
                            value={values.region}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.region && touched.region ? "error" : ""}
                        >
                            <option value="">Seleccionar Region</option>
                            {data?.region?.map(option=>(
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {errors.region && touched.region && (
                            <div>{errors.region}</div>
                        )}
                    </div>
                )}
                <FormControlLabel
                    control={
                        <Switch
                            value={values.switch}
                            onChange={()=>
                            formik.setFieldValue("switch", !formik.values.switch)
                        }
                        name="switch"
                        color="primary"
                        />
                    }
                    label="Perteneces a un equipo ya creado"
                />
                {values.switch && (
                    <div>
                        <label>Porfavor intruzca el indentificador de equipo</label>
                        <input
                            type="text"
                            name="teamID"
                            value={values.teamID}
                            onChange={handleChange}
                        />
                    </div>
                )}

                <div>
                    <button type="submit"> Enviar</button>
                </div>
                <div>
                    <Link to='/login'>Iniciar sesión</Link>
                </div>
            </form>
        </div>
    )
}

