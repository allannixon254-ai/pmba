import { useState, useEffect } from "react";

const PRIORITY: Record<string, { bg: string; border: string; badge: string; text: string; label: string }> = {
  max:          { bg:"#450a0a", border:"#991b1b", badge:"#dc2626", text:"#fca5a5", label:"🔴 MÁXIMA"     },
  high:         { bg:"#431407", border:"#9a3412", badge:"#ea580c", text:"#fdba74", label:"🟠 ALTA"       },
  medium_high:  { bg:"#1c1917", border:"#92400e", badge:"#d97706", text:"#fcd34d", label:"🟡 MÉDIA-ALTA" },
  medium:       { bg:"#052e16", border:"#166534", badge:"#16a34a", text:"#86efac", label:"🟢 MÉDIA"      },
  low:          { bg:"#082f49", border:"#075985", badge:"#0284c7", text:"#7dd3fc", label:"🔵 BAIXA"      },
  maintenance:  { bg:"#2e1065", border:"#6b21a8", badge:"#9333ea", text:"#d8b4fe", label:"🟣 MANUTENÇÃO" },
};

const CRONOGRAMA = [
  { dia: "Segunda", materias: "História", tempo: "1h30", foco: "PMBA" },
  { dia: "Terça", materias: "Matemática", tempo: "1h30", foco: "PMBA" },
  { dia: "Quarta", materias: "Const., Adm., Penal e Militar", tempo: "1h30", foco: "PMBA" },
  { dia: "Quinta", materias: "Geografia/Atualidades", tempo: "1h30", foco: "PMBA" },
  { dia: "Sexta", materias: "Português + Informática", tempo: "45min cada", foco: "Manutenção" }
];

