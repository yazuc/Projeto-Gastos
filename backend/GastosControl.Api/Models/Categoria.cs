using System.ComponentModel.DataAnnotations;

public class Categoria
{
    public Guid Id { get; set; }
    [MaxLength(400)]
    public string Descricao { get; set; }
    public Finalidade Finalidade { get; set; }
    public Categoria()
    {
    }
}