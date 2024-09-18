# Desafio Dev cblab

## Sobre o projeto

A aplicação foi desenvolvida apenas com Angular e inicializada com o auxílio do Angular CLI. Para instalar:

`npm install -g @angular/cli`

A estrutura básica do projeto foi construída por meio do comando `ng new books-api`, portanto os arquivos básicos de configuração e de dependências já foram pré-configurados.

Para subir a aplicação em modo desenvolvimento, basta executar o comando `ng serve` ou o script `npm start` no diretório principal `/books-api`. A aplicação deve estar disponível em `http://localhost:4200`

## Sobre o desafio

Para o desenvolvimento da aplicação, foi utilizada a API do [Google Books](https://developers.google.com/books/docs/v1/using?hl=pt-br).

A aplicação tem dois componentes principais: **página de busca** e **página de livros favoritos**. É possível navegar entre essas páginas clicando nos links presentes no *header* da aplicação.

Dentre as **funcionalidades desenvolvidas**:

Na página de busca:

- buscar livros por título ou autor
- listagem dos resultados obtidos pela busca
- adicionar livro aos favoritos (armazenamento feito também no sessionStorage)
- paginação dos resultados

Na página de favoritos:

- visualização do total de livros adicionados
- visualização dos livros adicionados e as avaliações do usuário (nota e anotações)
- salvar alterações de avaliação do usuário
- filtrar por título ou autor dentro da lista de favoritados
- remoção de livro da lista de favoritos (com auxílio de operadores RxJS)

Foi desenvolvido também um componente para emitir notificações de sucesso ou erro durante alguns eventos.

A **estrutura do projeto** foi separada em camadas organizadas por pastas, a fim de ter uma melhor compreensão da arquitetura. Dentre as camadas principais estão as de *components, services e models*, contidas em `src/app`.

