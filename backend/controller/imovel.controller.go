package controller

import (
	"apiGo/model"
	"apiGo/service"
	"encoding/json"
	"io"
	"net/http"
	"strconv"
)

func CreateImovel(w http.ResponseWriter, r *http.Request) {

	
    // Limite de 10MB para upload
    err := r.ParseMultipartForm(10 << 20)
    if err != nil {
        http.Error(w, "Erro ao processar formulário: "+err.Error(), http.StatusBadRequest)
        return
    }

	

    // Pegando o arquivo de imagem
    file, _, err := r.FormFile("imagem")
    if err != nil {
        http.Error(w, "Erro ao ler imagem: "+err.Error(), http.StatusBadRequest)
        return
    }
    defer file.Close()

    // Convertendo imagem em bytes
    imagemBytes, err := io.ReadAll(file)
    if err != nil {
        http.Error(w, "Erro ao ler bytes da imagem: "+err.Error(), http.StatusInternalServerError)
        return
    }

    // Criando struct do imóvel com os dados do formulário
    imovel := model.Imovel{
        Tipo:       r.FormValue("tipo"),
        Rua:        r.FormValue("rua"),
        Numero:     r.FormValue("numero"),
        Bairro:     r.FormValue("bairro"),
        Cidade:     r.FormValue("cidade"),
        Estado:     r.FormValue("estado"),
        Cep:        r.FormValue("cep"),
        Pais:       r.FormValue("pais"),
        Area:       parseInt(r.FormValue("area")),
        Quartos:    parseInt(r.FormValue("quartos")),
        Banheiros:  parseInt(r.FormValue("banheiros")),
        Suites:     parseInt(r.FormValue("suites")),
        Vagas:      parseInt(r.FormValue("vagas")),
        Andar:      parseInt(r.FormValue("andar")),
        Valor:      parseInt(r.FormValue("valor")),
        Situacao:   r.FormValue("situacao"),
        Disponivel: true,
        Descricao:  r.FormValue("descricao"),
        Imagem:     imagemBytes,
        IdPessoa:   parseInt(r.FormValue("id_pessoa")),
    }

    // Chamando service para inserir no banco
    imovel, err = service.CreateImovelService(imovel)
    if err != nil {
        http.Error(w, "Erro ao salvar imóvel: "+err.Error(), http.StatusInternalServerError)
        return
    }

	imovelID := imovel.Id 

    // Retornando ID do imóvel cadastrado
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]int{"id": imovelID})
}

// Função auxiliar para converter string para int
func parseInt(s string) int {
    v, _ := strconv.Atoi(s)
    return v
}

func FilterImovel(w http.ResponseWriter, r *http.Request){
	var filter model.Filtro

	decoder := json.NewDecoder(r.Body)

	err := decoder.Decode(&filter)

	if err != nil{
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	imoveis, err := service.FilterImovelService(filter)

	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	err = json.NewEncoder(w).Encode(imoveis)

	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}

func DeleteImovel(w http.ResponseWriter, r *http.Request){

	var id model.DeletarImovel

	decoder := json.NewDecoder(r.Body)

	err := decoder.Decode(&id)

	if err != nil{
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	rowsAffected, err :=service.DeleteImovelService(id)

	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	err = json.NewEncoder(w).Encode(rowsAffected)

	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

}

func UpdateImovel(w http.ResponseWriter, r *http.Request){

	var imovel model.AtualizarImovel

	decoder := json.NewDecoder(r.Body)

	err := decoder.Decode(&imovel)

	if err != nil{
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	rowsAffected, err := service.UpdateImovelService(imovel)

	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	err = json.NewEncoder(w).Encode(rowsAffected)

	if err != nil{
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

}