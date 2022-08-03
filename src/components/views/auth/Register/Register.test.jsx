import { render, screen } from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {Register} from './Register'

const {REACT_APP_API_ENDPOINT:API_ENDPOINT}= process.env

const server = setupServer(
    rest.get(`https://goscrum-api.alkemy.org/auth/data`,(_,res,ctx)=>{

    // rest.get(`${API_ENDPOINT}auth/data`,(_,res,ctx)=>{
        return res(
            ctx.json({
                result: {
                    continente: ["America","Europa","Otro"],
                    region: ["Otro","Latam","Brasil","America del Norte"],
                    Rol: ["Team Member","Team Leader"]
                },
            })
        )
    })
) 

beforeAll(()=> server.listen())
afterAll(()=> server.close())

it("fetch option",async()=>{
    render(<Register/>,{wrapper:MemoryRouter})

    expect(
        screen.getByRole("option",{name:"Seleccionar Rol"})
    ).toBeInTheDocument()

    expect(
        await screen.findByRole("option",{name:"Europa"})
    ).toBeInTheDocument()
})
