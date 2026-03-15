using ExpenseControl.Api.Data;

public class CategoriaBL
{
    private readonly AppDBContext _context;
    public CategoriaBL(AppDBContext context)
    {
        _context = context;
    }

    public List<Categoria> Listar()
    {
        return _context.Categorias.ToList();
    }

    public Categoria Registro(Guid id)
    {
        var categoria = _context.Categorias.FirstOrDefault(c => c.Id == id);
        
        if(categoria != default)
            return categoria;

        return null;
    }

    public bool Gravar(Categoria categoria)
    {
        try
        {
            _context.Categorias.Add(categoria);
            
            return _context.SaveChanges() > 0;
        }
        catch (Exception ex)
        {
            throw new Exception("Erro ao gravar categoria: " + ex.Message);
        }
    }
}