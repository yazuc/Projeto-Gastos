using GastosControl.Api.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

public class TransacaoBL
{
    private readonly AppDBContext _context;
    public TransacaoBL(AppDBContext context)
    {
        _context = context;
    }

    public List<Transacao> Listar(Guid PessoaID)
    {
        return _context.Transacoes.Where(t => t.PessoaId == PessoaID).ToList();
    }

   public List<TransacaoDTO> ListarTodos()
    {
        return _context.Transacoes.Include(c => c.Categoria).Include(p => p.Pessoa)
            .Select(t => new TransacaoDTO(
                t.Id,
                t.Descricao,
                t.Valor,
                t.Data,
                t.Categoria.Descricao, 
                t.Pessoa.Nome,    
                t.Tipo
            ))
            .ToList();
    }

    public Transacao Registro(Guid id)
    {
        var transacao = _context.Transacoes.FirstOrDefault(t => t.Id == id);
        
        if(transacao != default)
            return transacao;

        return null;
    }

    public bool Gravar(Transacao transacao)
    {
        var pessoa = _context.Pessoas.FirstOrDefault(p => p.Id == transacao.PessoaId);
        if (pessoa == null)
            throw new Exception("Pessoa não encontrada.");
            
        var categoria = _context.Categorias.FirstOrDefault(c => c.Id == transacao.CategoriaId);
        if (categoria == null)
            throw new Exception("Categoria não encontrada.");

        //tratamento de erros, usuário menor de idade não pode gerar receita.
        if(pessoa.Idade < 18 && transacao.Tipo == Tipo.Receita)
        {
            throw new Exception("Menores de idade podem registrar apenas despesas.");
        }        
        //tratamento de erros, transação não pode ser tipo despesa, com finalidade de receita.
        if (transacao.Tipo == Tipo.Despesas && categoria.Finalidade == Finalidade.Receita)
        {
            throw new Exception("Categoria não permitida para o tipo de transação (Despesa).");
        }
        //tratamento de erros, transação não pode ser tipo receita, com finalidade de despesa.
        if (transacao.Tipo == Tipo.Receita && categoria.Finalidade == Finalidade.Despesas)
        {
            throw new Exception("Categoria não permitida para o tipo de transação (Receita).");
        }

        try
        {
            _context.Transacoes.Add(transacao);            
            return _context.SaveChanges() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Erro ao gravar transação: " + ex.Message);
        }
    }

    public RelatorioGeralDTO ObterRelatorioTotaisPorPessoa()
    {
        var dadosBrutos = _context.Pessoas
            .Select(p => new {
                p.Nome,
                Transacoes = _context.Transacoes
                    .Where(t => t.PessoaId == p.Id)
                    .Select(t => new { t.Valor, t.Tipo })
                    .ToList() 
            })
            .ToList();
        //soma feita em memória por limitação do sqlite
        //soma de todas as pessoas por tipo de receita
        var listaPessoas = dadosBrutos.Select(p => new TotaisPessoaDTO
        {
            NomePessoa = p.Nome,
            TotalReceitas = p.Transacoes
                .Where(t => t.Tipo == Tipo.Receita)
                .Sum(t => t.Valor),
            TotalDespesas = p.Transacoes
                .Where(t => t.Tipo == Tipo.Despesas)
                .Sum(t => t.Valor)
        }).ToList();

        return new RelatorioGeralDTO {
            Pessoas = listaPessoas,
            TotalGeralReceitas = listaPessoas.Sum(x => x.TotalReceitas),
            TotalGeralDespesas = listaPessoas.Sum(x => x.TotalDespesas),
            SaldoLiquidoGeral = listaPessoas.Sum(x => x.Saldo)
        };
    }

    public List<TotaisCategoriaDTO> ObterTotaisPorCategoria()
    {
        //soma de todas as pessoas por categoria
        return _context.Categorias
            .Select(c => new TotaisCategoriaDTO
            {
                NomeCategoria = c.Descricao,
                TotalReceitas = (decimal)(_context.Transacoes
                    .Where(t => t.CategoriaId == c.Id && t.Tipo == Tipo.Receita)
                    .Sum(t => (double?)t.Valor) ?? 0),
                TotalDespesas = (decimal)(_context.Transacoes
                    .Where(t => t.CategoriaId == c.Id && t.Tipo == Tipo.Despesas)
                    .Sum(t => (double?)t.Valor) ?? 0)
            })
            .ToList();
    }
    
}