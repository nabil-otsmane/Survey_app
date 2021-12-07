import './App.css';
import Survey from './components/survey';
import { useEffect, useState } from 'react';

const surveys = [
  {
    description: "The accordion is a graphical control element comprising a vertically stacked list of items such as labels or thumbnails",
    title: "Several Windows stacked on each other",
    questions: ["What is term?", "When to use Accordion Components?", "How can it be defined?", "Chamber reached do he nothing be?"]
  },
  {
    description: "some description is another description",
    title: "hello there",
    questions: ["first question", "second question"]
  },
  {
    description: "some description is another description",
    title: "hello there",
    questions: ["first question", "second question"]
  },
  {
    description: "some description is another description",
    title: "hello you",
    questions: ["first question", "second question"]
  },
]

function App() {

  const [data, setData] = useState([]);

  const [active, setActive] = useState(-1);
  const [shrink, setShrink] = useState(false);

  // https://stackoverflow.com/questions/57453141/using-react-hooks-to-update-w-scroll
  useEffect(() => {
    const onScroll = e => {
      if (e.target.documentElement.scrollTop > 270 && !shrink) {
        setShrink(true);
        
      } else if (e.target.documentElement.scrollTop < 5 && shrink) {
        setShrink(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [shrink])

  useEffect(() => {
    async function fetchData() {
      try {
  
        let res = await fetch("http://127.0.0.1:8000/api/survey");
        
        if (!res.ok) {
          // TODO: send error message to the user
  
          console.log(`An error has occured: ${res.status} - ${res.statusText}`);
        }
  
        const data = await res.json();
  
        setData(data)
        console.log(data)
  
      } catch(err) {
        // TODO: send error message to the user
  
        console.log(err.message)
      }
    }

    fetchData();
  }, [])

  return (
    <div className="App flex flex-col h-screen my-16">
      <div className="mainContent w-screen">
        <h1 className={"text-center  text-4xl m-8 " + (shrink? "hidden": "")}>Survey App</h1>


      </div>
      <div className={"sticky top-0 shadow-md flex justify-center bg-white z-50 py-" + (shrink? "16": "40")}>
        <input type="text" placeholder="search for a survey" className="p-4 w-1/3 rounded-full border border-gray-400 mx-4 block p-4 appearance-none focus:outline-none bg-transparent" />
        <button className="bg-green-400 rounded-xl p-4 px-16">Create a Survey</button>
      </div>

      <div className="p-4 py-8 lg:mx-20 mx-4">
        <div className="h-10"></div>
        <h3 className="text-xl ml-4">Explore</h3>
        {active !== -1 && <Survey id={active} title={data[active].title} description={data[active].description} questions={data[active].questions} active={true} setActive={setActive} />}
        <div className={"flex mt-4 " + (active === -1? " flex-wrap": " flex-nowrap overflow-x-scroll flex-row")}>
          {
            data.filter((e, i) => active !== i).map((e, i) => <Survey key={i} id={i} title={e.title} description={e.description} questions={e.questions} setActive={setActive} />)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
