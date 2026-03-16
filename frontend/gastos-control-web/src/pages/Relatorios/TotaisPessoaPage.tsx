import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Table, Card, Row, Col, Spinner } from "react-bootstrap";

interface PessoaRelatorio {
    nomePessoa: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

interface RelatorioGeral {
    pessoas: PessoaRelatorio[];
    totalGeralReceitas: number;
    totalGeralDespesas: number;
    saldoLiquidoGeral: number;
}

export default function TotaisPessoaPage() {
    const [dados, setDados] = useState<RelatorioGeral | null>(null);
    const [dadosCategorias, setDadosCategorias] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadRelatorio = () => {
        setLoading(true);
        api.get("/transacao/RelatorioTotais")
            .then(res => {
                setDados(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao carregar relatório:", err);
                setLoading(false);
            });
    };
     const loadRelatorioCategorias = () => {
        api.get("/transacao/RelatorioCategoriaTotais").then(res => setDadosCategorias(res.data));
    };

    useEffect(() => {
        loadRelatorio();
        loadRelatorioCategorias();
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center p-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div>
            <h1 className="mb-4">Relatório de Totais por Pessoa</h1>

            {/* Cards de Resumo */}
            <Row className="mb-4">
                <Col md={4}>
                    <Card className="text-center border-success bg-light">
                        <Card.Body>
                            <Card.Title className="text-success text-uppercase" style={{ fontSize: '0.9rem' }}>Total Receitas</Card.Title>
                            <Card.Text className="h3 font-weight-bold">
                                {formatCurrency(dados?.totalGeralReceitas || 0)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center border-danger bg-light">
                        <Card.Body>
                            <Card.Title className="text-danger text-uppercase" style={{ fontSize: '0.9rem' }}>Total Despesas</Card.Title>
                            <Card.Text className="h3 font-weight-bold">
                                {formatCurrency(dados?.totalGeralDespesas || 0)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className={`text-center border-primary bg-light`}>
                        <Card.Body>
                            <Card.Title className="text-primary text-uppercase" style={{ fontSize: '0.9rem' }}>Saldo Líquido Geral</Card.Title>
                            <Card.Text className={`h3 font-weight-bold ${(dados?.saldoLiquidoGeral || 0) < 0 ? 'text-danger' : ''}`}>
                                {formatCurrency(dados?.saldoLiquidoGeral || 0)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Tabela de Detalhes */}
            <Table striped bordered hover>
                <thead className="table-dark">
                    <tr>
                        <th>Pessoa</th>
                        <th className="text-end">Receitas</th>
                        <th className="text-end">Despesas</th>
                        <th className="text-end">Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {dados?.pessoas.map((p, index) => (
                        <tr key={index}>
                            <td>{p.nomePessoa}</td>
                            <td className="text-end text-success">{formatCurrency(p.totalReceitas)}</td>
                            <td className="text-end text-danger">{formatCurrency(p.totalDespesas)}</td>
                            <td className={`text-end font-weight-bold ${p.saldo < 0 ? 'text-danger' : ''}`}>
                                {formatCurrency(p.saldo)}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot className="table-secondary font-weight-bold">
                    <tr>
                        <td>TOTAL GERAL</td>
                        <td className="text-end text-success">{formatCurrency(dados?.totalGeralReceitas || 0)}</td>
                        <td className="text-end text-danger">{formatCurrency(dados?.totalGeralDespesas || 0)}</td>
                        <td className="text-end">{formatCurrency(dados?.saldoLiquidoGeral || 0)}</td>
                    </tr>
                </tfoot>
            </Table>

            <h2 className="mt-5 mb-4">Totais por Categoria</h2>
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Categoria</th>
                        <th className="text-end">Receitas</th>
                        <th className="text-end">Despesas</th>
                        <th className="text-end">Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {dadosCategorias.map((c, index) => (
                        <tr key={index}>
                            <td>{c.nomeCategoria}</td>
                            <td className="text-end text-success">{formatCurrency(c.totalReceitas)}</td>
                            <td className="text-end text-danger">{formatCurrency(c.totalDespesas)}</td>
                            <td className={`text-end font-weight-bold ${c.totalReceitas - c.totalDespesas < 0 ? 'text-danger' : ''}`}>
                                {formatCurrency(c.totalReceitas - c.totalDespesas)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}