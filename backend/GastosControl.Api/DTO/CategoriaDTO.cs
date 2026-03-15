using Microsoft.OpenApi.Extensions;

namespace GastosControl.DTO;
public class CategoriaDTO
{
    public Guid Id { get; set; }
    public string Descricao { get; set; }
    public string Finalidade { get; set; }
    public Finalidade FinalidadeEnum { get; set; }

    public CategoriaDTO(Guid id, string descricao, Finalidade finalidadeEnum)
    {
        Id = id;
        Descricao = descricao;
        Finalidade = finalidadeEnum.GetDisplayName();
        FinalidadeEnum = finalidadeEnum;
    }
}