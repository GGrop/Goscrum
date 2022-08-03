import React from 'react'
import {useState} from 'react'
export const Card = ({editCardStatus,deleteCard,data}) => {

    // console.log(data)

    const [showMore,setShowMore]= useState(false)
    const limitString=(str)=>{
        if(str.length>170)
        return {string: str.slice(0,167).concat("..."),addButton:true}
        return{string:str, addButton:false}
    }

    const dateTime=new Date(data.createdAt).toLocaleString() + "hs."

    return (
    <div className='card'>
                <div className='close' onClick={()=>deleteCard(data._id)}>x</div>
                <h3>{data.title}</h3>
                <h6> {dateTime}</h6> 
                <h5>{data.user.userName}</h5>
                <button
                    className={data.status.toLowerCase()}
                    type='button'
                    onClick={()=>editCardStatus(data)}
                >
                    {data.status.toLowerCase()}
                </button>
                <button className={data.importance.toLowerCase()} type='button'> {data.importance.toLowerCase()}</button>
                {showMore? (
                    <>
                        <p>{data.description}</p>
                        <button type='button' onClick={()=>{setShowMore(false)}}>Ver menos</button>
                    </>
                )
                :(
                    <p>{limitString(data.description).string}</p>
                )}
                {!showMore && limitString(data.description).addButton && (
                    <button type='button' onClick={()=>{setShowMore(true)}}>Ver mas</button>
                )}
                
    </div>
    )
}
