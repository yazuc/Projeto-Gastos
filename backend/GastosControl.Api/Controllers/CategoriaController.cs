using ExpenseControl.Api.Data;
using Microsoft.AspNetCore.Mvc;
namespace ExpenseControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriaController : ControllerBase
{
    private readonly AppDBContext _context;
    public CategoriaBL categoriaBL;
    public CategoriaController(AppDBContext context)
    {
        _context = context;
        categoriaBL = new CategoriaBL(_context);
    }

    [HttpGet("ID")]
    public IActionResult GetById(Guid id)
    {
        var categoria = categoriaBL.Registro(id);
        if (categoria == null)
        {
            return NotFound();
        }
        return Ok(categoria);
    }

    [HttpGet]
    public IActionResult Get()
    {        
        return Ok(categoriaBL.Listar());
    }

    [HttpPost]
    public IActionResult Post(Categoria categoria)
    {        
        return Ok(categoriaBL.Gravar(categoria));
    }
}