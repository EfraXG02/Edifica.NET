import { BlazorFile } from '../types';

export interface BlazorProjectTier {
  tierNumber: number;
  name: string;
  tagline: string;
  minProgressPercentage: number;
  summary: string;
  unlockedFiles: string[];
  keyFeatures: string[];
}

export const BLAZOR_TIERS: BlazorProjectTier[] = [
  {
    tierNumber: 0,
    name: 'Tier 0: Fundação & Shell WebAssembly',
    tagline: 'Estrutura Host, Layout Responsivo & Injeção Básica',
    minProgressPercentage: 0,
    summary: 'O esqueleto do projeto Blazor WebAssembly rodando sobre o runtime .NET compilado para WebAssembly no navegador.',
    unlockedFiles: ['Program.cs', 'App.razor', 'MainLayout.razor', 'Pages/Index.razor'],
    keyFeatures: [
      'Host WebAssembly configurado com HttpClient nativo',
      'Layout base com navegação lateral e barra de status',
      'Página inicial com contador reativo e métricas de inicialização do runtime'
    ]
  },
  {
    tierNumber: 1,
    name: 'Tier 1: Catálogo de Disciplinas & Componentização',
    tagline: 'C# Records, Parâmetros e Filtros LINQ Reativos',
    minProgressPercentage: 15,
    summary: 'Componentização modular de cursos e disciplinas com busca instantânea em memória e tipagem estrita com Records.',
    unlockedFiles: ['Models/Course.cs', 'Shared/CourseCard.razor', 'Pages/Courses.razor'],
    keyFeatures: [
      'Modelagem imutável com C# Records (Course.cs)',
      'Componente reutilizável <CourseCard> com parâmetros tipados',
      'Filtro reativo por departamento e carga horária utilizando LINQ'
    ]
  },
  {
    tierNumber: 2,
    name: 'Tier 2: Formulários Enterprise & Validação EditContext',
    tagline: 'EditForm, DataAnnotations e Validação Assíncrona de Matrícula',
    minProgressPercentage: 35,
    summary: 'Módulo acadêmico de matrícula universitária com validação de dados em tempo real, checagem de CPF e cálculo automático de créditos.',
    unlockedFiles: ['Models/EnrollmentDto.cs', 'Pages/Enrollment.razor', 'Shared/AcademicAlert.razor'],
    keyFeatures: [
      'Formulário reativo com <EditForm> e <DataAnnotationsValidator>',
      'Validação de CPF com expressão regular e regras de bolsa',
      'Tabela de matrículas confirmadas com feedback de loading'
    ]
  },
  {
    tierNumber: 3,
    name: 'Tier 3: Gerenciamento de Estado Global & JSInterop',
    tagline: 'StateContainer Pattern, Observer Reativo e LocalStorage',
    minProgressPercentage: 55,
    summary: 'Camada de estado compartilhada entre múltiplos componentes sem prop drilling, com central de notificações pub/sub e persistência via JSInterop.',
    unlockedFiles: ['Services/CampusStateContainer.cs', 'Shared/NotificationCenter.razor', 'Services/LocalStorageInterop.cs'],
    keyFeatures: [
      'Padrão StateContainer com eventos C# (Action OnChange)',
      'Central de notificações em tempo real com contador reativo na navbar',
      'Interoperação JavaScript (IJSRuntime) com LocalStorage'
    ]
  },
  {
    tierNumber: 4,
    name: 'Tier 4: Backend ASP.NET Core & Mini Swagger Inspector',
    tagline: 'Minimal APIs, Entity Framework Core e Simulação REST',
    minProgressPercentage: 75,
    summary: 'Integração completa com a camada de serviços RESTful em ASP.NET Core, DbContext do EF Core e testador interativo de endpoints no próprio Blazor.',
    unlockedFiles: ['Api/StudentEndpoints.cs', 'Data/CampusDbContext.cs', 'Shared/SwaggerInspector.razor'],
    keyFeatures: [
      'Definição de rotas REST com Minimal APIs e TypedResults',
      'DbContext do Entity Framework Core com consultas AsNoTracking',
      'Swagger UI integrado no Blazor para disparar e inspecionar chamadas HTTP reais'
    ]
  },
  {
    tierNumber: 5,
    name: 'Tier 5: Arquitetura Cloud Azure Enterprise',
    tagline: 'Azure App Service Telemetry, Blob Storage & Service Bus Queue',
    minProgressPercentage: 90,
    summary: 'A aplicação atinge maturidade de arquitetura em nuvem: monitoramento de telemetria Azure, repositório de documentos no Blob Storage e fila assíncrona.',
    unlockedFiles: ['Pages/CloudConsole.razor', 'Services/AzureBlobService.cs', 'Shared/ServiceBusMonitor.razor'],
    keyFeatures: [
      'Dashboard Azure Cloud com latência, consumo de memória e saúde do App Service',
      'Repositório de arquivos com simulação do SDK Azure.Storage.Blobs',
      'Simulador de mensagens assíncronas do Azure Service Bus para emissão de diplomas'
    ]
  }
];

