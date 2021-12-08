import React, { useState } from 'react';

function Question({ question, setResult }) {

    const [selected, setSelected] = useState(0)

    return (
        <div className="shadow-md overflow-hidden p-2 w-full">
            
            <div className="mx-2">
                <div className="responses_cont my-8">
                    <h4>Options</h4>
                    <div className="yes_cont">
                        <input type="button" value="Yes" className={"p-2 px-4 text-lg text-left appearance-none focus:outline-none rounded-xl rounded w-1/3 mt-2 " + (selected === 1? "border-green-300 border-2":" focus-within:border-blue-400 border border-gray-700")} onClick={() => {setResult(prev => {prev[question] = true; return prev;});setSelected(1)}} />
                    </div>
                    <div className="no_cont">
                        <input type="button" value="No" className={"p-2 px-4 text-lg text-left appearance-none focus:outline-none rounded-xl rounded w-1/3 mt-2 " + (selected === 2? "border-green-300 border-2":" focus-within:border-blue-400 border border-gray-700")} onClick={() => {setResult(prev => {prev[question] = false; return prev;});setSelected(2)}} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question;