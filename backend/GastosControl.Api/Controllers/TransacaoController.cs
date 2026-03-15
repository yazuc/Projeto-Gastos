using ExpenseControl.Api.Data;
using Microsoft.AspNetCore.Mvc;
namespace ExpenseControl.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacaoController : ControllerBase
{
    private readonly AppDBContext _context;
    private TransacaoBL transacaoBL;
    public TransacaoController(AppDBContext context)
    {
        _context = context;
        transacaoBL = new TransacaoBL(_context);
    }

    [HttpGet("ID")]
    public IActionResult GetById(Guid id)
    {
        var transacao = transacaoBL.Registro(id);
        if (transacao == null)
        {
            return NotFound();
        }
        return Ok(transacao);
    }

    [HttpGet("PessoaID")]
    public IActionResult GetByPessoaId(Guid PessoaID)
    {
        var transacoes = transacaoBL.Listar(PessoaID);
        return Ok(transacoes);
    }
    [HttpPost]
    public IActionResult Post(Transacao transacao)
    {        
        return Ok(transacaoBL.Gravar(transacao));
    }
}