import { useEffect, useState } from "react"
import { api } from "../../api/api"
import type { Pessoa } from "../../types/Pessoa"

export default function PessoasPage() {

  const [pessoas, setPessoas] = useState<Pessoa[]>([])
  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState(0)

  const loadPeople = () => {
    api.get("/pessoa")
      .then(res => setPessoas(res.data))
  }

  useEffect(() => {
    loadPeople()
  }, [])

  const createPerson = async () => {
    await api.post("/pessoa", {
      nome,
      idade
    })

    setNome("")
    setIdade(0)

    loadPeople()
  }


  return (
    <div>

      <h1>Pessoas</h1>

      <div>
        <input
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />

        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={e => setIdade(Number(e.target.value))}
        />

        <button onClick={createPerson}>
          Adicionar
        </button>
      </div>

      <hr />

      {pessoas.map(p => (
        <div key={p.id}>
          {p.nome} - {p.idade}
        </div>
      ))}

    </div>
  )
}
