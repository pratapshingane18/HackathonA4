import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OptionForm() {
  // Array to track form steps
  const formArray = [1, 2, 3];

  // State variables
  const [formNo, setFormNo] = useState(formArray[0]);
  const [state, setState] = useState({
    name: '',
    prn: '',
    email: '',
    batch: '',
    dept: '',
    choice1: '',
    choice2: '',
    choice3: '',
    choice4: ''
  });

  // Handle input changes
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  // Go to the next form step
  const next = () => {
    if (formNo === 1 && state.name && state.prn && state.email) {
      setFormNo(formNo + 1);
    } else if (formNo === 2 && state.batch && state.dept) {
      setFormNo(formNo + 1);
    } else {
      toast.error('Please fill up all input fields');
    }
  };

  // Go to the previous form step
  const pre = () => {
    setFormNo(formNo - 1);
  };

  // Handle final form submission
  const finalSubmit = () => {
    if (state.choice1 && state.choice2 && state.choice3 && state.choice4) {
      toast.success('Form submitted successfully');
    } else {
      toast.error('Please fill up all input fields');
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-300 flex justify-center items-center">
      <ToastContainer />
      <div className="card w-[370px] rounded-md shadow-md bg-white p-5">
        <div className='flex justify-center items-center'>
          {/* Render form steps */}
          {
            formArray.map((v, i) => (
              <>
                <div
                  className={`w-[35px] my-3 text-white rounded-full ${formNo - 1 === i || formNo - 1 === i + 1 || formNo === formArray.length ? 'bg-blue-500' : 'bg-slate-400'} h-[35px] flex justify-center items-center`}
                >
                  {v}
                </div>
                {
                  // Render connector lines between form steps
                  i !== formArray.length - 1 && (
                    <div
                      className={`w-[85px] h-[2px] ${formNo === i + 2 || formNo === formArray.length ? 'bg-blue-500' : 'bg-slate-400'}`}
                    ></div>
                  )
                }
              </>
            ))
          }
        </div>
  
        


{
  formNo === 1 && (
    <div>
      <div className='flex flex-col mb-2'>
        <label htmlFor="name">Name</label>
        <input
          value={state.name}
          onChange={inputHandle}
          className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md'
          type="text"
          name='name'
          placeholder='name'
          id='name'
        />
      </div>
      <div className='flex flex-col mb-2'>
        <label htmlFor="prn">PRN</label>
        <input
          value={state.prn}
          onChange={inputHandle}
          className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md'
          type="text"
          name='prn'
          placeholder='prn'
          id='prn'
        />
      </div>

      <div className='flex flex-col mb-2'>
        <label htmlFor="email">Email</label>
        <input
          value={state.email}
          onChange={inputHandle}
          className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md'
          type="email"
          name='email'
          placeholder='email'
          id='email'
        />
      </div>

      


      <div className='mt-4 flex justify-center items-center'>
        <button
          onClick={next}
          className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'
        >
          Next
        </button>
      </div>
    </div>
  )
}
         

        {
          formNo === 2 && <div>
         

<div className='flex flex-col mb-2'>
            <label htmlFor="batch">Batch</label>
            <select
              value={state.batch}
              onChange={inputHandle}
              className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md'
              name='batch'
              id='batch'
            >
              <option value="">Select a batch</option>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
              <option value="Final Year">Final Year</option>
            </select>
          </div>



          

          <div className='flex flex-col mb-2'>
                  <label htmlFor="dept">Department</label>
                  <select
                    value={state.dept}
                    onChange={inputHandle}
                    className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md'
                    name='dept'
                    id='dept'
                  >
                    <option value="">Select a department</option>
                    <option value="civil">Civil</option>
                    <option value="electrical">Electrical</option>
                    <option value="mechanical">Mechanical</option>
                    <option value="electronics">Electronics</option>
                    <option value="cse">CSE</option>
                    <option value="it">IT</option>
                  </select>
                </div>

             <div className='mt-4 gap-3 flex justify-center items-center'>
              <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
              <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Next</button>
            </div>
          </div>
        }


        

{
  formNo === 3 && (
    <div>
      <div className='flex flex-col mb-2'>
        <label htmlFor="choice1">Choice 1</label>
        <select
          value={state.choice1}
          onChange={inputHandle}
          className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md'
          name='choice1'
          id='choice1'
        >
          <option value="">Select a subject</option>
          <option value="Computer networks">Computer networks</option>
          <option value="Operating system">Operating system</option>
          <option value="DBMS">DBMS</option>
          <option value="Data structure">Data structure</option>
        </select>
      </div>
      <div className='flex flex-col mb-2'>
        <label htmlFor="choice2">Choice 2</label>
        <select
          value={state.choice2}
          onChange={inputHandle}
          className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md'
          name='choice2'
          id='choice2'
          disabled={!state.choice1}
        >
          <option value="">Select a subject</option>
          {state.choice1 !== 'Computer networks' && <option value="Computer networks">Computer networks</option>}
          {state.choice1 !== 'Operating system' && <option value="Operating system">Operating system</option>}
          {state.choice1 !== 'DBMS' && <option value="DBMS">DBMS</option>}
          {state.choice1 !== 'Data structure' && <option value="Data structure">Data structure</option>}
        </select>
      </div>
      <div className='flex flex-col mb-2'>
        <label htmlFor="choice3">Choice 3</label>
        <select
          value={state.choice3}
          onChange={inputHandle}
          className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md'
          name='choice3'
          id='choice3'
          disabled={!state.choice2}
        >
          <option value="">Select a subject</option>
          {state.choice1 !== 'Computer networks' && state.choice2 !== 'Computer networks' && <option value="Computer networks">Computer networks</option>}
          {state.choice1 !== 'Operating system' && state.choice2 !== 'Operating system' && <option value="Operating system">Operating system</option>}
          {state.choice1 !== 'DBMS' && state.choice2 !== 'DBMS' && <option value="DBMS">DBMS</option>}
          {state.choice1 !== 'Data structure' && state.choice2 !== 'Data structure' && <option value="Data structure">Data structure</option>}
        </select>
      </div>
      <div className='flex flex-col mb-2'>
        <label htmlFor="choice4">Choice 4</label>
        <select
          value={state.choice4}
          onChange={inputHandle}
          className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md'
          name='choice4'
          id='choice4'
          disabled={!state.choice3}
        >
          <option value="">Select a subject</option>
          {state.choice1 !== 'Computer networks' && state.choice2 !== 'Computer networks' && state.choice3 !== 'Computer networks' && <option value="Computer networks">Computer networks</option>}
          {state.choice1 !== 'Operating system' && state.choice2 !== 'Operating system' && state.choice3 !== 'Operating system' && <option value="Operating system">Operating system</option>}
          {state.choice1 !== 'DBMS' && state.choice2 !== 'DBMS' && state.choice3 !== 'DBMS' && <option value="DBMS">DBMS</option>}
          {state.choice1 !== 'Data structure' && state.choice2 !== 'Data structure' && state.choice3 !== 'Data structure' && <option value="Data structure">Data structure</option>}
        </select>
      </div>

      <div className='mt-4 gap-3 flex justify-center items-center'>
        <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
        <button onClick={finalSubmit} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Submit</button>
      </div>
    </div>
  )
}






      </div>
    </div>
  );
}

export default OptionForm;
