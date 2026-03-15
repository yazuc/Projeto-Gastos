using ExpenseControl.Api.Data;
using Microsoft.AspNetCore.Mvc;
namespace ExpenseControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    private readonly AppDBContext _context;
    private PessoaBL pessoaBL;   
    public PessoaController(AppDBContext context)
    {
        _context = context;
        pessoaBL = new PessoaBL(_context);
    }

    [HttpGet("ID")]
    public IActionResult GetById(Guid id)
    {
        var pessoa = pessoaBL.Registro(id);
        if (pessoa == null)
        {
            return NotFound();
        }
        return Ok(pessoa);
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(pessoaBL.Listar());
    }

    [HttpPost]
    public IActionResult Post(Pessoa pessoa)
    {        
        return Ok(pessoaBL.Gravar(pessoa));
    }
    [HttpPut("{id}")]
    public IActionResult Put(Guid id, Pessoa pessoa)
    {
        if (id != pessoa.Id)
        {
            return BadRequest("ID da pessoa não corresponde ao ID do parâmetro.");
        }
        return Ok(pessoaBL.Atualizar(pessoa));
    }
    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {      
        return Ok(pessoaBL.Excluir(id));
    }
}
