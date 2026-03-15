using System.ComponentModel.DataAnnotations;

public class Pessoa{
    public Guid Id { get; set; }
    [MaxLength(200)]
    public string Nome { get; set; }
    public int Idade { get; set; }
    public Pessoa()
    {
    }
}