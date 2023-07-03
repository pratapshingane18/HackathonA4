import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function OptionForm() {
  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0])
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
  })
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  const next = () => {
    if (formNo === 1 && state.name && state.prn && state.email) {
      setFormNo(formNo + 1)
    }
    else if (formNo === 2 && state.batch && state.dept ) {
      setFormNo(formNo + 1)
    } else {
      toast.error('Please fillup all input field')
    }
  }
  const pre = () => {
    setFormNo(formNo - 1)
  }
  const finalSubmit = () => {
    if (state.choice1 && state.choice2 && state.choice3 && state.choice4) {
      toast.success('form submit success')
    } else {
      toast.error('Please fillup all input field')
    }
  }
  return (
    <div className="w-screen h-screen bg-slate-300 flex justify-center items-center">
      <ToastContainer />
      <div className="card w-[370px] rounded-md shadow-md bg-white p-5">
        <div className='flex justify-center items-center'>
          {
            formArray.map((v, i) => <><div className={`w-[35px] my-3 text-white rounded-full ${formNo - 1 === i || formNo - 1 === i + 1 || formNo === formArray.length ? 'bg-blue-500' : 'bg-slate-400'} h-[35px] flex justify-center items-center`}>
              {v}
            </div>
              {
                i !== formArray.length - 1 && <div className={`w-[85px] h-[2px] ${formNo === i + 2 || formNo === formArray.length ? 'bg-blue-500' : 'bg-slate-400'}`}></div>
              }
            </>)
          }
        </div>
        {/* {
          formNo === 1 && <div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="name">Name</label>
              <input value={state.name} onChange={inputHandle} className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md' type="text" name='name' placeholder='name' id='name' />
            </div>
            <div className='flex flex-col mb-2'>
              
                <label htmlFor="dept">Dept</label>
              <input value={state.dept} onChange={inputHandle} className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md' type="text" name='dept' placeholder='dept name' id='dept' />
               
 

               
               
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="batch">Batch</label>
              <input value={state.batch} onChange={inputHandle} className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md' type="number" name='batch' placeholder='batch' />
            </div>
            <div className='mt-4 flex justify-center items-center'>
              <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Next</button>
            </div>
          </div>
        } */}


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

      


      {/* <div className='flex flex-col mb-2'>
        <label htmlFor="batch">Batch</label>
        <input
          value={state.batch}
          onChange={inputHandle}
          className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md'
          type="number"
          name='batch'
          placeholder='batch'
        />
      </div> */}
      {/* <div className='flex flex-col mb-2'>
        <label htmlFor="place">Place</label>
        <select
          value={state.place}
          onChange={inputHandle}
          className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md'
          name='place'
          id='place'
        >
          <option value="">Select a place</option>
          <option value="mumbai">Mumbai</option>
          <option value="delhi">Delhi</option>
          <option value="bangalore">Bangalore</option>
        </select>
      </div> */}
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
            {/* <div className='flex flex-col mb-2'>
              <label className='text-slate-500' htmlFor="varsity">Varsity</label>
              <input value={state.varsity} onChange={inputHandle} className='p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md' type="text" name='varsity' placeholder='varsity name' id='varsity' />
            </div> */}

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



            {/* <div className='flex flex-col mb-2'>
              <label className='text-slate-500' htmlFor="session">session</label>
              <input value={state.session} onChange={inputHandle} className='p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md' type="text" name='session' placeholder='session' id='session' />
            </div> */}

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



            {/* <div className='flex flex-col mb-2'>
              <label className='text-slate-500' htmlFor="address">Address</label>
              <textarea value={state.address} onChange={inputHandle} row='10' className='p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md' type="number" name='address' placeholder='address' ></textarea>
            </div> */}


            <div className='mt-4 gap-3 flex justify-center items-center'>
              <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
              <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Next</button>
            </div>
          </div>
        }

        {
          formNo === 3 && <div>



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
        >
          <option value="">Select a subject</option>
          <option value="Computer networks">Computer networks</option>
          <option value="Operating system">Operating system</option>
          <option value="DBMS">DBMS</option>
          <option value="Data structure">Data structure</option>
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
        >
          <option value="">Select a subject</option>
          <option value="Computer networks">Computer networks</option>
          <option value="Operating system">Operating system</option>
          <option value="DBMS">DBMS</option>
          <option value="Data structure">Data structure</option>
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
        >
          <option value="">Select a subject</option>
          <option value="Computer networks">Computer networks</option>
          <option value="Operating system">Operating system</option>
          <option value="DBMS">DBMS</option>
          <option value="Data structure">Data structure</option>
        </select>
      </div>




            {/* <div className='flex flex-col mb-2'>
              <label htmlFor="district">District</label>
              <input value={state.district} onChange={inputHandle} className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md' type="text" name='district' placeholder='district name' id='district' />
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="thana">Thana</label>
              <input value={state.thana} onChange={inputHandle} className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md' type="text" name='thana' placeholder='thana' id='thana' />
            </div>
            <div className='flex flex-col mb-2'>
              <label htmlFor="post">Post</label>
              <input value={state.post} onChange={inputHandle} className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md' type="text" name='post' placeholder='post' id='post' />
            </div> */}
            <div className='mt-4 gap-3 flex justify-center items-center'>
              <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
              <button onClick={finalSubmit} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Submit</button>
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default OptionForm;