export const BLAZOR_PROJECT_FILES: BlazorFile[] = [
  {
    path: 'Program.cs',
    name: 'Program.cs',
    type: 'cs',
    tierRequired: 0,
    description: 'Ponto de entrada do Host Blazor WebAssembly, registro de injeção de dependências e configuração de rotas.',
    code: `using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using UniSphere.Blazor;
using UniSphere.Blazor.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

// Registra os componentes raiz da aplicação
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// Configuração do HttpClient com a URL base da aplicação
builder.Services.AddScoped(sp => new HttpClient 
{ 
    BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) 
});

// Registra serviços acadêmicos de estado e interop
builder.Services.AddScoped<CampusStateContainer>();
builder.Services.AddScoped<ServicoArmazenamentoLocal>();

await builder.Build().RunAsync();`
  },
  {
    path: 'App.razor',
    name: 'App.razor',
    type: 'razor',
    tierRequired: 0,
    description: 'Roteador principal do Blazor que intercepta URLs e despacha a página correta dentro do MainLayout.',
    code: `<Router AppAssembly="@typeof(App).Assembly">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)" />
        <FocusOnNavigate RouteData="@routeData" Selector="h1" />
    </Found>
    <NotFound>
        <PageTitle>Página Não Encontrada | UniSphere</PageTitle>
        <LayoutView Layout="@typeof(MainLayout)">
            <div class="p-8 text-center">
                <h2 class="text-2xl font-bold text-slate-100">404 - Rota Acadêmica Não Localizada</h2>
                <p class="text-slate-400 mt-2">O recurso solicitado não existe no portal.</p>
                <a href="/" class="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg">Retornar ao Início</a>
            </div>
        </LayoutView>
    </NotFound>
</Router>`
  },
  {
    path: 'Shared/MainLayout.razor',
    name: 'MainLayout.razor',
    type: 'razor',
    tierRequired: 0,
    description: 'Layout mestre contendo a barra de navegação, status de conectividade WebAssembly e container de conteúdo.',
    code: `@inherits LayoutComponentBase
@inject CampusStateContainer State
@implements IDisposable

<div class="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
    <!-- Barra Superior -->
    <header class="h-14 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <span class="font-bold text-indigo-400 tracking-wider">UNISPHERE</span>
            <span class="text-xs text-slate-500">·</span>
            <span class="text-xs text-slate-400">Portal Acadêmico Blazor WASM</span>
        </div>
        
        <div class="flex items-center gap-4 text-xs">
            <span class="text-slate-400">Matrículas Ativas: <strong class="text-indigo-400 font-mono">@State.DisciplinasMatriculadas.Count</strong></span>
            <span class="text-slate-500">|</span>
            <span class="text-emerald-400 font-mono">● WASM .NET 9.0 OK</span>
        </div>
    </header>

    <!-- Conteúdo Principal -->
    <div class="flex-1 flex">
        <main class="flex-1 p-6 overflow-y-auto">
            @Body
        </main>
    </div>
</div>

@code {
    protected override void OnInitialized()
    {
        State.OnChange += StateHasChanged;
    }

    public void Dispose()
    {
        State.OnChange -= StateHasChanged;
    }
}`
  },
  {
    path: 'Pages/Index.razor',
    name: 'Index.razor',
    type: 'razor',
    tierRequired: 0,
    description: 'Página inicial do portal acadêmico com telemetria reativa do runtime WebAssembly.',
    code: `@page "/"

<div class="max-w-4xl mx-auto space-y-6">
    <div class="p-6 bg-slate-800/80 rounded-xl border border-slate-700">
        <h1 class="text-2xl font-bold text-white mb-2">Bem-vindo ao UniSphere Portal</h1>
        <p class="text-slate-300 text-sm">
            Sistema acadêmico modular de alta performance desenvolvido integralmente em C# com Blazor WebAssembly.
        </p>

        <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 bg-slate-900/80 rounded-lg border border-slate-800">
                <span class="text-xs text-slate-400">Runtime Client</span>
                <p class="text-base font-semibold text-indigo-400 mt-1">WebAssembly (.NET JIT)</p>
            </div>
            <div class="p-4 bg-slate-900/80 rounded-lg border border-slate-800">
                <span class="text-xs text-slate-400">Estado Compartilhado</span>
                <p class="text-base font-semibold text-cyan-400 mt-1">CampusStateContainer</p>
            </div>
            <div class="p-4 bg-slate-900/80 rounded-lg border border-slate-800">
                <span class="text-xs text-slate-400">Camada de Nuvem</span>
                <p class="text-base font-semibold text-emerald-400 mt-1">Azure PaaS + Storage</p>
            </div>
        </div>
    </div>
</div>`
  },
  {
    path: 'Models/Course.cs',
    name: 'Course.cs',
    type: 'cs',
    tierRequired: 1,
    description: 'Modelagem imutável com C# Record para disciplinas acadêmicas.',
    code: `namespace UniSphere.Blazor.Models;

/// <summary>
/// Record posicional imutável representando uma disciplina universitária.
/// Gera automaticamente igualdade estrutural por valor e suporte a expressões 'with'.
/// </summary>
public record Course(
    string Codigo,
    string Titulo,
    string Departamento,
    int Creditos,
    int VagasTotais,
    int VagasOcupadas,
    string Professor,
    string Ementa
)
{
    public int VagasDisponiveis => Math.Max(0, VagasTotais - VagasOcupadas);
    public bool PossuiVagas => VagasDisponiveis > 0;
    public double PercentualOcupacao => VagasTotais > 0 ? (double)VagasOcupadas / VagasTotais * 100 : 0;
}`
  },
  {
    path: 'Shared/CourseCard.razor',
    name: 'CourseCard.razor',
    type: 'razor',
    tierRequired: 1,
    description: 'Componente reutilizável para renderização de disciplinas com EventCallback de seleção.',
    code: `@using UniSphere.Blazor.Models

<div class="p-5 bg-slate-800/90 rounded-xl border border-slate-700/80 hover:border-indigo-500/50 transition-all">
    <div class="flex items-start justify-between gap-4">
        <div>
            <span class="text-xs font-mono font-medium text-indigo-400">@Item.Codigo</span>
            <h3 class="text-lg font-semibold text-slate-100 mt-1">@Item.Titulo</h3>
            <p class="text-xs text-slate-400 mt-1">Prof. @Item.Professor · @Item.Departamento</p>
        </div>
        <span class="px-2.5 py-1 text-xs font-mono bg-slate-900 rounded-md border border-slate-800 text-slate-300">
            @Item.Creditos créditos
        </span>
    </div>

    <p class="text-xs text-slate-300 mt-3 line-clamp-2">@Item.Ementa</p>

    <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span class="text-xs text-slate-400">
            Vagas: <strong class="@(Item.PossuiVagas ? "text-emerald-400" : "text-rose-400") font-mono">@Item.VagasDisponiveis/@Item.VagasTotais</strong>
        </span>

        <button @onclick="() => OnSelect.InvokeAsync(Item)"
                disabled="@(!Item.PossuiVagas || IsSelected)"
                class="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors @(IsSelected ? "bg-slate-700 text-slate-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500 text-white")">
            @(IsSelected ? "Selecionado" : "Matricular")
        </button>
    </div>
</div>

@code {
    [Parameter, EditorRequired] public Course Item { get; set; } = default!;
    [Parameter] public bool IsSelected { get; set; }
    [Parameter] public EventCallback<Course> OnSelect { get; set; }
}`
  },
  {
    path: 'Pages/Courses.razor',
    name: 'Courses.razor',
    type: 'razor',
    tierRequired: 1,
    description: 'Catálogo de disciplinas com busca em tempo real e filtros de departamento via LINQ.',
    code: `@page "/cursos"
@using UniSphere.Blazor.Models
@inject CampusStateContainer State

<div class="space-y-6">
    <div class="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
            <h2 class="text-xl font-bold text-white">Catálogo de Disciplinas Oferecidas</h2>
            <p class="text-xs text-slate-400 mt-0.5">Selecione disciplinas para compor sua grade semestral</p>
        </div>

        <!-- Filtro reativo @bind:event="oninput" -->
        <input type="text"
               @bind="termoBusca"
               @bind:event="oninput"
               placeholder="Filtrar por nome, código ou professor..."
               class="px-4 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-full sm:w-80" />
    </div>

    <!-- Lista filtrada com LINQ em memória -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        @foreach (var curso in CursosFiltrados)
        {
            var selecionado = State.DisciplinasMatriculadas.Contains(curso.Codigo);
            <CourseCard Item="@curso" 
                        IsSelected="@selecionado"
                        OnSelect="AdicionarAoPlano" />
        }
    </div>
</div>

@code {
    private string termoBusca = "";
    private List<Course> todosCursos = [];

    protected override void OnInitialized()
    {
        todosCursos = [
            new("CS101", "Algoritmos & Estruturas de Dados", "Computação", 4, 30, 24, "Dr. Alan Santos", "Grafos, árvores balanceadas, complexidade assintótica e algoritmos gulosos."),
            new("CS204", "Arquitetura de Sistemas .NET & Blazor", "Engenharia", 6, 25, 20, "Dra. Laura Mendes", "Componentização web moderna, WASM, Web APIs de alta performance e microsserviços."),
            new("DB302", "Bancos de Dados Relacionais & EF Core", "Sistemas", 4, 35, 35, "Prof. Roberto Faria", "Modelagem relacional, ACID, Entity Framework Core e otimização de consultas SQL."),
            new("CL405", "Arquitetura Cloud & DevOps com Azure", "Engenharia", 4, 20, 14, "Msc. Helena Rocha", "Azure App Services, Serverless, mensageria com Service Bus e pipelines CI/CD.")
        ];
    }

    private IEnumerable<Course> CursosFiltrados => todosCursos
        .Where(c => string.IsNullOrWhiteSpace(termoBusca) ||
                    c.Titulo.Contains(termoBusca, StringComparison.OrdinalIgnoreCase) ||
                    c.Codigo.Contains(termoBusca, StringComparison.OrdinalIgnoreCase) ||
                    c.Professor.Contains(termoBusca, StringComparison.OrdinalIgnoreCase));

    private void AdicionarAoPlano(Course c)
    {
        State.AdicionarDisciplina(c.Codigo);
    }
}`
  },
  {
    path: 'Models/EnrollmentDto.cs',
    name: 'EnrollmentDto.cs',
    type: 'cs',
    tierRequired: 2,
    description: 'DTO de validação de formulário com anotações DataAnnotations.',
    code: `namespace UniSphere.Blazor.Models;
using System.ComponentModel.DataAnnotations;

public class EnrollmentDto
{
    [Required(ErrorMessage = "O nome completo do acadêmico é obrigatório.")]
    [StringLength(80, MinimumLength = 3, ErrorMessage = "O nome deve conter entre 3 e 80 caracteres.")]
    public string NomeCompleto { get; set; } = "";

    [Required(ErrorMessage = "O e-mail institucional é obrigatório.")]
    [EmailAddress(ErrorMessage = "Forneça um endereço de e-mail acadêmico válido.")]
    public string Email { get; set; } = "";

    [Required(ErrorMessage = "O CPF é obrigatório.")]
    [RegularExpression(@"^\\d{11}$", ErrorMessage = "O CPF deve conter exatamente 11 dígitos numéricos.")]
    public string Cpf { get; set; } = "";

    [Required(ErrorMessage = "Selecione o curso de graduação.")]
    public string CursoGraduacao { get; set; } = "Ciência da Computação";

    [Range(1, 10, ErrorMessage = "O período deve estar entre 1 e 10.")]
    public int Semestre { get; set; } = 1;

    public bool PossuiBolsa { get; set; }

    [Range(typeof(bool), "true", "true", ErrorMessage = "Você deve aceitar o Termo de Compromisso Acadêmico.")]
    public bool TermosAceitos { get; set; }
}`
  },
  {
    path: 'Pages/Enrollment.razor',
    name: 'Enrollment.razor',
    type: 'razor',
    tierRequired: 2,
    description: 'Formulário completo de matrícula acadêmica com EditForm e validação DataAnnotations.',
    code: `@page "/matricula"
@using UniSphere.Blazor.Models
@inject CampusStateContainer State

<div class="max-w-3xl mx-auto space-y-6">
    <div class="p-6 bg-slate-800/90 rounded-xl border border-slate-700">
        <h2 class="text-xl font-bold text-white mb-1">Requerimento de Matrícula Acadêmica</h2>
        <p class="text-xs text-slate-400 mb-6">Validação de dados em tempo real com EditForm e DataAnnotations</p>

        <EditForm Model="@modelo" OnValidSubmit="ConfirmarMatricula">
            <DataAnnotationsValidator />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-medium text-slate-300 mb-1">Nome Completo</label>
                    <InputText @bind-Value="modelo.NomeCompleto" class="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:border-indigo-500 focus:outline-none" />
                    <ValidationMessage For="@(() => modelo.NomeCompleto)" class="text-[11px] text-rose-400 mt-1" />
                </div>

                <div>
                    <label class="block text-xs font-medium text-slate-300 mb-1">E-mail Acadêmico</label>
                    <InputText @bind-Value="modelo.Email" class="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:border-indigo-500 focus:outline-none" />
                    <ValidationMessage For="@(() => modelo.Email)" class="text-[11px] text-rose-400 mt-1" />
                </div>

                <div>
                    <label class="block text-xs font-medium text-slate-300 mb-1">CPF (apenas 11 dígitos)</label>
                    <InputText @bind-Value="modelo.Cpf" maxlength="11" class="w-full px-3 py-2 text-xs font-mono bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:border-indigo-500 focus:outline-none" />
                    <ValidationMessage For="@(() => modelo.Cpf)" class="text-[11px] text-rose-400 mt-1" />
                </div>

                <div>
                    <label class="block text-xs font-medium text-slate-300 mb-1">Semestre Atual</label>
                    <InputNumber @bind-Value="modelo.Semestre" class="w-full px-3 py-2 text-xs font-mono bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:border-indigo-500 focus:outline-none" />
                    <ValidationMessage For="@(() => modelo.Semestre)" class="text-[11px] text-rose-400 mt-1" />
                </div>
            </div>

            <div class="mt-4 p-3 bg-slate-900/60 rounded-lg border border-slate-800 flex items-center gap-3">
                <InputCheckbox @bind-Value="modelo.TermosAceitos" id="termos" class="rounded border-slate-700 text-indigo-600 focus:ring-0" />
                <label for="termos" class="text-xs text-slate-300">Declaro que li e concordo com o Estatuto da Universidade e as diretrizes do MEC.</label>
            </div>
            <ValidationMessage For="@(() => modelo.TermosAceitos)" class="text-[11px] text-rose-400 mt-1 block" />

            <div class="mt-6 flex items-center justify-between">
                <span class="text-xs text-slate-400">Total de Disciplinas Selecionadas: <strong class="text-indigo-400 font-mono">@State.DisciplinasMatriculadas.Count</strong></span>
                <button type="submit" class="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors">
                    Efetivar Matrícula
                </button>
            </div>
        </EditForm>
    </div>
</div>

@code {
    private EnrollmentDto modelo = new();

    private void ConfirmarMatricula()
    {
        State.RegistrarNotificacao($"Matrícula confirmada para {modelo.NomeCompleto} ({modelo.CursoGraduacao})!");
    }
}`
  },
  {
    path: 'Services/CampusStateContainer.cs',
    name: 'CampusStateContainer.cs',
    type: 'cs',
    tierRequired: 3,
    description: 'Gerenciador de estado global baseado no padrão Observer para sincronização entre componentes sem prop drilling.',
    code: `namespace UniSphere.Blazor.Services;

/// <summary>
/// Contêiner de estado global Scoped injetado nos componentes Razor.
/// Expõe eventos C# para acionar StateHasChanged de forma reativa.
/// </summary>
public class CampusStateContainer
{
    private readonly List<string> _disciplinas = [];
    private readonly List<string> _notificacoes = [];

    public IReadOnlyList<string> DisciplinasMatriculadas => _disciplinas.AsReadOnly();
    public IReadOnlyList<string> Notificacoes => _notificacoes.AsReadOnly();

    public string AlunoLogado { get; private set; } = "Mariana Costa";
    public int MatriculaId { get; private set; } = 20241088;

    public event Action? OnChange;

    public void AdicionarDisciplina(string codigo)
    {
        if (!_disciplinas.Contains(codigo))
        {
            _disciplinas.Add(codigo);
            RegistrarNotificacao($"Disciplina {codigo} adicionada ao seu plano semestral.");
            NotifyStateChanged();
        }
    }

    public void RemoverDisciplina(string codigo)
    {
        if (_disciplinas.Remove(codigo))
        {
            RegistrarNotificacao($"Disciplina {codigo} removida.");
            NotifyStateChanged();
        }
    }

    public void RegistrarNotificacao(string mensagem)
    {
        _notificacoes.Insert(0, $"[{DateTime.Now:HH:mm}] {mensagem}");
        NotifyStateChanged();
    }

    public void LimparNotificacoes()
    {
        _notificacoes.Clear();
        NotifyStateChanged();
    }

    private void NotifyStateChanged() => OnChange?.Invoke();
}`
  },
  {
    path: 'Shared/NotificationCenter.razor',
    name: 'NotificationCenter.razor',
    type: 'razor',
    tierRequired: 3,
    description: 'Central de notificações em tempo real inscrita no evento OnChange do StateContainer.',
    code: `@inject CampusStateContainer State
@implements IDisposable

<div class="p-4 bg-slate-800/90 rounded-xl border border-slate-700">
    <div class="flex items-center justify-between mb-3">
        <h4 class="text-xs font-semibold text-slate-200">Central de Notificações Acadêmicas</h4>
        <button @onclick="State.LimparNotificacoes" class="text-[11px] text-slate-400 hover:text-slate-200">
            Limpar
        </button>
    </div>

    @if (State.Notificacoes.Count == 0)
    {
        <p class="text-xs text-slate-500 italic">Nenhum evento registrado nesta sessão.</p>
    }
    else
    {
        <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
            @foreach (var msg in State.Notificacoes)
            {
                <div class="p-2 text-xs bg-slate-900/80 rounded border border-slate-800 text-slate-300">
                    @msg
                </div>
            }
        </div>
    }
</div>

@code {
    protected override void OnInitialized()
    {
        State.OnChange += StateHasChanged;
    }

    public void Dispose()
    {
        State.OnChange -= StateHasChanged;
    }
}`
  },
  {
    path: 'Api/StudentEndpoints.cs',
    name: 'StudentEndpoints.cs',
    type: 'cs',
    tierRequired: 4,
    description: 'Mapeamento de endpoints RESTful com Minimal APIs no ASP.NET Core.',
    code: `namespace UniSphere.Api;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using UniSphere.Data;

public static class StudentEndpoints
{
    public static void MapAcademicEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/academic")
                       .WithTags("Academic Services");

        // GET /api/academic/courses (AsNoTracking para leitura ultra rápida)
        group.MapGet("/courses", async (CampusDbContext db) =>
        {
            var courses = await db.Courses.AsNoTracking().ToListAsync();
            return TypedResults.Ok(courses);
        });

        // POST /api/academic/enrollment
        group.MapPost("/enrollment", async (EnrollmentRequest req, CampusDbContext db) =>
        {
            if (string.IsNullOrWhiteSpace(req.StudentId) || string.IsNullOrWhiteSpace(req.CourseCode))
            {
                return Results.BadRequest(new { Error = "Matrícula e Curso são obrigatórios." });
            }

            var record = new EnrollmentRecord(Guid.NewGuid(), req.StudentId, req.CourseCode, DateTime.UtcNow);
            db.Enrollments.Add(record);
            await db.SaveChangesAsync();

            return Results.Created($"/api/academic/enrollment/{record.Id}", record);
        });
    }
}

public record EnrollmentRequest(string StudentId, string CourseCode);
public record EnrollmentRecord(Guid Id, string StudentId, string CourseCode, DateTime Timestamp);`
  },
  {
    path: 'Data/CampusDbContext.cs',
    name: 'CampusDbContext.cs',
    type: 'cs',
    tierRequired: 4,
    description: 'DbContext do Entity Framework Core com configuração de modelo relacional.',
    code: `namespace UniSphere.Data;
using Microsoft.EntityFrameworkCore;
using UniSphere.Blazor.Models;
using UniSphere.Api;

public class CampusDbContext : DbContext
{
    public CampusDbContext(DbContextOptions<CampusDbContext> options) : base(options) { }

    public DbSet<Course> Courses => Set<Course>();
    public DbSet<EnrollmentRecord> Enrollments => Set<EnrollmentRecord>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>(b =>
        {
            b.HasKey(c => c.Codigo);
            b.Property(c => c.Titulo).IsRequired().HasMaxLength(120);
            b.Property(c => c.Departamento).IsRequired().HasMaxLength(60);
        });

        modelBuilder.Entity<EnrollmentRecord>(b =>
        {
            b.HasKey(e => e.Id);
            b.HasIndex(e => new { e.StudentId, e.CourseCode }).IsUnique();
        });
    }
}`
  },
  {
    path: 'Pages/CloudConsole.razor',
    name: 'CloudConsole.razor',
    type: 'razor',
    tierRequired: 5,
    description: 'Console de observabilidade da nuvem Azure com telemetria e gerenciamento de arquivos Blob Storage.',
    code: `@page "/cloud-console"
@inject AzureBlobService BlobService

<div class="space-y-6">
    <div class="p-6 bg-slate-800/90 rounded-xl border border-slate-700">
        <div class="flex items-center justify-between mb-4">
            <div>
                <h2 class="text-xl font-bold text-white">Console Microsoft Azure Cloud</h2>
                <p class="text-xs text-slate-400">Ambiente de Produção PaaS · Região East US 2</p>
            </div>
            <span class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded text-xs font-mono">
                ● App Service Healthy
            </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div class="p-4 bg-slate-900 rounded-lg border border-slate-800">
                <span class="text-xs text-slate-400">Instâncias Ativas</span>
                <p class="text-xl font-bold text-slate-100 font-mono mt-1">3 nós (Auto-scale)</p>
            </div>
            <div class="p-4 bg-slate-900 rounded-lg border border-slate-800">
                <span class="text-xs text-slate-400">CPU Média</span>
                <p class="text-xl font-bold text-indigo-400 font-mono mt-1">24.8%</p>
            </div>
            <div class="p-4 bg-slate-900 rounded-lg border border-slate-800">
                <span class="text-xs text-slate-400">P95 Latência HTTP</span>
                <p class="text-xl font-bold text-cyan-400 font-mono mt-1">18ms</p>
            </div>
            <div class="p-4 bg-slate-900 rounded-lg border border-slate-800">
                <span class="text-xs text-slate-400">Azure Blob Storage</span>
                <p class="text-xl font-bold text-emerald-400 font-mono mt-1">1.4 GB / 842 docs</p>
            </div>
        </div>
    </div>
</div>`
  },
  {
    path: 'Services/AzureBlobService.cs',
    name: 'AzureBlobService.cs',
    type: 'cs',
    tierRequired: 5,
    description: 'Serviço de integração com Azure Blob Storage para arquivamento de documentos acadêmicos.',
    code: `namespace UniSphere.Blazor.Services;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

public class AzureBlobService
{
    private readonly BlobServiceClient _client;
    private const string ContainerName = "academic-records";

    public AzureBlobService(BlobServiceClient client)
    {
        _client = client;
    }

    public async Task<string> UploadAcademicDocumentAsync(string fileName, Stream contentStream)
    {
        var container = _client.GetBlobContainerClient(ContainerName);
        await container.CreateIfNotExistsAsync(PublicAccessType.None);

        var blobClient = container.GetBlobClient(fileName);
        await blobClient.UploadAsync(contentStream, new BlobHttpHeaders 
        { 
            ContentType = "application/pdf" 
        });

        return blobClient.Uri.ToString();
    }
}`
  }
];
