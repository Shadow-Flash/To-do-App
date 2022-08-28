import React, { useState } from 'react';
import {supabase} from "./util/supaBaseClient";
type Props = {
    userData?: {
        user?: {
            id?: string
        }
    }
}

function CreateTask(props: Props) {

    const [data, setData] = useState({heading:'', description: '', user_id: props.userData!.user!.id});
    const [updateData, setUpdateData] = useState({id:'', heading:'', description: ''});

    function clearForm() {
        setData({heading:'', description: '', user_id: ''});
        setUpdateData({id:'',heading:'',description: ''});
    }

    function handleFieldInfo() {
        try {
            supabase
            .from('tasks')
            .insert([data])
            .then(() => {
                console.log('Inserted!')
            })
        }
        catch (e) {
            console.error("Error while Inserting: ",e);
        }
        clearForm();
    }

    async function handleUpdateTask() {
        try {
            const { data, error } = await supabase
            .from('tasks')
            .update({ heading: updateData.heading, description: updateData.description})
            .eq( 'id', updateData.id );
            if(data) console.log(data);
            if(error) console.error(error);
        }
        catch (e) {
            console.error("Error while Inserting: ",e);
        }
        clearForm();
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        if(e.target.name === 'heading')
            setData({...data, heading:e.target.value})
        else
            setData({...data, description:e.target.value})
    }
    
    function handleUpdateChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        if(e.target.name === 'heading')
            setUpdateData({...updateData, heading:e.target.value})
        else if (e.target.name === 'description')
            setUpdateData({...updateData, description:e.target.value})
        else
            setUpdateData({...updateData, id:e.target.value})
    }

    return (
        <div style={{display: 'flex'}}>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <div style={{fontSize: 'smaller', margin: '1.5rem' }}>Create Task</div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '1rem'}}>
                    <label htmlFor='heading' style={{fontSize: 'medium', margin: '10px' }}>Task Heading:</label>
                    <input id='heading' name='heading' placeholder={"Heading of the task"} value={data.heading} type="text" onChange={(e) => handleInputChange(e)} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', margin: '1rem'}}>
                    <label htmlFor='description' style={{fontSize: 'medium', margin: '10px' }}>Task Description:</label>
                    <input id='description' name='description' placeholder={"Description of the task"} value={data.description} type="textarea" onChange={(e) => handleInputChange(e)} />
                </div>
                <button onClick={() => handleFieldInfo()}>Submit</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin:' 0 0 4rem 10rem'}}>
                <div style={{fontSize: 'smaller', margin: '1.5rem' }}>Update Task</div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '1rem'}}>
                    <label htmlFor='id' style={{fontSize: 'medium', margin: '10px' }}>Task Id:</label>
                    <input id='id' name='id' placeholder={"Heading of the task"} value={updateData.id} type="text" onChange={(e) => handleUpdateChange(e)} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '1rem'}}>
                    <label htmlFor='heading' style={{fontSize: 'medium', margin: '10px' }}>Task Heading:</label>
                    <input id='heading' name='heading' placeholder={"Heading of the task"} value={updateData.heading} type="text" onChange={(e) => handleUpdateChange(e)} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', margin: '1rem'}}>
                    <label htmlFor='description' style={{fontSize: 'medium', margin: '10px' }}>Task Description:</label>
                    <input id='description' name='description' placeholder={"Description of the task"} value={updateData.description} type="textarea" onChange={(e) => handleUpdateChange(e)} />
                </div>
                <button onClick={() => handleUpdateTask()}>Update</button>
            </div>
        </div>
    )
}

export default CreateTask;