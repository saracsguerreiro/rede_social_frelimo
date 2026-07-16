export const currentUser = {
  id: 1,
  nome: 'Américo Muteia',
  cartao: 'FREL-2019-047821',
  orgao: 'Comité Provincial de Maputo',
  cargo: 'Secretário Provincial',
  nivel: 'provincial',
  quotas: 'Em dia',
  avatar: 'AM',
};

export const circulares = [
  {
    id: 1,
    tipo: 'circular',
    titulo: 'Circular nº 12/2026 — Reunião do Comité Central',
    corpo: 'Convoca-se todos os membros do Comité Central para reunião ordinária a realizar-se nos dias 24 e 25 de Julho de 2026, no Complexo da Ponta Vermelha, Maputo. A presença é obrigatória. A agenda será distribuída por esta plataforma até 20 de Julho.',
    autor: 'Secretariado do CC',
    orgao: 'Comité Central',
    data: '2026-07-16',
    lida: false,
    prioridade: 'alta',
    confirmados: 87,
    total: 120,
  },
  {
    id: 2,
    tipo: 'convocatoria',
    titulo: 'Convocatória — Sessão de Formação de Quadros · Nampula',
    corpo: 'A Direcção Provincial de Nampula convoca todos os secretários distritais para sessão de formação política nos dias 22–23 de Julho. Local: Sede Provincial, Av. do Trabalho.',
    autor: 'Direcção Provincial de Nampula',
    orgao: 'Província de Nampula',
    data: '2026-07-15',
    lida: true,
    prioridade: 'media',
    confirmados: 43,
    total: 58,
  },
  {
    id: 3,
    tipo: 'comunicado',
    titulo: 'Comunicado sobre pagamento de quotas — 2º trimestre 2026',
    corpo: 'Recorda-se a todos os militantes que o prazo de pagamento de quotas do 2º trimestre termina em 31 de Julho de 2026. O estado de quotas pode ser verificado e regularizado nesta plataforma, secção "Directório".',
    autor: 'Departamento Financeiro',
    orgao: 'Sede Nacional',
    data: '2026-07-14',
    lida: true,
    prioridade: 'normal',
    confirmados: null,
    total: null,
  },
  {
    id: 4,
    tipo: 'circular',
    titulo: 'Circular nº 11/2026 — Novas directrizes para organização de células',
    corpo: 'Ao abrigo das deliberações do CC, são publicadas novas directrizes para a organização e funcionamento das células de base. O documento completo está disponível na secção Documentos.',
    autor: 'Departamento de Organização',
    orgao: 'Sede Nacional',
    data: '2026-07-10',
    lida: true,
    prioridade: 'alta',
    confirmados: 234,
    total: 312,
  },
];

export const conversas = [
  {
    id: 1,
    tipo: 'grupo',
    nome: 'Comité Provincial Maputo',
    avatar: 'CP',
    cor: 'red',
    ultima: 'Secretária: Acta da reunião de ontem publicada no espaço.',
    hora: '10:42',
    naoLidas: 3,
  },
  {
    id: 2,
    tipo: 'direto',
    nome: 'Fátima Cossa',
    avatar: 'FC',
    cor: 'green',
    ultima: 'Confirmado para amanhã, 14h.',
    hora: '09:15',
    naoLidas: 0,
  },
  {
    id: 3,
    tipo: 'grupo',
    nome: 'Secretários Distritais — Sul',
    avatar: 'SD',
    cor: 'red',
    ultima: 'João Nhantumbo: Enviamos o relatório.',
    hora: 'Ontem',
    naoLidas: 7,
  },
  {
    id: 4,
    tipo: 'direto',
    nome: 'Manuel Macuácua',
    avatar: 'MM',
    cor: 'green',
    ultima: 'Obrigado pela informação.',
    hora: 'Ontem',
    naoLidas: 0,
  },
  {
    id: 5,
    tipo: 'grupo',
    nome: 'OJM — Núcleo Maputo-Cidade',
    avatar: 'OJ',
    cor: 'red',
    ultima: 'Actividade confirmada para sábado.',
    hora: '14 Jul',
    naoLidas: 0,
  },
];

