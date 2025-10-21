package main

import (
	"apiGo/config"
	"apiGo/controller"
	"log"
	"net/http"

	"github.com/rs/cors"
)



func main(){
	db := config.Connect()
	defer db.Close()

	http.HandleFunc("/", controller.Handler)

	http.HandleFunc("/criar/usuario", controller.Create)

	http.HandleFunc("/login/usuario", controller.Login)

	http.HandleFunc("/criar/imovel", controller.CreateImovel)

	http.HandleFunc("/filtrar/imoveis", controller.FilterImovel)	

	http.HandleFunc("/deletar/imovel", controller.DeleteImovel)

	http.HandleFunc("/atulizar/imovel", controller.UpdateImovel)
	
		c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"}, // seu frontend
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	handler := c.Handler(http.DefaultServeMux)
	log.Println("Servidor rodando na porta 8080...")
	log.Fatal(http.ListenAndServe(":8080", handler))


}

