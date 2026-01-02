import * as React from 'react';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddTodo, CompletedTask, DeleteTodo, EditTodo } from "./reducers/reducers";
import Box from '@mui/material/Box';
import { CirclePlus } from "lucide-react";
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

export default function App() {
  const [input,setInput]=useState("")
  const [inputSearch,setInputSearch]=useState("")
  const [status,setStatus]=useState("")
  const [open, setOpen] = React.useState(false);
  const [inputEdit,setInputEdit]=useState("")
  const [idx,setIdx]=useState(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const todoList=useSelector(store=>store.todoList.todo)
  const disPatch=useDispatch()


  const defaultProps = {options: todoList,getOptionLabel: (option) => option};
  const flatProps = {options: todoList.map(item => item.title)};

useEffect(()=>{
  localStorage.setItem("Todo",JSON.stringify(todoList))
},[todoList])

  return (
    <Box className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <Box className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <Typography variant="h5" className="text-2xl font-bold text-center mb-6 text-gray-800">TodoList</Typography>
         <Box className="flex flex-col sm:flex-row gap-2 mb-4">
          <TextField value={input} onChange={(ev)=>setInput(ev.target.value)} id="standard-basic" label="enter title..." variant="standard" className="flex-1  border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <Button onClick={()=>{
            if(input.trim()!==""){
              disPatch(AddTodo(input))
              setInput("")
            }
          }} variant="contained" className="px-4 py-2 flex justify-center gap-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">Add <CirclePlus /></Button>
         </Box>
          <Box className="flex flex-col sm:flex-row gap-2 mb-4">
            <Stack className='flex-1 px-3 py-2'>
               <Autocomplete freeSolo options={todoList.map(e=>e.title)} value={inputSearch}
               onInputChange={(e,newInputValue)=>setInputSearch(newInputValue)}
               renderInput={(params)=><TextField {...params} label="search task..." variant='standard'/>}
               />
            </Stack>
          <FormControl sx={{ m: 1, minWidth: 150 }} >
            <InputLabel id="status-label">Status</InputLabel>
             <Select value={status} onChange={ev=>setStatus(ev.target.value)} labelId="status-label" id="status" label="Status">
               <MenuItem value={"All"}>All</MenuItem>
               <MenuItem value={"Active"}>Active</MenuItem>
               <MenuItem value={"InActive"}>InActive</MenuItem>
             </Select>
          </FormControl>
        </Box>
        <Box className="space-y-3 max-h-96 overflow-y-auto">
          {todoList.filter(e=>{
            if(status==="Active"){
              return e.completed===true
            }else if(status==="InActive"){
              return e.completed===false
            }else{
              return e
            }
          }).filter(e=>e.title.toLowerCase().includes(inputSearch.toLowerCase().trim()))
          .map(e=>(
            <Box key={e.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
              <Box className="flex items-center flex-1 gap-2">
                <Typography className={e.completed?"line-through text-red-500 flex-1":"flex-1"}>{e.title}</Typography>
                <Checkbox checked={e.completed} onChange={()=>disPatch(CompletedTask(e.id))} {...label} defaultChecked color="success"  />
                <EditIcon onClick={()=>{
                  handleClickOpen()
                  setIdx(e.id)
                  setInputEdit(e.title)
                }} className='cursor-pointer text-orange-400' />
                <DeleteIcon onClick={()=>disPatch(DeleteTodo(e.id))} className='cursor-pointer text-red-400' />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
       <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" fullWidth maxWidth="sm">
        <Box className='flex items-center justify-between pr-10 pt-4'>
          <DialogTitle id="alert-dialog-title">{"Edit Todo Item"}</DialogTitle>
          <CloseIcon className='cursor-pointer' onClick={handleClose} />
        </Box>
        <DialogContent>
         <TextField value={inputEdit} onChange={ev=>setInputEdit(ev.target.value)} autoFocus margin="dense" id="name" label="Todo Title" type="text" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>Cancel</Button>
          <Button onClick={()=>{
            if(inputEdit.trim()!==""&& idx!==null){
              disPatch(EditTodo({id:idx,title:inputEdit}))
              handleClose()
              setInputEdit("")
              setIdx(null)
            }
          }} autoFocus variant='contained'>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
