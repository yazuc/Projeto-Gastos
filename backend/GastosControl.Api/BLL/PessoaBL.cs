using GastosControl.Api.Data;

public class PessoaBL
{
    private readonly AppDBContext _context;
    public PessoaBL(AppDBContext context)
    {
        _context = context;
    }

    public List<Pessoa> Listar()
    {
        return _context.Pessoas.ToList();
    }

    public Pessoa Registro(Guid ID )
    {     
        var pessoa = _context.Pessoas.Where(p => p.Id == ID).FirstOrDefault();
        if(pessoa != null)
        {
            return pessoa;
        }
        return null;
    }

    public bool Gravar(Pessoa pessoa)
    {
        try
        {
            _context.Pessoas.Add(pessoa);
            
            return _context.SaveChanges() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Erro ao gravar pessoa: " + ex.Message);
        }
    }

    public bool Atualizar(Pessoa pessoa)
    {
        try
        {
            var pessoaExistente = _context.Pessoas.Find(pessoa.Id);
            if (pessoaExistente == null)
            {
                return false;
            }

            pessoaExistente.Nome = pessoa.Nome;
            pessoaExistente.Idade = pessoa.Idade;

            return _context.SaveChanges() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Erro ao atualizar pessoa: " + ex.Message);
        }
    }

    public bool Excluir(Guid PessoaID)
    {
        try
        {
            var pessoaExistente = Registro(PessoaID);
            if (pessoaExistente == null)
            {
                return false;
            }

            var transacoes = _context.Transacoes.Where(t => t.PessoaId == PessoaID).ToList();
            if (transacoes.Any())
            {
                _context.Transacoes.RemoveRange(transacoes);
                _context.SaveChanges();
            }

            _context.Pessoas.Remove(pessoaExistente);
            return _context.SaveChanges() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Erro ao excluir pessoa: " + ex.Message);
        }
    }
}