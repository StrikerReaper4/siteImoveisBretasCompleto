-- ============================================
-- Tabela: pessoas
-- ============================================
CREATE TABLE pessoas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100),
    role VARCHAR(15)
);

-- ============================================
-- Tabela: imoveis
-- ============================================
CREATE TABLE imoveis (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    rua VARCHAR(100),
    numero VARCHAR(20),
    bairro VARCHAR(50),
    cidade VARCHAR(50),
    estado VARCHAR(50),
    cep VARCHAR(20),
    pais VARCHAR(50),
    area INTEGER,
    quartos INTEGER,
    banheiros INTEGER,
    suites INTEGER,
    vagas INTEGER,
    andar INTEGER,
    valor INTEGER,
    situacao VARCHAR(50),
    disponivel BOOLEAN DEFAULT TRUE,
    id_pessoa INTEGER REFERENCES pessoas(id)
);
