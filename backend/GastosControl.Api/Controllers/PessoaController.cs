using Microsoft.AspNetCore.Mvc;
namespace ExpenseControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    private static List<Pessoa> people = new();

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(people);
    }

    [HttpPost]
    public IActionResult Post(Pessoa pessoa)
    {
        people.Add(pessoa);
        return CreatedAtAction(nameof(Get), new { id = pessoa.Id }, pessoa);
    }
    [HttpPut("{id}")]
    public IActionResult Put(Guid id, Pessoa pessoa)
    {
        var existingPerson = people.FirstOrDefault(p => p.Id == id);
        if (existingPerson == null)
        {
            return NotFound();
        }

        people.Remove(existingPerson);
        people.Add(pessoa);
        return Ok(pessoa);
    }
}
