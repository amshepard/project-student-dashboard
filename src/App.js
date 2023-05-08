import Header from "./Components/Header.js";
import StudentsList from "./Components/StudentsList.js";
import students from "./data/data.json";


function App() {
  return (
    <div>
      <Header />
      <StudentsList students={students}/>
    </div>
  );
}

export default App;
