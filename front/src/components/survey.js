import React, { useState } from 'react'
import { MdChevronRight, MdExpandMore } from 'react-icons/md'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Question from './question'
import { Alert, AlertContext } from '../context';

function Survey({ id, title, questions, description, results, active, setActive, setView, view }) {

    const len = questions.length - 3;

    const [submitting, setSubmitting] = useState(false)
    const [result, setResult] = useState({})

    async function submit(showAlert) {

        for (let i of questions) {
            if (!(i in result)) {
                showAlert(Alert.error, "Please answer all questions.");
                return;
            }
        }

        setSubmitting(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result)
        };
        
        let res = await fetch(`http://127.0.0.1:8000/api/survey/${id}/result`, requestOptions)

        if (!res.ok) { 
            // show error to the user
            showAlert(Alert.error, "Couldn't submit answer.")

            console.log("error while submitting response.")
            setSubmitting(false);
        } else {
            if (res.status === 200) {
                showAlert(Alert.success, "submission recorded!")

                setSubmitting(false);
                setActive(-1);
            }
        }
        
    }

    return (
        <div className={"w-5/6 " + (active || view ? "lg:w-full transition-all border-0": "md:w-5/12 min-w-1/2 transition-all rounded border m-4")}>
            <div className={"w-full min-w-full " + (active ? "relative p-10 h-full": "relative bg-white p-10 shadow-sm h-full")}>
                <h3 className={active ? "transition-all text-3xl text-gray-800 text-center": "transition-all text-lg font-medium text-gray-800"}>Survey: {title}</h3>
                <p className="text-sm font-light text-gray-600 my-3">
                    {description}
                </p>

                <div className="w-80"></div>
                <div className="h-1 w-full mx-auto border-b my-5"></div>

                {view &&
                    (
                        <div className="my-8">
                            {results.length === 0?
                                (<p className="text-center">No response recorded for this survey. :{"("}</p>):
                                results.map((e, i) => (
                                    <div className="my-2 rounded shadow-md py-2">
                                        <p className="mx-4 text-lg">Answer {i+1}</p>
                                        <hr />
                                        {Object.keys(e).map(key => (
                                            <div className="flex justify-between px-5 items-center h-16 hover:bg-gray-100">
                                                <h3>{key}</h3>
                                                <span className={"text-center w-12 p-1 px-2 rounded-md border shadow-md" + (e[key]? " border-green-500 bg-green-200 text-green-900": " border-red-500 bg-red-200 text-red-900")}>{e[key]? "yes": "no"}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                
                {
                    !view && (active? questions: questions.slice(0, 3)).map((e, i) => <Quest key={i} question={e} active={active} setResult={setResult} />)
                }
                {
                    !view && len > 0 && !active && <Quest question={`${len} more question` + (len > 1? "s": "")} disabled />
                }
                
                {!view &&<AlertContext.Consumer>
                    {({showAlert}) => (
                        <div className="h-16">
                            <div 
                                className="absolute flex flex-row bottom-8 right-10 p-4 px-8 rounded bg-blue-500 text-gray-100 shadow-md" 
                                onClick={() => {if (active){submit(showAlert)} else {setActive(id)}}}
                                >
                                    {submitting && <div className="p-1 mr-2 animate-spin"><AiOutlineLoading3Quarters /></div>}
                                    {active? "Submit response": "Take survey"}
                            </div>
                            <button className={"absolute p-2 px-4 rounded border-none focus-within:border-none " + (active? "text-red-400 bottom-10 right-64": "text-green-400 bottom-10 right-52")} onClick={() => active? setActive(-1): setView()}>{active? "Dismiss": "View results"}</button>
                        </div>
                    )}
                </AlertContext.Consumer>}

            </div>
        </div>
    );
}

function Quest({ question, disabled, active, setResult }) {

    const [selected, setSelected] = useState(false);

    return (
        <div className={"transition hover:bg-indigo-50 " + (selected? "rounded-xl border-l-4 border-blue-500": "")}>
            <div className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16" onClick={() => {active?setSelected(!selected):setSelected(false)}}>
                {selected?
                    <MdExpandMore />:
                    <MdChevronRight />
                }
                <h3 className={disabled? "text-gray-500 text-sm": ""}>{question}</h3>
            </div>
            <div className={"transition-all " + (selected? "block" : "hidden")}>
                <Question question={question} setResult={setResult} />
            </div>
        </div>
    )
}

export default Survey;