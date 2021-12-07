import { useState } from 'react'
import { MdChevronRight, MdExpandMore } from 'react-icons/md'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Question from './question'

function Survey({ id, title, questions, description, active, setActive }) {

    const len = questions.length - 3;

    const [submitting, setSubmitting] = useState(false)

    function submit() {
        setSubmitting(true);

        setTimeout(function () {
            setSubmitting(false);
        }, 2000)
    }

    return (
        <div className={"w-5/6 " + (active ? "lg:w-full transition-all border-0": "md:w-5/12 min-w-1/2 transition-all rounded border m-4")}>
            <div className={"w-full min-w-96 " + (active ? "relative p-10 h-full": "relative bg-white p-10 shadow-sm h-full")}>
                <h3 className={active ? "transition-all text-3xl text-gray-800 text-center": "transition-all text-lg font-medium text-gray-800"}>{title}</h3>
                <p className="text-sm font-light text-gray-600 my-3">
                {description}
                </p>

                <div className="h-1 w-full mx-auto border-b my-5"></div>
                
                {
                    (active? questions: questions.slice(0, 3)).map((e, i) => <Quest key={i} question={e} active={active} />)
                }
                {
                    len > 0 && !active && <Quest question={`${len} more question` + (len > 1? "s": "")} disabled />
                }
                
                <div className="h-16">
                    <div 
                        className="absolute flex flex-row bottom-8 right-10 p-4 px-8 rounded bg-blue-500 text-gray-100 shadow-sm" 
                        onClick={() => {if (active){submit()} else {setActive(id)}}}
                        >
                            {submitting && <div className="p-1 mr-2 animate-spin"><AiOutlineLoading3Quarters /></div>}
                            {active? "Submit response": "Take survey"}
                    </div>
                    <button className={"absolute p-2 px-4 rounded border-none focus-within:border-none " + (active? "text-red-400 bottom-10 right-64": "text-green-400 bottom-10 right-52")} onClick={() => setActive(-1)}>{active? "Dismiss": "View results"}</button>
                </div>

            </div>
        </div>
    );
}

function Quest({ question, disabled, active }) {

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
                <Question question={question}  />
            </div>
        </div>
    )
}

export default Survey;