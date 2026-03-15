using ExpenseControl.Api.Data;
using Microsoft.AspNetCore.Http.HttpResults;

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

    public Transacao Registro(Guid id)
    {
        var transacao = _context.Transacoes.FirstOrDefault(t => t.Id == id);
        
        if(transacao != default)
            return transacao;

        return null;
    }

    public bool Gravar(Transacao transacao)
    {
        if(transacao.Pessoa.Idade < 18 && transacao.Tipo == Tipo.Receita)
        {
            return false;
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
    
}