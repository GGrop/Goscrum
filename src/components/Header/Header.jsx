import "./HeaderStyles.css"

import {useNavigate} from "react-router-dom"
import React from 'react'
import {useSelector} from "react-redux"


export const Header = () => {

    const navigate=useNavigate()
    const teamID= localStorage.getItem("teamID")
    const {tasks}=useSelector(state=>{
        return state.tasksReducer
    })

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        navigate("/login", {replace:true})
    }

    return (
        <header>
            <h4 className="pointer" onClick={()=>navigate("/"+teamID, {replace:true})}>Go Scrum</h4>
            <div className="wrapper_right_header">
                <button className="donar" onClick={()=>navigate("/donate", {replace:true})}>Donar!</button>
                <div className="spacing">Tareas creadas:{tasks?.length}</div>
                <div>{localStorage.getItem("userName")}</div>
                <div onClick={handleLogout} className="close">x</div>
            </div>
        </header>
    )
}
