import React, { useState } from 'react';
import { MdDelete, MdContentCopy, MdOutlineMoreHoriz } from 'react-icons/md'

function Question({ question }) {

    const [modify, setModify] = useState(true)
    const [quest, setQuest] = useState(question);

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-2 border-l-4 border-blue-500">
            {modify && <div className="handle m-0">
                <MdOutlineMoreHoriz />   
            </div>}
            <div className="mx-2">
                <div className="question_cont">
                    {modify?
                        (
                            <h3>{question}</h3>
                        ):(<div className="outline relative rounded-xl focus-within:border-blue-400 border rounded w-full">
                            {/* <label htmlFor="username" className="absolute top-0 text-lg bg-white p-4 duration-300 origin-0 z-0">Question</label> */}
                            <input placeholder="question" value={quest} onChange={e => setQuest(e.value)} type="text" name="question" className="block p-4 w-full text-lg appearance-none focus:outline-none bg-transparent" />
                        </div>)
                    }
                </div>
                <div className="outline relative rounded-xl focus-within:border-blue-400 border rounded w-full mt-2">
                    {/* <label htmlFor="username" className="absolute top-0 text-lg bg-white p-4 duration-300 origin-0 z-0">Question</label> */}
                    <input placeholder="description (optional)" value={quest} onChange={e => setQuest(e.value)} type="text" name="question" className="block p-2 w-full text-sm appearance-none focus:outline-none bg-transparent " />
                </div>
                <div className="responses_cont mt-8">
                    <h4>Options</h4>
                    <div className="yes_cont">
                        <input type="text" value="Yes" className="p-2 px-4 text-lg appearance-none focus:outline-none rounded-xl focus-within:border-blue-400 border rounded w-full mt-2" />
                    </div>
                    <div className="no_cont">
                        <input type="text" value="No" className="p-2 px-4 text-lg appearance-none focus:outline-none rounded-xl focus-within:border-blue-400 border rounded w-full mt-2" />
                    </div>
                </div>
                <div className="actions_cont my-8">
                    <hr />

                    <div className="flex flex-row-reverse space-x-reverse m-4">
                        <button className="p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300">Done</button>
                        <button className="rounded-lg mx-4"><MdDelete /></button>
                        <button><MdContentCopy /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question;