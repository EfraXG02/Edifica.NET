# Edifica.NET: Da Fundação ao Arquiteto Cloud

> **Plataforma Acadêmica de Ensino de Programação em C#, Blazor Full-Stack & Nuvem Azure com Projeto Vivo Incremental e Persistência Total de Dados.**

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![.NET 9](https://img.shields.io/badge/.NET-9.0-purple.svg)
![Blazor WebAssembly](https://img.shields.io/badge/Blazor-WebAssembly-blueviolet.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4.svg)
![Status](https://img.shields.io/badge/Status-Production%20Ready-emerald.svg)

---

## 🏗️ Filosofia e Proposta Pedagógica

O **Edifica.NET** nasceu com um objetivo claro: **democratizar o aprendizado da engenharia de software corporativa**, tornando conceitos complexos acessíveis para qualquer pessoa — desde operários de pedreira, motoristas e profissionais de serviços em transição de carreira até estudantes universitários de Ciência da Computação.

Todas as lições conectam os conceitos de computação a situações reais do cotidiano:
- **Variáveis**: como caixas etiquetadas em um almoxarifado.
- **Condicionais (If/Else)**: como checagens de EPI e segurança na obra.
- **Records e Imutabilidade**: como Notas Fiscais carimbadas e invioláveis.
- **Programação Assíncrona (Async/Await)**: como a espera inteligente por peças no balcão sem travar o operário.
- **Service Bus e Mensageria**: como filas ordenadas de caçambas para evitar gargalos na estrada.

---

## 🚀 O Projeto Blazor Vivo (*UniSphere*)

A plataforma implementa a mecânica de **desenvolvimento guiado por marcos**: quanto mais você estuda e resolve desafios, mais a aplicação Blazor WebAssembly real cresce:

- **Tier 0 (Fundação)**: Setup do Host WebAssembly, injeção básica e barra de status do runtime.
- **Tier 1 (Catálogo)**: Modelos C# Records imutáveis (`Course.cs`), componente `<CourseCard>` e busca reativa com LINQ.
- **Tier 2 (Matrícula)**: Formulários com `<EditForm>`, validação com `<DataAnnotationsValidator>` e checagem de CPF.
- **Tier 3 (Estado Global)**: Gerenciamento reativo com `CampusStateContainer` (Publish/Subscribe com `Action OnChange`) e JSInterop com LocalStorage.
- **Tier 4 (Minimal APIs & Swagger)**: Endpoints RESTful em ASP.NET Core, `DbContext` do Entity Framework Core com `AsNoTracking` e Swagger UI interativo.
- **Tier 5 (Azure Enterprise Cloud)**: Console com telemetria do Azure App Service, repositório de documentos no Azure Blob Storage e simulador de fila no Azure Service Bus.

---

## 💾 Memória e Persistência sem Perda de Dados

A plataforma conta com **persistência contínua no navegador** (`localStorage`):
1. **Progresso do Aluno**: Módulos concluídos, notas nos quizzes, soluções de código salvas e pontuação XP preservados após fechar a aba ou reiniciar a máquina.
2. **Estado do Projeto Blazor**: Matrículas ativas, histórico de notificações do StateContainer, rascunhos de formulário e uploads de arquivos simulados no Azure Blob Storage permanecem salvos.
3. **Backup Exportável**: Botão nativo para baixar um arquivo `edifica_net_backup.json` e restaurar o progresso em qualquer outro computador.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons.
- **Runtime .NET Simulado**: Compilador de verificação C# 12 / .NET 9 e engine de componentes Razor.
- **Persistência**: LocalStorage sincronizado em tempo real com exportação/importação JSON.
- **Efeitos de Conquista**: `canvas-confetti` para celebração de desbloqueios de Tiers.

---

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** ou **pnpm**

### Instalação
```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/edifica-net.git

# 2. Acesse a pasta do projeto
cd edifica-net

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Abra `http://localhost:3000` (ou a porta informada pelo Vite) no seu navegador.

### Compilação de Produção
```bash
npm run build
```

---

## 📂 Estrutura de Pastas

```
├── public/                 # Favicons e arquivos estáticos
├── src/
│   ├── components/         # Componentes visuais
│   │   ├── Logo.tsx        # Logotipo vetorial oficial do Edifica.NET
│   │   ├── Navbar.tsx      # Barra de navegação com indicador de memória
│   │   ├── ModuleList.tsx  # Catálogo das 4 trilhas e 17 módulos
│   │   ├── TheoryView.tsx  # Leitor com analogias práticas e código
│   │   ├── QuizView.tsx    # Motor de avaliação conceitual
│   │   ├── CodeSandbox.tsx # Laboratório de código C# com testes automáticos
│   │   ├── BlazorProjectViewer.tsx # Simulador e explorador de código Blazor
│   │   └── AcademicCertificate.tsx # Certificado oficial para impressão/PDF
│   ├── context/            # AcademicContext com persistência total em LocalStorage
│   ├── data/
│   │   ├── curriculum.ts   # Currículo pedagógico com analogias reais
│   │   └── blazorProject.ts# Arquivos C#/Razor dos 6 Tiers de evolução
│   ├── types/              # Tipagens estritas do sistema
│   ├── App.tsx             # Roteador principal
│   └── main.tsx            # Ponto de entrada React
├── index.html              # HTML5 com tipografia Plus Jakarta Sans & JetBrains Mono
└── package.json            # Dependências e scripts npm
```

---

## 🎓 Certificação Acadêmica

Ao atingir 50% de conclusão do programa, o estudante pode emitir o **Certificado Oficial de Proficiência em Engenharia de Software .NET, Blazor & Cloud Azure**, contendo carga horária estimada (60h), protocolo de autenticidade criptográfica e layout pronto para impressão em PDF.

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte `LICENSE` para mais detalhes.
