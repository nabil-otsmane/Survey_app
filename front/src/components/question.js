import React, { useState } from 'react';
import { MdDelete, MdContentCopy, MdOutlineMoreHoriz } from 'react-icons/md'

function Question({ question, description, modify }) {

    const [quest, setQuest] = useState(question);
    const [desc, setDesc] = useState(description);

    const [selected, setSelected] = useState(0)

    return (
        <div className="shadow-md overflow-hidden p-2 w-full">
            {modify && <div className="handle m-0">
                <MdOutlineMoreHoriz />   
            </div>}
            <div className="mx-2">
                {/* <div className="question_cont">
                    {modify?
                        (
                            <h3>{question}</h3>
                        ):(<div className="outline relative rounded-xl focus-within:border-blue-400 border rounded w-full">
                            <input placeholder="question" value={quest} onChange={e => setQuest(e.value)} type="text" name="question" className="block p-4 w-full text-lg appearance-none focus:outline-none bg-transparent" />
                        </div>)
                    }
                </div> */}
                {/* <div className="outline relative rounded-xl focus-within:border-blue-400 border rounded w-full mt-2">
                    {
                        modify?
                            <input placeholder="description (optional)" value={desc} onChange={e => setDesc(e.value)} type="text" name="description" className="block p-2 w-full text-sm appearance-none focus:outline-none bg-transparent " />:
                            <p>{desc}</p>

                    }
                </div> */}
                <div className="responses_cont my-8">
                    <h4>Options</h4>
                    <div className="yes_cont">
                        <input type="button" value="Yes" className={"p-2 px-4 text-lg text-left appearance-none focus:outline-none rounded-xl rounded w-1/3 mt-2 " + (selected === 1? "border-green-300 border-2":" focus-within:border-blue-400 border border-gray-700")} onClick={() => setSelected(1)} />
                    </div>
                    <div className="no_cont">
                        <input type="button" value="No" className={"p-2 px-4 text-lg text-left appearance-none focus:outline-none rounded-xl rounded w-1/3 mt-2 " + (selected === 2? "border-green-300 border-2":" focus-within:border-blue-400 border border-gray-700")} onClick={() => setSelected(2)} />
                    </div>
                </div>
                {
                    modify?
                        (<div className="actions_cont my-8">
                            <hr />

                            <div className="flex flex-row-reverse space-x-reverse m-4">
                                <button className="p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300">Done</button>
                                <button className="rounded-lg mx-4"><MdDelete /></button>
                                <button><MdContentCopy /></button>
                            </div>
                        </div>):
                        (<></>)

                }
            </div>
        </div>
    )
}

export default Question;