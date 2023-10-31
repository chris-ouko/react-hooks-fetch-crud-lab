import React from "react";
import {useState ,useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [query,setQueries] = useState([])
  const[ques,setQues] = useState([])

useEffect(()=>{
  fetch(`http://localhost:4000/questions`)
  .then((res) => res.json())
  .then((data) => {setQueries(data)}
)},[])

function deletQuiz (id){
 const update = ques.filter((ques)=>ques.id !== id);
  setQues(update)
} 

const Questions =( query.map((item)=>{
  return <div key={item.id}>
     <QuestionItem 
   question={item} deletQuiz={deletQuiz} 
  />
  </div>
}))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{Questions}</ul>
    </section>
  );
}

export default QuestionList;