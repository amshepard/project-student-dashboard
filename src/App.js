import React, { useState } from "react"; // Import React and useState hook
import CohortList from "./Components/CohortList"; // Import CohortList component
import StudentList from "./Components/StudentList"; // Import StudentList component
import data from "./data/data.json"; // Import data from data.json file

function App() {
  const [studentList, setStudentList] = useState(data); // Initialize studentList state with data from data.json
  const [typeCohort, setTypeCohort] = useState("All Students"); // Initialize typeCohort state with "All Students"

  function displayAllStudents() {
    setTypeCohort("All Students"); // Set typeCohort state to "All Students"
    setStudentList((studentList) => [...data]); // Set studentList state to the original data from data.json
  }

  function sortCohort(cohortCode) {
    setStudentList(data.filter(student => student.cohort.cohortCode === cohortCode.split(" ").join(""))); // Filter and set studentList state based on the selected cohortCode
    setTypeCohort(cohortCode); // Set typeCohort state to the selected cohortCode
  }

  return (
    <div className="App">
      <header>
        <h1>Student Dashboard</h1>
      </header>
      {/* Render CohortList component */}
      <CohortList displayAllStudents={displayAllStudents} sortCohort={sortCohort}/>
      {/* Render StudentList component */}
      <StudentList studentList={studentList} typeCohort={typeCohort}/>
    </div>
  );
}

export default App;