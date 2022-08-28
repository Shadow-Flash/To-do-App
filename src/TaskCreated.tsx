import React, {useEffect, useState} from 'react'
import {supabase} from "./util/supaBaseClient";
type Props = {
    userData?: {
        id?: string
    }
}

function TaskCreated(props: Props) {

    const [fetchData, setFetchData] = useState<any>([]);
    const [openUpdate, setOpenUpdate] = useState<any>(false);
    useEffect(() => {
        getCreatedTasks()
    },[fetchData])

    async function getCreatedTasks() {
        try {
            const { data, error } =
            await supabase
            .from('tasks')
            .select('*')
            setFetchData(data);
            if (error) console.error(error);
        }
        catch (e) {
            console.error("Error while fetching tasks: ",e);
        }
    }

    async function handleDeleteTask(e: any,value:any) {
        try {
            const { data, error } = await supabase
            .from('tasks')
            .delete()
            .match({ id: value.id });
            console.log("Deleted!");
            if(data) console.log(data);
            if(error) console.error(error);
        }
        catch (e) {
            console.error("Error while fetching tasks: ",e);
        }
    }

    function handleUpdateTask(e: any,value:any) {
        setOpenUpdate(!openUpdate);
    }

  return (
    <>
        <div style={{fontSize: 'smaller', margin: '1.5rem' }}>Task Created</div>
        <ul>
            {
                fetchData.map((value: any,id: any) => {
                    return (
                    <>
                        <li key={value.id} style={{display: 'flex', flexDirection: 'column'}}> 
                            <div style={{textAlign: 'left'}}>
                                {value.id+" - "+value.heading}
                                <button style={{margin: '0 0 5px 1rem', fontSize:'x-small', cursor: 'pointer'}} onClick={(e) => handleDeleteTask(e,value)}>Delete</button>
                            </div>
                            <div style={{textAlign: 'left', fontSize: 'x-small', paddingLeft: '1rem' }}>{value.created_at}</div>
                            <div style={{textAlign: 'left', padding: '0 1rem 1rem 1rem', fontSize: 'smaller'}}>{value.description}</div>
                        </li> 
                    </>
                    )
                })
            }
        </ul>
    </>
  )
}

export default TaskCreated