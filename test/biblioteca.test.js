const Biblioteca = require("../src/biblioteca");

describe("Biblioteca", () => {
  let biblioteca;

  beforeEach(() => {
    biblioteca = new Biblioteca();
  });

  test("deve adicionar um livro", () => {
    // Act
    const livro = biblioteca.adicionarLivro(
      "Dom Casmurro",
      "Machado de Assis",
      "Romance",
      1899,
    );

    // Assert
    expect(livro).toEqual({
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      genero: "Romance",
      ano: 1899,
      emprestado: false,
    });
  });

  test("deve listar todos os livros", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);
    biblioteca.adicionarLivro("O Cortiço", "Aluísio", "Naturalismo", 1890);

    // Act
    const livros = biblioteca.listarLivros();

    // Assert
    expect(livros).toHaveLength(2);
  });

  test("deve informar a quantidade de livros", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);
    biblioteca.adicionarLivro("O Cortiço", "Aluísio", "Naturalismo", 1890);

    // Act
    const quantidade = biblioteca.quantidadeLivros();

    // Assert
    expect(quantidade).toBe(2);
  });

  test("deve buscar um livro pelo título", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);

    // Act
    const livro = biblioteca.buscarPorTitulo("Dom Casmurro");

    // Assert
    expect(livro.autor).toBe("Machado");
  });

  test("deve buscar um livro pelo autor", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);

    // Act
    const livro = biblioteca.buscarPorAutor("Machado");

    // Assert
    expect(livro.titulo).toBe("Dom Casmurro");
  });

  test("deve remover um livro", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);

    // Act
    const removeu = biblioteca.removerLivro("Dom Casmurro");

    // Assert
    expect(removeu).toBe(true);
    expect(biblioteca.quantidadeLivros()).toBe(0);
  });

  test("não deve remover um livro inexistente", () => {
    // Act
    const removeu = biblioteca.removerLivro("Inexistente");

    // Assert
    expect(removeu).toBe(false);
  });

  test("deve editar o autor de um livro", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);

    // Act
    const editou = biblioteca.editarAutor("Dom Casmurro", "Machado de Assis");

    // Assert
    expect(editou).toBe(true);
    expect(biblioteca.buscarPorTitulo("Dom Casmurro").autor).toBe(
      "Machado de Assis",
    );
  });

  test("não deve editar o autor de um livro inexistente", () => {
    // Act
    const editou = biblioteca.editarAutor("Inexistente", "Autor");

    // Assert
    expect(editou).toBe(false);
  });

  test("deve informar se um livro existe", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);

    // Act
    const existe = biblioteca.possuiLivro("Dom Casmurro");

    // Assert
    expect(existe).toBe(true);
  });

  test("deve emprestar um livro disponível", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);

    // Act
    const emprestou = biblioteca.emprestarLivro("Dom Casmurro");

    // Assert
    expect(emprestou).toBe(true);
    expect(biblioteca.buscarPorTitulo("Dom Casmurro").emprestado).toBe(true);
  });

  test("não deve emprestar um livro já emprestado", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);
    biblioteca.emprestarLivro("Dom Casmurro");

    // Act
    const emprestou = biblioteca.emprestarLivro("Dom Casmurro");

    // Assert
    expect(emprestou).toBe(false);
  });

  test("deve devolver um livro emprestado", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);
    biblioteca.emprestarLivro("Dom Casmurro");

    // Act
    const devolveu = biblioteca.devolverLivro("Dom Casmurro");

    // Assert
    expect(devolveu).toBe(true);
    expect(biblioteca.buscarPorTitulo("Dom Casmurro").emprestado).toBe(false);
  });

  test("não deve devolver um livro que não está emprestado", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);

    // Act
    const devolveu = biblioteca.devolverLivro("Dom Casmurro");

    // Assert
    expect(devolveu).toBe(false);
  });

  test("deve informar se um livro está emprestado", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);
    biblioteca.emprestarLivro("Dom Casmurro");

    // Act
    const emprestado = biblioteca.estaEmprestado("Dom Casmurro");

    // Assert
    expect(emprestado).toBe(true);
    expect(biblioteca.estaEmprestado("Inexistente")).toBe(false);
  });

  test("deve listar somente os livros emprestados", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);
    biblioteca.adicionarLivro("O Cortiço", "Aluísio", "Naturalismo", 1890);
    biblioteca.emprestarLivro("Dom Casmurro");

    // Act
    const emprestados = biblioteca.listarEmprestados();

    // Assert
    expect(emprestados).toHaveLength(1);
    expect(emprestados[0].titulo).toBe("Dom Casmurro");
  });

  test("deve listar somente os livros disponíveis", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);
    biblioteca.adicionarLivro("O Cortiço", "Aluísio", "Naturalismo", 1890);
    biblioteca.emprestarLivro("Dom Casmurro");

    // Act
    const disponiveis = biblioteca.listarDisponiveis();

    // Assert
    expect(disponiveis).toHaveLength(1);
    expect(disponiveis[0].titulo).toBe("O Cortiço");
  });

  test("deve filtrar os livros pelo gênero", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);
    biblioteca.adicionarLivro("Iracema", "Alencar", "Romance", 1865);
    biblioteca.adicionarLivro("O Cortiço", "Aluísio", "Naturalismo", 1890);

    // Act
    const livros = biblioteca.filtrarPorGenero("Romance");

    // Assert
    expect(livros).toHaveLength(2);
  });

  test("deve ordenar os livros pelo título", () => {
    // Arrange
    biblioteca.adicionarLivro("Iracema", "Alencar", "Romance", 1865);
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);
    biblioteca.adicionarLivro("O Cortiço", "Aluísio", "Naturalismo", 1890);

    // Act
    const ordenados = biblioteca.ordenarPorTitulo();

    // Assert
    expect(ordenados.map((livro) => livro.titulo)).toEqual([
      "Dom Casmurro",
      "Iracema",
      "O Cortiço",
    ]);
  });

  test("deve ordenar os livros pelo ano", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);
    biblioteca.adicionarLivro("Iracema", "Alencar", "Romance", 1865);
    biblioteca.adicionarLivro("O Cortiço", "Aluísio", "Naturalismo", 1890);

    // Act
    const ordenados = biblioteca.ordenarPorAno();

    // Assert
    expect(ordenados.map((livro) => livro.ano)).toEqual([1865, 1890, 1899]);
  });

  test("deve retornar o livro mais antigo", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);
    biblioteca.adicionarLivro("Iracema", "Alencar", "Romance", 1865);

    // Act
    const livro = biblioteca.livroMaisAntigo();

    // Assert
    expect(livro.titulo).toBe("Iracema");
  });

  test("não deve retornar livro mais antigo com a biblioteca vazia", () => {
    // Act
    const livro = biblioteca.livroMaisAntigo();

    // Assert
    expect(livro).toBeUndefined();
  });

  test("deve retornar os títulos dos livros", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);
    biblioteca.adicionarLivro("O Cortiço", "Aluísio", "Naturalismo", 1890);

    // Act
    const titulos = biblioteca.titulosDosLivros();

    // Assert
    expect(titulos).toEqual(["Dom Casmurro", "O Cortiço"]);
  });

  test("deve limpar todos os livros da biblioteca", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);
    biblioteca.adicionarLivro("O Cortiço", "Aluísio", "Naturalismo", 1890);

    // Act
    biblioteca.limparBiblioteca();

    // Assert
    expect(biblioteca.quantidadeLivros()).toBe(0);
  });

  test("deve gerar um resumo da biblioteca", () => {
    // Arrange
    biblioteca.adicionarLivro("Dom Casmurro", "Machado", "Romance", 1899);
    biblioteca.adicionarLivro("O Cortiço", "Aluísio", "Naturalismo", 1890);
    biblioteca.emprestarLivro("Dom Casmurro");

    // Act
    const resumo = biblioteca.gerarResumo();

    // Assert
    expect(resumo).toEqual({
      totalLivros: 2,
      totalEmprestados: 1,
      totalDisponiveis: 1,
    });
  });
});
