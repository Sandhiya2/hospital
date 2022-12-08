import './Billing.css';
import React, {useState,useEffect, useRef} from "react";
import {MdDelete} from "react-icons/md";
import {AiOutlineEdit} from "react-icons/ai"
import {v4 as uuidv4} from "uuid";
import ReactToPrint from "react-to-print";
const Billing = () => {

  const [showInvoice, setShowInvoice] = useState(false)
  const [patientName,setpatientName] = useState("")
  const [phone,setPhone] = useState("")
  const [patientAddress,setpatientAddress] = useState("")
  const [doctorName,setdoctorName] = useState("")
  const [invoiceNumber,setInvoiceNumber] = useState("")
  const [invoiceDate,setInvoiceDate] = useState("")
  const [particulars,setParticulars] = useState("")
  const [description, setDescription] =useState("")
  const [quantity, setQuantity] = useState("")
  const [rate, setrate] = useState("")
  const [amount, setAmount] = useState("")
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  const componentRef = useRef()


 const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
if (!description && !quantity && !rate) {

  alert("Fill all fields")
  
} else {
  const newitems = {
    id : uuidv4(),
    particulars,
    description,
    rate,
    quantity,
    amount,
  }
  setParticulars("")
  setDescription("")
  setrate("")
  setQuantity("")
  setAmount("")
  setList([...list,newitems])
  setIsEditing(false)
 }
}


useEffect(() => {
  const calculateAmount = (amount) => {
    setAmount(quantity * rate)
  }

  calculateAmount(amount)
}, [amount, rate, quantity, setAmount])

useEffect( () => {
let rows = document.querySelectorAll(".amount")
let sum = 0

for(let i =0; i < rows.length; i++){
  if(rows[i].className === "amount"){
  sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML)
  setTotal(sum)
  }
}
})


const editRow = (id) => {
  const editingRow = list.find((row) => row.id === id)
  setList(list.filter((row) => row.id !== id))
  setIsEditing(true)
  setDescription(editingRow.particulars)
  setDescription(editingRow.description)
  setQuantity(editingRow.quantity)
  setrate(editingRow.rate)
}

