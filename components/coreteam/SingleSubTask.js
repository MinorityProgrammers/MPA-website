import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import userinfo from './User.json';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import ReactTooltip from 'react-tooltip';

const SingleSubTask = ({ index, todo, todos, setTodos }) => {
    const [edit, setEdit] = useState(false);
    const [editTodo, setEditTodo] = useState(todo.todo);

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const handleEdit = (e, id) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleDone = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const [newUser, setNewUser] = useState(false);
    const [users, setUsers] = useState({});
    const [userCart, setUserCart] = useState([]);
    useEffect(() => {
        setUsers(userinfo);
    }, [])
    console.log(users);
    const handleUser = (id) => {
        setNewUser(!newUser)



    }

    const handleUserCart = (addnew) => {

        let newUsers = [...userCart, addnew];
        setUserCart(newUsers)


    }
    //remove -----user
    const HandleRemoveUser = (id) => {
        const afterRemoveUsers = userCart.filter(remo => remo.id !== id);
        setUserCart(afterRemoveUsers)
        console.log(afterRemoveUsers);

    }
    console.log("players", userCart);

    return (
        <div>

            <form
                onSubmit={(e) => handleEdit(e, todo.id)}


            >
                {edit ? (
                    <input
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                        className="  tw-bg-gray-200 tw-rounded-lg tw-text-black  tw-px-4 tw-py-1 focus:tw-outline-none text-lg"
                        ref={inputRef}
                    />
                ) : todo.isDone ? (
                    <div className="tw-flex">

                        {
                            // singleSubTask.data.id &&
                            userCart.map(u => (<div className="tw-cursor-pointer tw-btn"
                                key={u.id}
                                onClick={() => HandleUserRemove(u.id)}
                                data-tip={u.name}>
                                <img className="tw-h-5 tw-w-5" src={u.image} alt="" />
                                <ReactTooltip />
                            </div>))
                        }
                        <h3 className="  tw-text-black  tw-px-4 tw-py-1 focus:tw-outline-none text-lg">{todo.todo}</h3>
                    </div>

                ) : (
                    <div className="tw-flex">

                        {
                            // singleSubTask.data.id &&
                            userCart.map(u => (<div className="tw-cursor-pointer tw-btn"
                                key={u.id}
                                onClick={() => HandleRemoveUser(u.id)}
                                data-tip={u.name}>
                                <img className="tw-h-5 tw-w-5" src={u.image} alt="" />
                                <ReactTooltip />
                            </div>))
                        }
                        <h3 className="tw-text-black  tw-px-4 tw-py-1 focus:tw-outline-none text-lg">{todo.todo}</h3>
                    </div>
                )}
                <div className="tw-flex">
                    <span
                        className="icon tw-text-blue-500"
                        onClick={() => {
                            if (!edit && !todo.isDone) {
                                setEdit(!edit);
                            }
                        }}
                    >
                        <AiFillEdit />
                    </span>
                    <span className="icon" onClick={() => handleDelete(todo.id)}>
                        <AiFillDelete />
                    </span>
                    {/* <span className="icon" onClick={() => handleDone(todo.id)}>
                        <MdDone />
                    </span> */}
                    <div className="tw-relative">
                        <div
                            onClick={() => handleUser(todo.id)}
                            id={index} className="tw-border-dashed tw-border-2 tw-border-gray-400 tw-text-gray-600 tw-rounded-full tw-h-6 tw-w-6 tw-flex tw-items-center tw-justify-center "  >
                            <svg width="18" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>


                        </div>
                        {
                            newUser && <div id="myDropdown" class="dropdown-content tw-absolute  ">
                                {

                                    users.map(user => <a className="hover:tw-bg-gray-200" key={user.id} >

                                        <div className="tw-flex tw-gap-x-3 tw-cursor-pointer" onClick={() => handleUserCart(user)}>
                                            <img className="tw-h-5 tw-w-5" src="/assets/images/coreteamimg/user.png" alt="" /> <span >{user.name}</span>
                                        </div>
                                    </a>)
                                }
                            </div>
                        }

                    </div>

                </div>
            </form>
        </div>
    );
};

export default SingleSubTask;