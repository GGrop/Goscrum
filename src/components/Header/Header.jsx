
import {useNavigate} from "react-router-dom"
import React from 'react'
import {useSelector} from "react-redux"

import "./HeaderStyles.css"

export const Header = () => {

    const navigate=useNavigate()
    const {tasks}=useSelector(state=>{
        return state.tasksReducer
    })

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        localStorage.removeItem("teamID")
        navigate("/login", {replace:true})
    }

    return (
        <header>
            <div>
                <img src="https://imgur.com/KPXR8Tg" alt="" />
                <h4 className="pointer" onClick={()=>navigate("/", {replace:true})}>Go Scrum</h4>
            </div>
            <div className="wrapper_right_header">
                <button className="donar" onClick={()=>navigate("/donate", {replace:true})}>Donar!</button>
                <div className="spacing">Tareas creadas:{tasks?.length}</div>
                <div>{localStorage.getItem("userName")}</div>
                <div onClick={handleLogout} className="close">x</div>
            </div>
        </header>
    )
}
