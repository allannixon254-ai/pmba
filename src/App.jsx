import { useState, useEffect, useRef } from "react";

// ─── PRIORIDADES ───────────────────────────────────────────────────────────────
const PRIORITY = {
  max:         { bg:"#450a0a", border:"#991b1b", badge:"#dc2626", text:"#fca5a5", label:"🔴 MÁXIMA"     },
  high:        { bg:"#431407", border:"#9a3412", badge:"#ea580c", text:"#fdba74", label:"🟠 ALTA"       },
  medium_high: { bg:"#1c1917", border:"#92400e", badge:"#d97706", text:"#fcd34d", label:"🟡 MÉDIA-ALTA" },
  medium:      { bg:"#052e16", border:"#166534", badge:"#16a34a", text:"#86efac", label:"🟢 MÉDIA"      },
  low:         { bg:"#082f49", border:"#075985", badge:"#0284c7", text:"#7dd3fc", label:"🔵 BAIXA"      },
  maintenance: { bg:"#2e1065", border:"#6b21a8", badge:"#9333ea", text:"#d8b4fe", label:"🟣 MANUTENÇÃO" },
};

// ─── CURRÍCULO ─────────────────────────────────────────────────────────────────
const curriculum = [
  // ─── BLOCO 1 ──────────────────────────────────────────────────────
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
          "O Transporte Rodoviário","O Transporte Ferroviário",
          "O Transporte Aquaviário","Agropecuária I","Agropecuária II",
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
          "Globalização","Blocos Econômicos (Partes 1 e 2)","União Europeia",
          "China","Economia Internacional — Questões Comentadas (Partes 1 e 2)",
        ]},
        { id:"at1", title:"Módulo 1 — Oriente Médio e Conflitos", aulas:[
          "Islamismo, Mundo Árabe e Oriente Médio (Partes 1 e 2)",
          "A Questão Israel-Palestina (Partes 1, 2 e 3)",
          "Síria, Curdistão e Turquia","Irã","Afeganistão (Partes 1 e 2)",
        ]},
        { id:"at2", title:"Módulo 2 — Migrações e Geopolítica", aulas:[
          "Migrações — Teoria (Partes 1 e 2)","América Latina",
          "Organizações e Grupos Internacionais (Partes 1 e 2)",
          "Antecedentes da Guerra entre Rússia e Ucrânia",
          "Guerra entre Rússia e Ucrânia (Partes 1, 2 e 3)",
          "Migrações — Questões Comentadas","Varíola dos Macacos — Questões Comentadas",
        ]},
        { id:"at3", title:"Módulo 3 — Meio Ambiente e Clima", aulas:[
          "A Questão Ambiental e o Desenvolvimento Sustentável",
          "Mudanças Climáticas (Partes 1 e 2)","A Questão da Amazônia",
        ]},
        { id:"at4", title:"Módulo 4 — Tecnologia (TIC)", aulas:[
          "TIC — Conceitos, Efeitos e Implicações Sociais (Partes 1 e 2)",
          "TIC — Questões Comentadas",
        ]},
        { id:"at5", title:"Módulo 5 — Teoria + Questões Gerais", aulas:["Teoria","Questões Comentadas"]},
        { id:"at6", title:"Módulo 6 — Retrospectivas Mensais", aulas:[
          "Retrospectiva Dez/2022 e Jan/2023 — Internacional (Partes 1 e 2)",
          "Retrospectiva Dez/2022 e Jan/2023 — Nacional (Partes 1, 2 e 3)",
          "Retrospectiva 2022 (Partes 1 e 2)","Janeiro de 2023 (3 versões disponíveis)",
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

  // ─── BLOCO 2 ──────────────────────────────────────────────────────
  { bloco:2, id:"constitucional", name:"Direito Constitucional", priority:"high", emoji:"⚖️",
    courses:[
      { name:"PM-BA-Direito_Constitucional-2023", type:"🎬 Vídeo", modules:[
        { id:"dc_intro", title:"Módulos 1–4 — Introdução ⚠️", aulas:[
          "⚠️ Ver módulos 1 a 4 no início do curso (Constituição, Poder Constituinte, etc.)",
        ]},
        { id:"dc5a", title:"Módulo 5 — Princípios Fundamentais (Arts. 1º–4º)", aulas:[
          "Princípios Fundamentais — Conceito",
          "Federação x Confederação e Tipos de Federalismo",
          "Princípio Republicano","Princípio Democrático",
          "Separação dos Poderes — Funções Típicas e Atípicas",
          "Fundamentos da República Federativa do Brasil",
          "Objetivos da RFB","Princípios nas Relações Internacionais",
        ]},
        { id:"dc5b", title:"Módulo 5 (Pak0l) — Art. 5º — Direitos Individuais", aulas:[
          "Noções Gerais e Direito à Vida",
          "Direito à Igualdade (Partes 1, 2 e 3)",
          "Princípio da Legalidade, Liberdade de Locomoção, Liberdade Profissional",
          "Liberdade de Manifestação do Pensamento (Partes 1 e 2)",
          "Liberdade Religiosa x Laicidade e Escusa de Consciência",
          "Liberdade de Reunião","Liberdade de Associação",
          "Direito à Propriedade — Função Social e Desapropriação",
          "Direito à Propriedade — Requisição Administrativa",
          "Bem de Família, Propriedade Imaterial, Herança",
          "Direito à Informação","Direito de Privacidade",
          "Inviolabilidade Domiciliar (Partes 1 e 2)",
          "Sigilos Pessoais de Correspondência","Dados Sensíveis (Partes 1 e 2)",
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
          "Prisão Civil, Erro Judiciário","Extradição — Natos x Naturalizados",
          "Noções Gerais sobre Remédios e Direito de Petição",
          "Habeas Corpus (Partes 1 e 2)","Habeas Data",
          "Mandado de Segurança (Partes 1, 2, 3 e 4)",
          "Mandado de Segurança Coletivo",
          "Mandado de Injunção (Partes 1 e 2)","Ação Popular",
        ]},
        { id:"dc6", title:"Módulo 6 — Administração Pública (Art. 37 — LIMPE)", aulas:[
          "Parte 1 — Disposições Gerais","Parte 2","Parte 3",
          "Disposições Gerais — Crimes contra a Honra",
        ]},
        { id:"dc_lei", title:"Módulo 4 — Lei 7.437/1985 (lei complementar)", aulas:["Lei 7.437/1985"]},
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
          "DUDH I — Declaração Universal dos Direitos Humanos","DUDH II",
          "Pactos de 1966 — Introdução",
          "PIDCP I — Pacto Internacional dos Direitos Civis e Políticos","PIDCP II",
          "PIDSEC — Pacto Internacional dos Direitos Econômicos, Sociais e Culturais",
        ]},
        { id:"dh2", title:"Módulo 2 — Sistema Interamericano", aulas:[
          "Convenção Americana de Direitos Humanos",
          "Pacto de San José da Costa Rica",
          "Comissão x Corte Interamericana",
          "Protocolo Facultativo à Convenção",
        ]},
        { id:"dh3", title:"Módulo 3 — Outros Instrumentos", aulas:["Declaração de Pequim"]},
      ]},
      { name:"Passo Estratégico de Direitos Humanos-2023", type:"📄 PDF", modules:[
        { id:"dh_pe", title:"PDFs Complementares — Seções 1 a 3", aulas:["Seção 1","Seção 2","Seção 3"]},
      ]},
    ]
  },

  // ─── BLOCO 3 ──────────────────────────────────────────────────────
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
          "Monômios — operações","Polinômios — operações",
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
          "Múltiplos de um número","Mínimo Múltiplo Comum (MMC)",
          "Máximo Divisor Comum (MDC)","Divisores de um número",
        ]},
        { id:"mat0508", title:"Módulos 05–08 — Proporção, Regra de 3, Porcentagem, Sistemas ⚠️", aulas:[
          "⚠️ Ver módulos 05, 06, 07 e 08 no player:",
          "Razões e proporções","Divisão proporcional",
          "Regra de três simples e composta","Porcentagem e juros","Sistemas lineares",
        ]},
        { id:"mat09", title:"Módulo 09 — Funções: Conceito e Tipos", aulas:[
          "Relações — Definição","Produto Cartesiano",
          "Funções — Definição","Funções — Valor Numérico",
          "Funções — Domínio, Contradomínio e Imagem",
          "Funções — Representação Gráfica","Funções — Zeros de uma Função",
          "Funções — Sobrejetoras, Injetoras e Bijetoras",
          "Função Inversa (Partes 1 e 2)","Função Par e Ímpar",
          "Função Crescente e Decrescente","Função Composta",
          "Exercícios de Fixação (Partes 1, 2 e 3)",
          "Questões — Diversas Bancas (Partes 1 e 2)",
        ]},
        { id:"mat10", title:"Módulo 10 — Função Afim (1º Grau)", aulas:[
          "Função 1º grau — Partes 01 a 11",
          "Resolução de Questões FCC — Partes 01 e 02",
        ]},
        { id:"mat11", title:"Módulo 11 — Função Quadrática (2º Grau)", aulas:[
          "Definição, Gráfico e Concavidade","Cálculo das Raízes e Número de Raízes",
          "Interseções com Eixos Coordenados",
          "Vértice da Função do 2º Grau (Partes 1 e 2)",
          "Esboço do Gráfico","Máximo e Mínimo na Função Quadrática",
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
          "Logaritmos — Introdução (Partes 1 e 2)","Definição (Partes 1 e 2)",
          "Propriedades de Logaritmos (Partes 1 e 2)","Mudança de Base",
          "Logaritmos Naturais","Função Logarítmica",
          "Equações Exponenciais e Logarítmicas (Partes 1 e 2)",
          "Inequações logarítmicas (Partes 1 e 2)",
        ]},
        { id:"mat15", title:"Módulo 15 — PA e PG", aulas:[
          "Progressões Aritméticas — teoria e exercícios (múltiplas partes)",
          "Progressões Geométricas — teoria e exercícios (múltiplas partes)",
          "Resumo Comparativo PA x PG",
        ]},
        { id:"mat16", title:"Módulo 16 — Geometria Plana", aulas:[
          "Áreas de figuras planas (Partes 1 e 2)","Teorema de Pitágoras",
          "Polígonos convexos — soma dos ângulos internos e externos",
        ]},
        { id:"mat19", title:"Módulo 19 — Matrizes e Determinantes", aulas:[
          "Representação de matrizes","Matrizes especiais (Partes 1 e 2)",
          "Adição, Subtração e Produto por escalar","Multiplicação de matrizes",
          "Matrizes inversas","Cálculo de determinantes de ordem 2 e 3",
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

  // ─── BLOCO 4 ──────────────────────────────────────────────────────
  { bloco:4, id:"penal", name:"Direito Penal", priority:"medium_high", emoji:"🔍",
    courses:[
      { name:"PM-BA-Direito_Penal-2023", type:"🎬 Vídeo", modules:[
        { id:"dp0", title:"Módulo 0 — Teoria do Crime", aulas:[
          "Conceito de Crime — Crime e contravenção penal",
          "Fato típico (múltiplas partes)",
          "Causas de exclusão do fato típico",
          "Fato típico doloso, culposo e preterdoloso","Iter criminis",
          "Crime consumado e tentado","Crime impossível",
          "Desistência voluntária e arrependimento eficaz (Partes 1 e 2)",
          "Arrependimento posterior","Ilicitude — Introdução",
          "Estado de necessidade (Partes 1 e 2)",
          "Legítima defesa (Partes 1, 2 e 3)",
          "Outras causas de exclusão da ilicitude",
        ]},
        { id:"dp1", title:"Módulo 1 — Culpabilidade e Erro", aulas:[
          "Culpabilidade","Causas de exclusão da culpabilidade",
          "Erro de tipo e erro de proibição (Partes 1 a 4)",
          "Erro acidental (Partes 1 e 2)",
          "Questões da FCC — Culpabilidade e Erro",
        ]},
        { id:"dp2", title:"Módulo 2 — Crimes contra a Vida e Liberdade", aulas:[
          "Lesões corporais (Partes 1 e 2)","Rixa",
          "Crimes contra a Liberdade Pessoal (Partes 1 a 4)","Perseguição",
          "Violência Psicológica contra a Mulher (Art. 147-B CP)",
          "Homicídio (Partes 1, 2 e 3)",
        ]},
        { id:"dp3", title:"Módulo 3 — Crimes Patrimoniais", aulas:[
          "Furto (Partes 1, 2 e 3)","Furto — Jurisprudência Relevante",
          "Roubo (Partes 1 e 2)","Extorsão (Partes 1 e 2)",
          "Apropriação indébita (Partes 1 e 2)","Receptação",
        ]},
        { id:"dp4", title:"Módulo 4 — Crimes Sexuais e contra Adm. Pública", aulas:[
          "Crimes contra a Liberdade Sexual (Partes 1 e 2)",
          "Corrupção Passiva","Corrupção Ativa",
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
          "Parte Especial — Introdução","Violência contra Superior",
          "Desrespeito a Superior","Usurpação de função",
          "Resistência (Cap. VII)","Fuga, Arrebatamento e Amotinamento (Cap. VIII)",
        ]},
        { id:"dpm2", title:"Módulo 2 — Crimes contra o Serviço e Dever Militar", aulas:[
          "Insubmissão","Deserção","Abandono de Posto","Exercício do Comércio (Cap. V)",
        ]},
        { id:"dpm3", title:"Módulo 3 — Crimes contra a Administração Militar", aulas:[
          "Desacato e Desobediência","Peculato Militar",
          "Concussão, Excesso de Exação e Desvio","Corrupção Militar",
          "Falsidade (Partes 1 e 2)","Crimes contra o Dever Funcional (Partes 1 e 2)",
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
          "Conceito de Direito Administrativo","Objeto e Função Administrativa",
          "Critérios para conceituar o DA","Fontes do Direito Administrativo",
          "Sistemas Administrativos","Transformação e Inspiração do DA",
          "Estado e Poderes do Estado","Governo e Administração Pública",
        ]},
        { id:"da2", title:"Módulo 2 — Poderes Administrativos", aulas:[
          "Deveres Administrativos",
          "Poderes — Introdução, Vinculado e Discricionário",
          "Poder Hierárquico","Poder Disciplinar","Poder Regulamentar/Normativo",
          "Poder de Polícia — Conceito e Competência",
          "Polícia Administrativa e Judiciária e Atributos do Poder de Polícia",
          "Meios de atuação e Ciclo do Poder de Polícia",
          "Sanções, Prescrição e Taxa do Poder de Polícia","Uso e Abuso do Poder",
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

  // ─── BLOCO 5 ──────────────────────────────────────────────────────
  { bloco:5, id:"portugues", name:"Língua Portuguesa", priority:"maintenance", emoji:"📝",
    courses:[
      { name:"PM-BA-Língua_Portuguesa-2023", type:"🎬 Vídeo", modules:[
        { id:"lp_gram", title:"Módulos 1–9 — Gramática ⚠️", aulas:[
          "⚠️ Ver módulos 1 a 9 no player:",
          "Classes de palavras","Termos da oração","Período composto",
          "Concordância nominal e verbal","Regência nominal e verbal",
          "Colocação pronominal","Pontuação","Conectivos e coesão",
        ]},
        { id:"lp10", title:"Módulo 10 — Crase", aulas:[
          "Crase — Casos Obrigatórios (+ Mapa Mental)",
          "Crase — Casos Proibidos",
          "Crase — Casos Facultativos e Especiais","Crase — Questões",
        ]},
        { id:"lp11", title:"Módulo 11 — Semântica", aulas:["Sinônimos e Antônimos"]},
        { id:"lp12", title:"Módulo 12 — Interpretação e Tipologia", aulas:[
          "Tipologias Textuais","Tipos de Discurso (Partes 1 e 2)",
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
          "Conceitos Básicos e Camadas TCP/IP","Camada de Transporte",
          "IP — Endereçamento","Domínios e URL","DHCP","DNS",
          "HTTP e HTTPS","SMTP, POP e IMAP","FTP e P2P","VoIP","Portas",
        ]},
        { id:"info02", title:"Módulo 02 — Intranet e Extranet", aulas:[
          "Partes 1 e 2","Questões FGV — Intranet e Extranet",
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
          "Conceitos Básicos","Calc — Principais Funcionalidades",
        ]},
        { id:"info07", title:"Módulo 07 — Microsoft Word / Writer", aulas:[
          "Microsoft Word — Conceitos e funcionalidades (múltiplas partes)",
          "Word — Macro","Questões CESPE e VUNESP — Word (Partes 1, 2 e 3)",
        ]},
        { id:"info08", title:"Módulo 08 — Recursos Gerais do Office", aulas:[
          "Salvar, Exportar e Imprimir","Conceitos Básicos do Office","Teclas de atalho",
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

  // ─── BLOCO 6 ──────────────────────────────────────────────────────
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

const BLOCO_NAMES = {
  1:"🗓️ Bloco 1 — História + Geografia + Atualidades",
  2:"🗓️ Bloco 2 — Direito Constitucional + Direitos Humanos",
  3:"🗓️ Bloco 3 — Matemática (prioridade máxima!)",
  4:"🗓️ Bloco 4 — Penal + Penal Militar + Administrativo",
  5:"🗓️ Bloco 5 — Português + Informática",
  6:"🗓️ Bloco 6 — Legislação Complementar",
};

// ─── CRONOGRAMA SEMANAL ────────────────────────────────────────────────────────
const WEEKLY_SCHEDULE = [
  {
    dayLabel:"Segunda",
    dayFull:"Segunda-feira",
    dayNum:1,
    subjects:[
      { id:"historia", emoji:"🏛️", label:"História", meta:"1h30" },
    ],
  },
  {
    dayLabel:"Terça",
    dayFull:"Terça-feira",
    dayNum:2,
    subjects:[
      { id:"matematica", emoji:"🔢", label:"Matemática", meta:"1h30" },
    ],
  },
  {
    dayLabel:"Quarta",
    dayFull:"Quarta-feira",
    dayNum:3,
    subjects:[
      { id:"constitucional", emoji:"⚖️", label:"Constitucional", meta:"1h30" },
      { id:"dh",             emoji:"🕊️", label:"Dir. Humanos",   meta:"1h30" },
      { id:"penal",          emoji:"🔍", label:"Dir. Penal",     meta:"1h30" },
      { id:"penal_militar",  emoji:"🎖️", label:"Penal Militar",  meta:"1h30" },
      { id:"administrativo", emoji:"🏢", label:"Dir. Adm.",      meta:"1h30" },
    ],
    note:"Ciclo de 6 semanas — uma matéria por vez",
  },
  {
    dayLabel:"Quinta",
    dayFull:"Quinta-feira",
    dayNum:4,
    subjects:[
      { id:"geografia",   emoji:"🗺️", label:"Geografia",   meta:"1h30" },
      { id:"atualidades", emoji:"🌐", label:"Atualidades", meta:"1h30" },
    ],
    note:"Alternando semanas: Geografia ↔ Atualidades",
  },
  {
    dayLabel:"Sexta",
    dayFull:"Sexta-feira",
    dayNum:5,
    subjects:[
      { id:"portugues",  emoji:"📝", label:"Português",  meta:"30min" },
      { id:"informatica",emoji:"💻", label:"Informática", meta:"30min" },
    ],
    note:"+ 30min Banco do Brasil/Cesgranrio (app BB)",
  },
  {
    dayLabel:"Sábado",
    dayFull:"Sábado",
    dayNum:6,
    subjects:[],
    note:"🎯 Simulado misto + revisão PMBA + BB/Cesgranrio",
  },
  {
    dayLabel:"Dom",
    dayFull:"Domingo",
    dayNum:0,
    subjects:[],
    note:"🧘 Descanso",
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmtTimer = (s) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
};
const fmtHours = (s) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  return `${h}h${String(m).padStart(2,"0")}`;
};

const Btn = ({ onClick, color, children, small }) => (
  <button
    onClick={onClick}
    style={{
      background: color, color: "#fff", border: "none",
      borderRadius: small ? 7 : 8,
      padding: small ? "5px 11px" : "8px 16px",
      cursor: "pointer", fontSize: small ? 10 : 12,
      fontWeight: 700, whiteSpace: "nowrap", letterSpacing: .3,
      transition: "opacity .15s",
    }}
    onMouseEnter={e => e.currentTarget.style.opacity = ".8"}
    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
  >
    {children}
  </button>
);

// ─── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
export default function StudyPlan() {
  // ── estado existente
  const [checked,      setChecked]      = useState({});
  const [loaded,       setLoaded]       = useState(false);
  const [openSubjects, setOpenSubjects] = useState({});
  const [openModules,  setOpenModules]  = useState({});

  // ── estado novo
  const [tab,             setTab]             = useState("cronometro");
  const [subjectTimers,   setSubjectTimers]   = useState({});   // { id: totalSeconds }
  const [activeTimerInfo, setActiveTimerInfo] = useState(null); // { id, startedAt }
  const [,                setTick]            = useState(0);    // força re-render a cada segundo
  const intervalRef = useRef(null);

  // ── carrega localStorage
  useEffect(() => {
    try { const r = localStorage.getItem("pmba-v2");     if (r) setChecked(JSON.parse(r));       } catch(e) {}
    try { const t = localStorage.getItem("pmba-timers"); if (t) setSubjectTimers(JSON.parse(t)); } catch(e) {}
    setLoaded(true);
  }, []);

  // ── intervalo do cronômetro (1 segundo)
  useEffect(() => {
    if (activeTimerInfo) {
      intervalRef.current = setInterval(() => setTick(t => t + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [activeTimerInfo]);

  // ── funções existentes
  const toggle = (key) => {
    const n = { ...checked, [key]: !checked[key] };
    setChecked(n);
    try { localStorage.setItem("pmba-v2", JSON.stringify(n)); } catch(e) {}
  };
  const toggleSubject = (id) => setOpenSubjects(s => ({ ...s, [id]: !(s[id] !== false) }));
  const toggleModule  = (id) => setOpenModules(m  => ({ ...m,  [id]: !(m[id]  !== false) }));

  // ── funções do cronômetro
  const saveTimers = (t) => { try { localStorage.setItem("pmba-timers", JSON.stringify(t)); } catch(e) {} };

  const getSeconds = (id) => {
    const base = subjectTimers[id] || 0;
    if (activeTimerInfo?.id === id) return base + Math.floor((Date.now() - activeTimerInfo.startedAt) / 1000);
    return base;
  };

  const getTotalSecs = () => {
    const base = Object.values(subjectTimers).reduce((a,b) => a + b, 0);
    if (activeTimerInfo) return base + Math.floor((Date.now() - activeTimerInfo.startedAt) / 1000);
    return base;
  };

  const iniciar = (id) => {
    // pausa o atual se houver
    if (activeTimerInfo && activeTimerInfo.id !== id) {
      const elapsed = Math.floor((Date.now() - activeTimerInfo.startedAt) / 1000);
      const nt = { ...subjectTimers, [activeTimerInfo.id]: (subjectTimers[activeTimerInfo.id] || 0) + elapsed };
      setSubjectTimers(nt); saveTimers(nt);
    }
    setActiveTimerInfo({ id, startedAt: Date.now() });
  };

  const pausar = () => {
    if (!activeTimerInfo) return;
    const elapsed = Math.floor((Date.now() - activeTimerInfo.startedAt) / 1000);
    const nt = { ...subjectTimers, [activeTimerInfo.id]: (subjectTimers[activeTimerInfo.id] || 0) + elapsed };
    setSubjectTimers(nt); saveTimers(nt);
    setActiveTimerInfo(null);
  };

  // Salva o tempo decorrido, persiste no armazenamento local e encerra a sessão da matéria ativa
  const salvarTempo = (id) => {
    let nt = { ...subjectTimers };
    if (activeTimerInfo && activeTimerInfo.id === id) {
      const elapsed = Math.floor((Date.now() - activeTimerInfo.startedAt) / 1000);
      nt[id] = (nt[id] || 0) + elapsed;
      setActiveTimerInfo(null);
    }
    setSubjectTimers(nt);
    saveTimers(nt);
  };

  const finalizar = () => pausar();

  const zerar = (id) => {
    if (activeTimerInfo?.id === id) setActiveTimerInfo(null);
    const nt = { ...subjectTimers }; delete nt[id];
    setSubjectTimers(nt); saveTimers(nt);
  };

  if (!loaded) return null;

  // ── estatísticas (existentes)
  let total = 0, done = 0;
  curriculum.forEach(s => s.courses.forEach(c => c.modules.forEach(m =>
    m.aulas.forEach(a => { if (!a.startsWith("⚠️")) { total++; if (checked[`${m.id}::${a}`]) done++; } })
  )));
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const subjectStats = {};
  curriculum.forEach(s => {
    let st = 0, sd = 0;
    s.courses.forEach(c => c.modules.forEach(m =>
      m.aulas.forEach(a => { if (!a.startsWith("⚠️")) { st++; if (checked[`${m.id}::${a}`]) sd++; } })
    ));
    subjectStats[s.id] = { t: st, d: sd };
  });

  const blocos = [1,2,3,4,5,6];
  const totalSecs  = getTotalSecs();
  const todayNum   = new Date().getDay();
  const todayData  = WEEKLY_SCHEDULE.find(d => d.dayNum === todayNum);
  const activeSubjectName = activeTimerInfo ? curriculum.find(s => s.id === activeTimerInfo.id)?.name : null;

  const css = `
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:#0a0a0f;font-family:'Segoe UI',system-ui,sans-serif;color:#e2e8f0;}
    ::-webkit-scrollbar{width:6px;}
    ::-webkit-scrollbar-track{background:#1a1a2e;}
    ::-webkit-scrollbar-thumb{background:#3b3b6b;border-radius:3px;}
    .pulse{animation:pulse 1.4s infinite;}
    @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.35;}}
    .glow-amber{box-shadow:0 0 0 2px #f59e0b66;}
  `;

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0a0a0f 0%,#0f0f1a 100%)", padding:"20px 16px", maxWidth:900, margin:"0 auto" }}>

        {/* ══ CABEÇALHO ══ */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{fontSize:28}}>📋</span>
            <div>
              <h1 style={{ fontSize:19, fontWeight:800, background:"linear-gradient(90deg,#f59e0b,#fbbf24)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1.1 }}>
                PLANO PMBA 2026
              </h1>
              <p style={{color:"#475569", fontSize:11}}>Cronômetro de Estudos</p>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:30, fontWeight:900, color:"#fbbf24", fontFamily:"'Courier New',monospace", lineHeight:1}}>
              {fmtHours(totalSecs)}
            </div>
            <div style={{fontSize:11, color:"#475569", marginTop:2}}>horas totais</div>
          </div>
        </div>

        {/* ══ HOJE ══ */}
        {todayData && (
          <div style={{ background:"#1e293b", borderRadius:12, padding:"11px 16px", marginBottom:14, border:"1px solid #334155", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
            <span style={{fontSize:12, color:"#94a3b8", fontWeight:700, whiteSpace:"nowrap"}}>
              📅 HOJE ({todayData.dayFull}):
            </span>
            {todayData.subjects.length === 0 ? (
              <span style={{color:"#64748b", fontSize:12}}>{todayData.note}</span>
            ) : (
              todayData.subjects.map(sub => {
                const isActive = activeTimerInfo?.id === sub.id;
                const secs = getSeconds(sub.id);
                return (
                  <span
                    key={sub.id}
                    onClick={() => isActive ? pausar() : iniciar(sub.id)}
                    style={{
                      display:"inline-flex", alignItems:"center", gap:5,
                      background: isActive ? "#f59e0b22" : "#1e3a5f",
                      border:`1px solid ${isActive ? "#f59e0b" : "#3b82f6"}`,
                      borderRadius:999, padding:"4px 12px", cursor:"pointer",
                      fontSize:12, fontWeight:600,
                      color: isActive ? "#fbbf24" : "#93c5fd",
                      transition:"all .2s",
                    }}
                  >
                    {sub.emoji} {sub.label}
                    {secs > 0 && <span style={{color:"#64748b", fontSize:10}}>· {fmtTimer(secs)}</span>}
                    {isActive  && <span className="pulse" style={{color:"#f59e0b", marginLeft:2}}>●</span>}
                    {!isActive && <span style={{color:"#475569", fontSize:10}}>· {sub.meta}</span>}
                  </span>
                );
              })
            )}
          </div>
        )}

        {/* ══ TABS ══ */}
        <div style={{ display:"flex", background:"#0f172a", borderRadius:12, padding:4, marginBottom:18, border:"1px solid #1e293b", gap:4 }}>
          {[
            { id:"cronometro", icon:"⏱", label:"CRONÔMETRO" },
            { id:"semana",     icon:"📅", label:"SEMANA"     },
            { id:"materias",   icon:"📋", label:"MATÉRIAS"   },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex:1, padding:"10px 6px",
                background: tab === t.id ? "linear-gradient(90deg,#1e3a5f,#1e3a8f)" : "transparent",
                border: tab === t.id ? "1px solid #3b82f6" : "1px solid transparent",
                borderRadius:9, cursor:"pointer",
                color: tab === t.id ? "#93c5fd" : "#475569",
                fontSize:11, fontWeight:700, letterSpacing:.6,
                transition:"all .2s",
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════
            TAB — CRONÔMETRO
        ══════════════════════════════════════════════════════════════ */}
        {tab === "cronometro" && (
          <div>
            {/* Cronômetro global */}
            <div style={{
              background:"#1e293b", borderRadius:14, padding:"20px 24px",
              marginBottom:20, border:"1px solid #334155",
              textAlign:"center",
              ...(activeTimerInfo ? {borderColor:"#f59e0b66", boxShadow:"0 0 24px #f59e0b22"} : {}),
            }}>
              <div style={{fontSize:11, color:"#64748b", fontWeight:700, letterSpacing:1.5, marginBottom:10}}>
                TEMPO TOTAL DE ESTUDO
              </div>
              <div style={{
                fontSize:54, fontWeight:900, letterSpacing:6,
                fontFamily:"'Courier New',monospace",
                color: activeTimerInfo ? "#fbbf24" : "#475569",
                transition:"color .3s",
                lineHeight:1,
              }}>
                {fmtTimer(totalSecs)}
              </div>
              <div style={{marginTop:10, fontSize:12, color:"#64748b", minHeight:18}}>
                {activeTimerInfo
                  ? <span>⏱ Em andamento — <span style={{color:"#fbbf24"}}>{activeSubjectName}</span></span>
                  : "Selecione uma matéria para iniciar"}
              </div>
            </div>

            {/* Cards de matéria */}
            {curriculum.map(s => {
              const pc       = PRIORITY[s.priority];
              const isActive = activeTimerInfo?.id === s.id;
              const secs     = getSeconds(s.id);
              const isPaused = secs > 0 && !isActive;

              return (
                <div
                  key={s.id}
                  style={{
                    background:  pc.bg,
                    border:      `1px solid ${isActive ? "#f59e0b" : pc.border}`,
                    borderRadius:12, marginBottom:10, padding:"14px 16px",
                    transition:  "border-color .3s, box-shadow .3s",
                    ...(isActive ? {boxShadow:"0 0 16px #f59e0b33"} : {}),
                  }}
                >
                  <div style={{display:"flex", alignItems:"center", gap:12, flexWrap:"wrap"}}>
                    {/* info */}
                    <span style={{fontSize:22}}>{s.emoji}</span>
                    <div style={{flex:1, minWidth:140}}>
                      <div style={{display:"flex", alignItems:"center", gap:7, flexWrap:"wrap", marginBottom:4}}>
                        <span style={{fontWeight:700, fontSize:14, color:"#f1f5f9"}}>{s.name}</span>
                        <span style={{background:pc.badge, color:"#fff", fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:999}}>
                          {pc.label}
                        </span>
                        {isActive && (
                          <span className="pulse" style={{color:"#f59e0b", fontSize:11, fontWeight:700}}>● AO VIVO</span>
                        )}
                      </div>
                      {/* timer display */}
                      <div style={{
                        fontFamily:"'Courier New',monospace",
                        fontSize:26, fontWeight:900, letterSpacing:3,
                        color: isActive ? "#fbbf24" : isPaused ? "#e2e8f0" : "#1e293b",
                        transition:"color .3s",
                      }}>
                        {fmtTimer(secs)}
                      </div>
                    </div>

                    {/* botões */}
                    <div style={{display:"flex", gap:8, flexWrap:"wrap", alignItems:"center"}}>
                      {!isActive && !isPaused && (
                        <Btn onClick={() => iniciar(s.id)} color="#16a34a">▶ Iniciar</Btn>
                      )}
                      {isActive && (
                        <>
                          <Btn onClick={pausar} color="#d97706">⏸ Pausar</Btn>
                          <Btn onClick={() => salvarTempo(s.id)} color="#2563eb">💾 Salvar</Btn>
                          <Btn onClick={finalizar} color="#dc2626">⏹ Finalizar</Btn>
                        </>
                      )}
                      {isPaused && (
                        <>
                          <Btn onClick={() => iniciar(s.id)} color="#16a34a">▶ Retomar</Btn>
                          <Btn onClick={() => salvarTempo(s.id)} color="#2563eb">💾 Salvar</Btn>
                          <Btn onClick={() => zerar(s.id)} color="#475569">🔄 Zerar</Btn>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB — SEMANA
        ══════════════════════════════════════════════════════════════ */}
        {tab === "semana" && (
          <div>
            {/* banner */}
            <div style={{background:"linear-gradient(90deg,#1e3a5f,#1e293b)", borderRadius:12, padding:"12px 18px", marginBottom:16, borderLeft:"4px solid #3b82f6"}}>
              <div style={{fontWeight:700, fontSize:14, color:"#93c5fd"}}>
                📅 Cronograma Semanal — 1h30 por dia
              </div>
              <div style={{fontSize:11, color:"#64748b", marginTop:3}}>
                Hoje é <span style={{color:"#e2e8f0"}}>{todayData?.dayFull}</span>
                {activeTimerInfo && (
                  <span style={{marginLeft:10, color:"#f59e0b"}}>
                    ⏱ {activeSubjectName} em andamento — {fmtTimer(getTotalSecs())}
                  </span>
                )}
              </div>
            </div>

            {WEEKLY_SCHEDULE.map(day => {
              const isToday = day.dayNum === todayNum;
              return (
                <div
                  key={day.dayNum}
                  style={{
                    background:   isToday ? "#0f2744" : "#1e293b",
                    border:       `1px solid ${isToday ? "#3b82f6" : "#334155"}`,
                    borderRadius: 12, marginBottom:10, overflow:"hidden",
                    ...(isToday ? {boxShadow:"0 0 16px #3b82f622"} : {}),
                  }}
                >
                  {/* cabeçalho do dia */}
                  <div style={{
                    display:"flex", alignItems:"center", gap:10,
                    padding:"12px 16px",
                    borderBottom: day.subjects.length > 0 ? "1px solid #1e3a5f" : "none",
                  }}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex", alignItems:"center", gap:8}}>
                        <span style={{fontWeight:700, fontSize:15, color:"#f1f5f9"}}>{day.dayFull}</span>
                        {isToday && (
                          <span style={{background:"#3b82f6", color:"#fff", fontSize:10, fontWeight:700, padding:"2px 9px", borderRadius:999}}>
                            HOJE
                          </span>
                        )}
                      </div>
                      {day.note && (
                        <div style={{fontSize:11, color:"#64748b", marginTop:2}}>{day.note}</div>
                      )}
                    </div>
                    {day.subjects.length > 0 && (
                      <div style={{fontSize:11, color:"#475569", fontWeight:600}}>
                        {day.subjects.reduce((acc, sub) => {
                          const min = sub.meta.includes("h") ? parseInt(sub.meta)*60 : parseInt(sub.meta);
                          return acc + min;
                        }, 0)}min total
                      </div>
                    )}
                  </div>

                  {/* matérias do dia */}
                  {day.subjects.length > 0 && (
                    <div style={{padding:"12px 16px", display:"flex", gap:10, flexWrap:"wrap"}}>
                      {day.subjects.map(sub => {
                        const isActive = activeTimerInfo?.id === sub.id;
                        const secs     = getSeconds(sub.id);
                        const isPaused = secs > 0 && !isActive;

                        return (
                          <div
                            key={sub.id}
                            style={{
                              flex:"1 1 160px", minWidth:140,
                              background: isActive ? "#f59e0b15" : "rgba(0,0,0,.3)",
                              border:`1px solid ${isActive ? "#f59e0b" : isPaused ? "#475569" : "#1e3a5f"}`,
                              borderRadius:10, padding:"12px 14px",
                              transition:"border-color .3s",
                            }}
                          >
                            <div style={{display:"flex", alignItems:"center", gap:6, marginBottom:4}}>
                              <span style={{fontSize:16}}>{sub.emoji}</span>
                              <span style={{fontWeight:700, fontSize:13, color:"#f1f5f9"}}>{sub.label}</span>
                              {isActive && <span className="pulse" style={{color:"#f59e0b", fontSize:10, marginLeft:"auto"}}>●</span>}
                            </div>
                            <div style={{fontSize:10, color:"#64748b", marginBottom:8}}>Meta: {sub.meta}</div>

                            {/* timer display */}
                            <div style={{
                              fontFamily:"'Courier New',monospace",
                              fontSize:18, fontWeight:900, letterSpacing:2,
                              color: isActive ? "#fbbf24" : isPaused ? "#94a3b8" : "#1e3a5f",
                              marginBottom:10,
                            }}>
                              {fmtTimer(secs)}
                            </div>

                            {/* botões */}
                            <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
                              {!isActive && !isPaused && (
                                <Btn small onClick={() => iniciar(sub.id)} color="#16a34a">▶ Iniciar</Btn>
                              )}
                              {isActive && (
                                <>
                                  <Btn small onClick={pausar} color="#d97706">⏸ Pausar</Btn>
                                  <Btn small onClick={() => salvarTempo(sub.id)} color="#2563eb">💾 Salvar</Btn>
                                  <Btn small onClick={finalizar} color="#dc2626">⏹ Finalizar</Btn>
                                </>
                              )}
                              {isPaused && (
                                <>
                                  <Btn small onClick={() => iniciar(sub.id)} color="#16a34a">▶ Retomar</Btn>
                                  <Btn small onClick={() => salvarTempo(sub.id)} color="#2563eb">💾 Salvar</Btn>
                                  <Btn small onClick={() => zerar(sub.id)} color="#475569">🔄 Zerar</Btn>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB — MATÉRIAS
        ══════════════════════════════════════════════════════════════ */}
        {tab === "materias" && (
          <div>
            {/* Barra de progresso global */}
            <div style={{ background:"#1e293b", borderRadius:12, padding:"16px 20px", marginBottom:24, border:"1px solid #334155" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <span style={{ fontWeight:700, color:"#f1f5f9", fontSize:14 }}>Progresso Geral</span>
                <span style={{ color:"#fbbf24", fontWeight:800, fontSize:18 }}>{pct}%</span>
              </div>
              <div style={{ background:"#0f172a", borderRadius:999, height:12, overflow:"hidden" }}>
                <div style={{ width:`${pct}%`, height:"100%", background:"linear-gradient(90deg,#f59e0b,#fbbf24)", borderRadius:999, transition:"width .4s ease" }} />
              </div>
              <div style={{ marginTop:8, fontSize:12, color:"#64748b", textAlign:"right" }}>
                {done} de {total} itens concluídos
              </div>
            </div>

            {/* Conteúdo por BLOCO */}
            {blocos.map(b => {
              const subjects = curriculum.filter(s => s.bloco === b);
              return (
                <div key={b} style={{ marginBottom:28 }}>
                  <div style={{ background:"linear-gradient(90deg,#1e3a5f,#1e293b)", borderRadius:10, padding:"10px 16px", marginBottom:12, borderLeft:"4px solid #3b82f6" }}>
                    <h2 style={{ fontSize:14, fontWeight:700, color:"#93c5fd" }}>{BLOCO_NAMES[b]}</h2>
                  </div>

                  {subjects.map(s => {
                    const pc   = PRIORITY[s.priority];
                    const ss   = subjectStats[s.id];
                    const sp   = ss.t > 0 ? Math.round((ss.d / ss.t) * 100) : 0;
                    const open = openSubjects[s.id] !== false;

                    return (
                      <div key={s.id} style={{ background:pc.bg, border:`1px solid ${pc.border}`, borderRadius:12, marginBottom:12, overflow:"hidden" }}>
                        <div onClick={() => toggleSubject(s.id)} style={{ padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:10, borderBottom: open ? `1px solid ${pc.border}` : "none" }}>
                          <span style={{fontSize:20}}>{s.emoji}</span>
                          <div style={{flex:1}}>
                            <div style={{display:"flex", alignItems:"center", gap:8, flexWrap:"wrap"}}>
                              <span style={{fontWeight:700, fontSize:15, color:"#f1f5f9"}}>{s.name}</span>
                              <span style={{background:pc.badge, color:"#fff", fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:999}}>{pc.label}</span>
                            </div>
                            <div style={{display:"flex", alignItems:"center", gap:8, marginTop:6}}>
                              <div style={{flex:1, background:"rgba(0,0,0,.3)", borderRadius:999, height:6, overflow:"hidden"}}>
                                <div style={{width:`${sp}%`, height:"100%", background:pc.badge, borderRadius:999, transition:"width .3s"}} />
                              </div>
                              <span style={{fontSize:11, color:pc.text, fontWeight:600, minWidth:32}}>{sp}%</span>
                            </div>
                          </div>
                          <span style={{color:pc.text, fontSize:18, transform:open?"rotate(90deg)":"rotate(0deg)", transition:"transform .2s"}}>›</span>
                        </div>

                        {open && (
                          <div style={{padding:"12px 16px"}}>
                            {s.courses.map((course, ci) => (
                              <div key={ci} style={{marginBottom:16}}>
                                <div style={{display:"flex", alignItems:"center", gap:6, marginBottom:8, padding:"6px 10px", background:"rgba(0,0,0,.25)", borderRadius:8, flexWrap:"wrap"}}>
                                  <span style={{fontSize:12, color:pc.text, fontWeight:700}}>{course.type}</span>
                                  <span style={{fontSize:11, color:"#94a3b8", flex:1}}>{course.name}</span>
                                </div>

                                {course.modules.map(mod => {
                                  const mopen = openModules[mod.id] !== false;
                                  const mAulasContaveis = mod.aulas.filter(a => !a.startsWith("⚠️"));
                                  const mdone = mAulasContaveis.filter(a => checked[`${mod.id}::${a}`]).length;
                                  return (
                                    <div key={mod.id} style={{marginBottom:8, background:"rgba(0,0,0,.2)", borderRadius:8, overflow:"hidden"}}>
                                      <div onClick={() => toggleModule(mod.id)} style={{padding:"8px 12px", cursor:"pointer", display:"flex", alignItems:"center", gap:8}}>
                                        <span style={{fontSize:11, transform:mopen?"rotate(90deg)":"rotate(0deg)", transition:"transform .2s", color:pc.text}}>›</span>
                                        <span style={{flex:1, fontSize:12, fontWeight:600, color:"#e2e8f0"}}>{mod.title}</span>
                                        <span style={{fontSize:10, color:pc.text, fontWeight:600}}>{mdone}/{mAulasContaveis.length}</span>
                                      </div>

                                      {mopen && (
                                        <div style={{padding:"4px 12px 10px 28px"}}>
                                          {mod.aulas.map((aula, ai) => {
                                            const key    = `${mod.id}::${aula}`;
                                            const isDone = !!checked[key];
                                            const isNote = aula.startsWith("⚠️");
                                            return (
                                              <div
                                                key={ai}
                                                onClick={() => !isNote && toggle(key)}
                                                style={{
                                                  display:"flex", alignItems:"flex-start", gap:8,
                                                  padding:"5px 4px", borderRadius:6,
                                                  cursor:isNote?"default":"pointer",
                                                  opacity:isDone?0.5:1,
                                                  textDecoration:isDone?"line-through":"none",
                                                  transition:"opacity .2s", marginBottom:2,
                                                  background:isDone?"rgba(0,0,0,.1)":"transparent",
                                                }}
                                              >
                                                {!isNote && (
                                                  <div style={{width:16, height:16, minWidth:16, borderRadius:4, marginTop:1, border:`2px solid ${isDone?pc.badge:"#475569"}`, background:isDone?pc.badge:"transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s"}}>
                                                    {isDone && <span style={{color:"#fff", fontSize:10, lineHeight:1}}>✓</span>}
                                                  </div>
                                                )}
                                                <span style={{fontSize:12, color:isNote?"#f97316":isDone?"#64748b":"#cbd5e1", lineHeight:1.4, fontStyle:isNote?"italic":"normal"}}>
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

            <div style={{textAlign:"center", marginTop:16, padding:16, color:"#475569", fontSize:11}}>
              ✅ Marque cada aula ao concluir — o progresso salva automaticamente<br />
              ⚠️ Itens em laranja são anotações, não entram na barra de progresso
            </div>
          </div>
        )}

      </div>
    </>
  );
}
