import { useEffect, useState } from 'react'
import { MdClose, MdArrowDownward, MdArrowUpward } from 'react-icons/md'
import { AlertContext, Alert } from '../context'

function Creator({ setOpen }) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [questions, setQuestions] = useState([])

    async function submit(showAlert) {
        let body = JSON.stringify({
            title,
            description,
            questions
        });

        console.log(title)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        };
        
        let res = await fetch(`http://127.0.0.1:8000/api/survey`, requestOptions)

        if (!res.ok) { 
            // show error to the user
            showAlert(Alert.error, "Couldn't submit answer.")

            console.log("error while creating survey.")
            // setSubmitting(false);
        } else {
            if (res.status === 200) {
                showAlert(Alert.success, "submission recorded!")
                console.log("success")
                // setSubmitting(false);
                // setActive(-1);
            }
        }
    }

    return (
        <div className="w-full border-0">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col">
                <h3 className="text-center my-4 text-2xl">Create a new survey</h3>
                <input type="text" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} className="mx-4 p-2 rounded-xl border border-gray-400" />
                <textarea placeholder="description" value={description} onChange={e => setDescription(e.target.value)} className="m-4 p-2 rounded-xl border border-gray-400"></textarea>

                <div className="h-1 w-full mx-auto border-b my-5"></div>

                <div className="mx-4">
                    <p>Questions</p>
                    {questions.map((e, i) => (
                        <div key={e}>
                            <input type="text" placeholder="enter question" value={questions[i]} onChange={e => {setQuestions(questions.map((t, j) => j === i ? e.target.value: t))}} className="my-2 p-2 px-4 text-gray-400 focus:text-gray-900 focus:bg-white rounded" />
                            <div className="controls float-right my-2 p-2 px-4 flex flex-row">
                                <span className="p-1 cursor-pointer">
                                    <MdArrowUpward />
                                </span>
                                <span className="p-1 mx-2  cursor-pointer" onClick={() => setQuestions(prev => {
                                    console.log(prev)
                                    if (i === questions.length - 1) {
                                        return prev;
                                    } else {
                                        // swapping two entries of an array without a temp variable 
                                        prev[i] = prev.splice(i + 1, 1, prev[i])[0];

                                        console.log(prev)
                                        return prev;
                                    }
                                })}>
                                    <MdArrowDownward />
                                </span>
                                <span className="p-1 cursor-pointer" onClick={() => {setQuestions(questions.filter((e, j) => i !== j))}}>
                                    <MdClose />
                                </span>
                            </div>
                        </div>
                    ))}

                    <div className="my-2 p-2 px-4 bg-blue-200 text-blue-500 rounded cursor-pointer" onClick={() => setQuestions([...questions, ""])}>
                        + Add question
                    </div>
                </div>

            </div>
            <AlertContext.Consumer>
                {({showAlert}) => (
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => {submit(showAlert)}}>
                        Deactivate
                        </button>
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => {setOpen(false)}}>
                        Cancel
                        </button>
                    </div>
                )}
            </AlertContext.Consumer>
        </div>
    );
}

export default Creator;