const MATERIAS_TIMER = [
  { id: "HIS", name: "História" },
  { id: "MAT", name: "Matemática" },
  { id: "CONST", name: "Constitucional" },
  { id: "ADM", name: "Administrativo" },
  { id: "PEN", name: "Penal" },
  { id: "MIL", name: "Penal Militar" },
  { id: "GEO", name: "Geografia" },
  { id: "ATU", name: "Atualidades" },
  { id: "POR", name: "Português" },
  { id: "INF", name: "Informática" }
];
const curriculum = [
  { bloco:1, id:"historia", name:"História do Brasil e da Bahia", priority:"max", emoji:"🏛️",
    courses:[
      { name:"PM-BA-História_do_Brasil_e_da_Bahia-2023", type:"🎬 Vídeo", modules:[
        { id:"h0", title:"Módulo 0 — Grandes Navegações", aulas:[
          "Mapa Mental Grandes Navegações",
          "Formação do Reino Português e Grandes Navegações",
        ]},
        { id:"h1", title:"Módulo 1 — Brasil Colônia", aulas:[
          "Povos Indígenas, Primeiros Contatos e Choques Culturais",
          "O Período Pré-Colonial",
          "A Colonização e a Administração Colonial",
          "O Ciclo da Cana de Açúcar, Escravidão e Catolicismos",
        ]},
        { id:"h2", title:"Módulo 2 — Invasões e Revoltas Coloniais", aulas:[
          "Invasões Francesas",
          "Invasões Holandesas (Partes 1 e 2)",
          "Formação do Território Brasileiro — Tratados",
          "As Revoltas no Período Colonial (Partes 1 e 2)",
        ]},
        { id:"h3", title:"Módulo 3+ — Demais Períodos Históricos ⚠️", aulas:[
          "Introdução e Aspectos Gerais (Módulo 3)",
          "⚠️ Continuar módulos 4–6 no player: Independência, Primeiro/Segundo Reinado, República Velha, Era Vargas, Ditadura, Redemocratização",
          "História da Bahia: 2 de Julho, Conjuração Baiana, Revolta dos Malês, Sabinada, Canudos",
        ]},
      ]},
      { name:"Passo Estratégico de História do Brasil-2023", type:"📄 PDF", modules:[
        { id:"h_pe", title:"PDFs Complementares — Seções 0 a 6", aulas:[
          "Seção 0","Seção 1","Seção 2","Seção 3","Seção 4","Seção 5","Seção 6",
        ]},
      ]},
    ]
  },
  { bloco:1, id:"geografia", name:"Geografia do Brasil", priority:"max", emoji:"🗺️",
    courses:[
      { name:"PM-BA-Geografia_do_Brasil-2023", type:"🎬 Vídeo", modules:[
        { id:"geo0", title:"Módulo 0 — Relevo, Geologia e Hidrografia", aulas:[
          "A Estrutura Interna da Terra",
          "Agentes internos — Tectonismo",
          "Estrutura geológica e tipos de rochas (Partes 1 e 2)",
          "Agentes externos — Intemperismo, Erosão e Paisagens",
          "Estrutura Geológica e Macroformas Estruturais",
          "Compartimentos Gerais do Relevo Brasileiro",
          "Classificações de Aziz Ab'Saber e Jurandyr Ross",
          "Os principais perfis do Relevo Brasileiro",
          "Solos",
          "Hidrografia",
        ]},
        { id:"geo1", title:"Módulo 1 — Clima, Vegetação e Biomas", aulas:[
          "Atmosfera e Sua Dinâmica — Tempo e Clima",
          "Fatores estáticos que influenciam o clima",
          "Fatores dinâmicos que influenciam o clima",
          "As chuvas e os impactos ambientais",
          "Climas do Brasil",
          "Domínios Vegetais do Brasil I",
          "As formações vegetais do Brasil II",
          "Os domínios morfoclimáticos",
        ]},
        { id:"geo2", title:"Módulo 2 — Questões Ambientais", aulas:[
          "Ilhas de Calor e Enchentes",
          "Poluição atmosférica, chuva ácida e inversão térmica",
          "O Efeito Estufa e Aquecimento Global",
          "O Efeito El Niño",
          "Sustentabilidade e meio ambiente",
        ]},
        { id:"geo3", title:"Módulo 3 — Transporte e Agropecuária", aulas:[
          "O Transporte Rodoviário",
          "O Transporte Ferroviário",
          "O Transporte Aquaviário",
          "Agropecuária I",
          "Agropecuária II",
        ]},
        { id:"geo4", title:"Módulo 4 — Indústria e Energia", aulas:[
          "Indústria — Conceito, Evolução e Poder (Partes 1 e 2)",
          "A Indústria no Brasil (Partes 1 a 4)",
          "Fontes de energia — Mundo e Brasil (Partes 1 e 2)",
          "Desenvolvimento econômico e recursos energéticos",
          "Recursos energéticos no Brasil (Partes 1 e 2)",
          "O Uso dos Recursos Naturais e Preservação do Meio Ambiente",
        ]},
        { id:"geo5", title:"Módulo 5 — População e Migrações", aulas:[
          "As Teorias Demográficas (Partes 1 e 2)",
          "A População Mundial",
          "A Distribuição da População Brasileira",
          "O Crescimento Populacional do Brasil",
          "Envelhecimento, Bônus Demográfico e Razão de Dependência",
          "A Diversidade Cultural da População Brasileira",
          "As migrações internacionais (Partes 1 e 2)",
          "Barreiras contra imigração, xenofobia e refugiados (Partes 1 e 2)",
          "Imigrações latinas no século XXI",
          "Imigrações internas do Brasil",
        ]},
        { id:"geo6", title:"Módulo 6 — Urbanização", aulas:[
          "Aulas 1 a 7 (Urbanização — múltiplas partes)",
        ]},
        { id:"geo7", title:"Módulo 7 — Geografia da Bahia", aulas:[
          "PDF: Versão original — módulo específico da Bahia",
        ]},
      ]},
      { name:"Passo Estratégico de Geografia do Brasil-2023", type:"📄 PDF", modules:[
        { id:"geo_pe", title:"PDFs Complementares — Seções 0 a 9", aulas:[
          "Seção 0","Seção 1","Seção 2","Seção 3","Seção 4",
          "Seção 5","Seção 6","Seção 7","Seção 8","Seção 9",
        ]},
      ]},
    ]
  },
  { bloco:1, id:"atualidades", name:"Atualidades", priority:"max", emoji:"🌐",
    courses:[
      { name:"PM-BA-Atualidades-2023", type:"🎬 Vídeo", modules:[
        { id:"at0", title:"Módulo 0 — Economia Internacional", aulas:[
          "Globalização",
          "Blocos Econômicos (Partes 1 e 2)",
          "União Europeia",
          "China",
          "Economia Internacional — Questões Comentadas (Partes 1 e 2)",
        ]},
        { id:"at1", title:"Módulo 1 — Oriente Médio e Conflitos", aulas:[
          "Islamismo, Mundo Árabe e Oriente Médio (Partes 1 e 2)",
          "A Questão Israel-Palestina (Partes 1, 2 e 3)",
          "Síria, Curdistão e Turquia",
          "Irã",
          "Afeganistão (Partes 1 e 2)",
        ]},
        { id:"at2", title:"Módulo 2 — Migrações e Geopolítica", aulas:[
          "Migrações — Teoria (Partes 1 e 2)",
          "América Latina",
          "Organizações e Grupos Internacionais (Partes 1 e 2)",
          "Antecedentes da Guerra entre Rússia e Ucrânia",
          "Guerra entre Rússia e Ucrânia (Partes 1, 2 e 3)",
          "Migrações — Questões Comentadas",
          "Varíola dos Macacos — Questões Comentadas",
        ]},
        { id:"at3", title:"Módulo 3 — Meio Ambiente e Clima", aulas:[
          "A Questão Ambiental e o Desenvolvimento Sustentável",
          "Mudanças Climáticas (Partes 1 e 2)",
          "A Questão da Amazônia",
        ]},
        { id:"at4", title:"Módulo 4 — Tecnologia (TIC)", aulas:[
          "TIC — Conceitos, Efeitos e Implicações Sociais (Partes 1 e 2)",
          "TIC — Questões Comentadas",
        ]},
        { id:"at5", title:"Módulo 5 — Teoria + Questões Gerais", aulas:[
          "Teoria",
          "Questões Comentadas",
        ]},
        { id:"at6", title:"Módulo 6 — Retrospectivas Mensais", aulas:[
          "Retrospectiva Dez/2022 e Jan/2023 — Internacional (Partes 1 e 2)",
          "Retrospectiva Dez/2022 e Jan/2023 — Nacional (Partes 1, 2 e 3)",
          "Retrospectiva 2022 (Partes 1 e 2)",
          "Janeiro de 2023 (3 versões disponíveis)",
          "Fevereiro de 2023 — Internacional + Nacional + Fatos Culturais",
          "Março de 2023 — Internacional + Nacional + Oscar 2023",
          "Abril de 2023 — Internacional + Nacional",
          "Maio de 2023 — Internacional + Nacional",
          "Junho de 2023 — Internacional + Nacional",
          "Julho de 2023 — Internacional + Nacional",
          "Agosto de 2023 — Internacional + Nacional",
        ]},
        { id:"at7", title:"Módulo 7 — Simulados de Atualidades", aulas:[
          "Simulado — Retrospectiva Dez/2022-Jan/2023 (Partes 1, 2 e 3)",
          "Simulado — Janeiro 2023 (Partes 1, 2 e 3)",
          "Simulado — Fevereiro 2023 (Partes 1, 2) + Oscar 2023",
          "Simulado — Março 2023 (Partes 1, 2 e 3)",
          "Simulado — Abril 2023 (Partes 1, 2 e 3)",
          "Simulado — Maio 2023 (Partes 1, 2 e 3)",
          "Simulado — Junho 2023 (Partes 1 e 2)",
          "Simulado — Julho 2023 (Partes 1, 2 e 3)",
          "Simulado — Agosto 2023 (Partes 1, 2 e 3)",
          "Questões de Atualidades — Internacional e Nacional (Partes 1 e 2)",
        ]},
      ]},
      { name:"Passo Estratégico de Atualidades-2023", type:"📄 PDF", modules:[
        { id:"at_pe", title:"PDFs Complementares — Seções 0 a 7", aulas:[
          "Seção 0","Seção 1","Seção 2","Seção 3","Seção 4","Seção 5","Seção 6","Seção 7",
        ]},
      ]},
    ]
  },
  { bloco:2, id:"constitucional", name:"Direito Constitucional", priority:"high", emoji:"⚖️",
    courses:[
      { name:"PM-BA-Direito_Constitucional-2023", type:"🎬 Vídeo", modules:[
        { id:"dc_intro", title:"Módulos 1–4 — Introdução ⚠️", aulas:[
          "⚠️ Ver módulos 1 a 4 no início do curso (Constituição, Poder Constituinte, etc.)",
        ]},
        { id:"dc5a", title:"Módulo 5 — Princípios Fundamentais (Arts. 1º–4º)", aulas:[
          "Princípios Fundamentais — Conceito",
          "Federação x Confederação e Tipos de Federalismo",
          "Princípio Republicano",
          "Princípio Democrático",
          "Separação dos Poderes — Funções Típicas e Atípicas",
          "Fundamentos da República Federativa do Brasil",
          "Objetivos da RFB",
          "Princípios nas Relações Internacionais",
        ]},
        { id:"dc5b", title:"Módulo 5 (Pak0l) — Art. 5º — Direitos Individuais", aulas:[
          "Noções Gerais e Direito à Vida",
          "Direito à Igualdade (Partes 1, 2 e 3)",
          "Princípio da Legalidade, Liberdade de Locomoção, Liberdade Profissional",
          "Liberdade de Manifestação do Pensamento (Partes 1 e 2)",
          "Liberdade Religiosa x Laicidade e Escusa de Consciência",
          "Liberdade de Reunião",
          "Liberdade de Associação",
          "Direito à Propriedade — Função Social e Desapropriação",
          "Direito à Propriedade — Requisição Administrativa",
          "Bem de Família, Propriedade Imaterial, Herança",
          "Direito à Informação",
          "Direito de Privacidade",
          "Inviolabilidade Domiciliar (Partes 1 e 2)",
          "Sigilos Pessoais de Correspondência",
          "Dados Sensíveis (Partes 1 e 2)",
        ]},
        { id:"dc5c", title:"Módulo 5 (kZ49e) — Remédios Constitucionais", aulas:[
          "Irretroatividade da Lei, Direito Adquirido, Ato Jurídico Perfeito",
          "Princípio da Inafastabilidade da Jurisdição",
          "Assistência Judiciária, Devido Processo Legal, Contraditório e Ampla Defesa",
          "Contraditório e Ampla Defesa — Parte 2, Duplo Grau e Celeridade",
          "Princípio do Juiz Natural, Provas Ilícitas e Publicidade",
          "Presunção de Inocência, Racismo, Graça, Indulto e Anistia",
          "Tribunal do Júri",
          "Legalidade e Anterioridade da Lei Penal, Penas Permitidas",
          "Penas Proibidas, Direitos dos Presos",
          "Prisão Civil, Erro Judiciário",
          "Extradição — Natos x Naturalizados",
          "Noções Gerais sobre Remédios e Direito de Petição",
          "Habeas Corpus (Partes 1 e 2)",
          "Habeas Data",
          "Mandado de Segurança (Partes 1, 2, 3 e 4)",
          "Mandado de Segurança Coletivo",
          "Mandado de Injunção (Partes 1 e 2)",
          "Ação Popular",
        ]},
        { id:"dc6", title:"Módulo 6 — Administração Pública (Art. 37 — LIMPE)", aulas:[
          "Parte 1 — Disposições Gerais",
          "Parte 2",
          "Parte 3",
          "Disposições Gerais — Crimes contra a Honra",
        ]},
        { id:"dc_lei", title:"Módulo 4 — Lei 7.437/1985 (lei complementar)", aulas:[
          "Lei 7.437/1985",
        ]},
      ]},
      { name:"Passo Estratégico de Direito Constitucional-2023", type:"📄 PDF", modules:[
        { id:"dc_pe", title:"PDFs Complementares — Seções 00 a 14", aulas:[
          "Seção 00","Seção 01","Seção 02","Seção 03","Seção 04","Seção 05","Seção 06","Seção 07",
          "Seção 08","Seção 09","Seção 10","Seção 11","Seção 12","Seção 13","Seção 14",
        ]},
      ]},
    ]
  },
  { bloco:2, id:"dh", name:"Direitos Humanos", priority:"high", emoji:"🕊️",
    courses:[
      { name:"PM-BA-Direitos_Humanos-2023", type:"🎬 Vídeo", modules:[
        { id:"dh1", title:"Módulo 1 — Sistema Global ONU", aulas:[
          "DUDH I — Declaração Universal dos Direitos Humanos",
          "DUDH II",
          "Pactos de 1966 — Introdução",
          "PIDCP I — Pacto Internacional dos Direitos Civis e Políticos",
          "PIDCP II",
          "PIDSEC — Pacto Internacional dos Direitos Econômicos, Sociais e Culturais",
        ]},
        { id:"dh2", title:"Módulo 2 — Sistema Interamericano", aulas:[
          "Convenção Americana de Direitos Humanos",
          "Pacto de San José da Costa Rica",
          "Comissão x Corte Interamericana",
          "Protocolo Facultativo à Convenção",
        ]},
        { id:"dh3", title:"Módulo 3 — Outros Instrumentos", aulas:[
          "Declaração de Pequim",
        ]},
      ]},
      { name:"Passo Estratégico de Direitos Humanos-2023", type:"📄 PDF", modules:[
        { id:"dh_pe", title:"PDFs Complementares — Seções 1 a 3", aulas:[
          "Seção 1","Seção 2","Seção 3",
        ]},
      ]},
    ]
  },
  { bloco:3, id:"matematica", name:"Matemática", priority:"max", emoji:"🔢",
    courses:[
      { name:"PM-BA-Matemática-2023", type:"🎬 Vídeo", modules:[
        { id:"mat00", title:"Módulo 00 — Conjuntos (Teoria + Questões)", aulas:[
          "Operações com conjuntos — Partes 01 a 16",
          "Questões FCC — Partes 18 e 19",
          "Resolução de Questões FCC — Partes 01 a 07",
        ]},
        { id:"mat01", title:"Módulo 01 — Conjuntos Numéricos", aulas:[
          "Introdução — Partes 1, 2 e 3",
          "Problemas envolvendo conjuntos — Partes 1 a 5",
        ]},
        { id:"mat02", title:"Módulo 02 — Números, Frações, Raízes e Álgebra", aulas:[
          "Adição e Subtração de Números Inteiros",
          "Multiplicação e Divisão de Números Inteiros",
          "Potenciação de Números Inteiros",
          "Divisão de números naturais (Partes 1 e 2)",
          "Adição e subtração de frações",
          "Multiplicação e divisão de frações",
          "Potenciação de frações",
          "Leitura de números decimais",
          "Adição, Subtração, Multiplicação e Divisão de decimais",
          "Potenciação de números decimais",
          "Transformação fração↔decimal e Dízimas Periódicas",
          "Radiciação (Partes 1 a 4) e Operações com radicais",
          "Racionalização de radicais",
          "Expressões Algébricas e Valor Numérico",
          "Monômios — operações",
          "Polinômios — operações",
          "Produtos Notáveis (múltiplas partes)",
          "Fatoração de Polinômios (Fator comum, Agrupamento, TQP, Diferença de quadrados, Trinômio 2º grau)",
          "Resolução de Questões — Produtos Notáveis e Fatoração",
        ]},
        { id:"mat03", title:"Módulo 03 — Medidas e Notação Científica", aulas:[
          "Sistemas de tempo",
          "Sistema métrico decimal (comprimento, massa, capacidade, área, volume, velocidade)",
          "Questões FCC — Sistemas de Medidas",
          "Potências de Dez — Notação Científica e Ordem de Grandeza",
        ]},
        { id:"mat04", title:"Módulo 04 — MMC, MDC e Divisibilidade", aulas:[
          "Números primos e decomposição em fatores primos",
          "Múltiplos de um número",
          "Mínimo Múltiplo Comum (MMC)",
          "Máximo Divisor Comum (MDC)",
          "Divisores de um número",
        ]},
        { id:"mat0508", title:"Módulos 05–08 — Proporção, Regra de 3, Porcentagem, Sistemas ⚠️", aulas:[
          "⚠️ Ver módulos 05, 06, 07 e 08 no player:",
          "Razões e proporções",
          "Divisão proporcional",
          "Regra de três simples e composta",
          "Porcentagem e juros",
          "Sistemas lineares",
        ]},
        { id:"mat09", title:"Módulo 09 — Funções: Conceito e Tipos", aulas:[
          "Relações — Definição",
          "Produto Cartesiano",
          "Funções — Definição",
          "Funções — Valor Numérico",
          "Funções — Domínio, Contradomínio e Imagem",
          "Funções — Representação Gráfica",
          "Funções — Zeros de uma Função",
          "Funções — Sobrejetoras, Injetoras e Bijetoras",
          "Função Inversa (Partes 1 e 2)",
          "Função Par e Ímpar",
          "Função Crescente e Decrescente",
          "Função Composta",
          "Exercícios de Fixação (Partes 1, 2 e 3)",
          "Questões — Diversas Bancas (Partes 1 e 2)",
        ]},
        { id:"mat10", title:"Módulo 10 — Função Afim (1º Grau)", aulas:[
          "Função 1º grau — Partes 01 a 11",
          "Resolução de Questões FCC — Partes 01 e 02",
        ]},
        { id:"mat11", title:"Módulo 11 — Função Quadrática (2º Grau)", aulas:[
          "Definição, Gráfico e Concavidade",
          "Cálculo das Raízes e Número de Raízes",
          "Interseções com Eixos Coordenados",
          "Vértice da Função do 2º Grau (Partes 1 e 2)",
          "Esboço do Gráfico",
          "Máximo e Mínimo na Função Quadrática",
          "Forma fatorada e domínio/imagem",
          "Resolução de Questões FCC — Partes 01 a 05",
        ]},
        { id:"mat12", title:"Módulo 12 — Função Modular", aulas:[
          "Módulo ou Valor Absoluto de um Número Real",
          "Equação Modular (Partes 1, 2 e 3)",
          "Inequação Modular (Partes 1 e 2)",
          "Função Modular (múltiplas partes)",
        ]},
        { id:"mat13", title:"Módulo 13 — Função Exponencial", aulas:[
          "Revisão — Propriedades das Potências",
          "Resolução de equações exponenciais (Partes 1 e 2)",
          "Resolução de inequações exponenciais (Partes 1 e 2)",
          "Função Exponencial — Gráfico e Propriedades",
        ]},
        { id:"mat14", title:"Módulo 14 — Logaritmos", aulas:[
          "Logaritmos — Introdução (Partes 1 e 2)",
          "Definição (Partes 1 e 2)",
          "Propriedades de Logaritmos (Partes 1 e 2)",
          "Mudança de Base",
          "Logaritmos Naturais",
          "Função Logarítmica",
          "Equações Exponenciais e Logarítmicas (Partes 1 e 2)",
          "Inequações logarítmicas (Partes 1 e 2)",
        ]},
        { id:"mat15", title:"Módulo 15 — PA e PG", aulas:[
          "Progressões Aritméticas — teoria e exercícios (múltiplas partes)",
          "Progressões Geométricas — teoria e exercícios (múltiplas partes)",
          "Resumo Comparativo PA x PG",
        ]},
        { id:"mat16", title:"Módulo 16 — Geometria Plana", aulas:[
          "Áreas de figuras planas (Partes 1 e 2)",
          "Teorema de Pitágoras",
          "Polígonos convexos — soma dos ângulos internos e externos",
        ]},
        { id:"mat19", title:"Módulo 19 — Matrizes e Determinantes", aulas:[
          "Representação de matrizes",
          "Matrizes especiais (Partes 1 e 2)",
          "Adição, Subtração e Produto por escalar",
          "Multiplicação de matrizes",
          "Matrizes inversas",
          "Cálculo de determinantes de ordem 2 e 3",
        ]},
      ]},
      { name:"Passo Estratégico de Matemática-2023", type:"📄 PDF", modules:[
        { id:"mat_pe", title:"PDFs Complementares — Seções 00 a 15", aulas:[
          "Seção 00","Seção 01","Seção 02","Seção 03","Seção 04","Seção 05","Seção 06","Seção 07",
          "Seção 08","Seção 09","Seção 10","Seção 11","Seção 12","Seção 13","Seção 14","Seção 15",
        ]},
      ]},
      { name:"Passo Estratégico de Raciocínio Lógico-2023", type:"📄 PDF", modules:[
        { id:"mat_logica", title:"Lógica Proposicional — Seções 0 a 8", aulas:[
          "Seção 0","Seção 1","Seção 2","Seção 3","Seção 4","Seção 5","Seção 6","Seção 7","Seção 8",
        ]},
      ]},
    ]
  },
  { bloco:4, id:"penal", name:"Direito Penal", priority:"medium_high", emoji:"🔍",
    courses:[
      { name:"PM-BA-Direito_Penal-2023", type:"🎬 Vídeo", modules:[
        { id:"dp0", title:"Módulo 0 — Teoria do Crime", aulas:[
          "Conceito de Crime — Crime e contravenção penal",
          "Fato típico (múltiplas partes)",
          "Causas de exclusão do fato típico",
          "Fato típico doloso, culposo e preterdoloso",
          "Iter criminis",
          "Crime consumado e tentado",
          "Crime impossível",
          "Desistência voluntária e arrependimento eficaz (Partes 1 e 2)",
          "Arrependimento posterior",
          "Ilicitude — Introdução",
          "Estado de necessidade (Partes 1 e 2)",
          "Legítima defesa (Partes 1, 2 e 3)",
          "Outras causas de exclusão da ilicitude",
        ]},
        { id:"dp1", title:"Módulo 1 — Culpabilidade e Erro", aulas:[
          "Culpabilidade",
          "Causas de exclusão da culpabilidade",
          "Erro de tipo e erro de proibição (Partes 1 a 4)",
          "Erro acidental (Partes 1 e 2)",
          "Questões da FCC — Culpabilidade e Erro",
        ]},
        { id:"dp2", title:"Módulo 2 — Crimes contra a Vida e Liberdade", aulas:[
          "Lesões corporais (Partes 1 e 2)",
          "Rixa",
          "Crimes contra a Liberdade Pessoal (Partes 1 a 4)",
          "Perseguição",
          "Violência Psicológica contra a Mulher (Art. 147-B CP)",
          "Homicídio (Partes 1, 2 e 3)",
        ]},
        { id:"dp3", title:"Módulo 3 — Crimes Patrimoniais", aulas:[
          "Furto (Partes 1, 2 e 3)",
          "Furto — Jurisprudência Relevante",
          "Roubo (Partes 1 e 2)",
          "Extorsão (Partes 1 e 2)",
          "Apropriação indébita (Partes 1 e 2)",
          "Receptação",
        ]},
        { id:"dp4", title:"Módulo 4 — Crimes Sexuais e contra Adm. Pública", aulas:[
          "Crimes contra a Liberdade Sexual (Partes 1 e 2)",
          "Corrupção Passiva",
          "Corrupção Ativa",
        ]},
        { id:"dp5", title:"Módulo 5 — Legislação Especial", aulas:[
          "Lei nº 9.455 — Lei de Tortura (Partes 1 e 2)",
        ]},
      ]},
      { name:"Passo Estratégico de Direito Penal-2023", type:"📄 PDF", modules:[
        { id:"dp_pe", title:"PDFs Complementares — Seções 0 a 7", aulas:[
          "Seção 0","Seção 1","Seção 2","Seção 3","Seção 4","Seção 5","Seção 6","Seção 7",
        ]},
      ]},
    ]
  },
  { bloco:4, id:"penal_militar", name:"Direito Penal Militar", priority:"medium_high", emoji:"🎖️",
    courses:[
      { name:"PM-BA-Direito_Penal_Militar-2023", type:"🎬 Vídeo", modules:[
        { id:"dpm1", title:"Módulo 1 — Crimes contra Autoridade/Disciplina Militar", aulas:[
          "Parte Especial — Introdução",
          "Violência contra Superior",
          "Desrespeito a Superior",
          "Usurpação de função",
          "Resistência (Cap. VII)",
          "Fuga, Arrebatamento e Amotinamento (Cap. VIII)",
        ]},
        { id:"dpm2", title:"Módulo 2 — Crimes contra o Serviço e Dever Militar", aulas:[
          "Insubmissão",
          "Deserção",
          "Abandono de Posto",
          "Exercício do Comércio (Cap. V)",
        ]},
        { id:"dpm3", title:"Módulo 3 — Crimes contra a Administração Militar", aulas:[
          "Desacato e Desobediência",
          "Peculato Militar",
          "Concussão, Excesso de Exação e Desvio",
          "Corrupção Militar",
          "Falsidade (Partes 1 e 2)",
          "Crimes contra o Dever Funcional (Partes 1 e 2)",
        ]},
      ]},
      { name:"Passo Estratégico de Direito Penal Militar-2023", type:"📄 PDF", modules:[
        { id:"dpm_pe", title:"Aula Única — PDF Complementar", aulas:["Versão original (Aula única)"]},
      ]},
    ]
  },
  { bloco:4, id:"administrativo", name:"Direito Administrativo", priority:"medium", emoji:"🏢",
    courses:[
      { name:"PM-BA-Direito_Administrativo-2023", type:"🎬 Vídeo", modules:[
        { id:"da0", title:"Módulo 0 — Regime Jurídico e Princípios", aulas:[
          "Regime Jurídico (Partes 1 e 2)",
          "Princípios Expressos (Partes 1 e 2)",
          "Princípios Implícitos (Partes 1 e 2)",
          "Outros Princípios Implícitos",
          "Resumo de Regime Jurídico-Administrativo",
        ]},
        { id:"da1", title:"Módulo 1 — Introdução e Organização Administrativa", aulas:[
          "Conceito de Direito Administrativo",
          "Objeto e Função Administrativa",
          "Critérios para conceituar o DA",
          "Fontes do Direito Administrativo",
          "Sistemas Administrativos",
          "Transformação e Inspiração do DA",
          "Estado e Poderes do Estado",
          "Governo e Administração Pública",
        ]},
        { id:"da2", title:"Módulo 2 — Poderes Administrativos", aulas:[
          "Deveres Administrativos",
          "Poderes — Introdução, Vinculado e Discricionário",
          "Poder Hierárquico",
          "Poder Disciplinar",
          "Poder Regulamentar/Normativo",
          "Poder de Polícia — Conceito e Competência",
          "Polícia Administrativa e Judiciária e Atributos do Poder de Polícia",
          "Meios de atuação e Ciclo do Poder de Polícia",
          "Sanções, Prescrição e Taxa do Poder de Polícia",
          "Uso e Abuso do Poder",
        ]},
        { id:"da3", title:"Módulo 3 — Agentes e Atos Administrativos", aulas:[
          "Conceito e Classificação dos Agentes",
          "Agentes Administrativos e Agente de Fato",
          "Cargo, Emprego e Função Pública",
          "⚠️ Continuar módulos seguintes no player",
        ]},
      ]},
      { name:"Passo Estratégico de Direito Administrativo-2023", type:"📄 PDF", modules:[
        { id:"da_pe", title:"PDFs Complementares — Seções 0 a 4", aulas:[
          "Seção 0","Seção 1","Seção 2","Seção 3","Seção 4",
        ]},
      ]},
    ]
  },
  { bloco:5, id:"portugues", name:"Língua Portuguesa", priority:"maintenance", emoji:"📝",
    courses:[
      { name:"PM-BA-Língua_Portuguesa-2023", type:"🎬 Vídeo", modules:[
        { id:"lp_gram", title:"Módulos 1–9 — Gramática ⚠️", aulas:[
          "⚠️ Ver módulos 1 a 9 no player:",
          "Classes de palavras",
          "Termos da oração",
          "Período composto",
          "Concordância nominal e verbal",
          "Regência nominal e verbal",
          "Colocação pronominal",
          "Pontuação",
          "Conectivos e coesão",
        ]},
        { id:"lp10", title:"Módulo 10 — Crase", aulas:[
          "Crase — Casos Obrigatórios (+ Mapa Mental)",
          "Crase — Casos Proibidos",
          "Crase — Casos Facultativos e Especiais",
          "Crase — Questões",
        ]},
        { id:"lp11", title:"Módulo 11 — Semântica", aulas:["Sinônimos e Antônimos"]},
        { id:"lp12", title:"Módulo 12 — Interpretação e Tipologia", aulas:[
          "Tipologias Textuais",
          "Tipos de Discurso (Partes 1 e 2)",
          "Funções da Linguagem",
          "Interpretação e Compreensão de texto (Partes 1 a 5)",
          "Interpretação — Complemento",
        ]},
      ]},
      { name:"Passo Estratégico de Língua Portuguesa-2023", type:"📄 PDF", modules:[
        { id:"lp_pe", title:"Aulas + Simulados", aulas:[
          "Aula 01","Aula 02","Simulado 01",
          "Aula 03","Aula 04","Simulado 02",
          "Aula 05","Aula 06","Simulado 03",
          "Aula 07","Aula 08","Simulado 04",
          "Aula 09","Aula 10","Simulado 05",
        ]},
      ]},
    ]
  },
  { bloco:5, id:"informatica", name:"Informática", priority:"maintenance", emoji:"💻",
    courses:[
      { name:"PM-BA-Informática-2023", type:"🎬 Vídeo", modules:[
        { id:"info00", title:"Módulo 00 — Internet e Redes Wireless", aulas:[
          "Introdução à Internet (múltiplas versões)",
          "Conceitos de Internet — Deep Web",
          "Padrões de Redes — Wireless (Partes 1, 2 e 3)",
          "Dispositivos Intermediários em Redes Ethernet",
        ]},
        { id:"info01", title:"Módulo 01 — Protocolos de Comunicação", aulas:[
          "Conceitos Básicos e Camadas TCP/IP",
          "Camada de Transporte",
          "IP — Endereçamento",
          "Domínios e URL",
          "DHCP",
          "DNS",
          "HTTP e HTTPS",
          "SMTP, POP e IMAP",
          "FTP e P2P",
          "VoIP",
          "Portas",
        ]},
        { id:"info02", title:"Módulo 02 — Intranet e Extranet", aulas:[
          "Partes 1 e 2",
          "Questões FGV — Intranet e Extranet",
        ]},
        { id:"info0304", title:"Módulos 03 e 04 — Segurança da Informação", aulas:[
          "Segurança — Conceitos (Partes 1 e 2)",
          "⚠️ Ver módulos 03 e 04 completos: malware, phishing, backup, criptografia, autenticação",
        ]},
        { id:"info05", title:"Módulo 05 — Excel (Planilhas Eletrônicas)", aulas:[
          "Planilhas Eletrônicas — Conceito e funcionalidades",
          "Fórmulas — Operadores, Constantes e Referências (Partes 1, 2 e 3)",
          "Referências Relativas, Mistas e Absolutas",
          "Planilhas — múltiplas aulas de funções (SOMA, SE, CONT.SE etc.)",
          "Questões CESPE — Excel (Partes 1 e 2)",
        ]},
        { id:"info06", title:"Módulo 06 — LibreOffice Calc", aulas:[
          "Conceitos Básicos",
          "Calc — Principais Funcionalidades",
        ]},
        { id:"info07", title:"Módulo 07 — Microsoft Word / Writer", aulas:[
          "Microsoft Word — Conceitos e funcionalidades (múltiplas partes)",
          "Word — Macro",
          "Questões CESPE e VUNESP — Word (Partes 1, 2 e 3)",
        ]},
        { id:"info08", title:"Módulo 08 — Recursos Gerais do Office", aulas:[
          "Salvar, Exportar e Imprimir",
          "Conceitos Básicos do Office",
          "Teclas de atalho",
        ]},
        { id:"info11", title:"Módulo 11 — Windows 7 + Arquivos", aulas:[
          "Windows 7 (múltiplas versões)",
          "Gerenciamento de Arquivos e Pastas (Partes 1 a 4)",
        ]},
        { id:"info12", title:"Módulo 12 — Windows 10 + Arquivos", aulas:[
          "Windows 10 (múltiplas versões)",
          "Gerenciamento de Arquivos e Pastas (Partes 1 a 4)",
          "Questões VUNESP (Partes 1 e 2)",
        ]},
      ]},
    ]
  },
  { bloco:6, id:"igualdade", name:"Igualdade Racial e de Gênero (Lei 12.288)", priority:"low", emoji:"🤝",
    courses:[
      { name:"Passo Estratégico de Igualdade Racial e de Gênero-2023", type:"📄 PDF", modules:[
        { id:"ir_pe", title:"PDFs Complementares — Seções 0 a 6", aulas:[
          "Seção 0","Seção 1","Seção 2","Seção 3","Seção 4","Seção 5","Seção 6",
        ]},
      ]},
    ]
  },
];

