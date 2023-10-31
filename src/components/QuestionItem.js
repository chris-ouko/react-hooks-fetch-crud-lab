import React from "react";

function QuestionItem({ question, deletQuiz }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    console.log("Delete button clicked");
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Error deleting the question:", response.status, response.statusText);
          throw new Error(`Error deleting the question: ${response.status} ${response.statusText}`);
        }
        console.log("Question deleted successfully");
        return response.json();
      })
      .then(() => {
        console.log("Question deleted from the server");
        deletQuiz(id);
      })
      .catch((error) => {
        console.error("Error deleting the question:", error);
      });
  }

  function changeAnswer(event) {
    const correctIndex = parseInt(event.target.value);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeAnswer}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;