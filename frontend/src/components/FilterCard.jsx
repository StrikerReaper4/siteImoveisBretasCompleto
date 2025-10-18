import Input from "./Input";
import Button from "./Button";

function FilterCard({ admin }) {
  if (admin === undefined) {
    admin = false;
  }

  return (
    <>
      <div className="bg-white w-full rounded-lg p-4 shadow-md text-center">
        <h2 className="title text-3xl mb-4">Filtragem</h2>
        <form>
          {/* Campo de pesquisa por ID (modo admin) */}
          <div className={`${admin ? "" : "hidden"} flex flex-wrap gap-4`}>
            <Input
              type="number"
              label="Pesquisa por ID"
              wid="full"
              placeholder="Ex: 7344"
            />
          </div>
          <hr className={`${admin ? "" : "hidden"} my-2 text-gray-300`} />

          {/* Tipo de operação e imóvel */}
          <div className={`${admin ? "hidden" : ""} flex flex-wrap gap-4`}>
            <Input
              type="text"
              label="Tipo de Operação"
              wid="150"
              select="true"
              selectOptions={["Compra", "Aluguel"]}
            />
            <Input
              type="text"
              label="Tipo de Imóvel"
              wid="150"
              select="true"
              selectOptions={["Casa", "Apartamento", "Terreno"]}
            />
          </div>
          <hr className={`${admin ? "hidden" : ""} my-2 text-gray-300`} />

          {/* Localização - agora com País */}
          <h3 className="text-2xl font-semibold text-left mb-2 mt-2">
            Localização
          </h3>
          <div className="flex flex-wrap gap-4">
            <Input
              type="text"
              label="País"
              wid="full md:150"
              select="true"
              selectOptions={["Brasil", "Estados Unidos", "Portugal"]}
            />
            <Input
              type="text"
              label="Estado"
              wid="full md:150"
              select="true"
              selectOptions={["SP", "RJ", "MG"]}
            />
            <Input
              type="text"
              label="Cidade"
              wid="full md:150"
              select="true"
              selectOptions={["São Paulo", "Rio de Janeiro", "Belo Horizonte"]}
            />
            <Input
              type="text"
              label="Bairro"
              wid="full md:150"
              select="true"
              selectOptions={["Centro", "Zona Sul", "Zona Norte"]}
            />
          </div>

          <hr className="my-2 text-gray-300" />

          {/* Preço */}
          <h3 className="text-2xl font-semibold text-left mb-2 mt-2">Preço</h3>
          <div className="flex flex-wrap gap-4">
            <Input
              type="number"
              label="Valor Mínimo"
              placeholder="R$ 1"
              wid="full md:150"
            />
            <Input
              type="number"
              label="Valor Máximo"
              placeholder="R$ 1,000,000"
              wid="full md:150"
            />
          </div>

          <hr className={`my-2 text-gray-300 ${admin ? "hidden" : ""}`} />

          {/* Cômodo */}
          <h3
            className={`text-2xl font-semibold text-left mb-2 mt-2 ${
              admin ? "hidden" : ""
            }`}
          >
            Cômodo
          </h3>
          <div className={`flex flex-wrap gap-4 ${admin ? "hidden" : ""}`}>
            <Input
              type="number"
              label="Quartos"
              wid="full md:150"
              select="true"
              selectOptions={["1", "2", "3", "4", "5+"]}
            />
            <Input
              type="number"
              label="Banheiros"
              wid="full md:150"
              select="true"
              selectOptions={["1", "2", "3", "4", "5+"]}
            />
            <Input
              type="number"
              label="Vagas"
              wid="full md:150"
              select="true"
              selectOptions={["1", "2", "3", "4", "5+"]}
            />
          </div>

          <Button
            label="Aplicar Filtros"
            wid="full"
            className="px-4 py-2 mt-4"
          />
        </form>
      </div>
    </>
  );
}

export default FilterCard;
