import { useEffect, useState } from "react"
import { Modal, Button, Form, Table } from "react-bootstrap"
import { api } from "../../api/api"
import type { Pessoa } from "../../types/Pessoa"

export default function PessoasPage() {

  const [pessoas, setPessoas] = useState<Pessoa[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editNome, setEditNome] = useState("")
  const [editIdade, setEditIdade] = useState(0)


  const loadPeople = () => {
    api.get("/pessoa")
      .then(res => setPessoas(res.data))
  }

  useEffect(() => {
    loadPeople()
  }, [])

  const openModal = () => {
    setEditId(null)
    setEditNome("")
    setEditIdade(0)
    setShowModal(true)
  }

  const editarPessoa = (id: string) => {
    const pessoa = pessoas.find(p => p.id === id)
    if (!pessoa) return

    setEditId(id)
    setEditNome(pessoa.nome)
    setEditIdade(pessoa.idade)
    setShowModal(true)
  }

  const salvarPessoa = async () => {
    //caso editId seja nulo, significa que é uma nova pessoa, caso contrário, é uma edição
    if (editId) {
      // EDITAR
      const pessoa: Pessoa = {
        id: editId,
        nome: editNome,
        idade: editIdade
      }

      await api.put(`/pessoa/${editId}`, pessoa)
    } else {
      // CRIAR
      await api.post("/pessoa", {
        nome: editNome,
        idade: editIdade
      })
    }

    setShowModal(false)
    loadPeople()
  }


  const deletePessoa = async (id: string) => {
    if (!confirm("Deseja remover essa pessoa?")) return
    await api.delete(`/pessoa/${id}`)
    loadPeople()
  }  

 
  return (
    <div>

      <h1>Pessoas</h1>

      <div className="d-flex justify-content-end gap-2 mb-4 ">
        <button className="btn btn-primary" onClick={openModal}>
          Adicionar
        </button>
      </div>

      <hr />
      <Form.Group>
        <Table striped bordered hover>      
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {pessoas.map(p => (
                <tr key={p.id}>
                      <td>{p.nome}</td>
                      <td>{p.idade}</td>
                      <td onClick={() => editarPessoa(p.id)}>
                        <span className="badge bg-primary">Editar</span>
                      </td>
                      <td onClick={() => deletePessoa(p.id)}>
                        <span className="badge bg-danger">Remover</span>
                      </td>
                    </tr>
              ))}
            </tbody>        
        </Table>
      </Form.Group>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
        >
          <Modal.Header closeButton>
            {editId ? "Editar Pessoa" : "Adicionar Pessoa"}
          </Modal.Header>

          <Modal.Body>

            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                value={editNome}
                onChange={e => setEditNome(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Idade</Form.Label>
              <Form.Control
                type="number"
                value={editIdade}
                onChange={e => setEditIdade(Number(e.target.value))}
              />
            </Form.Group>

          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </Button>

            <Button
              variant="primary"
              onClick={salvarPessoa}
            >
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
    </div>        
  )  
}
