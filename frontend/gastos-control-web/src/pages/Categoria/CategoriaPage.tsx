import { useEffect, useState } from "react"
import { api } from "../../api/api"
import { Modal, Button, Form, Table } from "react-bootstrap"


export default function CategoriaPage() {
    
    const [finalidades, setFinalidades] = useState<any[]>([])
    const [categorias, setCategorias] = useState<any[]>([])
    const [descricao, setDescricao] = useState("")
    const [finalidadeId, setFinalidadeId] = useState("")

    const listCategorias = () => {
        api.get("/categoria/ListarDTO")
          .then(res => setCategorias(res.data))
      }

    useEffect(() => {
        listCategorias()
    }, [])
    
    const loadFinalidades = () => {
        api.get("/categoria/finalidades")
          .then(res => setFinalidades(res.data))
      }

    useEffect(() => {
        loadFinalidades()
    }, [])

    const salvarCategoria = async () => {
        console.log("descricao", descricao)
        console.log("finalidadeId", finalidadeId)

        if(finalidadeId != ""){           
            await api.post("/categoria", { descricao, finalidade: parseInt(finalidadeId) })
            
            setDescricao("")
            setFinalidadeId("")
            listCategorias()
        }
    }
    return (
        <div>
            <h1>Categorias</h1>
            <Form.Group className="row">
                <Form.Group className="mb-3 col-md-6">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control type="textarea" placeholder="Digite a descrição da categoria" value={descricao} onChange={e => setDescricao(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 col-md-6">
                    <Form.Label>Finalidades</Form.Label>
                    <Form.Select onChange={e => setFinalidadeId(e.target.value)}>
                        {finalidades.map((f) => (
                            <option key={f.id} value={f.id}>{f.nome}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3  align-items-end text-end">
                    <Button variant="primary" onClick={salvarCategoria}>
                        Adicionar
                    </Button>
                </Form.Group>
            </Form.Group>
            <hr /> 
            <Form.Group>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Finalidade</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {categorias.map((c) => (
                            <tr key={c.id}>
                                <td>{c.descricao}</td>
                                <td>{c.finalidade}</td>
                            </tr>
                        ))}                        
                    </tbody>
                </Table>
            </Form.Group>
        </div>
    )
}