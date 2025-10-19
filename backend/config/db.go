package config

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

func Connect() *sql.DB{
	connect_string := "user=postgres password=admin123 dbname=imovelgobanco host=localhost sslmode=disable"

	db, err := sql.Open("postgres", connect_string)

	if err != nil{
		log.Fatal("Erro ao abrir conexão")
	}

	err = db.Ping()

	if err != nil{
		log.Fatal("Erro ao conectar com banco", err)
	}
	return db
}