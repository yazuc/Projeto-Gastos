public class Pessoa{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }

    public Pessoa(Guid id, string name, int age)
    {
        Id = id;
        Name = name;
        Age = age;
    }
}