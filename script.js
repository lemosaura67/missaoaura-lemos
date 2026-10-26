
const perfis = [
  {
    id: 1,
    nome: "Engenheiro de Sistemas",
    categoria: "Construção",
    descricao:
      "Você gosta de criar soluções, organizar sistemas e transformar ideias em projetos funcionais. Sua lógica e criatividade ajudam a construir o futuro da Missão Aura.",
    recomendacao:
      "Desenvolva suas habilidades em programação, robótica e resolução de problemas.",
    imagem: "img/perfil-1.jpg"
  },
  {
    id: 2,
    nome: "Cientista",
    categoria: "Investigação",
    descricao:
      "Você é curioso, observador e gosta de descobrir como as coisas funcionam. Sua vontade de aprender pode revelar respostas para os maiores mistérios do universo.",
    recomendacao:
      "Explore as ciências, faça experimentos e pratique a análise de informações.",
    imagem: "img/perfil2.jpg"
  },
  {
    id: 3,
    nome: "Explorador",
    categoria: "Exploração",
    descricao:
      "Você gosta de aventuras, desafios e descobertas. Sua iniciativa e capacidade de adaptação ajudam a equipe a enfrentar situações desconhecidas.",
    recomendacao:
      "Pratique trabalho em equipe, orientação espacial e planejamento de expedições.",
    imagem: "img/perfil3.jpg"
  },
  {
    id: 4,
    nome: "Estrategista",
    categoria: "Planejamento",
    descricao:
      "Você pensa antes de agir, considera diferentes possibilidades e ajuda a equipe a tomar decisões. Sua organização é essencial para o sucesso da missão.",
    recomendacao:
      "Desenvolva liderança, comunicação e estratégias para resolver problemas.",
    imagem: "img/perfil4.jpg"
  }
];

// Calcula a idade considerando se o aniversário já aconteceu neste ano.
function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento + "T00:00:00");

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  const aindaNaoFezAniversario =
    hoje.getMonth() < nascimento.getMonth() ||
    (
      hoje.getMonth() === nascimento.getMonth() &&
      hoje.getDate() < nascimento.getDate()
    );

  if (aindaNaoFezAniversario) {
    idade--;
  }

  return idade;
}

// Verifica se a data de nascimento é válida e não está no futuro.
function validarNascimento(dataNascimento) {
  if (!dataNascimento) {
    return false;
  }

  const nascimento = new Date(dataNascimento + "T00:00:00");
  const hoje = new Date();

  hoje.setHours(0, 0, 0, 0);

  return (
    !Number.isNaN(nascimento.getTime()) &&
    nascimento <= hoje
  );
}

// Descobre o perfil a partir das respostas selecionadas.
function descobrirPerfil(respostas) {
  const pontuacoes = [0, 0, 0, 0];

  respostas.forEach(function (resposta) {
    const indice = Number(resposta) - 1;

    if (indice >= 0 && indice < pontuacoes.length) {
      pontuacoes[indice]++;
    }
  });

  const maiorPontuacao = Math.max(...pontuacoes);

  const vencedores = pontuacoes
    .map(function (pontuacao, indice) {
      return {
        indice: indice,
        pontuacao: pontuacao
      };
    })
    .filter(function (item) {
      return item.pontuacao === maiorPontuacao;
    });

  // Se houver empate, informa que não existe um único perfil vencedor.
  if (vencedores.length > 1) {
    return {
      empate: true,
      pontuacoes: pontuacoes
    };
  }

  const perfilEncontrado = perfis[vencedores[0].indice];

  return {
    empate: false,
    perfil: perfilEncontrado,
    pontuacoes: pontuacoes
  };
}

