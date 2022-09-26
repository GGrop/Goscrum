import './TasksStyles.css'
import 'react-loading-skeleton/dist/skeleton.css'

import React, {useEffect,useState} from 'react'
import { Header } from '../../Header/Header'
import {useResize} from '../../../hooks/useResize'
import {Card} from '../../Card/Card'
import {TaskForm} from '../../TaskForm/TaskForm'
import Skeleton from 'react-loading-skeleton'
import debounce from "lodash.debounce"

import {Radio,RadioGroup,FormControlLabel,FormControl} from '@mui/material';

import {useSelector, useDispatch} from "react-redux"
import {getTasks,deleteTask,editTaskStatus} from "../../../store/actions/tasksActions"
import { Registered } from '../Registered/Registered'


export const Tasks = () => {

  const [list,setList]= useState(null)
  const[renderList,setRenderList]=useState(null)
  const[tasksFromWho,setTasksFromWho]=useState("ALL")
  const[search,setSearch]=useState("")
  const {isPhone}=useResize()
  const dispatch= useDispatch()

  const {loading,tasks,error}=useSelector(state=>{
    return state.tasksReducer
  })


  useEffect(()=>{
    dispatch(getTasks(tasksFromWho==="ME" ? "/me": ""))
  },[tasksFromWho])


  useEffect(()=>{
    if(tasks?.length){
      setList(tasks)
      setRenderList(tasks)
    }
  },[tasks])

  useEffect(()=>{
    if(search){
      setRenderList(
        list.filter(data=>data.title.startsWith(search))
      )
    }else{
      setRenderList(list)
    }
  },[search])

  if(error) return <div>Ups! hubo un error</div>

  const renderAllCards=()=>{
    return renderList?.map(data=>
      <Card
        key={data._id}
        data={data}
        deleteCard={handleDelete}
        editCardStatus={handleEditCardStatus}
      />
    )
  }

  const renderColumnCards=(value)=>{
    return renderList?.filter(data=>
      data.status===value).map(data=>
        <Card
          key={data._id}
          data={data}
          deleteCard={handleDelete}
          editCardStatus={handleEditCardStatus}
        />
      )
  }

  const handleChangeImportance=(event)=>{
    const importance= event.currentTarget.value
    if(importance==="ALL"){
      setRenderList(list)
    }else{
      setRenderList(
        list.filter(data=>data.importance===importance)
        )
    }
  }

  const handleChangeSearch= debounce(event=>{
    setSearch(event?.target.value)
  },0)


  const handleDelete=(id)=> dispatch(deleteTask(id))

  const handleEditCardStatus=(data)=>dispatch(editTaskStatus(data))

  return (
    <>
      <Header/>
      <Registered/>
      <main id="tasks">
        <TaskForm/>
        <section className='wrapper_list'>
          <div className='list_header'>
            <h2>Mis tareas</h2>
          </div>
          <div className='filters'>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              onChange={(event)=>{setTasksFromWho(event.currentTarget.value)}}
            >
              <FormControlLabel
                value="ALL"
                control={<Radio/>}
                label="Todas"
              />
              <FormControlLabel
                value="Me"
                control={<Radio/>}
                label="Mis Tareas"
              />
            </RadioGroup>
          </FormControl>
          <div className='search'>
            <input
              type="text"
              placeholder='Buscar por titulo...'
              onChange={handleChangeSearch}
            />
          </div>
            <select name="importance" onChange={handleChangeImportance}>
              <option value="">Seleccionar una prioridad</option>
              <option value="ALL">Todas</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </div>
          {isPhone ? (
            !renderList?.length?(
              <div>No hay Tareas Creadas</div>
            ): loading?(
              <>
              <Skeleton height={90}/>
              <Skeleton height={90}/>
              <Skeleton height={90}/>
              </>
            ):(
              <div className='list phone'>{renderAllCards()}</div>
            )
          ) : (
          <div className='list_group'>
            {!renderList?.length ?(
              <div>No hay Tareas Creadas</div>
            ):loading?(
              <>
                <Skeleton height={90}/>
                <Skeleton height={90}/>
                <Skeleton height={90}/>
              </>
            ):(
              <>
                <div className='list'>
                  <h4>Nuevas:</h4>
                  {renderColumnCards("NEW")}
                </div>

                <div className='list'>
                  <h4>En Proceso:</h4>
                  {renderColumnCards("IN PROGRESS")}
                </div>

                <div className='list'>
                  <h4>Finalizadas:</h4>
                  {renderColumnCards("FINISHED")}
                </div>
              </>
            )
            }
          </div>
          )
        }
        </section>
      </main>
    </>
  )
}