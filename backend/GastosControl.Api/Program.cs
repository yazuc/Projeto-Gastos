using Microsoft.EntityFrameworkCore;
using ExpenseControl.Api.Data;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDBContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();
app.UseCors("AllowReact");
app.MapControllers();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.Run();

//Exemplo abaixo usado apenas para fazer a primeira ligação entre React e .NET, a fins de testar a comunicação.
//Lista fake para teste
// var people = new List<Person>
// {
//     new Person(Guid.NewGuid(), "Leonardo", 25),
//     new Person(Guid.NewGuid(), "Maria", 30),
//     new Person(Guid.NewGuid(), "Carlos", 17)
// };

// // Endpoint que o React espera
// app.MapGet("/api/person", () =>
// {
//     return people;
// })
// .WithName("GetPeople")
// .WithOpenApi();




// // Modelo de Pessoa
// record Person(Guid Id, string Name, int Age);