// Exibe o resultado na página.
function mostrarResultado(nome, idade, resultadoPerfil) {
  const resultado = document.getElementById("resultado");
  const dadosParticipante = document.getElementById("dadosParticipante");
  const nomePerfil = document.getElementById("nomePerfil");
  const categoriaPerfil = document.getElementById("categoriaPerfil");
  const descricaoPerfil = document.getElementById("descricaoPerfil");
  const textoRecomendacao = document.getElementById("textoRecomendacao");
  const imagemPerfil = document.getElementById("imagemPerfil");

  // Confere se os elementos necessários existem no HTML.
  if (
    !resultado ||
    !dadosParticipante ||
    !nomePerfil ||
    !categoriaPerfil ||
    !descricaoPerfil ||
    !textoRecomendacao ||
    !imagemPerfil
  ) {
    console.error(
      "Não foi possível encontrar um ou mais elementos do resultado. Confira os IDs no index.html."
    );
    return;
  }

  dadosParticipante.textContent =
    nome + ", " + idade + " anos";

  resultado.hidden = false;

  if (resultadoPerfil.empate) {
    nomePerfil.textContent = "Perfil em equilíbrio!";
    categoriaPerfil.textContent = "Múltiplas habilidades";
    descricaoPerfil.textContent =
      "Suas respostas mostram características de diferentes áreas da Missão Aura. Você pode combinar habilidades e contribuir de várias maneiras para a equipe.";
    textoRecomendacao.textContent =
      "Experimente diferentes atividades e descubra quais áreas mais despertam seu interesse."
      imagem: "img/perfil.jpg";

    imagemPerfil.hidden = true;
    imagemPerfil.removeAttribute("src");
  } else {
    const perfil = resultadoPerfil.perfil;

    nomePerfil.textContent = perfil.nome;
    categoriaPerfil.textContent = perfil.categoria;
    descricaoPerfil.textContent = perfil.descricao;
    textoRecomendacao.textContent = perfil.recomendacao;

    imagemPerfil.hidden = false;
    imagemPerfil.alt = "Imagem do perfil " + perfil.nome;
    imagemPerfil.src = perfil.imagem;

    imagemPerfil.onerror = function () {
      console.error(
        "Não foi possível carregar a imagem: " + perfil.imagem
      );
      imagemPerfil.hidden = true;
    };

    imagemPerfil.onload = function () {
      imagemPerfil.hidden = false;
    };
  }

  resultado.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// Executa quando o formulário é enviado.
const formulario = document.getElementById("formulario");

if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const campoNome = document.getElementById("nome");
    const campoNascimento = document.getElementById("nascimento");
    const mensagem = document.getElementById("mensagem");

    if (!campoNome || !campoNascimento || !mensagem) {
      console.error(
        "Confira se os campos nome, nascimento e mensagem existem no HTML."
      );
      return;
    }

    const nome = campoNome.value.trim();
    const dataNascimento = campoNascimento.value;

    mensagem.textContent = "";

    if (nome === "") {
      mensagem.textContent = "Digite seu nome para continuar.";
      campoNome.focus();
      return;
    }

    if (!validarNascimento(dataNascimento)) {
      mensagem.textContent =
        "Informe uma data de nascimento válida, que não esteja no futuro.";
      campoNascimento.focus();
      return;
    }

    // Lê as quatro respostas selecionadas.
    const perguntas = ["p1", "p2", "p3", "p4"];
    const respostas = [];

    for (const pergunta of perguntas) {
      const selecionada = document.querySelector(
        'input[name="' + pergunta + '"]:checked'
      );

      if (!selecionada) {
        mensagem.textContent =
          "Responda às quatro perguntas antes de descobrir seu perfil.";
        return;
      }

      respostas.push(selecionada.value);
    }

    const idade = calcularIdade(dataNascimento);
    const resultadoPerfil = descobrirPerfil(respostas);

    mostrarResultado(nome, idade, resultadoPerfil);
  });
}

// Botão que permite refazer o teste.
const botaoRefazer = document.getElementById("refazer");

if (botaoRefazer) {
  botaoRefazer.addEventListener("click", function () {
    if (formulario) {
      formulario.reset();
    }

    const resultado = document.getElementById("resultado");
    const mensagem = document.getElementById("mensagem");

    if (resultado) {
      resultado.hidden = true;
    }

    if (mensagem) {
      mensagem.textContent = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

