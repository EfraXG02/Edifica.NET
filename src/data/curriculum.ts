import { CurriculumModule } from '../types';

export const CURRICULUM_MODULES: CurriculumModule[] = [
  // ==========================================================
  // ÁREA 0: FUNDAMENTOS DO ZERO ABSOLUTO (PENSAMENTO COMPUTACIONAL)
  // Feito para qualquer pessoa (construção, pedreira, serviços, transição de carreira)
  // ==========================================================
  {
    id: 'fund-01-brick-to-code',
    trackId: 'fundamentos',
    order: 1,
    title: 'O que é Programar? Do Tijolo ao Algoritmo',
    subtitle: 'Variáveis como caixas etiquetadas, tipos de dados e a receita da máquina',
    level: 'Iniciante Zero',
    estimatedMinutes: 20,
    academicObjective: 'Compreender a natureza de um algoritmo computacional, o papel da memória e como tipos de dados representam informações do mundo real.',
    realWorldAnalogy: {
      headline: 'A Construção de um Muro e a Receita de Pão',
      analogyText: 'Na pedreira ou na construção civil, ninguém ergue uma parede jogando cimento aleatoriamente no ar. Há uma sequência exata: 1) cavar a vala, 2) bater o cimento com areia e água na proporção correta, 3) alinhar o primeiro bloco no prumo, 4) assentar linha por linha.',
      dailyLifeComparison: 'Um programa de computador é apenas essa folha de instruções passo a passo. Uma "variável" nada mais é que um balde com uma etiqueta colada: um balde rotulado "Cimento" só aceita cimento (número inteiro); um balde rotulado "NomeDoCliente" guarda texto.'
    },
    theory: {
      overview: 'Programar não é mágica nem matemática alienígena: é a habilidade de dar ordens extremamente claras, lógicas e sequenciais para uma máquina que sabe apenas executar o que você manda.',
      sections: [
        {
          title: '1. O Computador é um Ajudante Rápido, mas que Precisa de Ordens Claras',
          content: 'Se você disser a um ajudante: "traga a massa", ele sabe o que fazer. O computador não tem intuição: se você não disser qual massa, quantos quilos e onde colocar, ele trava. Um algoritmo é uma sequência numerada de passos que resolve um problema específico.',
          codeSnippet: `// Instruções claras linha por linha em C#
Console.WriteLine("Iniciando o turno de trabalho...");

int sacosDeCimento = 10;
string responsavelObra = "Seu Antenor";
double pesoTotalToneladas = 0.5;

Console.WriteLine($"Responsável: {responsavelObra} | Sacos disponíveis: {sacosDeCimento}");`,
          codeLanguage: 'csharp',
          keyTakeaway: 'O computador lê o código sempre de cima para baixo, linha após linha, executando cada instrução.'
        },
        {
          title: '2. Variáveis: Caixas com Etiqueta e Tamanho Certo',
          content: 'No canteiro de obras, você não guarda brita numa garrafa de vidro. Na programação, cada tipo de dado tem seu recipiente adequado:\n- int: números inteiros (ex: 5 tijolos, 12 operários)\n- double ou decimal: números com vírgula ou dinheiro (ex: R$ 1450.50, 3.75 metros)\n- string: frases e textos entre aspas (ex: "Cimento Votoran")\n- bool: verdadeiro ou falso (ex: true para "obra liberada", false para "em embargo")',
          codeSnippet: `int quantidadeTijolos = 5000;
decimal precoUnitario = 1.25m;
bool entregaConfirmada = true;
string enderecoObra = "Av. das Indústrias, 400";`,
          codeLanguage: 'csharp'
        }
      ],
      interviewTip: 'Lembre-se: em TI, um bom engenheiro não é quem decora palavras difíceis, mas quem sabe quebrar um problema do mundo real em pequenas etapas simples.',
      blazorConnection: 'No Blazor, variáveis são os dados que mudam na tela quando o usuário clica ou digita (como o saldo de materiais ou o nome do aluno).'
    },
    quiz: [
      {
        id: 'qf-1',
        question: 'O que é uma "variável" na programação de computadores?',
        options: [
          'Um vírus de computador que altera senhas.',
          'Um espaço reservado na memória do computador com nome e tipo definido para guardar um valor que pode mudar durante a execução.',
          'Um cabo de rede ligado na tomada.',
          'Um comando que desliga a tela do monitor.'
        ],
        correctOptionIndex: 1,
        explanation: 'Assim como uma gaveta etiquetada "Ferramentas", uma variável reserva um lugar na memória RAM para guardar um dado específico.',
      },
      {
        id: 'qf-2',
        question: 'Qual tipo de dado é o mais adequado em C# para armazenar o valor monetário de um orçamento (ex: R$ 2.450,75)?',
        options: [
          'string',
          'bool',
          'decimal',
          'int'
        ],
        correctOptionIndex: 2,
        explanation: 'O tipo decimal em C# possui 128 bits e precisão exata para cálculos financeiros e comerciais sem erros de arredondamento.',
      }
    ],
    challenge: {
      title: 'Calculador de Materiais de Construção',
      instructions: 'Escreva um método estático `CalcularCustoTotal` que receba:\n- `int quantidadeSacos`\n- `decimal precoPorSaco`\n- `decimal taxaFrete`\nO método deve calcular e retornar o custo total multiplicando os sacos pelo preço unitário e somando o frete.',
      starterCode: `public static class CalculadoraMateriais
{
    public static decimal CalcularCustoTotal(int quantidadeSacos, decimal precoPorSaco, decimal taxaFrete)
    {
        // TODO: Calcule: (quantidadeSacos * precoPorSaco) + taxaFrete
        return 0m;
    }
}`,
      solutionCode: `public static class CalculadoraMateriais
{
    public static decimal CalcularCustoTotal(int quantidadeSacos, decimal precoPorSaco, decimal taxaFrete)
    {
        return (quantidadeSacos * precoPorSaco) + taxaFrete;
    }
}`,
      hints: [
        'Multiplique os sacos pelo preço: quantidadeSacos * precoPorSaco',
        'Some a taxa de frete no resultado final.',
        'Retorne o valor decimal com a palavra-chave return.'
      ],
      testCases: [
        {
          name: 'Teste 1: Cálculo correto de multiplicação e frete',
          description: '10 sacos a R$ 30,00 com frete de R$ 50,00 deve resultar em R$ 350,00.',
          validator: (code) => {
            const hasMath = code.includes('*') && code.includes('+') && code.includes('taxaFrete');
            return {
              passed: hasMath,
              message: hasMath ? 'Expressão aritmética calculada com sucesso.' : 'Multiplique a quantidade pelo preço e adicione o frete.'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 0,
      componentName: 'App.razor & Program.cs',
      featureDescription: 'Fundação inicial e ponto de partida do runtime WebAssembly.',
      linesOfCodeAdded: 30
    }
  },

  {
    id: 'fund-02-decisions-if-else',
    trackId: 'fundamentos',
    order: 2,
    title: 'Tomando Decisões na Obra: If, Else e Comparações',
    subtitle: 'Condicionais, controle de segurança e regras do dia a dia',
    level: 'Iniciante Zero',
    estimatedMinutes: 20,
    academicObjective: 'Dominar o fluxo de controle condicional (if / else if / else) e operadores lógicos relacionais (>, <, ==, !=, &&, ||).',
    realWorldAnalogy: {
      headline: 'A Checagem de Segurança dos Equipamentos (EPI)',
      analogyText: 'Na entrada de qualquer fábrica ou canteiro de obras, existe uma regra clara: "SE o trabalhador estiver de capacete e bota, libere a entrada; SENÃO, bloqueie o acesso e emita um aviso".',
      dailyLifeComparison: 'O comando "if" é exatamente a palavra "SE". O comando "else" é a palavra "SENÃO". Você já pensa em lógica condicional todos os dias ao decidir se leva guarda-chuva ou se precisa abastecer o caminhão.'
    },
    theory: {
      overview: 'Os programas se tornam inteligentes quando conseguem tomar decisões com base nos dados que recebem dos sensores, do usuário ou do banco de dados.',
      sections: [
        {
          title: '1. A Estrutura Básica do IF e ELSE',
          content: 'O bloco dentro do if só é executado se a condição for VERDADEIRA (true). Se for falsa, o programa pula para o else.',
          codeSnippet: `int estoqueAreiaToneladas = 2;

if (estoqueAreiaToneladas < 5)
{
    Console.WriteLine("ALERTA: Estoque baixo! Fazer pedido à distribuidora.");
}
else
{
    Console.WriteLine("Estoque suficiente para o dia de trabalho.");
}`,
          codeLanguage: 'csharp'
        },
        {
          title: '2. Operadores Lógicos: E (&&) e OU (||)',
          content: 'Muitas vezes precisamos checar duas coisas ao mesmo tempo:\n- && (E): ambas as condições precisam ser verdadeiras.\n- || (OU): basta que uma das duas seja verdadeira.',
          codeSnippet: `bool temCapacete = true;
bool temBota = false;

if (temCapacete && temBota)
{
    Console.WriteLine("Acesso autorizado à área de escavação.");
}
else
{
    Console.WriteLine("Acesso negado: EPI incompleto.");
}`,
          codeLanguage: 'csharp'
        }
      ],
      interviewTip: 'Todo sistema corporativo de pagamentos, bancos ou hospitais é composto por milhares de regras if/else que garantem conformidade com a lei e segurança.',
      blazorConnection: 'No Blazor, usamos if para mostrar mensagens de sucesso verdes ou caixas de erro vermelhas na tela quando o usuário digita algo errado.'
    },
    quiz: [
      {
        id: 'qf2-1',
        question: 'O que o comando `else` faz em um código de programação?',
        options: [
          'Ele reinicia o computador.',
          'Ele define o código que deve ser executado caso a condição do `if` seja FALSA.',
          'Ele apaga o banco de dados.',
          'Ele duplica o valor de uma variável.'
        ],
        correctOptionIndex: 1,
        explanation: 'O else é o plano de contingência: executa quando o if anterior não foi atendido.',
      }
    ],
    challenge: {
      title: 'Inspetor de Segurança de Equipamentos',
      instructions: 'Escreva um método estático `VerificarAcessoObra` que receba `bool temCapacete`, `bool temColete` e `int horasDescanso`. Se o trabalhador tiver capacete E colete E horasDescanso >= 8, retorne "Liberado". Caso contrário, retorne "Bloqueado por Segurança".',
      starterCode: `public static class SegurancaTrabalho
{
    public static string VerificarAcessoObra(bool temCapacete, bool temColete, int horasDescanso)
    {
        // TODO: Cheque as 3 condições com &&
        return "Bloqueado por Segurança";
    }
}`,
      solutionCode: `public static class SegurancaTrabalho
{
    public static string VerificarAcessoObra(bool temCapacete, bool temColete, int horasDescanso)
    {
        if (temCapacete && temColete && horasDescanso >= 8)
        {
            return "Liberado";
        }
        return "Bloqueado por Segurança";
    }
}`,
      hints: [
        'Use: if (temCapacete && temColete && horasDescanso >= 8)',
        'Retorne a string exata "Liberado" no caso positivo.',
        'Caso contrário, retorne "Bloqueado por Segurança".'
      ],
      testCases: [
        {
          name: 'Teste 1: Verificação completa dos 3 critérios de segurança',
          description: 'Deve checar capacete, colete e horas de repouso.',
          validator: (code) => {
            const hasCheck = code.includes('temCapacete') && code.includes('temColete') && code.includes('horasDescanso');
            return {
              passed: hasCheck,
              message: hasCheck ? 'Validação dos 3 critérios com operador lógico verificada.' : 'Combine os 3 parâmetros com operador &&.'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 0,
      componentName: 'MainLayout.razor & Index.razor',
      featureDescription: 'Regras de renderização condicional na interface Blazor.',
      linesOfCodeAdded: 35
    }
  },

  // ==========================================
  // ÁREA 1: C# MODERNO (DO BÁSICO AO AVANÇADO)
  // ==========================================
  {
    id: 'cs-01-fundamentals',
    trackId: 'csharp',
    order: 3,
    title: 'Fundamentos de C# 12 & Sistema de Tipos',
    subtitle: 'Tipos de valor vs referência, Nullable Reference Types e Switch Expressions',
    level: 'Básico',
    estimatedMinutes: 25,
    academicObjective: 'Dominar o sistema de tipos estáticos do C#, gerenciamento de stack/heap, anotações de nulidade para prevenção de NullReferenceException e padrões de controle de fluxo modernos.',
    realWorldAnalogy: {
      headline: 'A Diferença entre Entregar o Objeto ou o Endereço de Onde Ele Está',
      analogyText: 'Se você tem uma chave de fenda (tipo de valor) e empresta para o colega, você faz uma cópia física. Mas se você tem um caminhão de 20 toneladas numa garagem (tipo de referência), você não carrega o caminhão no bolso: você entrega um papel com o endereço da garagem.',
      dailyLifeComparison: 'Stack é o bolso do seu colete (rápido, direto, cabe coisas pequenas). Heap é o galpão da empresa (espaçoso, onde ficam os caminhões e estruturas pesadas, acessados por um endereço/ponteiro).'
    },
    theory: {
      overview: 'C# é uma linguagem de tipagem estrita, orientada a objetos e fortemente tipada rodando sobre a Common Language Runtime (CLR). A partir das versões recentes (.NET 8/9/10), foram introduzidas garantias rigorosas de segurança contra nulos (NRTs) e expressões concisas.',
      sections: [
        {
          title: '1. Tipos de Valor (Structs) vs Tipos de Referência (Classes)',
          content: 'Tipos de valor (int, double, bool, structs) residem na pilha (stack) e contêm diretamente seus dados. Ao passá-los por parâmetro, uma cópia do valor é criada. Tipos de referência (string, class, arrays) alocam seus dados na memória heap; a variável na stack armazena apenas o endereço ponteiro para o objeto no heap.',
          codeSnippet: `// Tipos de Valor (alocados na Stack)
int matricula = 2024101;
bool alunoAtivo = true;

// Tipos de Referência (ponteiro na Stack -> dados no Heap)
string nomeAluno = "Beatriz Oliveira";
int[] notas = [9, 8, 10]; // C# 12 collection expression`,
          codeLanguage: 'csharp',
          keyTakeaway: 'Atribuições de tipos de valor copiam dados; atribuições de tipos de referência copiam apenas ponteiros de memória.'
        },
        {
          title: '2. Nullable Reference Types (NRT) e Operador Null-Forgiving',
          content: 'Desde o C# 8, o compilador trata tipos de referência normais como não-nulos por padrão. Para permitir null explicitamente, utiliza-se a interrogação (?). Caso tente acessar membros de um tipo potencialmente nulo, o compilador emite um alerta estático (CS8602).',
          codeSnippet: `string nomeObrigatorio = "Carlos"; // Nunca pode ser null
string? emailOpcional = null;      // Pode ser null

// Safe navigation (?.) e Elvis / Coalescência nula (??)
int comprimento = emailOpcional?.Length ?? 0;

if (emailOpcional is not null)
{
    Console.WriteLine($"E-mail cadastrado: {emailOpcional.ToLower()}");
}`,
          codeLanguage: 'csharp'
        },
        {
          title: '3. Pattern Matching Moderno e Switch Expressions',
          content: 'Em vez de estruturas switch legadas com comandos case e break, C# moderno emprega Switch Expressions funcionais que avaliam tipos e condições lógicas em formato declarativo.',
          codeSnippet: `decimal ObterDescontoMensalidade(int creditos, bool bolsista) => (creditos, bolsista) switch
{
    (_, true) => 0.50m,           // 50% bolsa integral
    (>= 24, false) => 0.15m,      // Carga horária cheia
    (>= 16, false) => 0.10m,
    _ => 0.0m                     // Padrão de descarte (default)
};`,
          codeLanguage: 'csharp'
        }
      ],
      interviewTip: 'Em entrevistas de engenharia .NET, a pergunta sobre Stack vs Heap e passagem por valor vs referência é um dos testes mais comuns de maturidade computacional.',
      blazorConnection: 'No Blazor, Nullable Reference Types evitam as temidas páginas brancas causadas por NullReferenceException durante a renderização inicial de componentes antes dos dados da API chegarem.'
    },
    quiz: [
      {
        id: 'q1-1',
        question: 'No C# moderno com Nullable Reference Types ativado, qual a diferença entre `string` e `string?`?',
        options: [
          'string roda na stack, enquanto string? obrigatoriamente roda no heap da CLR.',
          'string indica intenção de não aceitar null (o compilador avisa se for null), enquanto string? explicitamente admite valor nulo.',
          'string? consome o dobro de bytes na memória que string simples.',
          'string? só pode ser utilizado dentro de estruturas struct imutáveis.'
        ],
        correctOptionIndex: 1,
        explanation: 'Nullable Reference Types é um recurso estático em tempo de compilação. string? indica ao analisador que a variável pode conter null e exige checagem antes de desreferenciar.',
      },
      {
        id: 'q1-2',
        question: 'Considere a expressão `int tamanho = usuario?.Nome?.Length ?? 0;`. Qual é o objetivo do operador `??`?',
        options: [
          'Substituir o valor por 0 caso o resultado da cadeia de navegação segura à esquerda resulte em null.',
          'Verificar se a variável usuario é diferente de 0.',
          'Forçar uma conversão de float para int descartando casas decimais.',
          'Chamar um método assíncrono caso o primeiro falhe.'
        ],
        correctOptionIndex: 0,
        explanation: 'O operador ?? (null-coalescing) fornece um valor de fallback caso a expressão à esquerda seja avaliada como null.',
      }
    ],
    challenge: {
      title: 'Classificador de Bolsas Acadêmicas em C#',
      instructions: 'Escreva um método estático `CalcularStatusAcademico` que receba a média do aluno (double media) e o total de faltas (int faltas). Utilize uma switch expression moderna para retornar:\n- "Reprovado por Faltas" se faltas > 15\n- "Aprovado com Láurea" se faltas <= 15 e media >= 9.0\n- "Aprovado" se faltas <= 15 e media >= 7.0\n- "Recuperação" se faltas <= 15 e media >= 5.0\n- "Reprovado por Nota" nos demais casos.',
      starterCode: `public static class AvaliadorAcademico
{
    public static string CalcularStatusAcademico(double media, int faltas)
    {
        return (faltas > 15, media) switch
        {
            (true, _) => "Reprovado por Faltas",
            // Continue a implementação...
            _ => "Reprovado por Nota"
        };
    }
}`,
      solutionCode: `public static class AvaliadorAcademico
{
    public static string CalcularStatusAcademico(double media, int faltas) => (faltas > 15, media) switch
    {
        (true, _) => "Reprovado por Faltas",
        (false, >= 9.0) => "Aprovado com Láurea",
        (false, >= 7.0) => "Aprovado",
        (false, >= 5.0) => "Recuperação",
        _ => "Reprovado por Nota"
    };
}`,
      hints: [
        'Você pode avaliar uma tupla de condições: (faltas > 15, media) switch { ... }',
        'Use relational patterns no C# como >= 9.0 ou >= 7.0 dentro dos braços do switch.',
        'Lembre-se de cobrir todos os casos com o padrão de descarte final (_).'
      ],
      testCases: [
        {
          name: 'Teste 1: Reprovação por Faltas',
          description: 'Quando faltas > 15, o resultado deve ser "Reprovado por Faltas".',
          validator: (code) => {
            const hasFaltas = code.includes('Reprovado por Faltas') && (code.includes('15') || code.includes('true'));
            return {
              passed: hasFaltas,
              message: hasFaltas ? 'Regra de limite de faltas implementada.' : 'Verifique faltas > 15 retornando Reprovado por Faltas.'
            };
          }
        },
        {
          name: 'Teste 2: Aprovado com Láurea',
          description: 'Média >= 9.0 e sem faltas excessivas deve retornar "Aprovado com Láurea".',
          validator: (code) => {
            const hasLaurea = code.includes('Aprovado com Láurea') && (code.includes('9.0') || code.includes('9'));
            return {
              passed: hasLaurea,
              message: hasLaurea ? 'Condição de Láurea verificada.' : 'Faltou o retorno "Aprovado com Láurea" para média >= 9.0.'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 0,
      componentName: 'Program.cs & MainLayout.razor',
      featureDescription: 'Inicialização do Host Blazor WebAssembly com injeção básica e barra de status acadêmico.',
      linesOfCodeAdded: 45
    }
  },

  {
    id: 'cs-02-oop-records',
    trackId: 'csharp',
    order: 4,
    title: 'POO Avançada: Records, Imutabilidade & Interfaces',
    subtitle: 'Positional Records, expressões with, contratos desacoplados e herança segura',
    level: 'Básico',
    estimatedMinutes: 30,
    academicObjective: 'Compreender o paradigma de imutabilidade em sistemas distribuídos, a diferença entre classes mutáveis e records com igualdade por valor, e o uso de interfaces para inversão de dependência (SOLID).',
    realWorldAnalogy: {
      headline: 'A Planta Arquitetônica e a Nota Fiscal Carimbada',
      analogyText: 'Uma classe comum é como uma lousa de anotações: qualquer pessoa pode passar o apagador e alterar os números. Já um Record é como uma Nota Fiscal ou Certidão carimbada em cartório: uma vez emitida, NINGUÉM pode riscar e adulterar.',
      dailyLifeComparison: 'Se você precisa alterar um item da Nota Fiscal, você não rasura a folha original: você emite uma nova via corrigida (a expressão "with" do C#). Isso garante que o histórico nunca seja corrompido.'
    },
    theory: {
      overview: 'Na arquitetura de software moderna, a imutabilidade reduz bugs de concorrência e efeitos colaterais. O C# introduziu o conceito de `record class` e `record struct`, que implementam automaticamente semântica de igualdade baseada em valores e clonagem não destrutiva.',
      sections: [
        {
          title: '1. Classes Clássicas vs Positional Records',
          content: 'Classes normais usam igualdade referencial (dois objetos são iguais apenas se apontarem para o mesmo endereço de memória). Records comparam os valores de suas propriedades automaticamente e geram métodos ToString(), GetHashCode() e desconstrução nativa.',
          codeSnippet: `// Record posicional: imutável, gera construtor e propriedades init-only
public record Disciplina(string Codigo, string Nome, int Creditos, string Departamento);

var d1 = new Disciplina("CS101", "Algoritmos e Estruturas de Dados", 4, "Computação");
var d2 = new Disciplina("CS101", "Algoritmos e Estruturas de Dados", 4, "Computação");

Console.WriteLine(d1 == d2); // TRUE! Igualdade por valor dos membros`,
          codeLanguage: 'csharp'
        },
        {
          title: '2. Mutação Não Destrutiva com a Expressão with',
          content: 'Quando precisamos atualizar um registro imutável, criamos uma nova instância cópia aplicando as alterações desejadas através da palavra-chave with, preservando a imutabilidade do registro original.',
          codeSnippet: `var disciplinaAtualizada = d1 with { Creditos = 6 };`,
          codeLanguage: 'csharp'
        }
      ],
      interviewTip: 'Ao ser questionado sobre "quando usar Record em vez de Class", destaque: Use records para DTOs (Data Transfer Objects), eventos, mensagens e modelos de domínio imutáveis.',
      blazorConnection: 'No Blazor, passar Records imutáveis como [Parameter] para componentes filhos otimiza a detecção de mudanças e previne que componentes filhos alterem dados do pai de maneira desgovernada.'
    },
    quiz: [
      {
        id: 'q2-1',
        question: 'Por que o operador `==` retorna `true` ao comparar duas instâncias separadas de um `record` com as mesmas propriedades?',
        options: [
          'Porque records forçam todas as variáveis a compartilhar o mesmo endereço de memória na stack.',
          'Porque o compilador implementa automaticamente a interface IEquatable<T> comparando cada campo/propriedade por valor.',
          'Porque records convertem seus objetos para strings JSON antes de executar a comparação.',
          'Porque a CLR impede que existam instâncias com dados idênticos no heap.'
        ],
        correctOptionIndex: 1,
        explanation: 'O compilador sintetiza a igualdade estrutural para records, comparando os valores de cada propriedade em vez de seus ponteiros de referência.',
      }
    ],
    challenge: {
      title: 'Modelagem de Histórico com Records Imutáveis',
      instructions: 'Crie um record posicional `MatriculaAcademica` que receba:\n- `string IdAluno`\n- `string CodigoCurso`\n- `int Semestre`\n- `double Coeficiente`\n\nEm seguida, na classe `GestorMatricula`, implemente o método `AvancarSemestre` que retorna uma nova cópia do registro com o coeficiente atualizado e o semestre incrementado em 1 usando a expressão `with`.',
      starterCode: `public record MatriculaAcademica(string IdAluno, string CodigoCurso, int Semestre, double Coeficiente);

public static class GestorMatricula
{
    public static MatriculaAcademica AvancarSemestre(MatriculaAcademica atual, double novoCoeficiente)
    {
        // TODO: Utilize a expressão 'with'
        return atual;
    }
}`,
      solutionCode: `public record MatriculaAcademica(string IdAluno, string CodigoCurso, int Semestre, double Coeficiente);

public static class GestorMatricula
{
    public static MatriculaAcademica AvancarSemestre(MatriculaAcademica atual, double novoCoeficiente) =>
        atual with 
        { 
            Semestre = atual.Semestre + 1, 
            Coeficiente = novoCoeficiente 
        };
}`,
      hints: [
        'A sintaxe é: atual with { Propriedade1 = valor, Propriedade2 = valor }',
        'Lembre-se de somar atual.Semestre + 1 para avançar o período acadêmico.',
        'O record original não é alterado, o método devolve a nova instância.'
      ],
      testCases: [
        {
          name: 'Teste 1: Definição do Record MatriculaAcademica',
          description: 'Verifica a existência do record com as 4 propriedades solicitadas.',
          validator: (code) => {
            const hasRecord = code.includes('record MatriculaAcademica') && code.includes('IdAluno') && code.includes('Coeficiente');
            return {
              passed: hasRecord,
              message: hasRecord ? 'Record posicional MatriculaAcademica modelado corretamente.' : 'Declaração do record posicional incompleta.'
            };
          }
        },
        {
          name: 'Teste 2: Uso da Expressão with',
          description: 'Deve utilizar a expressão with para mutação não-destrutiva.',
          validator: (code) => {
            const hasWith = code.includes('with') && code.includes('Semestre');
            return {
              passed: hasWith,
              message: hasWith ? 'Expressão with utilizada para evoluir o estado imutável.' : 'Utilize a palavra-chave with para clonar com alterações.'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 1,
      componentName: 'Models/Course.cs & Shared/CourseCard.razor',
      featureDescription: 'Estruturação de dados com C# Records e criação do componente reutilizável CourseCard no Blazor.',
      linesOfCodeAdded: 62
    }
  },

  {
    id: 'cs-03-linq-functional',
    trackId: 'csharp',
    order: 5,
    title: 'LINQ Profundo & Programação Funcional em C#',
    subtitle: 'Expressões Lambda, Deferred Execution, GroupBy, Aggregate e yield return',
    level: 'Intermediário',
    estimatedMinutes: 30,
    academicObjective: 'Dominar Language Integrated Query (LINQ), avaliação sob demanda (lazy evaluation), otimização de consultas em memória e composição de pipelines funcionais sem alocações desnecessárias.',
    realWorldAnalogy: {
      headline: 'A Peneira de Areia e a Esteira Rolante Inteligente',
      analogyText: 'Imagine uma esteira rolante de pedras com peneiras de diferentes espessuras. Você não joga uma montanha de 50 toneladas numa caixa e depois transfere para outra caixa: as pedras vão passando pela esteira e só o cascalho fino chega ao final.',
      dailyLifeComparison: 'LINQ é essa esteira rolante inteligente (Deferred Execution). O comando .Where() é a peneira que deixa passar só o que você pediu. Nenhuma memória é desperdiçada até você ligar o caminhão no final (.ToList()).'
    },
    theory: {
      overview: 'LINQ une a expressividade da álgebra relacional à flexibilidade do C#. A execução diferida (Deferred Execution) garante que consultas não sejam processadas na memória até que ocorra uma enumeração explícita.',
      sections: [
        {
          title: '1. O Pipeline LINQ e Execução Diferida',
          content: 'Operadores como Where, Select e Take retornam um IEnumerable<T> que representa uma consulta suspensa. Isso possibilita encadear transformações sem criar listas intermediárias na memória RAM.',
          codeSnippet: `var consulta = alunos
    .Where(a => a.Ativo)
    .Where(a => a.Coeficiente >= 8.5)
    .Select(a => new { a.Nome, a.Matricula });`,
          codeLanguage: 'csharp'
        }
      ],
      interviewTip: 'Cuidado com Multiple Enumeration: se iterar duas vezes sobre o mesmo IEnumerable<T> sem ToList(), a consulta pode rodar duas vezes no banco de dados.',
      blazorConnection: 'No Blazor, LINQ é o padrão dominante para filtrar dados em tempo real enquanto o usuário digita no input de busca da página com reatividade imediata.'
    },
    quiz: [
      {
        id: 'q3-1',
        question: 'O que significa o conceito de "Deferred Execution" no LINQ?',
        options: [
          'A consulta roda em segundo plano na GPU.',
          'A consulta só é avaliada e processada quando seus elementos são solicitados (ex: foreach, ToList(), Count()).',
          'A consulta é apagada da memória após 5 minutos.',
          'O compilador descarta o código.'
        ],
        correctOptionIndex: 1,
        explanation: 'LINQ constrói uma árvore de iteradores sob demanda.',
      }
    ],
    challenge: {
      title: 'Analytics de Turmas com LINQ',
      instructions: 'Escreva um método `ObterTopEstudantesPorCurso` que recebe uma lista de tuplas `(string Curso, string NomeAluno, double Nota)` e um `double notaCorte`. Filtre por Nota >= notaCorte, agrupe por Curso e retorne um dicionário ordenado.',
      starterCode: `public static class AnalisadorTurma
{
    public static Dictionary<string, List<string>> ObterTopEstudantesPorCurso(
        IEnumerable<(string Curso, string NomeAluno, double Nota)> registros, 
        double notaCorte)
    {
        return new Dictionary<string, List<string>>();
    }
}`,
      solutionCode: `public static class AnalisadorTurma
{
    public static Dictionary<string, List<string>> ObterTopEstudantesPorCurso(
        IEnumerable<(string Curso, string NomeAluno, double Nota)> registros, 
        double notaCorte) =>
        registros
            .Where(r => r.Nota >= notaCorte)
            .GroupBy(r => r.Curso)
            .ToDictionary(
                grupo => grupo.Key,
                grupo => grupo.Select(r => r.NomeAluno).OrderBy(nome => nome).ToList()
            );
}`,
      hints: [
        'Comece filtrando os registros com .Where(r => r.Nota >= notaCorte).',
        'Use .GroupBy(r => r.Curso) para separar os grupos.',
        'Finalize com .ToDictionary(...).'
      ],
      testCases: [
        {
          name: 'Teste 1: Filtro de Nota de Corte com Where',
          description: 'Apenas notas acima do corte devem ser consideradas.',
          validator: (code) => {
            const hasWhere = code.includes('.Where') && code.includes('notaCorte');
            return {
              passed: hasWhere,
              message: hasWhere ? 'Filtro Where implementado com sucesso.' : 'Adicione .Where(r => r.Nota >= notaCorte).'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 1,
      componentName: 'Pages/Courses.razor',
      featureDescription: 'Catálogo de disciplinas com busca em tempo real e filtros de carga horária com LINQ no Blazor.',
      linesOfCodeAdded: 78
    }
  },

  {
    id: 'cs-04-async-await',
    trackId: 'csharp',
    order: 6,
    title: 'Programação Assíncrona & Concorrência Robusta',
    subtitle: 'Task, ValueTask, CancellationToken e coordenação concorrente com Task.WhenAll',
    level: 'Intermediário',
    estimatedMinutes: 30,
    academicObjective: 'Compreender a máquina de estados gerada pelo compilador para async/await, liberação da thread do SynchronizationContext durante I/O, cancelamento cooperativo com CancellationToken e tratamento de exceções assíncronas.',
    realWorldAnalogy: {
      headline: 'O Pedido no Balcão de Peças: Não Fique Parado Esperando!',
      analogyText: 'Se você pede uma peça rara no balcão de uma oficina mecânica que vai demorar 20 minutos para vir do estoque central, você não fica estátua congelado sem respirar. Você pega a senha (Task), continua adiantando a troca de óleo do outro carro e, quando a campainha toca (await), você retoma a montagem.',
      dailyLifeComparison: 'Programação assíncrona é exatamente não travar o operário (CPU Thread) enquanto se aguarda uma entrega de fora (I/O, internet ou banco de dados).'
    },
    theory: {
      overview: 'Operações de I/O (acesso a banco de dados, chamadas HTTP, leitura de disco) não devem prender threads da CPU. Com async/await, a thread é liberada para atender outras requisições enquanto o sistema operacional aguarda o hardware ou a rede responder.',
      sections: [
        {
          title: '1. A Anatomia do async e await',
          content: 'A palavra-chave async orienta o compilador a reescrever o método como uma máquina de estados. O await registra a continuação e suspende a execução até a Task terminar.',
          codeSnippet: `public async Task<AlunoDto> CarregarPerfilAlunoAsync(int alunoId, CancellationToken ct = default)
{
    var resposta = await _httpClient.GetAsync($"/api/alunos/{alunoId}", ct);
    resposta.EnsureSuccessStatusCode();
    return await resposta.Content.ReadFromJsonAsync<AlunoDto>(ct);
}`,
          codeLanguage: 'csharp'
        }
      ],
      interviewTip: 'Anti-pattern fatal: "sync-over-async" usando `.Result` ou `.Wait()`. Isso bloqueia a thread chamadora e pode causar Deadlocks fatais.',
      blazorConnection: 'No Blazor, o método de ciclo de vida fundamental é `protected override async Task OnInitializedAsync()`, onde todas as chamadas de dados ocorrem de forma não-bloqueante.'
    },
    quiz: [
      {
        id: 'q4-1',
        question: 'Por que o uso de `task.Result` ou `task.Wait()` é considerado uma má prática no ecossistema .NET?',
        options: [
          'Porque converte a Task em um arquivo de texto.',
          'Porque bloqueia sincronicamente a thread chamadora, podendo esgotar o ThreadPool e provocar deadlocks de congelamento da interface.',
          'Porque o C# não aceita compilar código com a palavra Wait.',
          'Porque apaga a memória RAM.'
        ],
        correctOptionIndex: 1,
        explanation: 'Bloquear uma thread enquanto se aguarda trabalho assíncrono desperdiça recursos e gera travamentos.',
      }
    ],
    challenge: {
      title: 'Sincronizador Concorrente de Dados Acadêmicos',
      instructions: 'Implemente o método `CarregarPainelAcademicoAsync` que receba 3 delegates assíncronos e dispare os três em paralelo com `Task.WhenAll`.',
      starterCode: `public record PainelDto(List<string> Cursos, int TotalAlunos, double MediaGeral);

public static class CoordenadorAcademico
{
    public static async Task<PainelDto> CarregarPainelAcademicoAsync(
        Func<Task<List<string>>> carregarCursos,
        Func<Task<int>> carregarTotalAlunos,
        Func<Task<double>> carregarMediaGeral)
    {
        return new PainelDto([], 0, 0);
    }
}`,
      solutionCode: `public record PainelDto(List<string> Cursos, int TotalAlunos, double MediaGeral);

public static class CoordenadorAcademico
{
    public static async Task<PainelDto> CarregarPainelAcademicoAsync(
        Func<Task<List<string>>> carregarCursos,
        Func<Task<int>> carregarTotalAlunos,
        Func<Task<double>> carregarMediaGeral)
    {
        var taskCursos = carregarCursos();
        var taskAlunos = carregarTotalAlunos();
        var taskMedia = carregarMediaGeral();

        await Task.WhenAll(taskCursos, taskAlunos, taskMedia);

        return new PainelDto(await taskCursos, await taskAlunos, await taskMedia);
    }
}`,
      hints: [
        'Inicie as 3 tasks sem await na frente.',
        'Use: await Task.WhenAll(taskCursos, taskAlunos, taskMedia);',
        'Monte o PainelDto com o resultado das 3.'
      ],
      testCases: [
        {
          name: 'Teste 1: Coordenação Simultânea com Task.WhenAll',
          description: 'Deve disparar as tarefas com Task.WhenAll.',
          validator: (code) => {
            const hasWhenAll = code.includes('Task.WhenAll');
            return {
              passed: hasWhenAll,
              message: hasWhenAll ? 'Coordenação simultânea identificada.' : 'Utilize Task.WhenAll.'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 2,
      componentName: 'Pages/Enrollment.razor',
      featureDescription: 'Mecanismo assíncrono de submissão de matrículas com feedback reativo de carregamento no Blazor.',
      linesOfCodeAdded: 84
    }
  },

  {
    id: 'cs-05-generics-performance',
    trackId: 'csharp',
    order: 7,
    title: 'Generics Avançados, Delegates & Alta Performance',
    subtitle: 'Generic constraints, Func/Action, Memory<T>, Span<T> e zero alocações de GC',
    level: 'Avançado',
    estimatedMinutes: 35,
    academicObjective: 'Dominar polimorfismo paramétrico em C# (Generics com where), delegates genéricos de primeira classe e as estruturas de alta performance Span<T>/ReadOnlySpan<T> para processamento contíguo de memória sem sobrecarregar o Garbage Collector.',
    realWorldAnalogy: {
      headline: 'A Forma de Tijolos e o Fatiador Cirúrgico de Fita Métrica',
      analogyText: 'Um "Generic" é como uma fôrma universal de concreto: a mesma fôrma pode produzir blocos de cimento, de gesso ou de argila sem precisar fabricar 3 máquinas diferentes.',
      dailyLifeComparison: 'Já o Span<T> é como olhar uma fita métrica: se você quer ver do centímetro 10 ao 20, você apenas olha para aquele pedaço da fita já existente; você não precisa pegar uma tesoura e picotar a fita estragando o material original.'
    },
    theory: {
      overview: 'Em sistemas de alto rendimento no ecossistema .NET, alocações no heap geram pressão sobre o Garbage Collector. C# oferece recursos sofisticados como Generics com restrições e tipos ref struct como Span<T> que permitem fatiamento seguro de memória.',
      sections: [
        {
          title: '1. Generics e Restrições de Tipo',
          content: 'Generics viabilizam algoritmos universais com validação estática de tipos. As restrições (where T : class, new()) garantem que certos membros existem.',
          codeSnippet: `public class RepositorioGenerico<T> where T : class, new()
{
    private readonly List<T> _itens = [];
    public void Adicionar(T item) => _itens.Add(item);
}`,
          codeLanguage: 'csharp'
        }
      ],
      interviewTip: 'Span<T> é uma `ref struct`, o que significa que ela só pode viver na stack e nunca pode ser colocada no heap.',
      blazorConnection: 'A camada de renderização interna do Blazor WebAssembly usa spans e buffers reutilizados para serializar eventos DOM para o runtime WebAssembly com zero-copy.'
    },
    quiz: [
      {
        id: 'q5-1',
        question: 'O que a restrição genérica `where T : class, new()` garante ao desenvolvedor?',
        options: [
          'Que T é um número inteiro.',
          'Que T é um tipo por referência e possui um construtor público sem parâmetros (new()).',
          'Que T foi deletado do computador.',
          'Que T não aceita herança.'
        ],
        correctOptionIndex: 1,
        explanation: 'where T : class exige referência e new() garante construtor vazio.',
      }
    ],
    challenge: {
      title: 'Parser de Matrículas com ReadOnlySpan',
      instructions: 'Escreva um método estático `ExtrairSemestreEId` que receba `"2024_2-984321"` usando `ReadOnlySpan<char>` e retorne `(ano, semestre, idAluno)`. Não utilize `string.Split()`.',
      starterCode: `public static class ParserAcademico
{
    public static (int Ano, int Semestre, string IdAluno) ExtrairSemestreEId(string codigo)
    {
        var span = codigo.AsSpan();
        return (0, 0, string.Empty);
    }
}`,
      solutionCode: `public static class ParserAcademico
{
    public static (int Ano, int Semestre, string IdAluno) ExtrairSemestreEId(string codigo)
    {
        ReadOnlySpan<char> span = codigo.AsSpan();
        int idxUnderline = span.IndexOf('_');
        int idxTraco = span.IndexOf('-');

        int ano = int.Parse(span.Slice(0, idxUnderline));
        int semestre = int.Parse(span.Slice(idxUnderline + 1, idxTraco - idxUnderline - 1));
        string idAluno = span.Slice(idxTraco + 1).ToString();

        return (ano, semestre, idAluno);
    }
}`,
      hints: [
        'Localize os separadores com span.IndexOf(\'_\') e span.IndexOf(\'-\').',
        'Use span.Slice(...) e int.Parse.',
        'Ao final, para a string IdAluno, chame .ToString() sobre a fatia.'
      ],
      testCases: [
        {
          name: 'Teste 1: Uso de Span sem string.Split',
          description: 'Deve usar AsSpan e Slice sem alocação.',
          validator: (code) => {
            const hasSpan = code.includes('AsSpan') && !code.includes('.Split');
            return {
              passed: hasSpan,
              message: hasSpan ? 'Uso de Span verificado.' : 'Não utilize .Split(), empregue .AsSpan().'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 2,
      componentName: 'Services/AcademicParser.cs',
      featureDescription: 'Motor de alta performance de validação de códigos de matrícula universitária no Blazor.',
      linesOfCodeAdded: 50
    }
  },

  // ==========================================
  // ÁREA 2: BLAZOR (DO BÁSICO AO AVANÇADO)
  // ==========================================
  {
    id: 'blazor-01-components-lifecycle',
    trackId: 'blazor',
    order: 8,
    title: 'Arquitetura Blazor & Ciclo de Vida de Componentes',
    subtitle: 'RenderTree, arquivos .razor, OnInitializedAsync e StateHasChanged',
    level: 'Básico',
    estimatedMinutes: 25,
    academicObjective: 'Compreender o modelo de árvore de renderização do Blazor (RenderTree), a sintaxe unificada HTML + C# nos arquivos .razor e o ciclo de vida de renderização dos componentes.',
    realWorldAnalogy: {
      headline: 'Montando uma Casa com Painéis Pré-Moldados',
      analogyText: 'Em vez de assentar cada tijolinho no navegador escrevendo comandos soltos de JavaScript, o Blazor é como construir com painéis pré-moldados modulares: você cria um "Componente" (ex: Cartão de Curso, Botão de Compra, Menu Lateral) e pode encaixar esse mesmo bloco quantas vezes quiser em qualquer lugar.',
      dailyLifeComparison: 'Ciclo de vida é a rotina do painel: 1) Quando ele chega no canteiro (OnInitialized), 2) Quando recebe a pintura (OnParametersSet), 3) Quando a casa é aberta aos moradores (OnAfterRender).'
    },
    theory: {
      overview: 'Blazor permite construir interfaces ricas para navegadores web utilizando C# em vez de JavaScript. No Blazor WebAssembly, o código C# roda diretamente no browser sobre um runtime WebAssembly da Microsoft.',
      sections: [
        {
          title: '1. Anatomia de um Componente Razor (.razor)',
          content: 'Um arquivo .razor combina diretivas de roteamento (@page), injeção (@inject), marcação HTML e um bloco @code contendo campos, propriedades e métodos C# executados no evento de renderização.',
          codeSnippet: `@page "/contador-academico"

<div class="card p-4">
    <h3 class="text-xl font-bold">Créditos: @totalCreditos</h3>
    <button class="btn btn-primary" @onclick="IncrementarCreditos">
        Adicionar Disciplina
    </button>
</div>

@code {
    private int totalCreditos = 0;
    private void IncrementarCreditos() => totalCreditos += 4;
}`,
          codeLanguage: 'razor'
        }
      ],
      interviewTip: 'Nunca execute chamadas demoradas de I/O no construtor de um componente Blazor. Toda inicialização assíncrona pertence ao OnInitializedAsync.',
      blazorConnection: 'Este é o alicerce absoluto de toda a nossa aplicação UniSphere, onde cada tela e cada widget é um componente Razor reativo.'
    },
    quiz: [
      {
        id: 'qb1-1',
        question: 'Qual é o método de ciclo de vida recomendado para carregar dados assíncronos no Blazor?',
        options: [
          'No construtor padrão da classe.',
          'No método `OnInitializedAsync()`.',
          'Dentro de uma tag `<script>`.',
          'No fechamento do navegador.'
        ],
        correctOptionIndex: 1,
        explanation: 'OnInitializedAsync() é disparado no momento seguro após a injeção de dependências estar pronta.',
      }
    ],
    challenge: {
      title: 'Componente Razor de Alerta Acadêmico Reativo',
      instructions: 'Escreva um componente Razor que declare `[Parameter] public string Mensagem { get; set; } = "";` e `[Parameter] public bool Importante { get; set; }`. No método `OnParametersSet`, se a mensagem for vazia, defina-a como "Nenhum comunicado pendente". Exiba a mensagem dentro de uma div com classe condicional.',
      starterCode: `@code {
    [Parameter] public string Mensagem { get; set; } = "";
    [Parameter] public bool Importante { get; set; }

    // TODO: OnParametersSet
}

<!-- Renderize a div com @Mensagem -->
`,
      solutionCode: `<div class="@(Importante ? "alerta-destaque" : "alerta-padrao")">
    <p>@Mensagem</p>
</div>

@code {
    [Parameter] public string Mensagem { get; set; } = "";
    [Parameter] public bool Importante { get; set; }

    protected override void OnParametersSet()
    {
        if (string.IsNullOrWhiteSpace(Mensagem))
        {
            Mensagem = "Nenhum comunicado pendente";
        }
    }
}`,
      hints: [
        'Use: protected override void OnParametersSet()',
        'Verifique string.IsNullOrWhiteSpace(Mensagem)',
        'Defina class="@(Importante ? "alerta-destaque" : "alerta-padrao")"'
      ],
      testCases: [
        {
          name: 'Teste 1: Parâmetros [Parameter] declarados',
          description: 'Deve declarar Mensagem e Importante.',
          validator: (code) => {
            const hasParams = code.includes('[Parameter]') && code.includes('Mensagem') && code.includes('Importante');
            return {
              passed: hasParams,
              message: hasParams ? 'Parâmetros declarados corretamente.' : 'Declare os atributos [Parameter].'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 1,
      componentName: 'Shared/AcademicAlert.razor',
      featureDescription: 'Sistema de avisos e notificações acadêmicas reativas adicionado ao UniSphere.',
      linesOfCodeAdded: 38
    }
  },

  {
    id: 'blazor-02-binding-events',
    trackId: 'blazor',
    order: 9,
    title: 'Data Binding, EventCallback & Comunicação Pai-Filho',
    subtitle: 'Two-way binding com @bind, EventCallback<T> e RenderFragment',
    level: 'Intermediário',
    estimatedMinutes: 30,
    academicObjective: 'Dominar o fluxo de dados unidirecional e bidirecional em Blazor, delegação de eventos desacoplada com EventCallback<T> e composição avançada de UI com RenderFragment.',
    realWorldAnalogy: {
      headline: 'O Walkie-Talkie do Mestre de Obras e do Guindaste',
      analogyText: 'O operador do guindaste (componente filho) não desce da cabine para assinar a ordem de serviço do engenheiro chefe (componente pai). Ele usa o rádio (EventCallback) para avisar: "Carga de 5 toneladas posicionada no 3º andar!".',
      dailyLifeComparison: 'O chefe ouve o aviso e atualiza a prancheta de controle sem confusão. No Blazor, os dados descem por parâmetros ([Parameter]) e os avisos sobem por rádio (EventCallback).'
    },
    theory: {
      overview: 'Componentes modernos não devem alterar diretamente o estado de seus pais. O Blazor segue a filosofia "Data Down, Actions Up": dados fluem do pai para o filho via [Parameter], e notificações de mudança fluem do filho para o pai via EventCallback<T>.',
      sections: [
        {
          title: '1. Two-Way Data Binding com @bind e @bind:event',
          content: 'A diretiva @bind sincroniza um campo C# com o valor de um input HTML. Com @bind:event="oninput", a atualização é reativa a cada tecla digitada.',
          codeSnippet: `<input type="text" @bind="termoBusca" @bind:event="oninput" placeholder="Filtrar cursos..." />
<p>Buscando por: <strong>@termoBusca</strong></p>`,
          codeLanguage: 'razor'
        }
      ],
      interviewTip: 'EventCallback gerencia automaticamente o dispatching assíncrono e dispara StateHasChanged() no componente pai sem precisar chamar InvokeAsync manualmente.',
      blazorConnection: 'Utilizamos EventCallback no catálogo de cursos para que o clique em "Matricular" no CourseCard notifique o painel principal de matrícula.'
    },
    quiz: [
      {
        id: 'qb2-1',
        question: 'Qual é a principal vantagem de usar `EventCallback<T>` no Blazor em vez de uma `Action<T>` comum?',
        options: [
          'EventCallback converte o código para Python.',
          'EventCallback despacha o evento de forma assíncrona segura e aciona automaticamente a re-renderização do componente pai.',
          'Action não compila em C#.',
          'EventCallback apaga cookies do navegador.'
        ],
        correctOptionIndex: 1,
        explanation: 'EventCallback foi desenhado especificamente para a reatividade do Blazor.',
      }
    ],
    challenge: {
      title: 'Controle de Avaliação com EventCallback',
      instructions: 'Declare `[Parameter] public int Pontuacao { get; set; }` e `[Parameter] public EventCallback<int> OnPontuacaoAlterada { get; set; }`. Adicione um método `async Task DefinirNota(int novaNota)` que invoque o callback.',
      starterCode: `@code {
    [Parameter] public int Pontuacao { get; set; }
    // TODO: Declare EventCallback<int> OnPontuacaoAlterada
    // TODO: Implemente DefinirNota(int novaNota)
}`,
      solutionCode: `@code {
    [Parameter] public int Pontuacao { get; set; }
    [Parameter] public EventCallback<int> OnPontuacaoAlterada { get; set; }

    private async Task DefinirNota(int novaNota)
    {
        Pontuacao = novaNota;
        await OnPontuacaoAlterada.InvokeAsync(novaNota);
    }
}`,
      hints: [
        'Declare: [Parameter] public EventCallback<int> OnPontuacaoAlterada { get; set; }',
        'No método: await OnPontuacaoAlterada.InvokeAsync(novaNota);'
      ],
      testCases: [
        {
          name: 'Teste 1: Declaração de EventCallback<int>',
          description: 'Deve declarar OnPontuacaoAlterada como EventCallback<int>.',
          validator: (code) => {
            const hasCallback = code.includes('EventCallback<int>') && code.includes('OnPontuacaoAlterada');
            return {
              passed: hasCallback,
              message: hasCallback ? 'EventCallback tipado corretamente.' : 'Declare EventCallback<int> OnPontuacaoAlterada.'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 2,
      componentName: 'Shared/StarRating.razor & CourseCatalog.razor',
      featureDescription: 'Sistema interativo de avaliação de disciplinas com comunicação reativa pai-filho.',
      linesOfCodeAdded: 55
    }
  },

  {
    id: 'blazor-03-forms-validation',
    trackId: 'blazor',
    order: 10,
    title: 'Formulários Robustos & Validação com EditContext',
    subtitle: 'EditForm, DataAnnotationsValidator, ValidationMessage e validação customizada',
    level: 'Intermediário',
    estimatedMinutes: 30,
    academicObjective: 'Construir formulários enterprise com Blazor, utilizando EditForm, EditContext, validação de regras de negócio com DataAnnotations e validações assíncronas.',
    realWorldAnalogy: {
      headline: 'A Portaria de Cargas da Transportadora',
      analogyText: 'Um caminhão não pode sair do pátio com peso acima do limite, sem nota fiscal anexada ou sem a assinatura do conferente. O fiscal de trânsito confere cada documento um a um antes de abrir a cancela.',
      dailyLifeComparison: 'O <EditForm> do Blazor é esse fiscal de trânsito: ele não deixa o botão "Enviar" submeter dados incompletos ou CPF falso, exibindo na hora a mensagem em vermelho no campo que precisa de correção.'
    },
    theory: {
      overview: 'Formulários em Blazor utilizam o componente `<EditForm>`, que gerencia um `EditContext`. O EditContext rastreia quais campos foram modificados pelo usuário (dirty tracking) e orquestra mensagens de validação sem recarregar a página.',
      sections: [
        {
          title: '1. O Componente EditForm e DataAnnotations',
          content: 'Anotações nos modelos C# (como [Required], [StringLength], [EmailAddress]) são interpretadas automaticamente pelo `<DataAnnotationsValidator />`.',
          codeSnippet: `public class AlunoMatriculaForm
{
    [Required(ErrorMessage = "O nome completo é obrigatório.")]
    [StringLength(80, MinimumLength = 3)]
    public string Nome { get; set; } = "";

    [Required]
    [EmailAddress]
    public string Email { get; set; } = "";
}`,
          codeLanguage: 'csharp'
        }
      ],
      interviewTip: 'Nunca use tags HTML puras `<input type="text">` dentro de um EditForm se desejar validação automática do Blazor; use sempre os componentes nativos `<InputText>`, `<InputNumber>`.',
      blazorConnection: 'A página de matrícula do UniSphere usa EditForm com validação em tempo real para matricular novos alunos nas turmas disponíveis.'
    },
    quiz: [
      {
        id: 'qb3-1',
        question: 'Qual evento do `<EditForm>` dispara APENAS se todos os campos passarem na validação sem erros?',
        options: [
          'OnSubmit',
          'OnValidSubmit',
          'OnSuccess',
          'OnFormReady'
        ],
        correctOptionIndex: 1,
        explanation: 'OnValidSubmit é o gatilho exclusivo para dados 100% corretos.',
      }
    ],
    challenge: {
      title: 'Modelo de Validação de Matrícula Universitária',
      instructions: 'Crie `MatriculaRequest` com CodigoCurso obrigatório, CpfAluno obrigatório com regex de 11 dígitos e TermosAceitos obrigatório como true.',
      starterCode: `using System.ComponentModel.DataAnnotations;

public class MatriculaRequest
{
    public string CodigoCurso { get; set; } = "";
    public string CpfAluno { get; set; } = "";
    public bool TermosAceitos { get; set; }
}`,
      solutionCode: `using System.ComponentModel.DataAnnotations;

public class MatriculaRequest
{
    [Required(ErrorMessage = "Código do curso é obrigatório.")]
    public string CodigoCurso { get; set; } = "";

    [Required(ErrorMessage = "CPF é obrigatório.")]
    [RegularExpression(@"^\\d{11}$", ErrorMessage = "CPF deve conter exatamente 11 dígitos numéricos.")]
    public string CpfAluno { get; set; } = "";

    [Range(typeof(bool), "true", "true", ErrorMessage = "Você deve aceitar os termos acadêmicos.")]
    public bool TermosAceitos { get; set; }
}`,
      hints: [
        'Use [Required] sobre CodigoCurso e CpfAluno.',
        'Use [RegularExpression(@"^\\d{11}$")] para o CPF.',
        'Use [Range(typeof(bool), "true", "true")] para os termos.'
      ],
      testCases: [
        {
          name: 'Teste 1: Validação de 11 dígitos para CPF',
          description: 'Deve conter a regex de 11 dígitos.',
          validator: (code) => {
            const hasCpf = code.includes('RegularExpression') && code.includes('11');
            return {
              passed: hasCpf,
              message: hasCpf ? 'Expressão regular configurada.' : 'Adicione RegularExpression para 11 dígitos.'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 2,
      componentName: 'Pages/Enrollment.razor & Models/EnrollmentDto.cs',
      featureDescription: 'Formulário completo de matrícula com validação de CPF e termos de bolsa integrado.',
      linesOfCodeAdded: 92
    }
  },

  {
    id: 'blazor-04-state-di',
    trackId: 'blazor',
    order: 11,
    title: 'Injeção de Dependências & Gerenciamento de Estado Global',
    subtitle: 'AddScoped, StateContainer pattern, CascadingParameters e eventos de atualização',
    level: 'Avançado',
    estimatedMinutes: 35,
    academicObjective: 'Projetar arquiteturas de estado global para aplicações Single Page Application em Blazor, evitando "prop drilling" através do padrão StateContainer com delegates de notificação e injeção de dependência.',
    realWorldAnalogy: {
      headline: 'O Quadro Geral de Avisos na Entrada do Canteiro',
      analogyText: 'Se o horário de expediente mudar, o encarregado não sai correndo de sala em sala sussurrando no ouvido de cada um dos 200 operários. Ele vai até o Quadro Geral de Avisos central (StateContainer) e prega a folha lá.',
      dailyLifeComparison: 'Todos os setores que olham para o quadro (componentes inscritos) são atualizados na hora. Injeção de dependência é entregar esse mesmo quadro para todos os setores sem precisar criar cópias confusas.'
    },
    theory: {
      overview: 'À medida que uma aplicação Blazor cresce, múltiplos componentes em diferentes níveis da árvore precisam compartilhar dados (ex: aluno logado, total de disciplinas no carrinho de matrícula).',
      sections: [
        {
          title: '1. O Padrão StateContainer com Action de Notificação',
          content: 'Um StateContainer centraliza os dados e expõe um evento C# `public event Action? OnChange`. Sempre que uma propriedade muda, o serviço dispara o evento para todos os componentes inscritos.',
          codeSnippet: `public class CampusStateContainer
{
    public List<string> DisciplinasMatriculadas { get; private set; } = [];
    public event Action? OnChange;

    public void Adicionar(string codigo)
    {
        DisciplinasMatriculadas.Add(codigo);
        OnChange?.Invoke(); // Notifica todo mundo!
    }
}`,
          codeLanguage: 'csharp'
        }
      ],
      interviewTip: 'Componentes que se inscrevem em eventos C# devem SEMPRE implementar IDisposable para desinscrever-se (-= StateHasChanged) evitando vazamentos de memória.',
      blazorConnection: 'O UniSphere utiliza o CampusStateContainer para sincronizar o contador de disciplinas matriculadas entre a navbar, o catálogo de cursos e o painel de histórico escolar.'
    },
    quiz: [
      {
        id: 'qb4-1',
        question: 'Por que componentes Blazor que se inscrevem em `State.OnChange += ...` devem implementar `IDisposable`?',
        options: [
          'Para forçar o computador a reiniciar.',
          'Para remover a inscrição no evento (`State.OnChange -= ...`) e evitar vazamento de memória quando o componente for destruído.',
          'Porque o C# exige em qualquer classe.',
          'Para apagar o histórico de navegação.'
        ],
        correctOptionIndex: 1,
        explanation: 'Desinscrever-se permite ao Garbage Collector liberar a memória do componente destruído.',
      }
    ],
    challenge: {
      title: 'State Container Reativo com Inscrição IDisposable',
      instructions: 'Implemente a classe de estado `NotificacaoStateContainer` que gerencie uma lista privada, exponha `IReadOnlyList<string> Notificacoes`, declare o evento `OnChange` e implemente `Adicionar` e `Limpar`.',
      starterCode: `public class NotificacaoStateContainer
{
    private readonly List<string> _notificacoes = [];
    // TODO: Exponha IReadOnlyList, evento OnChange, Adicionar e Limpar
}`,
      solutionCode: `public class NotificacaoStateContainer
{
    private readonly List<string> _notificacoes = [];
    public IReadOnlyList<string> Notificacoes => _notificacoes.AsReadOnly();
    public event Action? OnChange;

    public void Adicionar(string mensagem)
    {
        _notificacoes.Add(mensagem);
        OnChange?.Invoke();
    }

    public void Limpar()
    {
        _notificacoes.Clear();
        OnChange?.Invoke();
    }
}`,
      hints: [
        'Declare: public event Action? OnChange;',
        'No método Adicionar: _notificacoes.Add(mensagem); OnChange?.Invoke();',
        'No método Limpar: _notificacoes.Clear(); OnChange?.Invoke();'
      ],
      testCases: [
        {
          name: 'Teste 1: Evento OnChange e IReadOnlyList',
          description: 'Deve expor evento OnChange e IReadOnlyList.',
          validator: (code) => {
            const hasEvent = code.includes('event Action') && code.includes('IReadOnlyList');
            return {
              passed: hasEvent,
              message: hasEvent ? 'Contrato de estado reativo verificado.' : 'Declare OnChange e IReadOnlyList.'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 3,
      componentName: 'Services/CampusStateContainer.cs & Shared/NotificationCenter.razor',
      featureDescription: 'Central global de notificações e sincronização reativa de créditos acadêmicos no UniSphere.',
      linesOfCodeAdded: 110
    }
  },

  {
    id: 'blazor-05-advanced-interop',
    trackId: 'blazor',
    order: 12,
    title: 'Blazor Avançado: JSInterop, Virtualize & Render Modes',
    subtitle: 'IJSRuntime, componente <Virtualize>, streaming SSR e modos interativos no .NET 8/9',
    level: 'Avançado',
    estimatedMinutes: 35,
    academicObjective: 'Dominar a interoperação bidirecional entre C# e JavaScript via IJSRuntime, otimização de grandes listas com <Virtualize> e a arquitetura unificada de Render Modes do .NET 8+.',
    realWorldAnalogy: {
      headline: 'O Tradutor Juramentado e a Janela de Atendimento',
      analogyText: 'Se um engenheiro brasileiro (C#) precisa fechar negócio com uma fornecedora alemã que só fala alemão (JavaScript do navegador), ele usa um tradutor oficial (IJSRuntime). Ele pede em português, o tradutor traduz em alemão e devolve a resposta clara.',
      dailyLifeComparison: 'O componente <Virtualize> é como um rolo de papel de planta: você não estica 10 quilômetros de papel na mesa ao mesmo tempo; você só desenrola o trecho que seus olhos estão enxergando agora.'
    },
    theory: {
      overview: 'No .NET 8/9/10, o Blazor unificou os modelos de hospedagem. Uma aplicação pode iniciar com SSR (Server-Side Rendering) super rápido e depois ativar componentes interativos específicos via WebAssembly ou Server.',
      sections: [
        {
          title: '1. Interoperação C# <-> JavaScript com IJSRuntime',
          content: 'Quando precisamos de APIs do navegador que não possuem abstração nativa (ex: LocalStorage, Clipboard), injetamos `IJSRuntime` e usamos `InvokeAsync` ou `InvokeVoidAsync`.',
          codeSnippet: `@inject IJSRuntime JS
<button @onclick="CopiarProtocolo">Copiar Protocolo</button>

@code {
    private async Task CopiarProtocolo() => 
        await JS.InvokeVoidAsync("navigator.clipboard.writeText", "MATR-2024-X981");
}`,
          codeLanguage: 'razor'
        }
      ],
      interviewTip: 'Ao chamar JSInterop durante o ciclo de vida, NUNCA chame IJSRuntime em OnInitializedAsync; faça em OnAfterRenderAsync(bool firstRender) com firstRender true.',
      blazorConnection: 'O UniSphere utiliza LocalStorage via JSInterop para salvar o progresso dos alunos no navegador e o componente Virtualize para exibir milhares de registros de diário de classe.'
    },
    quiz: [
      {
        id: 'qb5-1',
        question: 'Em qual método de ciclo de vida é seguro invocar chamadas de `IJSRuntime` para interagir com o navegador?',
        options: [
          'No construtor da classe.',
          'Em `OnInitializedAsync()`.',
          'Em `OnAfterRenderAsync(bool firstRender)` quando `firstRender` for true.',
          'Em métodos estáticos sem contexto.'
        ],
        correctOptionIndex: 2,
        explanation: 'Apenas após a renderização inicial o runtime JavaScript do navegador está conectado.',
      }
    ],
    challenge: {
      title: 'Wrapper de Armazenamento Local via IJSRuntime',
      instructions: 'Crie uma classe `ServicoArmazenamentoLocal` que receba `IJSRuntime js` e forneça `SalvarItemAsync` (InvokeVoidAsync) e `ObterItemAsync` (InvokeAsync<string?>).',
      starterCode: `using Microsoft.JSInterop;

public class ServicoArmazenamentoLocal
{
    private readonly IJSRuntime _js;
    public ServicoArmazenamentoLocal(IJSRuntime js) => _js = js;

    public async Task SalvarItemAsync(string chave, string valor)
    {
        // TODO: InvokeVoidAsync localStorage.setItem
    }

    public async Task<string?> ObterItemAsync(string chave)
    {
        // TODO: InvokeAsync localStorage.getItem
        return null;
    }
}`,
      solutionCode: `using Microsoft.JSInterop;

public class ServicoArmazenamentoLocal
{
    private readonly IJSRuntime _js;
    public ServicoArmazenamentoLocal(IJSRuntime js) => _js = js;

    public async Task SalvarItemAsync(string chave, string valor)
    {
        await _js.InvokeVoidAsync("localStorage.setItem", chave, valor);
    }

    public async Task<string?> ObterItemAsync(string chave)
    {
        return await _js.InvokeAsync<string?>("localStorage.getItem", chave);
    }
}`,
      hints: [
        'Use: await _js.InvokeVoidAsync("localStorage.setItem", chave, valor);',
        'Use: return await _js.InvokeAsync<string?>("localStorage.getItem", chave);'
      ],
      testCases: [
        {
          name: 'Teste 1: InvokeVoidAsync e InvokeAsync',
          description: 'Deve implementar as duas operações de armazenamento.',
          validator: (code) => {
            const hasOps = code.includes('InvokeVoidAsync') && code.includes('InvokeAsync');
            return {
              passed: hasOps,
              message: hasOps ? 'Operações de JSInterop implementadas.' : 'Implemente InvokeVoidAsync e InvokeAsync.'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 3,
      componentName: 'Services/LocalStorageInterop.cs & Pages/AuditLog.razor',
      featureDescription: 'Persistência no navegador via JSInterop e auditoria de navegação no UniSphere.',
      linesOfCodeAdded: 70
    }
  },

  // ==========================================
  // ÁREA 3: ASP.NET CORE & AZURE CLOUD
  // ==========================================
  {
    id: 'cloud-01-minimal-apis',
    trackId: 'aspnet_azure',
    order: 13,
    title: 'Minimal APIs & Pipeline de Middlewares no ASP.NET Core',
    subtitle: 'MapGet/MapPost, Results tipados, injeção de dependência nativa e filtros de endpoint',
    level: 'Intermediário',
    estimatedMinutes: 30,
    academicObjective: 'Compreender a arquitetura de alta performance das Minimal APIs no .NET, o ciclo de vida do pipeline de middlewares HTTP e a modelagem RESTful com TypedResults.',
    realWorldAnalogy: {
      headline: 'A Esteira de Triagem com Portões de Inspeção',
      analogyText: 'Toda encomenda que entra no centro de distribuição passa por uma esteira com vários postos: 1) Scanner de raio-x (segurança), 2) Checagem de nota fiscal (autenticação), 3) Conferência de endereço (roteamento), 4) Separação no caminhão certo (o endpoint final).',
      dailyLifeComparison: 'O pipeline do ASP.NET Core é essa esteira. Cada "Middleware" é um posto de inspeção por onde a requisição da internet passa antes de devolver a resposta ao cliente.'
    },
    theory: {
      overview: 'Introduzidas para reduzir o boilerplate de Controllers tradicionais, as Minimal APIs são a forma padrão e mais rápida de construir microsserviços REST no ASP.NET Core moderno.',
      sections: [
        {
          title: '1. O Pipeline de Middlewares',
          content: 'A ordem de declaração é crucial: exceções -> HTTPS -> autenticação -> autorização -> endpoints.',
          codeSnippet: `var app = WebApplication.Create(args);
app.UseAuthentication();
app.UseAuthorization();
app.MapGet("/api/saudacao", () => "Olá Mundo!");
app.Run();`,
          codeLanguage: 'csharp'
        }
      ],
      interviewTip: 'Lembre-se: `app.UseAuthentication()` DEVE vir ANTES de `app.UseAuthorization()`. Primeiro você identifica QUEM é o usuário antes de checar as permissões dele.',
      blazorConnection: 'O frontend Blazor consome diretamente esses endpoints REST para carregar alunos, notas e catálogos em tempo real.'
    },
    quiz: [
      {
        id: 'qc1-1',
        question: 'O que acontece se `app.UseAuthorization()` for declarado antes de `app.UseAuthentication()`?',
        options: [
          'O sistema apaga o código C#.',
          'A autorização avaliará a requisição antes de a identidade ser reconhecida, fazendo com que usuários legítimos falhem como anônimos.',
          'Aumenta a velocidade do servidor.',
          'Nenhum efeito colateral ocorre.'
        ],
        correctOptionIndex: 1,
        explanation: 'A ordem é estrita: autenticação (quem é) precede autorização (o que pode fazer).',
      }
    ],
    challenge: {
      title: 'Configuração de Endpoint de Matrícula Minimal API',
      instructions: 'Escreva um método estático `MapearRotasAcademicas(WebApplication app)` que defina POST em `"/api/matriculas"`. Se `dto.Creditos > 30`, retorne `Results.BadRequest("Limite de créditos excedido.")`; senão, chame o serviço e retorne `Results.Ok(novoId)`.',
      starterCode: `public record MatriculaDto(int AlunoId, string Curso, int Creditos);

public interface IServicoMatricula
{
    Task<int> EfetivarAsync(MatriculaDto dto);
}

public static class EndpointConfig
{
    public static void MapearRotasAcademicas(WebApplication app)
    {
        // TODO: app.MapPost("/api/matriculas", ...)
    }
}`,
      solutionCode: `public record MatriculaDto(int AlunoId, string Curso, int Creditos);

public interface IServicoMatricula
{
    Task<int> EfetivarAsync(MatriculaDto dto);
}

public static class EndpointConfig
{
    public static void MapearRotasAcademicas(WebApplication app)
    {
        app.MapPost("/api/matriculas", async (MatriculaDto dto, IServicoMatricula servico) =>
        {
            if (dto.Creditos > 30)
            {
                return Results.BadRequest("Limite de créditos excedido.");
            }
            var novoId = await servico.EfetivarAsync(dto);
            return Results.Ok(novoId);
        });
    }
}`,
      hints: [
        'Use: app.MapPost("/api/matriculas", async (MatriculaDto dto, IServicoMatricula servico) => { ... });',
        'Cheque dto.Creditos > 30 com Results.BadRequest.'
      ],
      testCases: [
        {
          name: 'Teste 1: Rota POST /api/matriculas',
          description: 'Mapeamento correto com injeção do serviço.',
          validator: (code) => {
            const hasRoute = code.includes('MapPost') && code.includes('/api/matriculas');
            return {
              passed: hasRoute,
              message: hasRoute ? 'Endpoint MapPost registrado.' : 'Utilize app.MapPost("/api/matriculas", ...).'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 4,
      componentName: 'Api/StudentEndpoints.cs & Shared/SwaggerInspector.razor',
      featureDescription: 'Camada de API RESTful Minimal APIs integrada com Swagger interativo no UniSphere.',
      linesOfCodeAdded: 105
    }
  },

  {
    id: 'cloud-02-ef-core',
    trackId: 'aspnet_azure',
    order: 14,
    title: 'Persistência com Entity Framework Core 8+',
    subtitle: 'DbContext, DbSet<T>, Migrations, AsNoTracking e consultas LINQ compiladas',
    level: 'Avançado',
    estimatedMinutes: 35,
    academicObjective: 'Dominar o Object-Relational Mapper (ORM) de alta performance do .NET, relacionamentos relacionais, migrações de esquema e técnicas de otimização de consultas para bancos SQL.',
    realWorldAnalogy: {
      headline: 'O Almoxarifado Central com Fichário Eletrônico',
      analogyText: 'Em vez de você descer no subsolo da pedreira, vasculhar gaveta por gaveta e anotar na mão com giz os 500 sacos de cal, você fala com o Almoxarife Geral (o DbContext).',
      dailyLifeComparison: 'Você pede em C# ("Almoxarife, me dê os sacos ativos"), e ele mesmo traduz a ordem para a linguagem do armazém (SQL), pega as peças na estante certa e entrega organizadas na sua mão.'
    },
    theory: {
      overview: 'Entity Framework Core (EF Core) é o ORM padrão do .NET. Ele traduz expressões C# LINQ para comandos SQL otimizados e monitora o ciclo de vida das entidades.',
      sections: [
        {
          title: '1. Consultas Read-Only Otimizadas com AsNoTracking()',
          content: 'Por padrão, o EF Core mantém cópias de todas as entidades carregadas no heap para rastrear mutações. Para consultas de leitura (relatórios e APIs GET), AsNoTracking() desativa esse rastreador, economizando memória e acelerando em até 3x.',
          codeSnippet: `var alunos = await _context.Alunos
    .AsNoTracking()
    .Where(a => a.Ativo)
    .ToListAsync();`,
          codeLanguage: 'csharp'
        }
      ],
      interviewTip: 'Problema N+1: nunca acesse propriedades de navegação dentro de um loop sem fazer `.Include()` antecipado.',
      blazorConnection: 'A camada de serviços do backend do UniSphere utiliza EF Core com AsNoTracking para alimentar com alta velocidade as tabelas de diário acadêmico no Blazor.'
    },
    quiz: [
      {
        id: 'qc2-1',
        question: 'Qual o principal benefício de usar `.AsNoTracking()` em consultas de leitura no EF Core?',
        options: [
          'Deleta registros antigos do banco.',
          'Desativa o Change Tracker em memória, reduzindo uso de RAM e aumentando a velocidade da consulta.',
          'Criptografa a tabela inteira.',
          'Desconecta o banco de dados da internet.'
        ],
        correctOptionIndex: 1,
        explanation: 'Consultas sem rastreamento não criam snapshots no heap da memória.',
      }
    ],
    challenge: {
      title: 'Repositório de Consulta Otimizada com EF Core',
      instructions: 'Escreva um método `ObterDisciplinasPorDepartamentoAsync` aplicando `.AsNoTracking()`, filtro por depto e ativa, ordenação por nome e projeção DTO.',
      starterCode: `public record ResumoDisciplinaDto(string Codigo, string Nome, int Creditos);

public static class RepositorioDisciplinas
{
    public static async Task<List<ResumoDisciplinaDto>> ObterDisciplinasPorDepartamentoAsync(
        UniversidadeDbContext context, 
        string depto)
    {
        return [];
    }
}`,
      solutionCode: `public record ResumoDisciplinaDto(string Codigo, string Nome, int Creditos);

public static class RepositorioDisciplinas
{
    public static async Task<List<ResumoDisciplinaDto>> ObterDisciplinasPorDepartamentoAsync(
        UniversidadeDbContext context, 
        string depto) =>
        await context.Disciplinas
            .AsNoTracking()
            .Where(d => d.Departamento == depto && d.Ativa)
            .OrderBy(d => d.Nome)
            .Select(d => new ResumoDisciplinaDto(d.Codigo, d.Nome, d.Creditos))
            .ToListAsync();
}`,
      hints: [
        'Inicie com: await context.Disciplinas.AsNoTracking()...',
        'Adicione Where, OrderBy, Select e ToListAsync.'
      ],
      testCases: [
        {
          name: 'Teste 1: Uso de AsNoTracking',
          description: 'Deve desativar o rastreador de entidades.',
          validator: (code) => {
            const hasNoTracking = code.includes('AsNoTracking');
            return {
              passed: hasNoTracking,
              message: hasNoTracking ? 'AsNoTracking aplicado com sucesso.' : 'Adicione .AsNoTracking().'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 4,
      componentName: 'Data/CampusDbContext.cs & Models/CampusEntities.cs',
      featureDescription: 'Modelo relacional de dados com Entity Framework Core configurado no projeto.',
      linesOfCodeAdded: 88
    }
  },

  {
    id: 'cloud-03-security-jwt',
    trackId: 'aspnet_azure',
    order: 15,
    title: 'Segurança, Autenticação & Autorização com JWT',
    subtitle: 'JSON Web Tokens, Claims-based Authorization, Policies e proteção RBAC',
    level: 'Avançado',
    estimatedMinutes: 35,
    academicObjective: 'Implementar segurança de ponta a ponta no ecossistema .NET: emissão e validação de tokens JWT, ClaimsIdentity, autorização baseada em papéis (RBAC) e políticas customizadas.',
    realWorldAnalogy: {
      headline: 'O Crachá Eletrônico com Holograma Infalsificável',
      analogyText: 'Na entrada de um complexo industrial ou aeroporto, você recebe um crachá com QR Code assinado pela diretoria. Nele está impresso seu nome, cargo e os portões onde você tem permissão de entrar.',
      dailyLifeComparison: 'Um token JWT é esse crachá digital. O segurança da porta (servidor) só precisa ler a assinatura do holograma: ele não precisa telefonar para o diretor a cada vez que você passa pela catraca.'
    },
    theory: {
      overview: 'Em arquiteturas modernas desacopladas (Blazor WebAssembly + Web API), a autenticação não utiliza sessões de cookies no servidor. O cliente autentica-se e recebe um token JWT assinado criptograficamente.',
      sections: [
        {
          title: '1. Estrutura do JWT e Claims',
          content: 'O token contém Claims (declarações sobre o usuário: Id, Papel, Departamento). A assinatura HMAC SHA-256 garante que o conteúdo não foi alterado por fraudadores.',
          codeSnippet: `var claims = new[]
{
    new Claim(ClaimTypes.Name, "Carlos Silva"),
    new Claim(ClaimTypes.Role, "MestreDeObras")
};`,
          codeLanguage: 'csharp'
        }
      ],
      interviewTip: 'Nunca coloque senhas dentro do payload do JWT! O payload é apenas codificado em Base64, e qualquer pessoa pode ler seu conteúdo; a segurança está na assinatura criptográfica.',
      blazorConnection: 'No Blazor, o `AuthenticationStateProvider` nativo decodifica o JWT e atualiza componentes como `<AuthorizeView>` para mostrar ou esconder botões de acordo com o papel do estudante ou professor.'
    },
    quiz: [
      {
        id: 'qc3-1',
        question: 'O payload de um token JWT pode ser lido por qualquer pessoa que tenha posse do token?',
        options: [
          'Não, ele é criptografado com segredo militar.',
          'Sim, ele é apenas codificado em Base64Url (legível); a segurança consiste na assinatura que impede adulteração do conteúdo.',
          'Apenas o Google consegue ler.',
          'Ele expira em 1 segundo.'
        ],
        correctOptionIndex: 1,
        explanation: 'JWT é assinado, não criptografado por padrão.',
      }
    ],
    challenge: {
      title: 'Configurador de Políticas de Autorização RBAC',
      instructions: 'Escreva um método estático `ConfigurarPoliticasAcademicas(AuthorizationOptions options)` definindo "AcessoCoordenador" e "BolsistaPesquisa".',
      starterCode: `using Microsoft.AspNetCore.Authorization;

public static class SegurancaAcademica
{
    public static void ConfigurarPoliticasAcademicas(AuthorizationOptions options)
    {
        // TODO: Configure as políticas
    }
}`,
      solutionCode: `using Microsoft.AspNetCore.Authorization;

public static class SegurancaAcademica
{
    public static void ConfigurarPoliticasAcademicas(AuthorizationOptions options)
    {
        options.AddPolicy("AcessoCoordenador", policy => policy.RequireRole("Coordenador"));
        options.AddPolicy("BolsistaPesquisa", policy => 
            policy.RequireRole("Estudante").RequireClaim("Bolsa", "Ativa"));
    }
}`,
      hints: [
        'Use: options.AddPolicy("AcessoCoordenador", p => p.RequireRole("Coordenador"));',
        'Use: policy.RequireRole("Estudante").RequireClaim("Bolsa", "Ativa");'
      ],
      testCases: [
        {
          name: 'Teste 1: Política AcessoCoordenador',
          description: 'Deve exigir role de Coordenador.',
          validator: (code) => {
            const hasCoord = code.includes('AcessoCoordenador') && code.includes('Coordenador');
            return {
              passed: hasCoord,
              message: hasCoord ? 'Política de coordenador configurada.' : 'Configure AcessoCoordenador com Coordenador.'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 4,
      componentName: 'Shared/CustomAuthorizeView.razor & Services/TokenAuthService.cs',
      featureDescription: 'Camada de autorização baseada em Claims e controle de acesso visual por perfil de estudante no UniSphere.',
      linesOfCodeAdded: 76
    }
  },

  {
    id: 'cloud-04-azure-architecture',
    trackId: 'aspnet_azure',
    order: 16,
    title: 'Cloud Azure: App Service, SQL & Blob Storage',
    subtitle: 'Deploy PaaS, Azure Blob Storage para arquivos acadêmicos e Application Insights',
    level: 'Avançado',
    estimatedMinutes: 35,
    academicObjective: 'Arquitetar soluções corporativas escaláveis na Microsoft Azure, compreendendo modelos PaaS (Azure App Service), armazenamento de objetos não estruturados (Azure Blob Storage) e observabilidade com Application Insights.',
    realWorldAnalogy: {
      headline: 'A Rede Elétrica Nacional vs Gerador a Diesel no Quintal',
      analogyText: 'Em vez de comprar um computador físico caro, colocar na sua garagem, pagar no-break, ar-condicionado e rezar para a internet não cair, você aluga o serviço da Microsoft na Nuvem (Azure).',
      dailyLifeComparison: 'É como ligar a tomada na parede: se você precisa de mais energia para ligar 10 britadeiras extras durante um pico de obra (auto-scaling), a rede elétrica fornece imediatamente; quando a obra acaba, você desliga e só paga o que usou.'
    },
    theory: {
      overview: 'Aplicações .NET corporativas atingem seu potencial máximo integradas à nuvem da Microsoft (Azure). Em vez de gerenciar máquinas virtuais (IaaS), empregamos Platform as a Service (PaaS).',
      sections: [
        {
          title: '1. Armazenamento de Arquivos com Azure Blob Storage',
          content: 'PDFs de diplomas e comprovantes de matrícula não devem ser salvos no disco local da máquina; usamos contêineres na nuvem com o SDK Azure.Storage.Blobs.',
          codeSnippet: `var container = _blobService.GetBlobContainerClient("documentos");
await container.CreateIfNotExistsAsync();
var blob = container.GetBlobClient("diploma.pdf");
await blob.UploadAsync(stream);`,
          codeLanguage: 'csharp'
        }
      ],
      interviewTip: 'Nunca versione chaves de conexão da Azure no Git! No ambiente profissional, utiliza-se Azure Key Vault ou Managed Identities.',
      blazorConnection: 'O UniSphere inclui um painel Cloud Console com métricas simuladas de telemetria da Azure e gerenciador de arquivos de projetos acadêmicos via Blob Storage.'
    },
    quiz: [
      {
        id: 'qc4-1',
        question: 'Por que salvar arquivos de upload no disco local de um App Service é um erro de arquitetura na nuvem?',
        options: [
          'Porque computadores da nuvem não aceitam arquivos PDF.',
          'Porque instâncias na nuvem são efêmeras e escalam para múltiplas máquinas; se uma máquina reiniciar ou escalar, os arquivos locais podem sumir ou não estar disponíveis nas outras instâncias.',
          'Porque a Microsoft multa desenvolvedores.',
          'Porque o C# não aceita salvar arquivos.'
        ],
        correctOptionIndex: 1,
        explanation: 'Aplicações cloud-native devem ser stateless; arquivos persistentes pertencem ao Blob Storage.',
      }
    ],
    challenge: {
      title: 'Cliente de Upload Seguro no Azure Blob Storage',
      instructions: 'Escreva `GestorDocumentosAzure` que receba `BlobServiceClient blobService` e implemente `ObterOuCriarContainerAsync` com `CreateIfNotExistsAsync()`.',
      starterCode: `using Azure.Storage.Blobs;

public class GestorDocumentosAzure
{
    private readonly BlobServiceClient _blobService;
    public GestorDocumentosAzure(BlobServiceClient blobService) => _blobService = blobService;

    public async Task<BlobContainerClient> ObterOuCriarContainerAsync(string nomeContainer)
    {
        return _blobService.GetBlobContainerClient(nomeContainer);
    }
}`,
      solutionCode: `using Azure.Storage.Blobs;

public class GestorDocumentosAzure
{
    private readonly BlobServiceClient _blobService;
    public GestorDocumentosAzure(BlobServiceClient blobService) => _blobService = blobService;

    public async Task<BlobContainerClient> ObterOuCriarContainerAsync(string nomeContainer)
    {
        var containerClient = _blobService.GetBlobContainerClient(nomeContainer);
        await containerClient.CreateIfNotExistsAsync();
        return containerClient;
    }
}`,
      hints: [
        'Obtenha o cliente com: var container = _blobService.GetBlobContainerClient(nomeContainer);',
        'Execute: await containerClient.CreateIfNotExistsAsync();'
      ],
      testCases: [
        {
          name: 'Teste 1: Criação idempotente com CreateIfNotExistsAsync',
          description: 'Deve garantir a existência do contêiner.',
          validator: (code) => {
            const hasCreate = code.includes('CreateIfNotExistsAsync') && code.includes('await');
            return {
              passed: hasCreate,
              message: hasCreate ? 'Chamada idempotente verificada.' : 'Invoque await containerClient.CreateIfNotExistsAsync().'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 5,
      componentName: 'Pages/CloudConsole.razor & Services/AzureBlobService.cs',
      featureDescription: 'Console de telemetria Azure e explorer de documentos acadêmicos na nuvem no UniSphere.',
      linesOfCodeAdded: 125
    }
  },

  {
    id: 'cloud-05-serverless-messaging',
    trackId: 'aspnet_azure',
    order: 17,
    title: 'Arquitetura Serverless & Mensageria com Azure Service Bus',
    subtitle: 'Azure Functions, tópicos e filas do Service Bus, arquitetura orientada a eventos',
    level: 'Avançado',
    estimatedMinutes: 35,
    academicObjective: 'Dominar arquiteturas modernas orientadas a eventos (EDA): desacoplamento com filas e tópicos no Azure Service Bus e processamento assíncrono serverless escalável com Azure Functions.',
    realWorldAnalogy: {
      headline: 'A Caixa de Correio e a Caçamba de Entulho',
      analogyText: 'Se 100 caminhões chegam ao mesmo tempo para descarregar terra na pedreira, o operador não tenta descarregar os 100 caminhões no mesmo segundo (isso causaria um engavetamento fatal). Ele organiza uma fila ordenada de espera (Service Bus Queue).',
      dailyLifeComparison: 'Cada caminhão entra na fila, descarrega com calma e vai embora. Mesmo que caia uma tempestade temporária, a fila segura todos os caminhões e nenhuma carga é perdida na estrada.'
    },
    theory: {
      overview: 'Em sistemas acadêmicos de grande porte, operações pesadas (como emissão em lote de certificados digitais ou envio de comunicados para 20.000 alunos) não devem ser processadas na requisição web síncrona. A Web API apenas publica uma mensagem em uma fila, e uma Azure Function consome em segundo plano.',
      sections: [
        {
          title: '1. Filas (Queues) vs Tópicos (Publish/Subscribe)',
          content: 'Filas operam no modelo Ponto a Ponto: 1 mensagem é processada por exatamente 1 consumidor. Tópicos entregam a mesma mensagem para múltiplos assinantes independentes.',
          codeSnippet: `var sender = client.CreateSender("fila-diplomas");
var message = new ServiceBusMessage(Encoding.UTF8.GetBytes(json));
await sender.SendMessageAsync(message);`,
          codeLanguage: 'csharp'
        }
      ],
      interviewTip: 'Dead-Letter Queues (DLQ): mensagens com erro repetido são isoladas para inspeção sem travar a fila operacional principal.',
      blazorConnection: 'No nível final do UniSphere, o aluno pode disparar uma simulação de processamento assíncrono de certificação acadêmica e ver as mensagens trafegando pela fila do Service Bus até a conclusão!'
    },
    quiz: [
      {
        id: 'qc5-1',
        question: 'Qual a principal diferença entre Fila e Tópico no Azure Service Bus?',
        options: [
          'Filas são apagadas ao meio-dia.',
          'Em uma Fila, cada mensagem é processada por 1 consumidor; em um Tópico, múltiplos assinantes recebem cópias independentes da mesma mensagem (Publish/Subscribe).',
          'Filas só aceitam números.',
          'Tópicos não funcionam com C#.'
        ],
        correctOptionIndex: 1,
        explanation: 'Fila é para distribuição de carga 1:1; Tópico é 1:N.',
      }
    ],
    challenge: {
      title: 'Publicador Resiliente no Azure Service Bus',
      instructions: 'Escreva um método estático `PublicarEventoAsync` que serializa `evento` para JSON, cria `ServiceBusMessage` com ContentType "application/json" e envia com `SendMessageAsync`.',
      starterCode: `using System.Text;
using System.Text.Json;
using Azure.Messaging.ServiceBus;

public record SolicitacaoDiplomaEvento(int AlunoId, string Curso, DateTime Data);

public static class ProdutorMensageria
{
    public static async Task PublicarEventoAsync(ServiceBusSender sender, SolicitacaoDiplomaEvento evento)
    {
        // TODO: Serializar e enviar ServiceBusMessage
    }
}`,
      solutionCode: `using System.Text;
using System.Text.Json;
using Azure.Messaging.ServiceBus;

public record SolicitacaoDiplomaEvento(int AlunoId, string Curso, DateTime Data);

public static class ProdutorMensageria
{
    public static async Task PublicarEventoAsync(ServiceBusSender sender, SolicitacaoDiplomaEvento evento)
    {
        string json = JsonSerializer.Serialize(evento);
        var message = new ServiceBusMessage(Encoding.UTF8.GetBytes(json))
        {
            ContentType = "application/json"
        };
        await sender.SendMessageAsync(message);
    }
}`,
      hints: [
        'Use: string json = JsonSerializer.Serialize(evento);',
        'Crie ServiceBusMessage com Encoding.UTF8.GetBytes(json)',
        'Envie com: await sender.SendMessageAsync(message);'
      ],
      testCases: [
        {
          name: 'Teste 1: Serialização e Envio com SendMessageAsync',
          description: 'Deve empacotar e despachar a mensagem assíncrona.',
          validator: (code) => {
            const hasSend = code.includes('SendMessageAsync') && code.includes('JsonSerializer');
            return {
              passed: hasSend,
              message: hasSend ? 'Publicação no Service Bus verificada.' : 'Utilize JsonSerializer e SendMessageAsync.'
            };
          }
        }
      ]
    },
    blazorImpact: {
      tierUnlocked: 5,
      componentName: 'Shared/ServiceBusMonitor.razor & Pages/CertificationHub.razor',
      featureDescription: 'Simulador interativo de mensageria assíncrona e emissão de certificados digitais via Azure no UniSphere.',
      linesOfCodeAdded: 140
    }
  }
];

export const TRACKS_METADATA = [
  {
    id: 'fundamentos' as const,
    title: 'Da Fundação ao Algoritmo',
    tagline: 'Para Iniciantes Absolutos & Qualquer Profissão',
    description: 'Aprenda lógica de programação com analogias práticas da construção civil, oficinas e dia a dia. Sem jargões complicados: o computador como ajudante sequencial.',
    icon: 'Hammer',
    color: 'from-amber-500 to-orange-600',
    accentColor: '#f59e0b',
    modulesCount: 2
  },
  {
    id: 'csharp' as const,
    title: 'C# 12 & .NET Moderno',
    tagline: 'Da Sintaxe Fundamental à Alta Performance',
    description: 'Sistemas de tipos estáticos, Nullable References, Records imutáveis, LINQ funcional, async/await concorrente e manipulação de memória com Span<T>.',
    icon: 'Terminal',
    color: 'from-violet-500 to-indigo-600',
    accentColor: '#6366f1',
    modulesCount: 5
  },
  {
    id: 'blazor' as const,
    title: 'Blazor Full-Stack & WebAssembly',
    tagline: 'Construindo Web Apps Ricas em C#',
    description: 'RenderTree, ciclo de vida de componentes, data binding bidirecional, formulários com EditContext, State Containers e Render Modes do .NET 8/9.',
    icon: 'Layers',
    color: 'from-blue-500 to-cyan-600',
    accentColor: '#0ea5e9',
    modulesCount: 5
  },
  {
    id: 'aspnet_azure' as const,
    title: 'ASP.NET Core & Cloud Azure',
    tagline: 'Arquitetura Corporativa & Nuvem',
    description: 'Minimal APIs RESTful, Entity Framework Core com AsNoTracking, segurança JWT/Claims, Azure App Services, Blob Storage e Service Bus.',
    icon: 'Cloud',
    color: 'from-sky-500 to-blue-700',
    accentColor: '#2563eb',
    modulesCount: 5
  }
];
