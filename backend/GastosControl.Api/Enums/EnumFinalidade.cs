using System.ComponentModel.DataAnnotations;

public enum Finalidade
{
    Indefinido,
    [Display(Name = "Despesas")]
    Despesas,
    [Display(Name = "Receita")]
    Receita,
    [Display(Name = "Ambos")]
    Ambos    
}