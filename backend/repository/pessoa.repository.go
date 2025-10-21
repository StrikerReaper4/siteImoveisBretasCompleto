package repository

import (
	"apiGo/config"
	"apiGo/model"
)

func InsertRepository(p model.Pessoa) (int , error){

	result, err := config.Connect().Exec(
    "INSERT INTO pessoas (nome, email, senha, role) VALUES ($1, $2, $3, $4)",p.Nome, p.Email, p.Senha, p.Role,)


	
	if err != nil{
		return 0, err
	}
	lastId, _ := result.LastInsertId()

	return int(lastId), nil
	
}



func FindByEmail(email string) (model.Pessoa, error) {
	db := config.Connect()
	defer db.Close()

	var p model.Pessoa
	row := db.QueryRow("SELECT id, nome, email, senha, role FROM pessoas WHERE email = $1", email)

	err := row.Scan(&p.Id, &p.Nome, &p.Email, &p.Senha, &p.Role)
	if err != nil {
		return model.Pessoa{}, err
	}

	return p, nil
}