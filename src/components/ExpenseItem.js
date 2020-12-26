import React from 'react'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const ExpenseItem = ({ expenses,deletedItem,handleEdit }) => {

    const { id, type, charge, amount } = expenses;
    return (
        <div>

            <li className="item">
                <div className="info">
                    <span className="type">{type===0?"Excome":"Income"}</span>
                    <span className="expense">{charge}</span>
                    <span className="amount">{amount} AZN</span>
                </div>

                <div>

                    <button className="edit-btn" onClick={()=>handleEdit(id)}>
                        <AiFillEdit />
                    </button>

                    <button className="clear-btn" onClick={()=>deletedItem(id)}>
                        <AiFillDelete />
                    </button>

                </div>

            </li>

        </div>
    )
}

export default ExpenseItem;