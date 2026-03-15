using GastosControl.Api.Data;
using Microsoft.AspNetCore.Mvc;
namespace GastosControl.Api.Controllers;

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

    [HttpGet("RelatorioTotais")]
    public IActionResult GetRelatorioTotais()
    {
        return Ok(transacaoBL.ObterRelatorioTotaisPorPessoa());
    }

    [HttpGet("RelatorioCategoriaTotais")]
    public IActionResult GetRelatorioCategoriaTotais()
    {
        return Ok(transacaoBL.ObterTotaisPorCategoria());
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(transacaoBL.ListarTodos());
    }

    [HttpGet("Tipo")]
    public IActionResult GetTipos()
    {
        var values = Enum.GetValues(typeof(Tipo))
            .Cast<Tipo>()
            .Select(f => new
            {
                id = (int)f,
                nome = f.ToString()
            });

        return Ok(values);
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