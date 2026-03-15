public class RelatorioGeralDTO
{
    public List<TotaisPessoaDTO> Pessoas { get; set; }
    public decimal TotalGeralReceitas { get; set; }
    public decimal TotalGeralDespesas { get; set; }
    public decimal SaldoLiquidoGeral { get; set; }
}