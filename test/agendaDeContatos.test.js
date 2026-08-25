const AgendaDeContatos = require("../src/agendaDeContatos");

describe("AgendaDeContatos", () => {
  let agenda;

  beforeEach(() => {
    agenda = new AgendaDeContatos();
  });

  test("deve adicionar um contato", () => {
    // Act
    const contato = agenda.adicionarContato(
      "Ana",
      "9999-1111",
      "ana@email.com",
      "Criciúma",
    );

    // Assert
    expect(contato).toEqual({
      nome: "Ana",
      telefone: "9999-1111",
      email: "ana@email.com",
      cidade: "Criciúma",
      favorito: false,
    });
  });

  test("deve listar todos os contatos", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");
    agenda.adicionarContato("Bruno", "2222", "bruno@email.com", "Tubarão");

    // Act
    const contatos = agenda.listarContatos();

    // Assert
    expect(contatos).toHaveLength(2);
  });

  test("deve informar a quantidade de contatos", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");
    agenda.adicionarContato("Bruno", "2222", "bruno@email.com", "Tubarão");

    // Act
    const quantidade = agenda.quantidadeContatos();

    // Assert
    expect(quantidade).toBe(2);
  });

  test("deve buscar um contato pelo nome", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");

    // Act
    const contato = agenda.buscarPorNome("Ana");

    // Assert
    expect(contato.telefone).toBe("1111");
  });

  test("deve buscar um contato pelo telefone", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");

    // Act
    const contato = agenda.buscarPorTelefone("1111");

    // Assert
    expect(contato.nome).toBe("Ana");
  });

  test("deve remover um contato", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");

    // Act
    const removeu = agenda.removerContato("Ana");

    // Assert
    expect(removeu).toBe(true);
    expect(agenda.quantidadeContatos()).toBe(0);
  });

  test("deve editar o telefone de um contato", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");

    // Act
    const editou = agenda.editarTelefone("Ana", "9999");

    // Assert
    expect(editou).toBe(true);
    expect(agenda.buscarPorNome("Ana").telefone).toBe("9999");
  });

  test("deve editar o e-mail de um contato", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");

    // Act
    const editou = agenda.editarEmail("Ana", "novo@email.com");

    // Assert
    expect(editou).toBe(true);
    expect(agenda.buscarPorNome("Ana").email).toBe("novo@email.com");
  });

  test("deve informar se um contato existe", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");

    // Act
    const existe = agenda.possuiContato("Ana");

    // Assert
    expect(existe).toBe(true);
  });

  test("deve marcar um contato como favorito", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");

    // Act
    const favoritou = agenda.favoritarContato("Ana");

    // Assert
    expect(favoritou).toBe(true);
    expect(agenda.buscarPorNome("Ana").favorito).toBe(true);
  });

  test("deve desmarcar um contato favorito", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");
    agenda.favoritarContato("Ana");

    // Act
    const desfavoritou = agenda.desfavoritarContato("Ana");

    // Assert
    expect(desfavoritou).toBe(true);
    expect(agenda.buscarPorNome("Ana").favorito).toBe(false);
  });

  test("deve informar se um contato é favorito", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");
    agenda.favoritarContato("Ana");

    // Act
    const favorito = agenda.ehFavorito("Ana");

    // Assert
    expect(favorito).toBe(true);
  });

  test("deve listar somente os contatos favoritos", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");
    agenda.adicionarContato("Bruno", "2222", "bruno@email.com", "Tubarão");
    agenda.favoritarContato("Ana");

    // Act
    const favoritos = agenda.listarFavoritos();

    // Assert
    expect(favoritos).toHaveLength(1);
    expect(favoritos[0].nome).toBe("Ana");
  });

  test("deve ordenar os contatos pelo nome", () => {
    // Arrange
    agenda.adicionarContato("Carlos", "3333", "carlos@email.com", "Laguna");
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");
    agenda.adicionarContato("Bruno", "2222", "bruno@email.com", "Tubarão");

    // Act
    const contatosOrdenados = agenda.ordenarPorNome();

    // Assert
    expect(contatosOrdenados.map((contato) => contato.nome)).toEqual([
      "Ana",
      "Bruno",
      "Carlos",
    ]);
  });

  test("deve filtrar os contatos pela cidade", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");
    agenda.adicionarContato("Bruno", "2222", "bruno@email.com", "Tubarão");
    agenda.adicionarContato("Carlos", "3333", "carlos@email.com", "Criciúma");

    // Act
    const contatos = agenda.filtrarPorCidade("Criciúma");

    // Assert
    expect(contatos).toHaveLength(2);
  });

  test("deve limpar todos os contatos da agenda", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");
    agenda.adicionarContato("Bruno", "2222", "bruno@email.com", "Tubarão");

    // Act
    agenda.limparAgenda();

    // Assert
    expect(agenda.quantidadeContatos()).toBe(0);
  });

  test("deve retornar o primeiro contato", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");
    agenda.adicionarContato("Bruno", "2222", "bruno@email.com", "Tubarão");

    // Act
    const contato = agenda.primeiroContato();

    // Assert
    expect(contato.nome).toBe("Ana");
  });

  test("deve retornar o último contato", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");
    agenda.adicionarContato("Bruno", "2222", "bruno@email.com", "Tubarão");

    // Act
    const contato = agenda.ultimoContato();

    // Assert
    expect(contato.nome).toBe("Bruno");
  });

  test("deve retornar os nomes dos contatos", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");
    agenda.adicionarContato("Bruno", "2222", "bruno@email.com", "Tubarão");

    // Act
    const nomes = agenda.nomesDosContatos();

    // Assert
    expect(nomes).toEqual(["Ana", "Bruno"]);
  });

  test("deve gerar um resumo da agenda", () => {
    // Arrange
    agenda.adicionarContato("Ana", "1111", "ana@email.com", "Criciúma");
    agenda.adicionarContato("Bruno", "2222", "bruno@email.com", "Tubarão");
    agenda.favoritarContato("Ana");

    // Act
    const resumo = agenda.gerarResumo();

    // Assert
    expect(resumo).toEqual({ totalContatos: 2, totalFavoritos: 1 });
  });
});
