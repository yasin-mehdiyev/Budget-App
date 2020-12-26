import React from 'react'
import Item from './ExpenseItem';
import { AiFillDelete } from "react-icons/ai";

const ExpenseList = ({ expenses,clearAllItem,deletedItem,handleEdit }) => {
    return (

        <div>

            <ul className="list">
                {expenses.map(expense => {
                    return <Item 
                    key={expense.id} 
                    expenses={expense} 
                    deletedItem={deletedItem} 
                    handleEdit={handleEdit}   />
                })}
            </ul>

            {
                expenses.length > 0 ?
                    <button className="btn" onClick={clearAllItem}>
                         All clear expenses
                        <AiFillDelete className="btn-icon" />
                    </button>
                    :
                    null
            }

        </div>

    )
}

export default ExpenseList;