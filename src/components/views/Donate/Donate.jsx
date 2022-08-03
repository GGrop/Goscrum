import './DonateStyles.css'

import React from 'react'
import { Header } from '../../Header/Header'

export const Donate = () => {
    return (
    <div>
        <Header/>
        <div id="donate">
            <h1>Colabora con el proyecto!</h1>
            <p>Simplemente tocando en Donar</p>
            <a href="https://mpago.la/1eoBvzQ" target="_blank" rel="noreferrer">Donar</a>
        </div>
    </div>
    )
}