export const mensagensAtivas = [
  { id: 1, autor: 'Fátima Cossa', avatar: 'FC', texto: 'Bom dia. Recebeu o relatório do mês de Junho?', hora: '09:00', proprio: false },
  { id: 2, autor: 'Eu', avatar: 'AM', texto: 'Bom dia Fátima. Sim, recebi. Estou a analisar.', hora: '09:08', proprio: true },
  { id: 3, autor: 'Fátima Cossa', avatar: 'FC', texto: 'Preciso da sua aprovação até quarta-feira para submeter ao CC.', hora: '09:10', proprio: false },
  { id: 4, autor: 'Eu', avatar: 'AM', texto: 'Confirmado para amanhã, 14h.', hora: '09:15', proprio: true },
];

export const espacos = [
  {
    id: 1, nivel: 'nacional', nome: 'Comité Central', membros: 120, activos: 98,
    publicacoes: 47, icone: 'CC', cor: 'red',
    descricao: 'Espaço de coordenação do órgão máximo entre congressos.',
  },
  {
    id: 2, nivel: 'nacional', nome: 'Secretariado', membros: 15, activos: 15,
    publicacoes: 203, icone: 'SC', cor: 'red',
    descricao: 'Comunicações e directrizes do Secretariado.',
  },
  {
    id: 3, nivel: 'provincial', nome: 'Comité Provincial de Maputo', membros: 87, activos: 71,
    publicacoes: 134, icone: 'MP', cor: 'green',
    descricao: 'Coordenação provincial — Maputo.',
  },
  {
    id: 4, nivel: 'provincial', nome: 'Comité Provincial de Gaza', membros: 64, activos: 52,
    publicacoes: 89, icone: 'GZ', cor: 'green',
    descricao: 'Coordenação provincial — Gaza.',
  },
  {
    id: 5, nivel: 'organizacao', nome: 'OJM — Nacional', membros: 340, activos: 201,
    publicacoes: 78, icone: 'OJ', cor: 'red',
    descricao: 'Organização da Juventude Moçambicana.',
  },
  {
    id: 6, nivel: 'organizacao', nome: 'OMM — Nacional', membros: 289, activos: 178,
    publicacoes: 65, icone: 'OM', cor: 'green',
    descricao: 'Organização da Mulher Moçambicana.',
  },
];

export const documentos = [
  { id: 1, titulo: 'Estatuto do Partido FRELIMO — Revisão 2024', tipo: 'Estatuto', orgao: 'CC', data: '2024-02-15', tamanho: '2.4 MB', formato: 'PDF' },
  { id: 2, titulo: 'Programa de Acção 2024–2029', tipo: 'Programa', orgao: 'CC', data: '2024-03-01', tamanho: '5.1 MB', formato: 'PDF' },
  { id: 3, titulo: 'Directrizes para Organização de Células — 2026', tipo: 'Directriz', orgao: 'Dep. Organização', data: '2026-07-10', tamanho: '0.8 MB', formato: 'PDF' },
  { id: 4, titulo: 'Acta da Reunião do CC — Junho 2026', tipo: 'Acta', orgao: 'CC', data: '2026-06-30', tamanho: '1.2 MB', formato: 'PDF' },
  { id: 5, titulo: 'Manual de Formação Política — Módulo I', tipo: 'Formação', orgao: 'Dep. Formação', data: '2026-05-20', tamanho: '3.7 MB', formato: 'PDF' },
  { id: 6, titulo: 'Relatório Financeiro — 1º Semestre 2026', tipo: 'Relatório', orgao: 'Dep. Financeiro', data: '2026-07-05', tamanho: '1.9 MB', formato: 'PDF' },
];

