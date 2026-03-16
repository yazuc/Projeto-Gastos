# Tecnologias usadas
**Frontend**
* Vite
* React
* TypeScript
* Bootstrap
  
**Backend**
* C#
* .Net 8
* EF
* SQlite3
* DBeaver

# Instruções para rodar

## 1. Inicializando o Backend 

O projeto utiliza o SQLite, que criará o banco automaticamente caso ele não exista na pasta.

### Inicie o servidor .NET

Abra um terminal dentro da pasta raíz do projeto e execute:

cd backend/GastosControl.Api

dotnet run

> A API ficará disponível em `http://localhost:5084`. O Swagger pode ser acessado em `/swagger`.

## 2. Inicializando o Frontend

Abra **outro** terminal na pasta raiz do projeto e execute:

### Acesse a pasta do Frontend
cd frontend/gastos-control-web

### Instale as dependências do Node 
npm install

### Inicie o servidor de desenvolvimento
npm run dev

> O Frontend ficará disponível em `http://localhost:5173`. 
