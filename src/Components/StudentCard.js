import React, { useState } from "react";

export default function StudentCard({ student }) {
  const [toggleMore, setToggleMore] = useState(false);
  // set initial state for toggleMore to false, which will be used to toggle showMore() function
  const [notes, setNotes] = useState([...student.notes]);
  // set initial state for notes to copy the value of student.notes

  const birthDate = new Date(student.dob).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  function showMore() {
    setToggleMore(!toggleMore);
    // toggle the value of toggleMore when showMore() function is called
  }

  const codeWarTrack = (
    student.codewars.current.total /
    (student.codewars.goal.total / 100)
  ).toFixed(0);
  // calculate the percentage of the Codewars goal achieved and round down to the nearest whole number

  const handleComments = (event) => {
    event.preventDefault();
    const commenterName = event.target.elements["Commenter Name"].value;
    const commentText = event.target.elements.Comment.value;
    const newNoteComment = { commenter: commenterName, comment: commentText };
    student.notes.push(newNoteComment);
    setNotes([...student.notes]);
    event.target.reset();
    // handle the submission of new notes and update the notes state with the new note
  };

  function getColor(score) {
    let color = "";
    if (score > 75) {
      color = "green";
    } else if (score >= 60 && score <= 75) {
      color = "yellow";
    } else {
      color = "red";
    }
    return color;
    // return a color based on the score value given as parameter
  }

  return (
    <div className="StudentCard">
      <img className="img" src={student.profilePhoto} alt="" />
      <h4 className="onTrack">
        {" "}
        {codeWarTrack < 600 &&
        student.certifications.resume === false &&
        student.certifications.linkedin === false &&
        student.certifications.github === false
          ? "Not on Track to Graduate"
          : "On Track to Graduate"}
      </h4>
      <h3>
        <strong>
          {student.names.preferredName}{" "}
          {student.names.middleName[0].toUpperCase()}. {student.names.surname}
        </strong>
      </h3>
      <p>{student.username}</p>
      <p>Birthday: {birthDate}</p>

      {/* showMore() function is called when user clicks on this paragraph */}
      <p className="showmore" onClick={() => showMore()}>
        {toggleMore ? "Show Less..." : "Show More..."}
      </p>
      {/* show more info when toggleMore is true */}
      {toggleMore ? (
        <div className="outer">
          <div className="info">
            <div className="codewars">
              <h4>
                <strong>Codewars</strong>
              </h4>
              <p>Current Total: {student.codewars.current.total}</p>
              <p>Last Week: {student.codewars.current.lastWeek}</p>
              <p>Goal: {student.codewars.goal.total}</p>
              {/* display the percentage of Codewars goal achieved */}
              <p>
                Percent of Goal Achieved:{" "}
                <span style={{ color: getColor(codeWarTrack) }}>
                  {codeWarTrack} %
                </span>
              </p>
            </div>

            <div className="scores">
              <h4>
                <strong>Scores</strong>
              </h4>
              {/* display the score for each category and the color based on the getColor() function */}
              <p>Assignments: <span style={{ color: getColor(student.cohort.scores.assignments * 100) }}>
              {student.cohort.scores.assignments * 100} %
                </span></p>

              <p>Projects: <span style={{ color: getColor(student.cohort.scores.projects * 100) }}>
              {student.cohort.scores.projects * 100} %
                </span></p>

              <p>Assessments: <span style={{color: getColor(student.cohort.scores.assessments *100) }}> {student.cohort.scores.assessments * 100} %</span></p>
            </div>

            <div className="certifications">
              <h4>
                <strong>Certification</strong>
              </h4>
              {/* display whether the student has achieved each certification */}
              <p>Resume: {student.certifications.resume ? "✅" : "❌"}</p>
              <p>LinkedIn: {student.certifications.linkedin ? "✅" : "❌"}</p>
              <p>
                Mock Interview:{" "}
                {student.certifications.mockInterview ? "✅" : "❌"}
              </p>
              <p>GitHub: {student.certifications.github ? "✅" : "❌"}</p>
            </div>

            <div className="comments">
              <h2> 1-on-1 Notes </h2>
              {/* handle the submission of new notes and update the notes state with the new note */}
              <form className="comments" onSubmit={handleComments}>
                <label htmlFor="Commenter Name">Commenter Name: </label>


                <input type="text" name="Commenter Name" />


                <label htmlFor="Comment">Comment: </label>


                <input type="text" name="Comment" />
                <button type="submit">Add Note</button>


              </form>


              {/* display all notes */}
              {notes.map((note, index) => (
                <div className="comment" key={index}>
                  <strong>{note.commenter}</strong> says "<i>{note.comment}</i>"


                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