export const votacoes = [
  {
    id: 1,
    titulo: 'Aprovação do orçamento do 2º semestre 2026',
    descricao: 'Votação sobre a proposta de orçamento apresentada pelo Departamento Financeiro para o 2º semestre de 2026.',
    orgao: 'Comité Central',
    estado: 'aberta',
    inicio: '2026-07-15',
    fim: '2026-07-22',
    quorum: 75,
    votaram: 89,
    total: 120,
    opcoes: [
      { id: 'a', texto: 'Aprovado na íntegra', votos: 67 },
      { id: 'b', texto: 'Aprovado com emendas', votos: 18 },
      { id: 'c', texto: 'Rejeitado', votos: 4 },
    ],
    minhaVoto: null,
  },
  {
    id: 2,
    titulo: 'Ratificação do novo secretário distrital — Boane',
    descricao: 'Ratificação da nomeação do camarada Helder Guambe como Secretário Distrital de Boane.',
    orgao: 'Comité Provincial de Maputo',
    estado: 'aberta',
    inicio: '2026-07-14',
    fim: '2026-07-18',
    quorum: 60,
    votaram: 52,
    total: 87,
    opcoes: [
      { id: 'a', texto: 'Ratificado', votos: 49 },
      { id: 'b', texto: 'Não ratificado', votos: 3 },
    ],
    minhaVoto: 'a',
  },
  {
    id: 3,
    titulo: 'Programa de actividades da OJM — 2º semestre',
    descricao: 'Aprovação do programa de actividades proposto pela direcção da OJM para o 2º semestre de 2026.',
    orgao: 'OJM — Nacional',
    estado: 'encerrada',
    inicio: '2026-07-01',
    fim: '2026-07-07',
    quorum: 60,
    votaram: 287,
    total: 340,
    resultado: 'Aprovado — 94% a favor',
    opcoes: [
      { id: 'a', texto: 'Aprovado', votos: 270 },
      { id: 'b', texto: 'Rejeitado', votos: 17 },
    ],
    minhaVoto: 'a',
  },
];

export const cursos = [
  {
    id: 1, titulo: 'Fundamentos do Marxismo-Leninismo', modulos: 6, concluidos: 4,
    duracao: '8h', nivel: 'Base', estado: 'em_curso',
    descricao: 'Módulos introdutórios sobre os fundamentos ideológicos do Partido.',
  },
  {
    id: 2, titulo: 'História do Partido FRELIMO', modulos: 8, concluidos: 8,
    duracao: '10h', nivel: 'Base', estado: 'concluido',
    descricao: 'Da fundação em 1962 aos dias de hoje.',
  },
  {
    id: 3, titulo: 'Gestão e Administração de Órgãos Partidários', modulos: 5, concluidos: 0,
    duracao: '6h', nivel: 'Avançado', estado: 'disponivel',
    descricao: 'Gestão de células, distritos e províncias. Para secretários e quadros.',
  },
  {
    id: 4, titulo: 'Comunicação Política', modulos: 4, concluidos: 0,
    duracao: '5h', nivel: 'Intermédio', estado: 'disponivel',
    descricao: 'Técnicas de comunicação para quadros do Partido.',
  },
];

