import logo from './logo.svg';
import './App.css';
import Question from './components/question';
import Survey from './components/survey';

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
  return (
    <div className="App flex flex-col h-screen my-16">
      <div className="mainContent sticky top-0 bg-white z-50 shadow-sm w-screen">
        <h1 className="text-center  text-4xl m-8">Survey App</h1>

        <div className="flex justify-center my-8">
          <input type="text" placeholder="search for a survey" className="p-4 w-1/3 rounded-full border-gray-400" />
          <button>Create a Survey</button>
        </div>

      </div>

      <div className="p-4 py-8 lg:mx-20 mx-4">
        <div className="h-10"></div>
        <h3>Explore</h3>
        <div className="flex flex-wrap mt-4">
          {
            surveys.map(e => <Survey title={e.title} description={e.description} questions={e.questions} />)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
