import React, { useState, useEffect } from 'react';

const App = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [mainTask, setMainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDesc, setEditedDesc] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks && storedTasks.length > 0) {
      setMainTask(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(mainTask));
  }, [mainTask]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() !== '' && desc.trim() !== '') {
      setMainTask([...mainTask, { title, desc }]);
      setTitle('');
      setDesc('');
    }
  };

  const deleteHandler = (i) => {
    const updatedTasks = mainTask.filter((_, index) => index !== i);
    setMainTask(updatedTasks);
  };

  const editTask = (i) => {
    setEditIndex(i);
    setEditedTitle(mainTask[i].title);
    setEditedDesc(mainTask[i].desc);
  };

  const saveEdit = () => {
    const updatedTasks = [...mainTask];
    updatedTasks[editIndex].title = editedTitle;
    updatedTasks[editIndex].desc = editedDesc;
    setMainTask(updatedTasks);
    setEditIndex(null);
  };

  return (
    <>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>My to do list</h1>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          className='text-2x1 border-2 border-purple-500 m-5 px-4 py-2'
          placeholder='Enter title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          className='text-2x1 border-purple-500 border-2 m-5 px-4 py-2'
          placeholder='Enter Description here'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit" className='bg-violet-500 px-4 py-2 text-2X1 font-bold rounded m-5'>Add Task</button>
      </form>
      <hr />
      <div className='p-8 bg-violet-400'>
        {mainTask.length > 0 ? (
          <ul>
            {mainTask.map((t, i) => (
              <li key={i} className='flex items-center justify-between mb-6'>
                {editIndex === i ? (
                  <div className='flex items-center justify-between w-2/3'>
                    <input
                      type='text'
                      className='text-2x1 border-2 border-purple-500 m-5 px-4 py-2'
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <input
                      type='text'
                      className='text-2x1 border-purple-500 border-2 m-5 px-4 py-2'
                      value={editedDesc}
                      onChange={(e) => setEditedDesc(e.target.value)}
                    />
                    <button onClick={saveEdit} className='bg-green-500 px-4 py-2 text-white font-bold rounded m-5'>
                      Save
                    </button>
                  </div>
                ) : (
                  <div className='flex items-center justify-between w-2/3'>
                    <h3 className='text-2x1 font-semibold'>{t.title}</h3>
                    <h6 className='text-x1 font-medium'>{t.desc}</h6>
                  </div>
                )}
                <div>
                  <button onClick={() => editTask(i)} className='bg-blue-500 px-4 py-2 text-white font-bold rounded mr-4'>
                    Edit
                  </button>
                  <button onClick={() => deleteHandler(i)} className='bg-red-500 px-4 py-2 text-white font-bold rounded'>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <h2>No Task Available</h2>
        )}
      </div>
    </>
  );
};

export default App;
