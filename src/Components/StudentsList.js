import StudentCard from "./StudentsCard.js"

function StudentsList({students}) {
  return (
    <div className="students-list">
        <h1>This Is The Students List</h1>
        <h1>{students.length}</h1>
        </div>
        
  )
}

export default StudentsList