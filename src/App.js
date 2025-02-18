import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
function App() {
  const [zadania, ustawZadanie] = useState([]);
  const [noweZadanie, dodajNoweZadanie] = useState("");
  const dodajZadanie = () => {
    if (noweZadanie.trim()=== "") return;
    ustawZadanie([...zadania, {id: Date.now(), text: noweZadanie}])
    dodajNoweZadanie("");
  }
  const usunZadanie = (zadanieID) => {
    ustawZadanie(zadania.filter(zadanie => zadanie.id !== zadanieID));
  }
  return (
    <div className='container mt-4 p-4 bg-light rounded shadow'>
      <h1 className='text-center mb-4'>Lista zadań</h1>
      <div className='input-group mb-3'>
      
      <input onKeyDown={(e) => e.key ==="Enter" && dodajNoweZadanie(e.target.value)} className='form-control' type="text" value={noweZadanie} onChange={(e) => dodajNoweZadanie(e.target.value)}></input><button className='btn btn-primary' onClick={dodajZadanie}>Dodaj</button>
     </div>
      <ul className='list-group'>
        {zadania.map((zadanie) => (
          <li className="list-group-item d-flex justify-content-between align-items-center"> {zadanie.text}<button className='btn btn-danger' onClick={()=>usunZadanie(zadanie.id)}>usuń</button></li>
        ))        
}
      </ul>
    </div>
  );
}

export default App;
