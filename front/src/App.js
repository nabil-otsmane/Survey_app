import './App.css';
import Survey from './components/survey';
import React, { useEffect, useState } from 'react';
import { AlertContext, Alert } from './context'
import Modal from './components/modal';
import Creator from './components/surveyCreator';

function App() {

  /* survey data to show in the explore list */
  const [data, setData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  
  /* state variable used to tell the modal which view to show (create survey / view results) */
  const [createView, setCreateView] = useState(false);

  /* store the id of the selected survey to show a bigger picture of it when selected */
  const [active, setActive] = useState(-1);

  /* used to know when to shrink the top bar while scrolling */
  const [shrink, setShrink] = useState(false);

  /* state corresponding to the context variable of the alert box */
  const [alert, setAlert] = useState({
    alert: Alert.none,
    msg: "",
    showAlert
  })

  function showAlert(alert, msg) {
    setAlert(a => ({ ...a, alert, msg }))

    setTimeout(() => {
        setAlert(a => ({ ...a, alert: Alert.none, msg: "" }))
    }, 2000)
}

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
  
        // its a better idea to put the base url in a separate file. or maybe .env file ?
        let res = await fetch("http://127.0.0.1:8000/api/survey");
        
        if (!res.ok) {
          showAlert(Alert.error, "Coudn't connect to the server.")
  
          console.log(`An error has occured: ${res.status} - ${res.statusText}`);
        }
  
        const data = await res.json();
  
        setData(data)
  
      } catch(err) {
        showAlert(Alert.error, "unknown error while retreiving data.")
  
        console.log(err.message)
      }
    }

    fetchData();
  }, [showModal])

  return (
    <div className="App flex flex-col h-screen my-16">
      <div className={"color" in alert.alert? `bg-${alert.alert.color}-100 border border-${alert.alert.color}-400 text-${alert.alert.color}-700 px-4 py-3 rounded fixed bottom-10 right-10 z-50`:"hidden"} role="alert">
        <strong className="font-bold mr-4">{alert.alert.title}!</strong>
        <span className="block sm:inline">{alert.msg}</span>
      </div>
      <div className="mainContent w-screen">
        <h1 className={"text-center  text-4xl m-8 " + (shrink? "hidden": "")}>Survey App</h1>


      </div>
      <div className={"sticky top-0 shadow-md flex justify-center bg-white z-30 py-" + (shrink? "16": "40")}>
        <input type="text" placeholder="search for a survey" className="p-4 w-1/3 rounded-full border border-gray-400 mx-4 block p-4 appearance-none focus:outline-none bg-transparent" />
        <button className="bg-green-400 rounded-xl p-4 px-16" onClick={() => setShowModal(true)}>Create a Survey</button>
      </div>

      <AlertContext.Provider value={alert}>
        <div className="p-4 py-8 lg:mx-20 mx-4">
          <div className="h-10"></div>
          <h3 className="text-xl ml-4">Explore</h3>
          {active !== -1 && data.filter(e => e.id === active).map(e => <Survey id={e.id} title={e.title} description={e.description} questions={e.questions} active={true} setActive={setActive} />)}
          <div className={"flex mt-4 " + (active === -1? " flex-wrap": " flex-nowrap overflow-x-scroll flex-row")}>
            {
              data.filter((e, i) => active !== e.id).map((e, i) => <Survey key={i} id={e.id} title={e.title} description={e.description} questions={e.questions} setActive={setActive} />)
            }
          </div>
        </div>
        <Modal open={showModal} setOpen={setShowModal}>
          <Creator setOpen={setShowModal} />
        </Modal>
      </AlertContext.Provider>
    </div>
  );
}

export default App;
