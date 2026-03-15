using Microsoft.AspNetCore.Mvc;
namespace ExpenseControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    private static List<Pessoa> people = new()
    {
        new Pessoa(Guid.NewGuid(), "Leonardo", 25),
        new Pessoa(Guid.NewGuid(), "Maria", 30),
        new Pessoa(Guid.NewGuid(), "Carlos", 17)
    };

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(people);
    }
}
