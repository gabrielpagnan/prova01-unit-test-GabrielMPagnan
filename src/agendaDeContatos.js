class AgendaDeContatos {
  constructor() {
    this.contatos = [];
  }

  adicionarContato(nome, telefone, email, cidade) {
    const contato = { nome, telefone, email, cidade, favorito: false };
    this.contatos.push(contato);
    return contato;
  }

  listarContatos() {
    return this.contatos;
  }

  quantidadeContatos() {
    return this.contatos.length;
  }

  buscarPorNome(nome) {
    return this.contatos.find((contato) => contato.nome === nome);
  }

  buscarPorTelefone(telefone) {
    return this.contatos.find((contato) => contato.telefone === telefone);
  }

  removerContato(nome) {
    const posicao = this.contatos.findIndex((contato) => contato.nome === nome);

    if (posicao === -1) return false;

    this.contatos.splice(posicao, 1);
    return true;
  }

  editarTelefone(nome, novoTelefone) {
    const contato = this.buscarPorNome(nome);

    if (!contato) return false;

    contato.telefone = novoTelefone;
    return true;
  }

  editarEmail(nome, novoEmail) {
    const contato = this.buscarPorNome(nome);

    if (!contato) return false;

    contato.email = novoEmail;
    return true;
  }

  possuiContato(nome) {
    return this.buscarPorNome(nome) !== undefined;
  }

  favoritarContato(nome) {
    const contato = this.buscarPorNome(nome);

    if (!contato) return false;

    contato.favorito = true;
    return true;
  }

  desfavoritarContato(nome) {
    const contato = this.buscarPorNome(nome);

    if (!contato) return false;

    contato.favorito = false;
    return true;
  }

  ehFavorito(nome) {
    const contato = this.buscarPorNome(nome);
    return contato ? contato.favorito : false;
  }

  listarFavoritos() {
    return this.contatos.filter((contato) => contato.favorito);
  }

  ordenarPorNome() {
    return [...this.contatos].sort((a, b) => a.nome.localeCompare(b.nome));
  }

  filtrarPorCidade(cidade) {
    return this.contatos.filter((contato) => contato.cidade === cidade);
  }

  limparAgenda() {
    this.contatos = [];
  }

  primeiroContato() {
    return this.contatos[0];
  }

  ultimoContato() {
    return this.contatos[this.contatos.length - 1];
  }

  nomesDosContatos() {
    return this.contatos.map((contato) => contato.nome);
  }

  gerarResumo() {
    return {
      totalContatos: this.quantidadeContatos(),
      totalFavoritos: this.listarFavoritos().length,
    };
  }
}

module.exports = AgendaDeContatos;
