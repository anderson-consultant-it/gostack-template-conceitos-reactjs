import React , {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

    useEffect(()=>{
        api.get('/repositories').then(response=>{
            console.log(response.data);
            setRepositories(response.data);
        })
    },[])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title:`Novo repositorio ${Date.now()}`
  });

  const repo = response.data;
  setRepositories([...repositories,repo])
  console.log(repositories)
  }

  async function handleRemoveRepository(id) {
    const repos = repositories.filter(repo=> repo.id !== id);
    setRepositories([...repos])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo,index) => 
          <li key={index}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
