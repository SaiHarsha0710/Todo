import React from 'react';
import './Todo.css';
import { MdDelete } from 'react-icons/md';
import { GrDocumentUpdate } from 'react-icons/gr';

const TodoCards = ({ title, body, id, onDelete, onUpdate }) => {
    const truncatedBody = body.length > 500 ? body.slice(0, 500) + '...' : body;

    return (
        <div className="p-3 todo-card">
            <div>
                <h5>{title}</h5>
                <p className="todo-card-p">{truncatedBody}</p>
            </div>
            <div className="d-flex justify-content-around">
                <div 
                    className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
                    onClick={() => onUpdate({ _id: id, title, body })}
                >
                    <GrDocumentUpdate className="card-icons" /> Update
                </div>
                <div 
                    className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger"
                    onClick={() => onDelete(id)}
                >
                    <MdDelete className="card-icons del" /> Delete
                </div>
            </div>
        </div>
    );
};

export default TodoCards;
