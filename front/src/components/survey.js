import { useState } from "react";

function Survey({ id, title, questions, description }) {

    const len = questions.length - 3;

    const [active, setActive] = useState(false)

    return (
        <div className={active ? "transition-all border-0 w-full": "transition-all md:w-5/12 w-full rounded border m-4"}>
            <div className={active ? "relative p-10 h-full": "relative bg-white p-10 shadow-sm h-full"}>
                <h3 className={active ? "transition-all text-3xl text-gray-800 text-center": "transition-all text-lg font-medium text-gray-800"}>{title}</h3>
                <p className="text-sm font-light text-gray-600 my-3">
                {description}
                </p>

                <div className="h-1 w-full mx-auto border-b my-5"></div>
                
                {
                    questions.slice(0, 3).map(e => <Question question={e} />)
                }
                {
                    len > 0 && <Question question={`${len} more question` + (len > 1? "s": "")} disabled />
                }
                
                <div className="h-16">
                    <button className="absolute bottom-8 right-10 p-4 px-8 rounded bg-blue-500 text-gray-100" onClick={() => setActive(!active)}>Take survey</button>
                </div>

            </div>
        </div>
    );
}

function Question({ question, disabled }) {

    return (
        <div className="transition hover:bg-indigo-50">
            <div className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
                <i className="fas fa-plus"></i>
                <h3 className={disabled? "text-gray-500 text-sm": ""}>{question}</h3>
            </div>
        </div>
    )
}

export default Survey;