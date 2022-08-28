import React from 'react';
import CreateTask from './CreateTask';
import TaskCreated from './TaskCreated';

type Props = {
  userData: object
}

function Task (props: Props) {
  return (
    <div>
      <header className="App-header">
          To-Do App
        <CreateTask {...props}/>
        <div>
          <TaskCreated {...props}/>
        </div>
      </header>
    </div>
  )
}

export default Task