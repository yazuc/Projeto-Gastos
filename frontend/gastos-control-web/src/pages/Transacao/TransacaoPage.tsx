import {useEffect, useState} from "react"
import { api } from "../../api/api"
import { Modal, Button, Form, Table } from "react-bootstrap"
import CurrencyInput from 'react-currency-input-field'

export default function TransacaoPage() {
    const [showModal, setShowModal] = useState(false)
    const [categorias, setCategorias] = useState<any[]>([])
    const [pessoas, setPessoas] = useState<any[]>([])
    const [tipos, setTipo] = useState<any[]>([])
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
    

    const openModal = () => {
        setShowModal(true)
    }
    return (
        <div>
            <h1>Transações</h1>
             <div className="d-flex justify-content-end gap-2 mb-4 ">
                <button className="btn btn-primary" onClick={openModal}>
                Adicionar
                </button>
            </div>
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
                            <Form.Select aria-placeholder="selecione" defaultValue="">
                                <option value="" disabled>Selecione uma pessoa</option>
                                {pessoas.map((p) => (
                                    <option value={p.id}> {p.nome}</option>                                    
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select key={1} defaultValue="">
                                <option value="" disabled>Selecione uma categoria</option>
                                {categorias.map((c) => (
                                    <option value={c.id}> {c.descricao}</option>                                    
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select key={2} defaultValue="">
                                <option value="" disabled>Selecione o tipo</option>
                                {tipos.map((t) => (
                                    <option value={t.id}>{t.nome}</option>
                                ))}
                            </Form.Select>                        
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Valor</Form.Label>
                            <CurrencyInput className="form-control" decimalsLimit={2} prefix="R$ " placeholder="Digite o valor da transação" />
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-6">
                            <Form.Label>Data</Form.Label>
                            <Form.Control type="date" placeholder="Digite a data da transação" />
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-12">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" placeholder="Digite a descrição da transação" />
                        </Form.Group>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShowModal(false)}}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => {}}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}