import React, { useEffect, useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { v4 as uuidv4 } from 'uuid';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//  ---> Type-> 1-Income, 0-Excome ---->
const initialExpenses = localStorage.getItem('budgetItem') ? 
                        JSON.parse(localStorage.getItem('budgetItem')) : [];

console.log(initialExpenses);

function App() {

  // ----- Declaration of State ------
  const [expenses, setExpenses] = useState(initialExpenses);
  const [type, setType] = useState('');
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [editable, Edited] = useState(false);
  const [editId, setEditId] = useState(0);


  // ----- Declaration of State ------

  // ----- Declaration of Functions ------
  const handleCharge = (e) => {
    setCharge(e.target.value);
  }

  const handleAmount = (e) => {
    setAmount(e.target.value);
  }

  const handleType = (e) => {
    setType(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (charge !== "" && amount > 0) {
      if (editable) {
        let tempData = expenses.map((item) => {
          let typeData = type === "Excome" ? 0 : 1;
          return item.id === editId ? { ...item, type: typeData, charge, amount } : item;
        })
        setExpenses(tempData);
        Edited(false);
        toast.info("Item is edited with successfully");
      }
      else {
        swal({
          title: "Are you sure?",
          text: "Do you want added new item?",
          icon: "warning",
          buttons: true
        })
          .then((willAdded) => {
            if (willAdded) {
              let typeData = type === "Excome" ? 0 : 1;
              const data = { id: uuidv4(), type: typeData, charge, amount };
              setExpenses([...expenses, data]);
              console.log(data);
              setType('');
              setCharge('');
              setAmount('');

              swal("Added Item Successfully!", {
                icon: "success",
              });

            }
          });
      }

      setType('');
      setCharge('');
      setAmount('');

    }
    else {
      console.log("failed");
      toast.warning("Please to fill fields !");
    }
    // console.log(`type: ${type}, charge: ${charge}, amount: ${amount}`);
  }

  const clearAllItem = () => {
    console.log("clicked all clear items");
    setExpenses([]);
    toast.success("Cleared All Items");
    setType('');
    setCharge('');
    setAmount('');
    Edited(false);
  }

  const deletedItem = (id) => {
    console.log(`deleted item for ${id} id `);
    let temp = expenses.filter(item => item.id !== id);
    setExpenses(temp);
    toast.success("Deleted Item");
    setType('');
    setCharge('');
    setAmount('');
    Edited(false);
  }

  const handleEdit = (id) => {
    console.log(`Edit click charge: ${id}`);
    let item = expenses.find(elem => elem.id === id);
    let { type, charge, amount } = item;
    let defineType = type === 0 ? "Excome" : "Income";
    setType(defineType);
    setCharge(charge);
    setAmount(amount);
    Edited(true);
    setEditId(id);
  }


  // ----- Declaration of Functions ------

  // ------- Equivalent is LifeCycle Methods ------
    useEffect(() => {
      console.log('called this method');
      localStorage.setItem('budgetItem',JSON.stringify(expenses));
   }, [expenses]);
 
   // ------- Equivalent is LifeCycle Methods ------

  return (
    <div>
      <h1>Budget App</h1>

      <div className="App">
        <ExpenseForm
          type={type}
          charge={charge}
          amount={amount}
          handleType={handleType}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          editable={editable} />
        <ExpenseList
          expenses={expenses}
          clearAllItem={clearAllItem}
          deletedItem={deletedItem}
          handleEdit={handleEdit} />
      </div>



      <h1>
        Your Balance:
        <span className="total">
          {
            expenses.reduce((prevVal, currVal) => {
              //  console.log(currVal.type);
              let data = currVal.type === 0 ? (parseInt(currVal.amount) * (-1)) : parseInt(currVal.amount);
              //  console.log(data);   
              return (prevVal += parseInt(data));
            }, 0)
          } AZN
        </span>
      </h1>

      <ToastContainer
        autoClose={2000}
        position="bottom-right" />

    </div>
  );
}

export default App;
