public class TotaisCategoriaDTO
{
    public string NomeCategoria { get; set; }
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    
    // Propriedade calculada para facilitar no C# ou no JSON
    public decimal Saldo => TotalReceitas - TotalDespesas;
}