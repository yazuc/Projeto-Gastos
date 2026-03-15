import { useEffect, useState } from "react";
import { api } from "./api/api";

interface Pessoa {
  id: string;
  name: string;
  age: number;
}

function App() {

  const [Pessoas, setPeople] = useState<Pessoa[]>([]);

  useEffect(() => {
    api.get("/pessoa")
      .then(response => setPeople(response.data));
  }, []);

  return (
    <div>
      <h1>Pessoas</h1>

      {Pessoas.map(p => (
        <div key={p.id}>
          {p.name} - {p.age}
        </div>
      ))}

    </div>
  );
}

export default App;
