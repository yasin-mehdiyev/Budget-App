import React from 'react'
import { FiSend } from "react-icons/fi";

const ExpenseForm = ({ type, charge, amount, handleType, handleCharge, handleAmount, handleSubmit,editable }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-center">
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select className="form-control" value={type} onChange={handleType}>
                            <option>Income</option>
                            <option>Excome</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="charge">Charge</label>
                        <input
                            type="text"
                            className="form-control"
                            id="charge"
                            name="charge"
                            placeholder="Enter Charge"
                            value={charge}
                            onChange={handleCharge}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            name="amount"
                            min="0"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={handleAmount}
                        />
                    </div>
                </div>

                <button className="btn">
                    {editable?"Edit":"Submit"}
                    <FiSend className="btn-icon" />
                </button>

            </form>
        </div>
    )
}

export default ExpenseForm;
