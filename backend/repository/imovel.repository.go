package repository

import (
	"apiGo/config"
	"apiGo/model"
	"fmt"
	"strings"
)

func InsertImovelRepository(im model.Imovel) (int, error) {
	db := config.Connect()
	defer db.Close()

	query := `
	INSERT INTO imoveis (
		tipo, rua, numero, bairro, cidade, estado, cep, pais,
		area, quartos, banheiros, suites, vagas, andar,
		valor, situacao, disponivel,descricao,imagem, id_pessoa
	) VALUES (
		$1,$2,$3,$4,$5,$6,$7,$8,
		$9,$10,$11,$12,$13,$14,
		$15,$16,$17,$18, $19,$20
	) RETURNING id;
	`

	var lastId int
	err := db.QueryRow(query,
		im.Tipo, im.Rua, im.Numero, im.Bairro, im.Cidade, im.Estado, im.Cep,
		im.Pais, im.Area, im.Quartos, im.Banheiros, im.Suites, im.Vagas, im.Andar,
		im.Valor, im.Situacao, im.Disponivel,im.Descricao,im.Imagem, im.IdPessoa,
	).Scan(&lastId)

	if err != nil {
		return 0, err
	}

	return lastId, nil
}

func FilterImovelRepository(filter model.Filtro) ([]model.Imovel, error) {
	db := config.Connect()
	defer db.Close()

	args := []interface{}{}
	query := `SELECT id, tipo, rua, numero, bairro, cidade, estado, cep, pais,
                     area, quartos, banheiros, suites, vagas, andar,
                     valor, situacao, disponivel, descricao, imagem, id_pessoa
              FROM imoveis WHERE 1=1`

	paramIndex := 1 // contador para $1, $2, ...

	if filter.Situacao != "" {
		query += fmt.Sprintf(" AND situacao = $%d", paramIndex)
		args = append(args, filter.Situacao)
		paramIndex++
	}
	if filter.Tipo != "" {
		query += fmt.Sprintf(" AND tipo = $%d", paramIndex)
		args = append(args, filter.Tipo)
		paramIndex++
	}
	if filter.Estado != "" {
		query += fmt.Sprintf(" AND estado = $%d", paramIndex)
		args = append(args, filter.Estado)
		paramIndex++
	}
	if filter.Cidade != "" {
		query += fmt.Sprintf(" AND cidade = $%d", paramIndex)
		args = append(args, filter.Cidade)
		paramIndex++
	}
	if filter.De > 0 && filter.Ate > 0 {
		query += fmt.Sprintf(" AND valor BETWEEN $%d AND $%d", paramIndex, paramIndex+1)
		args = append(args, filter.De, filter.Ate)
		paramIndex += 2
	}
	if filter.Quartos != 0 {
		query += fmt.Sprintf(" AND quartos = $%d", paramIndex)
		args = append(args, filter.Quartos)
		paramIndex++
	}
	if filter.Vagas != 0 {
		query += fmt.Sprintf(" AND vagas = $%d", paramIndex)
		args = append(args, filter.Vagas)
		paramIndex++
	}
	if filter.Banheiros != 0 {
		query += fmt.Sprintf(" AND banheiros = $%d", paramIndex)
		args = append(args, filter.Banheiros)
		paramIndex++
	}

	rows, err := db.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	imoveis := []model.Imovel{} // Inicializa slice vazio

	for rows.Next() {
		var imovel model.Imovel
		err := rows.Scan(
			&imovel.Id,
			&imovel.Tipo,
			&imovel.Rua,
			&imovel.Numero,
			&imovel.Bairro,
			&imovel.Cidade,
			&imovel.Estado,
			&imovel.Cep,
			&imovel.Pais,
			&imovel.Area,
			&imovel.Quartos,
			&imovel.Banheiros,
			&imovel.Suites,
			&imovel.Vagas,
			&imovel.Andar,
			&imovel.Valor,
			&imovel.Situacao,
			&imovel.Disponivel,
			&imovel.Descricao,
			&imovel.Imagem,
			&imovel.IdPessoa,
		)
		if err != nil {
			return nil, err
		}
		imoveis = append(imoveis, imovel)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return imoveis, nil
}



func DeleteImovelRepository(id int) (int, error) {
	db := config.Connect()
	defer db.Close()

	result, err := db.Exec("DELETE FROM imoveis WHERE id = $1", id)
	if err != nil {
		return 0, err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return 0, err
	}

	return int(rowsAffected), nil
}
func UpdateImovelRepository(imovel model.AtualizarImovel) (int, error) {
	db := config.Connect()
	defer db.Close()

	fields := []string{}
	args := []interface{}{}
	paramIndex := 1

	if imovel.Estado != "" {
		fields = append(fields, fmt.Sprintf("estado = $%d", paramIndex))
		args = append(args, imovel.Estado)
		paramIndex++
	}
	if imovel.Cidade != "" {
		fields = append(fields, fmt.Sprintf("cidade = $%d", paramIndex))
		args = append(args, imovel.Cidade)
		paramIndex++
	}
	if imovel.Bairro != "" {
		fields = append(fields, fmt.Sprintf("bairro = $%d", paramIndex))
		args = append(args, imovel.Bairro)
		paramIndex++
	}
	if imovel.Situacao != "" {
		fields = append(fields, fmt.Sprintf("situacao = $%d", paramIndex))
		args = append(args, imovel.Situacao)
		paramIndex++
	}
	if imovel.Tipo != "" {
		fields = append(fields, fmt.Sprintf("tipo = $%d", paramIndex))
		args = append(args, imovel.Tipo)
		paramIndex++
	}
	if imovel.Valor != 0 {
		fields = append(fields, fmt.Sprintf("valor = $%d", paramIndex))
		args = append(args, imovel.Valor)
		paramIndex++
	}
	if imovel.Quartos != 0 {
		fields = append(fields, fmt.Sprintf("quartos = $%d", paramIndex))
		args = append(args, imovel.Quartos)
		paramIndex++
	}
	if imovel.Banheiros != 0 {
		fields = append(fields, fmt.Sprintf("banheiros = $%d", paramIndex))
		args = append(args, imovel.Banheiros)
		paramIndex++
	}
	if imovel.Cozinha != 0 {
		fields = append(fields, fmt.Sprintf("cozinha = $%d", paramIndex))
		args = append(args, imovel.Cozinha)
		paramIndex++
	}
	if imovel.Area != 0 {
		fields = append(fields, fmt.Sprintf("area = $%d", paramIndex))
		args = append(args, imovel.Area)
		paramIndex++
	}
	if imovel.Descricao != "" {
		fields = append(fields, fmt.Sprintf("descricao = $%d", paramIndex))
		args = append(args, imovel.Descricao)
		paramIndex++
	}
	if len(imovel.Imagem) > 0 {
		fields = append(fields, fmt.Sprintf("imagem = $%d", paramIndex))
		args = append(args, imovel.Imagem)
		paramIndex++
	}

	if len(fields) == 0 {
		return 0, fmt.Errorf("nenhum campo para atualizar")
	}

	query := fmt.Sprintf("UPDATE imoveis SET %s WHERE id = $%d", strings.Join(fields, ", "), paramIndex)
	args = append(args, imovel.IdImovel)

	result, err := db.Exec(query, args...)
	if err != nil {
		return 0, err
	}

	rowsAffected, _ := result.RowsAffected()
	return int(rowsAffected), nil
}
