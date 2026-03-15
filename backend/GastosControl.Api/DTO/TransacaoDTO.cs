using System.ComponentModel.DataAnnotations;

public class TransacaoDTO
{
    public Guid Id { get; set; }
    [MaxLength(400)]
    public string Descricao { get; set; }
    public decimal Valor { get; set; }
    public DateTime Data { get; set; }
    public string Categoria { get; set; }
    public string Pessoa { get; set; }
    public Tipo Tipo { get; set; }

    public TransacaoDTO(Guid id, string desc, decimal valor, DateTime data, string cate, string pessoa, Tipo tipo)
    {
        Id = id;
        Descricao = desc;
        Valor = valor;
        Data = data;
        Categoria = cate;
        Pessoa = pessoa;
        Tipo = tipo;
    }
}