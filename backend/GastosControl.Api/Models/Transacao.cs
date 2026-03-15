using System.ComponentModel.DataAnnotations;

public class Transacao
{
    public Guid Id { get; set; }
    [MaxLength(400)]
    public string Descricao { get; set; }
    public decimal Valor { get; set; }
    public DateTime Data { get; set; }
    public Guid CategoriaId { get; set; }
    public Guid PessoaId { get; set; }
    public Tipo Tipo { get; set; }
    public virtual Categoria? Categoria { get; set; }
    public virtual Pessoa? Pessoa { get; set; }
    public Transacao()
    {
    }
}