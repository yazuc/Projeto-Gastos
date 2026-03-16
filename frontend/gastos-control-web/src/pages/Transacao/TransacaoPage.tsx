import {useEffect, useState} from "react"
import { api } from "../../api/api"
import { Modal, Button, Form, Table } from "react-bootstrap"
import CurrencyInput from 'react-currency-input-field'

export default function TransacaoPage() {
    const [showModal, setShowModal] = useState(false)
    const [categorias, setCategorias] = useState<any[]>([])
    const [pessoas, setPessoas] = useState<any[]>([])
    const [tipos, setTipo] = useState<any[]>([])
    const [transacoes, setTransacoes] = useState<any[]>([])

    const [pessoaId, setPessoaId] = useState("")
    const [categoriaId, setCategoriaId] = useState("")
    const [tipoId, setTipoId] = useState("")
    const [valor, setValor] = useState(0)
    const [data, setData] = useState("")
    const [descricao, setDescricao] = useState("")

    const listCategorias = () => {
        api.get("/categoria/ListarDTO")
          .then(res => setCategorias(res.data))
      }

    useEffect(() => {
        listCategorias()
    }, [])
    
    const loadPessoas = () => {
        api.get("/pessoa")
        .then(res => setPessoas(res.data))
    }
    useEffect(() => {
        loadPessoas()
    }, [])

    const listTipos = () => {
        api.get("/transacao/Tipo")
          .then(res => setTipo(res.data))
      }

    useEffect(() => {
        listTipos()
    }, [])

    const loadTransacoes = () => {
        api.get("/transacao")
            .then(res => setTransacoes(res.data))
    }
    useEffect(() => {
        loadTransacoes()
    }, [])
    

    const openModal = () => {
        setPessoaId("")
        setCategoriaId("")
        setTipoId("")
        setValor(0)
        setData("")
        setDescricao("")
        setShowModal(true)
    }

    const salvarTransacao = async () => {
        try {
            await api.post("/transacao", {
                pessoaId,
                categoriaId,
                tipo: parseInt(tipoId),
                valor,
                data,
                descricao
            })
            setShowModal(false)
            loadTransacoes()
        } catch (error: any) {
            //erro genérico, mas poderia ter sido implementado um sistema para retornar mensagens.
            //aqui retorna badrequest para as condições que não podem acontecer.
            alert("Erro ao salvar transação: " + (error.response?.data?.message || error.message))
        }
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR')
    }

    return (
        <div>
            <h1>Transações</h1>
             <div className="d-flex justify-content-end gap-2 mb-4 ">
                <button className="btn btn-primary" onClick={openModal}>
                Adicionar
                </button>
            </div>
            <Form.Group>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Pessoa</th>
                            <th>Categoria</th>
                            <th>Tipo</th>
                            <th>Data</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transacoes.map((t) => (
                            <tr key={t.id}>
                                <td>{t.descricao}</td>
                                <td>{t.pessoa}</td>
                                <td>{t.categoria}</td>
                                <td>{t.tipo === 0 ? "Despesa" : (t.tipo === 1 ? "Receita" : "Indefinido")}</td>
                                <td>{formatDate(t.data)}</td>
                                <td>{formatCurrency(t.valor)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Form.Group>
            <Modal 
                size="lg"
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Transação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="row">
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Pessoa</Form.Label>
                            <Form.Select aria-placeholder="selecione" value={pessoaId} onChange={e => setPessoaId(e.target.value)}>
                                <option value="" disabled>Selecione uma pessoa</option>
                                {pessoas.map((p) => (
                                    <option key={p.id} value={p.id}> {p.nome}</option>                                    
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select value={tipoId} onChange={e => setTipoId(e.target.value)}>
                                <option value="" disabled>Selecione o tipo</option>
                                {tipos.map((t) => (
                                    <option key={t.id} value={t.id}>{t.nome}</option>
                                ))}
                            </Form.Select>                        
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select value={categoriaId} onChange={e => setCategoriaId(e.target.value)}>
                                <option value="" disabled>Selecione uma categoria</option>
                                {categorias.map((c) => (
                                    <option key={c.id} value={c.id}> {c.descricao}</option>                                    
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Valor</Form.Label>
                            <CurrencyInput 
                                className="form-control" 
                                decimalsLimit={2} 
                                prefix="R$ " 
                                placeholder="Digite o valor da transação" 
                                value={valor}
                                onValueChange={(value) => setValor(value ? parseFloat(value.replace(',', '.')) : 0)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Data</Form.Label>
                            <Form.Control type="date" placeholder="Digite a data da transação" value={data} onChange={e => setData(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-12">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" placeholder="Digite a descrição da transação" value={descricao} onChange={e => setDescricao(e.target.value)} />
                        </Form.Group>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowModal(false)}}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={salvarTransacao}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}