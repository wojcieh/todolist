import { isEditable } from "@testing-library/user-event/dist/utils";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
function App() {
  const [zadania, ustawZadanie] = useState([]);
  const [noweZadanie, dodajNoweZadanie] = useState("");
 
  const dodajZadanie = () => {
    if (noweZadanie.trim() === "") return;
    ustawZadanie([...zadania, { id: Date.now(), text: noweZadanie }]);
    dodajNoweZadanie("");
  };
  const usunZadanie = (zadanieID) => {
    ustawZadanie(zadania.filter((zadanie) => zadanie.id !== zadanieID));
  };
  const edytujZadanie = (taskId) => {
    ustawZadanie(
      zadania.map((task) =>
        task.id == taskId ? { ...task, isEditing: true } : task
      )
    );
  };
  const zapiszZadanie = (taskId, newText) => {
    ustawZadanie(zadania.map((task) =>
      task.id === taskId
        ? { ...task, text: newText, isEditing: false }
        : task
    ));
  };
  return (
    <div className="container mt-4 p-4 bg-light rounded shadow">
      <h1 className="text-center mb-4">Lista zadań</h1>
      <div className="input-group mb-3">
        <input
          onKeyDown={(e) => e.key === "Enter" && dodajZadanie()}
          className="form-control"
          type="text"
          value={noweZadanie}
          onChange={(e) => dodajNoweZadanie(e.target.value)}
        ></input>
        <button className="btn btn-primary" onClick={dodajZadanie}>
          Dodaj
        </button>
      </div>
      <ul className="list-group">
        {zadania.map((zadanie) => 
        (
          <li key={zadanie.id} className="list-group-item d-flex justify-content-between align-items-center">
            {zadanie.isEditing ? ( 
              <input 
              type="text" 
              className="form-control" 
              defaultValue={zadanie.text}  
              onBlur={(e) => zapiszZadanie(zadanie.id, e.target.value)}           
              onKeyDown={(e) => e.key === "Enter" && zapiszZadanie(zadanie.id, e.target.value)}
              autoFocus
              />
) : (
  <>
            <span>{zadanie.text}</span>
            <div className="ms-auto">
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => edytujZadanie(zadanie.id)}
              >
                Edytuj
              </button>
              <button
                className="btn btn-danger btn-sm me-2"
                onClick={() => usunZadanie(zadanie.id)}
              >
                Usuń
              </button>
            </div>
            </>
)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
