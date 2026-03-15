import { useEffect, useState } from "react";
import { api } from "./api/api";

interface Person {
  id: string;
  name: string;
  age: number;
}

function App() {

  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    api.get("/pessoa")
      .then(response => setPeople(response.data));
  }, []);

  return (
    <div>
      <h1>Pessoas</h1>

      {people.map(p => (
        <div key={p.id}>
          {p.name} - {p.age}
        </div>
      ))}

    </div>
  );
}

export default App;
