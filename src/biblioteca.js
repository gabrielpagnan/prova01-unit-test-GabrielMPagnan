class Biblioteca {
  constructor() {
    this.livros = [];
  }

  adicionarLivro(titulo, autor, genero, ano) {
    const livro = { titulo, autor, genero, ano, emprestado: false };
    this.livros.push(livro);
    return livro;
  }

  listarLivros() {
    return this.livros;
  }

  quantidadeLivros() {
    return this.livros.length;
  }

  buscarPorTitulo(titulo) {
    return this.livros.find((livro) => livro.titulo === titulo);
  }

  buscarPorAutor(autor) {
    return this.livros.find((livro) => livro.autor === autor);
  }

  removerLivro(titulo) {
    const posicao = this.livros.findIndex((livro) => livro.titulo === titulo);

    if (posicao === -1) return false;

    this.livros.splice(posicao, 1);
    return true;
  }

  editarAutor(titulo, novoAutor) {
    const livro = this.buscarPorTitulo(titulo);

    if (!livro) return false;

    livro.autor = novoAutor;
    return true;
  }

  possuiLivro(titulo) {
    return this.buscarPorTitulo(titulo) !== undefined;
  }

  emprestarLivro(titulo) {
    const livro = this.buscarPorTitulo(titulo);

    if (!livro || livro.emprestado) return false;

    livro.emprestado = true;
    return true;
  }

  devolverLivro(titulo) {
    const livro = this.buscarPorTitulo(titulo);

    if (!livro || !livro.emprestado) return false;

    livro.emprestado = false;
    return true;
  }

  estaEmprestado(titulo) {
    const livro = this.buscarPorTitulo(titulo);
    return livro ? livro.emprestado : false;
  }

  listarEmprestados() {
    return this.livros.filter((livro) => livro.emprestado);
  }

  listarDisponiveis() {
    return this.livros.filter((livro) => !livro.emprestado);
  }

  filtrarPorGenero(genero) {
    return this.livros.filter((livro) => livro.genero === genero);
  }

  ordenarPorTitulo() {
    return [...this.livros].sort((a, b) => a.titulo.localeCompare(b.titulo));
  }

  ordenarPorAno() {
    return [...this.livros].sort((a, b) => a.ano - b.ano);
  }

  livroMaisAntigo() {
    if (this.livros.length === 0) return undefined;

    return this.ordenarPorAno()[0];
  }

  titulosDosLivros() {
    return this.livros.map((livro) => livro.titulo);
  }

  limparBiblioteca() {
    this.livros = [];
  }

  gerarResumo() {
    return {
      totalLivros: this.quantidadeLivros(),
      totalEmprestados: this.listarEmprestados().length,
      totalDisponiveis: this.listarDisponiveis().length,
    };
  }
}

module.exports = Biblioteca;
