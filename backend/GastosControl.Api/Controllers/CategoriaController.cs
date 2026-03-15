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

    [HttpGet("finalidades")]
    public IActionResult GetFinalidades()
    {
        var values = Enum.GetValues(typeof(Finalidade))
            .Cast<Finalidade>()
            .Select(f => new
            {
                id = (int)f,
                nome = f.ToString()
            });

        return Ok(values);
    }

    [HttpGet("ListarDTO")]
    public IActionResult GetDTO()
    {
        return Ok(categoriaBL.ListarDTO());
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