export const militantes = [
  { id: 1, nome: 'Américo Muteia', cartao: 'FREL-2019-047821', orgao: 'CP Maputo', cargo: 'Secretário Provincial', quotas: 'Em dia', avatar: 'AM' },
  { id: 2, nome: 'Fátima Cossa', cartao: 'FREL-2015-012340', orgao: 'CC', cargo: 'Membro do CC', quotas: 'Em dia', avatar: 'FC' },
  { id: 3, nome: 'João Nhantumbo', cartao: 'FREL-2021-089012', orgao: 'CD Matola', cargo: 'Secretário Distrital', quotas: 'Em dia', avatar: 'JN' },
  { id: 4, nome: 'Maria Sitoe', cartao: 'FREL-2018-034567', orgao: 'CP Maputo', cargo: 'Secretária Adjunta', quotas: 'Pendente', avatar: 'MS' },
  { id: 5, nome: 'Carlos Mondlane Jr.', cartao: 'FREL-2020-056789', orgao: 'OJM Nacional', cargo: 'Secretário-Geral OJM', quotas: 'Em dia', avatar: 'CM' },
  { id: 6, nome: 'Rosa Baloi', cartao: 'FREL-2017-023456', orgao: 'OMM Nacional', cargo: 'Secretária-Geral OMM', quotas: 'Em dia', avatar: 'RB' },
  { id: 7, nome: 'Helder Guambe', cartao: 'FREL-2022-101234', orgao: 'CD Boane', cargo: 'Secretário Distrital', quotas: 'Em dia', avatar: 'HG' },
  { id: 8, nome: 'Ana Chambal', cartao: 'FREL-2016-019876', orgao: 'CP Gaza', cargo: 'Membro CP', quotas: 'Pendente', avatar: 'AC' },
];

export const eventos = [
  { id: 1, titulo: 'Reunião do Comité Central', data: '2026-07-24', hora: '09:00', local: 'Complexo da Ponta Vermelha, Maputo', tipo: 'cc', confirmado: false },
  { id: 2, titulo: 'Sessão de Formação — Secretários Distritais', data: '2026-07-22', hora: '08:00', local: 'Sede Provincial de Nampula', tipo: 'formacao', confirmado: true },
  { id: 3, titulo: 'Assembleia Provincial de Sofala', data: '2026-08-05', hora: '10:00', local: 'Beira, Sede Provincial', tipo: 'assembleia', confirmado: false },
  { id: 4, titulo: 'Reunião OJM — Revisão do Programa', data: '2026-07-19', hora: '14:00', local: 'Sede da OJM, Maputo', tipo: 'organizacao', confirmado: true },
  { id: 5, titulo: 'Prazo: pagamento de quotas 2º trimestre', data: '2026-07-31', hora: null, local: null, tipo: 'prazo', confirmado: null },
];

export const myDirectory = [
  { id: 2, nome: 'Fátima Cossa', cargo: 'Membro do CC', orgao: 'CC', avatar: 'FC', online: true },
  { id: 3, nome: 'João Nhantumbo', cargo: 'Sec. Distrital', orgao: 'CD Matola', avatar: 'JN', online: false },
  { id: 5, nome: 'Carlos Mondlane Jr.', cargo: 'Sec.-Geral OJM', orgao: 'OJM Nacional', avatar: 'CM', online: true },
];

export const importantDocs = [
  { id: 1, titulo: 'Estatuto do Partido FRELIMO — Rev. 2024', tipo: 'Estatuto', data: '2024-02-15' },
  { id: 2, titulo: 'Programa de Acção 2024–2029', tipo: 'Programa', data: '2024-03-01' },
  { id: 3, titulo: 'Directrizes para Células — 2026', tipo: 'Directriz', data: '2026-07-10' },
];

export const mySpaces = [
  { id: 3, nome: 'CP Maputo', icone: 'MP', cor: 'var(--green-600)', membros: 87, naoLidas: 5 },
  { id: 1, nome: 'Comité Central', icone: 'CC', cor: 'var(--red-600)', membros: 120, naoLidas: 2 },
  { id: 5, nome: 'OJM Nacional', icone: 'OJ', cor: 'var(--red-800)', membros: 340, naoLidas: 0 },
];

export const formacaoImportante = [
  { titulo: 'Estatuto do Partido — módulo obrigatório', prazo: '31 Jul', urgente: true },
  { titulo: 'Gestão de Órgãos Partidários', prazo: '15 Ago', urgente: false },
  { titulo: 'Directrizes para Células 2026', prazo: null, urgente: false },
];

export const statsAdmin = {
  militantesActivos: 4821,
  quotasEmDia: '78%',
  celulasActivas: 312,
  usoPlatforma: '64%',
  circularesDifundidas: 47,
  tempoDifusao: '2.3h',
};