const deleteRow = (id) => 
  setList(list.filter((row) => row.id !== id))


    return (
      <div className="bill">
        <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
          {showInvoice ?( 
              <>
               <ReactToPrint trigger={() => <button className='bg-blue-500 text-white font-bold py-2 px-8 ml-5 rounded shadow border-2 border-blue-500
            hover:bg-transparent hover:text-blue-500 transition-all duration-300'>Print / Download</button>}
        content={() => componentRef.current} />
          <div ref={componentRef} className="p-5">
          <div className="billsection flex flex-col items-center justify-center">
          <h2 className="font-bold text-xl uppercase mb-1 md:text-4xl">velan hospital</h2>
          <p>MULTI SPECIALITY HOSPITAL</p>
          </div>
        <div className='billhead flex flex-col items-center justify-center mb-5 xl:flex-row xl:justify-between'>
            <div>
              <h2 className='font-bold uppercase tracking-wide text-2xl mb-3 mt-8 border-t-2 border-blue-300'>
                Final Bill</h2>
            </div>
   </div>
          
          <div className="billsection mt-6">
          <h2>Patient Name: <b>{patientName}</b></h2>
          <p>Contact No.: {phone}</p>
          <p>Address: {patientAddress}</p>
          <h2>Doctor: <b>{doctorName}</b></h2>
         
          </div>

          <div className='billdate flex items-end justify-end'>
            <ul>
              <li className='p-1'><span className='font-bold'>Bill number:</span>{invoiceNumber}</li>
              <li className='p-1 '><span className='font-bold'>Bill Date:</span>{invoiceDate}</li>
              
            </ul>
          </div>

        <div className='billtable mt-10'>
        <table width="100%" className="mb-10">
  <thead>
      <tr className='bg-gray-100 p-1'>
        <td className='font-bold' >Particulars</td>
        <td className='font-bold' >Description</td>
        <td className='font-bold' >Rate</td>
        <td className='font-bold' >Quantity</td>
        <td className='font-bold' >Net Amount</td>
        </tr>
      </thead>

    {list.map(({id, particulars, description, rate, quantity,amount}) =>(
    <React.Fragment key={id}>
      <tbody>
        <tr>
          <td>{particulars}</td>
          <td>{description}</td>
          <td>{rate}</td>
          <td>{quantity}</td>
          <td className='amount'>{amount}</td>
        </tr>
      </tbody>

    </React.Fragment>
    ))}
</table>

<div>
  <h2 className='flex items-end justify-end text-gray-800 text-2xl font-bold'>Total : Rs. {total.toLocaleString()}</h2>
</div>
        </div>

          <div className='billfooter border-t-2 border-gray-300 pt-5'>
            <ul className="flex flex-wrap items-center justify-center">
              <li><span className="font-bold">Velan Hospital, Anupparpalayam-Pudhur, Tiruppur |</span></li>
              <li><span className="font-bold"> 9800234522 |</span></li>
              <li><span className="font-bold">www.velanhospital.com</span></li>
            </ul>
          </div>
          </div>
          <button onClick={() => setShowInvoice (false)} 
          className="mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500
            hover:bg-transparent hover:text-blue-500 transition-all duration-300">Edit Information</button>

              </>
          ) : (
            <div className='billform'>
            <div className="flex flex-col justify-center">
             <article className='md:grid grid-cols-2 gap-10 md:mt-10'>
              <div className='flex flex-col'>
              <label htmlfor="patientName">Patient name</label>
            <input type="text" name="patientName" id="patientName" placeholder="patient Name" autoComplete='off' value={patientName}
            onChange={(e) => setpatientName(e.target.value)}/></div>
              <div className='flex flex-col'>
           <label htmlfor="phone">Mobile No.</label>
            <input type="number" name="phone" id="phone" placeholder="Phone" autoComplete='off' value={phone}
            onChange={(e) => setPhone(e.target.value)}/></div>
            </article>
            <article className='md:grid grid-cols-2 gap-10 md:mt-5'>
            <div className='flex flex-col'>
            <label htmlfor="patientAddress">Enter Address</label>
            <input type="text" name="patientAddress" id="patientAddress" placeholder="Patient address" autoComplete='off' value={patientAddress}
            onChange={(e) => setpatientAddress(e.target.value)}/></div>
            <div className='flex flex-col'>
            <label htmlfor="doctorName">Doctor Name</label>
            <input type="text" name="doctorName" id="doctorName" placeholder="Doctor Name" autoComplete='off' value={doctorName}
            onChange={(e) => setdoctorName(e.target.value)}/></div></article>

<article className='md:grid grid-cols-2 gap-10 md:mt-5'>
            <div className='flex flex-col'>
            <label htmlfor="invoiceNumber">Bill Number</label>
            <input type="text" name="invoiceNumber" id="invoiceNumber" placeholder="Invoice Number" autoComplete='off' value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}/></div>
             <div className='flex flex-col'>
            <label htmlfor="invoiceDate">Bill Date</label>
            <input type="date" name="invoiceDate" id="invoiceDate" placeholder="Invoice Date" autoComplete='off' value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}/></div>
            </article>
{/* Table notes */}

<article>
<form onSubmit={handleSubmit}>

<div className='flex flex-col'>
  <label htmlFor='particulars'>Particulars</label>
  <input type="text" name="particulars" id="particulars" 
  placeholder="Item particulars" autoComplete='off' value={particulars}
            onChange={(e) => setParticulars(e.target.value)}/>
  </div>

<div className='flex flex-col'>
  <label htmlFor='description'>Description</label>
  <input type="text" name="description" id="description" 
  placeholder="Item description" autoComplete='off' value={description}
            onChange={(e) => setDescription(e.target.value)}/>
  </div>
 <div className='md:grid grid-cols-3 gap-10 md:mt-10'>

  <div className='flex flex-col'>
  <label htmlFor='rate'>Rate</label>
  <input type="number" name="rate" id="rate" 
  placeholder="Item rate" autoComplete='off' value={rate}
            onChange={(e) => setrate(e.target.value)}/>
</div>

<div className='flex flex-col'>
  <label htmlFor='quantity'>Quantity</label>
  <input type="number" name="quantity" id="quantity" 
  placeholder="Item quantity" autoComplete='off' value={quantity}
            onChange={(e) => setQuantity(e.target.value)}/>
  </div>
            
  <div className='flex flex-col'>
  <label htmlFor='amount'>Amount</label>
  <p>{amount}</p>
  </div>
  </div>
  <button type="submit"
  className="mb-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500
  hover:bg-transparent hover:text-blue-500 transition-all duration-300"> 
  {isEditing ? "Edit" : "Add"}
  </button>
  </form>

  <table width="100%" className="mb-10">
  <thead>
      <tr className='bg-gray-100 p-1'>
      <td className='font-bold' >Particulars</td>
        <td className='font-bold' >Description</td>
        <td className='font-bold' >Rate</td>
        <td className='font-bold' >Quantity</td>
        <td className='font-bold' >Amount</td>
        </tr>
      </thead>

    {list.map(({id, particulars,description, rate, quantity, amount}) =>(
    <React.Fragment key={id}>
      <tbody>
        <tr>
          <td>{particulars}</td>
          <td>{description}</td>
          <td>{quantity}</td>
          <td>{rate}</td>
          <td>{amount}</td>
          <td><button onClick={() => deleteRow(id)}>
            <MdDelete className='text-red-500 font-bold text-xl'/>
            </button></td>
            <td><button onClick={() => editRow(id)}>
            <AiOutlineEdit className='text-green-500 font-bold text-xl'/>
            </button></td>
        </tr>
      </tbody>

    </React.Fragment>
     
    
    ))}
</table>
</article>

<div>
  <h2 className='flex items-end justify-end text-gray-800 text-2xl font-bold'>Total : Rs. {total.toLocaleString()}</h2>
</div>
           <button onClick={() => setShowInvoice (true)} 
           className='bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500
            hover:bg-transparent hover:text-blue-500 transition-all duration-300'>Preview invoice</button>
            
          </div>
            </div>
          ) }
        </main>

      </div>
    )
  };
  
  export default Billing;
