import Input from "./Input";
import Button from "./Button";

function FilterCard({ admin }) {
    if (admin === undefined) {
        admin = false
    }
    return(
        <>
        <div className="bg-white w-[100%]  rounded-lg p-4 shadow-md text-center">
            <h2 className="title text-3xl mb-4 ">Filtragem</h2>
            <form>
                <div className={`${admin ? "" : "hidden"} flex items-left space-y-4 space-x-4 flex-cols-2 md:flex-cols-1`}>
                    <Input type="number" label="Pesquisa por ID" wid="full" placeholder="Ex: 7344"/>
                </div>
                <hr className={`${admin ? "" : "hidden"} my-2 text-gray-300`}/>
                <div className={`${admin ? "hidden" : ""} flex items-left space-y-4 space-x-4 flex-cols-2 md:flex-cols-1`}>
                    <Input type="text" label="Tipo de Operação" wid="150" select="true" selectOptions={["Compra", "Aluguel"]} />
                    <Input type="text" label="Tipo de Imóvel" wid="150" select="true" selectOptions={["Casa", "Apartamento", "Terreno"]} />
                </div>
                <hr className={`${admin ? "hidden" : ""} my-2 text-gray-300`}/>
                <h3 className="text-2xl font-semibold text-left mb-2 mt-2">Endereço</h3>
                <div className="flex items-left space-y-4 space-x-4 flex-cols-2 md:flex-cols-1">
                    <Input type="text" label="Estado" wid="150" select="true" selectOptions={["SP", "RJ", "MG"]} />
                    <Input type="text" label="Cidade" wid="150" select="true" selectOptions={["São Paulo", "Rio de Janeiro", "Belo Horizonte"]} />
                    <Input type="text" label="Bairro" wid="150" select="true" selectOptions={["Centro", "Zona Sul", "Zona Norte"]} />
                </div>
                <hr className="my-2 text-gray-300"/>
                <h3 className="text-2xl font-semibold text-left mb-2 mt-2">Preço</h3>
                <div className="flex items-left space-y-4 space-x-4 flex-cols-2 md:flex-cols-1">
                    <Input type="number" label="Valor Mínimo" placeholder="R$ 1" wid="150" /> 
                    <Input type="number" label="Valor Máximo" placeholder="R$ 1,000,000" wid="150" />
                </div>
                <hr className={`my-2 text-gray-300 ${admin ? "hidden" : ""}`}/>
                <h3 className={`text-2xl font-semibold text-left mb-2 mt-2 ${admin ? "hidden" : ""}`}>Comôdo</h3>
                <div className={`flex items-left space-y-4 space-x-4 flex-cols-2 md:flex-cols-1 ${admin ? "hidden" : ""}`}>
                    <Input type="number" label="Quartos" wid="150" select="true" selectOptions={["1", "2", "3", "4", "5+"]} />
                    <Input type="number" label="Banheiros" wid="150" select="true" selectOptions={["1", "2", "3", "4", "5+"]} />
                    <Input type="number" label="Vagas" wid="150" select="true" selectOptions={["1", "2", "3", "4", "5+"]} />
                </div>
                <Button label="Aplicar Filtros" wid="full" className={"px-4 py-2"} />
            </form>
        </div>
        </>
    )
}

export default FilterCard