const BLOCO_NAMES: Record<number, string> = {
  1:"🗓️ Bloco 1 — História + Geografia + Atualidades",
  2:"🗓️ Bloco 2 — Direito Constitucional + Direitos Humanos",
  3:"🗓️ Bloco 3 — Matemática (prioridade máxima!)",
  4:"🗓️ Bloco 4 — Penal + Penal Militar + Administrativo",
  5:"🗓️ Bloco 5 — Português + Informática",
  6:"🗓️ Bloco 6 — Legislação Complementar",
};

export default function App() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const [openSubjects, setOpenSubjects] = useState<Record<string, boolean>>({});
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [totalTimes, setTotalTimes] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const r = localStorage.getItem("pmba-v2");
      if (r) setChecked(JSON.parse(r));
      
      const t = localStorage.getItem("pmba-timer-v1");
      if (t) setTotalTimes(JSON.parse(t));
    } catch (e) {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggle = (key: string) => {
    const n = { ...checked, [key]: !checked[key] };
    setChecked(n);
    try { localStorage.setItem("pmba-v2", JSON.stringify(n)); } catch (e) {}
  };
  const toggleSubject = (id: string) => setOpenSubjects(s => ({ ...s, [id]: !s[id] }));
  const toggleModule = (id: string) => setOpenModules(m => ({ ...m, [id]: !m[id] }));

  const handleStartPause = () => {
    if (!activeSubject) {
      alert("Selecione uma matéria primeiro!");
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleSave = () => {
    if (!activeSubject) return;
    setIsRunning(false);
    
    const newTotalTimes = {
      ...totalTimes,
      [activeSubject]: (totalTimes[activeSubject] || 0) + sessionTime
    };
    
    setTotalTimes(newTotalTimes);
    setSessionTime(0);
    try { localStorage.setItem("pmba-timer-v1", JSON.stringify(newTotalTimes)); } catch (e) {}
  };

  const handleResetSession = () => {
    setIsRunning(false);
    setSessionTime(0);
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")} : ${m.toString().padStart(2, "0")} : ${s.toString().padStart(2, "0")}`;
  };

  const totalGlobalTime = Object.values(totalTimes).reduce((acc, curr) => acc + curr, 0);

  if (!loaded) return null;

  let total = 0, done = 0;
  curriculum.forEach(s => s.courses.forEach(c => c.modules.forEach(m =>
    m.aulas.forEach(a => {
      if (!a.startsWith("⚠️")) {
        total++; 
        if (checked[`${m.id}::${a}`]) done++;
      }
    })
  )));
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const subjectStats: Record<string, { t: number; d: number }> = {};
  curriculum.forEach(s => {
    let st = 0, sd = 0;
    s.courses.forEach(c => c.modules.forEach(m =>
      m.aulas.forEach(a => {
        if (!a.startsWith("⚠️")) {
          st++; 
          if (checked[`${m.id}::${a}`]) sd++;
        }
      })
    ));
    subjectStats[s.id] = { t: st, d: sd };
  });

  const blocos = [1, 2, 3, 4, 5, 6];

  const css = `
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:#0a0a0f;font-family:'Segoe UI',system-ui,sans-serif;color:#e2e8f0;}
    ::-webkit-scrollbar{width:6px;}
    ::-webkit-scrollbar-track{background:#1a1a2e;}
    ::-webkit-scrollbar-thumb{background:#3b3b6b;border-radius:3px;}
    .timer-btn{padding:10px 16px; border:none; border-radius:8px; font-weight:bold; cursor:pointer; transition: opacity 0.2s;}
    .timer-btn:hover{opacity: 0.8;}
    .subject-pill{padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1px solid #334155;}
  `;

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a0a0f 0%,#0f0f1a 100%)", padding: "20px 16px", maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 6 }}>📋</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, background: "linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 4 }}>
            Plano de Estudos PMBA 2026
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 13 }}>Cada aula mapeada por assunto e prioridade</p>
        </div>

        {/* Cronograma Semanal */}
        <div style={{ background: "#1e293b", borderRadius: 12, padding: "16px", marginBottom: 24, border: "1px solid #334155" }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", marginBottom: 12 }}>📅 Cronograma Semanal</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {CRONOGRAMA.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", background: "#0f172a", padding: "10px", borderRadius: "8px", fontSize: "13px" }}>
                <span style={{ fontWeight: "bold", color: "#93c5fd", width: "70px" }}>{item.dia}</span>
                <span style={{ flex: 1, color: "#e2e8f0" }}>{item.materias}</span>
                <span style={{ color: "#fbbf24", fontWeight: "bold", marginRight: "10px" }}>{item.tempo}</span>
                <span style={{ color: "#94a3b8", fontSize: "11px", alignSelf: "center" }}>Foco: {item.foco}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cronômetro */}
        <div style={{ background: "#1e293b", borderRadius: 12, padding: "20px", marginBottom: 24, border: "1px solid #334155" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9" }}>⏱️ Cronômetro de Estudos</h2>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#fbbf24", fontWeight: 800, fontSize: 18 }}>{formatTime(totalGlobalTime)}</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>tempo global</div>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {MATERIAS_TIMER.map(mat => (
              <div 
                key={mat.id}
                onClick={() => {
                  if (isRunning) handleSave();
                  setActiveSubject(mat.id);
                }}
                className="subject-pill"
                style={{ 
                  background: activeSubject === mat.id ? "#3b82f6" : "transparent",
                  color: activeSubject === mat.id ? "#fff" : "#94a3b8",
                  borderColor: activeSubject === mat.id ? "#3b82f6" : "#334155"
                }}
              >
                {mat.id}
              </div>
            ))}
          </div>

          <div style={{ background: "#0f172a", borderRadius: 12, padding: "30px", textAlign: "center", border: "1px solid #334155", marginBottom: 16 }}>
            <div style={{ fontSize: 48, fontWeight: 800, color: activeSubject ? (isRunning ? "#4ade80" : "#f1f5f9") : "#475569", fontFamily: "monospace", letterSpacing: "2px" }}>
              {formatTime(sessionTime)}
            </div>
            <div style={{ color: "#64748b", fontSize: 12, marginTop: 8 }}>
              {activeSubject ? `Matéria selecionada: ${MATERIAS_TIMER.find(m => m.id === activeSubject)?.name}` : "↑ Selecione uma matéria acima"}
            </div>
            {activeSubject && totalTimes[activeSubject] > 0 && (
              <div style={{ color: "#fbbf24", fontSize: 11, marginTop: 4 }}>
                Total acumulado na matéria: {formatTime(totalTimes[activeSubject])}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button className="timer-btn" onClick={handleStartPause} style={{ background: isRunning ? "#f59e0b" : "#3b82f6", color: "#fff", flex: 1, maxWidth: "200px" }}>
              {isRunning ? "⏸️ PAUSAR" : (sessionTime > 0 ? "▶️ RETOMAR" : "▶️ INICIAR")}
            </button>
            <button className="timer-btn" onClick={handleSave} style={{ background: "#10b981", color: "#fff", flex: 1, maxWidth: "200px" }}>
              💾 SALVAR
            </button>
            <button className="timer-btn" onClick={handleResetSession} style={{ background: "#475569", color: "#fff" }}>
              🔄 RESET
            </button>
          </div>
        </div>

        {/* Progress Bar Global */}
        <div style={{ background: "#1e293b", borderRadius: 12, padding: "16px 20px", marginBottom: 24, border: "1px solid #334155" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontWeight: 700, color: "#f1f5f9", fontSize: 14 }}>Progresso de Aulas</span>
            <span style={{ color: "#fbbf24", fontWeight: 800, fontSize: 18 }}>{pct}%</span>
          </div>
          <div style={{ background: "#0f172a", borderRadius: 999, height: 12, overflow: "hidden" }}>
            <div style={{
              width: `${pct}%`, height: "100%",
              background: "linear-gradient(90deg,#f59e0b,#fbbf24)",
              borderRadius: 999, transition: "width .4s ease"
            }} />
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: "#64748b", textAlign: "right" }}>
            {done} de {total} itens concluídos
          </div>
        </div>

        {/* Content by BLOCO */}
        {blocos.map(b => {
          const subjects = curriculum.filter(s => s.bloco === b);
          return (
            <div key={b} style={{ marginBottom: 28 }}>
              <div style={{
                background: "linear-gradient(90deg,#1e3a5f,#1e293b)",
                borderRadius: 10, padding: "10px 16px",
                marginBottom: 12, borderLeft: "4px solid #3b82f6"
              }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: "#93c5fd" }}>{BLOCO_NAMES[b]}</h2>
              </div>

              {subjects.map(s => {
                const pc = PRIORITY[s.priority];
                const ss = subjectStats[s.id];
                const sp = ss.t > 0 ? Math.round((ss.d / ss.t) * 100) : 0;
                const open = openSubjects[s.id] !== false;

                return (
                  <div key={s.id} style={{
                    background: pc.bg, border: `1px solid ${pc.border}`,
                    borderRadius: 12, marginBottom: 12, overflow: "hidden"
                  }}>
                    <div
                      onClick={() => toggleSubject(s.id)}
                      style={{
                        padding: "14px 16px", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 10,
                        borderBottom: open ? `1px solid ${pc.border}` : "none"
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{s.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9" }}>{s.name}</span>
                          <span style={{
                            background: pc.badge, color: "#fff",
                            fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999
                          }}>{pc.label}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                          <div style={{ flex: 1, background: "rgba(0,0,0,.3)", borderRadius: 999, height: 6, overflow: "hidden" }}>
                            <div style={{ width: `${sp}%`, height: "100%", background: pc.badge, borderRadius: 999, transition: "width .3s" }} />
                          </div>
                          <span style={{ fontSize: 11, color: pc.text, fontWeight: 600, minWidth: 32 }}>{sp}%</span>
                        </div>
                      </div>
                      <span style={{ color: pc.text, fontSize: 18, transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform .2s" }}>›</span>
                    </div>

                    {open && (
                      <div style={{ padding: "12px 16px" }}>
                        {s.courses.map((course, ci) => (
                          <div key={ci} style={{ marginBottom: 16 }}>
                            <div style={{
                              display: "flex", alignItems: "center", gap: 6, marginBottom: 8,
                              padding: "6px 10px", background: "rgba(0,0,0,.25)",
                              borderRadius: 8, flexWrap: "wrap"
                            }}>
                              <span style={{ fontSize: 12, color: pc.text, fontWeight: 700 }}>{course.type}</span>
                              <span style={{ fontSize: 11, color: "#94a3b8", flex: 1 }}>{course.name}</span>
                            </div>

                            {course.modules.map(mod => {
                              const mopen = openModules[mod.id] !== false;
                              const mAulasContaveis = mod.aulas.filter(a => !a.startsWith("⚠️"));
                              const mdone = mAulasContaveis.filter(a => checked[`${mod.id}::${a}`]).length;
                              return (
                                <div key={mod.id} style={{
                                  marginBottom: 8, background: "rgba(0,0,0,.2)",
                                  borderRadius: 8, overflow: "hidden"
                                }}>
                                  <div
                                    onClick={() => toggleModule(mod.id)}
                                    style={{
                                      padding: "8px 12px", cursor: "pointer",
                                      display: "flex", alignItems: "center", gap: 8,
                                    }}
                                  >
                                    <span style={{ fontSize: 11, transform: mopen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform .2s", color: pc.text }}>›</span>
                                    <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{mod.title}</span>
                                    <span style={{ fontSize: 10, color: pc.text, fontWeight: 600 }}>
                                      {mdone}/{mAulasContaveis.length}
                                    </span>
                                  </div>

                                  {mopen && (
                                    <div style={{ padding: "4px 12px 10px 28px" }}>
                                      {mod.aulas.map((aula, ai) => {
                                        const key = `${mod.id}::${aula}`;
                                        const isDone = !!checked[key];
                                        const isNote = aula.startsWith("⚠️");
                                        return (
                                          <div
                                            key={ai}
                                            onClick={() => !isNote && toggle(key)}
                                            style={{
                                              display: "flex", alignItems: "flex-start", gap: 8,
                                              padding: "5px 4px", borderRadius: 6, cursor: isNote ? "default" : "pointer",
                                              opacity: isDone ? 0.5 : 1,
                                              textDecoration: isDone ? "line-through" : "none",
                                              transition: "opacity .2s",
                                              marginBottom: 2,
                                              background: isDone ? "rgba(0,0,0,.1)" : "transparent",
                                            }}
                                          >
                                            {!isNote && (
                                              <div style={{
                                                width: 16, height: 16, minWidth: 16,
                                                borderRadius: 4, marginTop: 1,
                                                border: `2px solid ${isDone ? pc.badge : "#475569"}`,
                                                background: isDone ? pc.badge : "transparent",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                transition: "all .2s"
                                              }}>
                                                {isDone && <span style={{ color: "#fff", fontSize: 10, lineHeight: 1 }}>✓</span>}
                                              </div>
                                            )}
                                            <span style={{
                                              fontSize: 12,
                                              color: isNote ? "#f97316" : isDone ? "#64748b" : "#cbd5e1",
                                              lineHeight: 1.4,
                                              fontStyle: isNote ? "italic" : "normal"
                                            }}>
                                              {aula}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 16, padding: 16, color: "#475569", fontSize: 11 }}>
          ✅ Marque cada aula ao concluir — o progresso salva automaticamente<br />
          ⚠️ Itens em laranja são anotações, não entram na barra de progresso
        </div>
      </div>
    </>
  );
}
