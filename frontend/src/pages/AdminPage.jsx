import Header from "../components/Header";
import { FaPlus } from "react-icons/fa";
import FilterCard from "../components/FilterCard";
import CardProperty from "../components/CardProperty";
import { useState, useCallback, useEffect } from "react";
import { getImoveis } from "../services/imovelService";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";

function AdminPage() {
  const [properties, setProperties] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [propertyId, setPropertyId] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

    useEffect(() => {
    const fetchProperties = async () => {
    try {
      const data = await getImoveis();
      setProperties(data); 
    } catch (err) {
      console.error("Erro ao pegar imóveis:", err);
    }
    }
    fetchProperties()
  }, []);
  const deletePropertyFunction = () => {
    alert(`Imóvel de ID ${propertyId} foi deletado.`);
    closeModal();
  };
  const editPropertyFunction = () => {
    alert(`Imóvel de ID ${propertyId} foi editado.`);
    console.log(selectedProperty);
    closeModal();
  };
  const addPropertyFunction = (property) => {
    alert("Novo imóvel adicionado.");
    console.log(property);
    closeModal();
  };

  const openModal = useCallback((type, id) => {
    setSelectedProperty(properties.find((property) => property.id === id));
    console.log(selectedProperty);
    setModalType(type);
    setPropertyId(id);
  }, []);
  const closeModal = useCallback(() => {
    setModalType(null);
    setPropertyId(null);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Header admin={true} />
      {modalType === "edit" && (
        <Modal
          propertyId={propertyId}
          title="Editar Imóvel"
          data={
            <EditProperty
              functions={{
                edit: editPropertyFunction,
                change: setSelectedProperty,
              }}
              property={selectedProperty}
            />
          }
          onClose={closeModal}
        />
      )}
      {modalType === "delete" && (
        <Modal
          propertyId={propertyId}
          title="Tem certeza em deletar o imóvel?"
          data={
            <DeleteProperty
              functions={{ close: closeModal, delete: deletePropertyFunction }}
              propertyId={propertyId}
            />
          }
          onClose={closeModal}
        />
      )}
      {modalType === "add" && (
        <Modal
          title="Adicionar Imóvel"
          data={<AddProperty functions={{ add: addPropertyFunction }} />}
          onClose={closeModal}
        />
      )}
      <div className="bg-[#F3F3F3] grid grid-cols-[400px_2fr] max-[710px]:grid-cols-1 p-4 pb-28">
        <div className="sticky top-4 self-start max-[710px]:static max-[710px]:mb-8">
          <FilterCard admin={true} />
        </div>

        <div className="space-y-1 items-center justify-center text-center">
          <h2 className="text-3xl mb-4 title">Destaques</h2>
          <div className="flex flex-wrap gap-8 justify-center items-center">
            {properties.map((property, index) => (
              <CardProperty
                key={index}
                property={property}
                admin={true}
                handleOpen={openModal}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="fixed bottom-3 right-3 cursor-pointer bg-[#0f3e58] rounded-full w-16 h-16 flex items-center justify-center hover:bg-[#14506e] transition"
        onClick={() => openModal("add", null)}
      >
        <FaPlus size={40} className="text-white" />
      </div>
    </>
  );
}

function EditProperty({ functions, property }) {
  return (
    <div>
      <div className="flex items-left space-y-4 space-x-4 -mb-2 flex-cols-2 md:flex-cols-1">
        <Input
          type="text"
          label="País"
          wid="150"
          select="true"
          selectOptions={["Brasil", "Estados Unidos", "Portugal"]}
          value={property.state}
          setValue={(newValue) =>
            functions.change({ ...property, state: newValue })
          }
        />
        <Input
          type="text"
          label="Estado"
          wid="150"
          select="true"
          selectOptions={["SP", "RJ", "MG"]}
          value={property.state}
          setValue={(newValue) =>
            functions.change({ ...property, state: newValue })
          }
        />
        <Input
          type="text"
          label="Cidade"
          wid="150"
          select="true"
          selectOptions={["São Paulo", "Rio de Janeiro", "Belo Horizonte"]}
          value={property.city}
          setValue={(newValue) =>
            functions.change({ ...property, city: newValue })
          }
        />
        <Input
          type="text"
          label="Bairro"
          wid="150"
          placeholder={"Ex: Centro"}
          value={property.neighborhood}
          setValue={(newValue) =>
            functions.change({ ...property, neighborhood: newValue })
          }
        />
      </div>
      <Input
        type="text"
        label="Endereço"
        wid="full"
        placeholder={"Ex: Rua das Palmeiras, 321"}
        value={property.address}
        setValue={(newValue) =>
          functions.change({ ...property, address: newValue })
        }
      />
      <div
        className={`flex items-left space-y-4 space-x-4 -mb-2 flex-cols-2 md:flex-cols-1 mt-2`}
      >
        <Input
          type="text"
          label="Tipo de Operação"
          wid="150"
          select="true"
          selectOptions={["Compra", "Aluguel"]}
          value={property.operation}
          setValue={(newValue) =>
            functions.change({ ...property, operation: newValue })
          }
        />
        <Input
          type="text"
          label="Tipo de Imóvel"
          wid="150"
          select="true"
          selectOptions={["Casa", "Apartamento", "Terreno"]}
          value={property.type}
          setValue={(newValue) =>
            functions.change({ ...property, type: newValue })
          }
        />
        <Input
          type="number"
          label="Preço"
          wid="150"
          placeholder="Ex: 400.000"
          value={property.price}
          setValue={(newValue) =>
            functions.change({ ...property, price: newValue })
          }
        />
      </div>
      <div
        className={`flex items-left space-y-4 space-x-4 -mb-2 flex-cols-2 md:flex-cols-1 mt-2`}
      >
        <Input
          type="number"
          label="Quartos"
          wid="150"
          select="true"
          selectOptions={["1", "2", "3", "4", "5+"]}
          value={property.items.quartos}
          setValue={(newValue) =>
            functions.change({
              ...property,
              items: { ...property.items, quartos: newValue },
            })
          }
        />
        <Input
          type="number"
          label="Banheiros"
          wid="150"
          select="true"
          selectOptions={["1", "2", "3", "4", "5+"]}
          value={property.items.banheiros}
          setValue={(newValue) =>
            functions.change({
              ...property,
              items: { ...property.items, banheiros: newValue },
            })
          }
        />
        <Input
          type="number"
          label="Vagas"
          wid="150"
          select="true"
          selectOptions={["1", "2", "3", "4", "5+"]}
          value={property.items.vagas}
          setValue={(newValue) =>
            functions.change({
              ...property,
              items: { ...property.items, vagas: newValue },
            })
          }
        />
        <Input
          type="number"
          label="Área (m²)"
          wid="150"
          placeholder="Ex: 120"
          value={property.area}
          setValue={(newValue) =>
            functions.change({ ...property, area: newValue })
          }
        />
      </div>
      <Input
        type="text"
        label="Descrição"
        wid="full"
        placeholder="Ex: Uma casa espaçosa e confortável, ideal para famílias grandes."
        textarea="true"
        rows={3}
        value={property.description}
        setValue={(newValue) =>
          functions.change({ ...property, description: newValue })
        }
      />
      <Input
        type="file"
        label="Imagens (URLs)"
        wid="full"
        multiple
        className={
          "file:bg-[#0f3e58] file:text-white file:p-1 file:rounded-md file:hover:bg-[#0d3246] cursor-pointer file:cursor-pointer"
        }
      />
      <div className="flex items-center justify-center mt-4">
        <Button label="Salvar" wid="full" onClick={functions.edit} />
      </div>
    </div>
  );
}

function DeleteProperty({ functions, propertyId }) {
  return (
    <div>
      <p className="text-left antialiased text-[#0f3e58] text-md mt-2">
        Esta ação é irreversível. Ao confirmar, todos os dados do imóvel de ID{" "}
        {propertyId} serão perdidos.
      </p>
      <div className="flex items-center justify-center mt-4 gap-4">
        <Button
          label="Cancelar"
          onClick={functions.close}
          wid="1/2"
          className={"bg-gray-500 hover:bg-gray-600"}
        />
        <Button
          label="Deletar"
          onClick={functions.delete}
          wid="1/2"
          className={"bg-red-600 hover:bg-red-700"}
        />
      </div>
    </div>
  );
}

function AddProperty({ functions }) {
  const [property, setProperty] = useState({
    state: "",
    city: "",
    neighborhood: "",
    address: "",
    operation: "",
    type: "",
    price: 0,
    items: {
      quartos: 0,
      banheiros: 0,
      vagas: 0,
    },
    area: 0,
    description: "",
    img: [],
  });

  return (
    <div>
      <div className="flex items-left space-y-4 space-x-4 -mb-2 flex-cols-2 md:flex-cols-1">
        <Input
          type="text"
          label="Estado"
          wid="150"
          select="true"
          selectOptions={["SP", "RJ", "MG"]}
          value={property.state}
          setValue={(newValue) => setProperty({ ...property, state: newValue })}
        />
        <Input
          type="text"
          label="Cidade"
          wid="150"
          select="true"
          selectOptions={["São Paulo", "Rio de Janeiro", "Belo Horizonte"]}
          value={property.city}
          setValue={(newValue) => setProperty({ ...property, city: newValue })}
        />
        <Input
          type="text"
          label="Bairro"
          wid="150"
          placeholder={"Ex: Centro"}
          value={property.neighborhood}
          setValue={(newValue) =>
            setProperty({ ...property, neighborhood: newValue })
          }
        />
      </div>
      <Input
        type="text"
        label="Endereço"
        wid="full"
        placeholder={"Ex: Rua das Palmeiras, 321"}
        value={property.address}
        setValue={(newValue) => setProperty({ ...property, address: newValue })}
      />
      <div
        className={`flex items-left space-y-4 space-x-4 -mb-2 flex-cols-2 md:flex-cols-1 mt-2`}
      >
        <Input
          type="text"
          label="Tipo de Operação"
          wid="150"
          select="true"
          selectOptions={["Compra", "Aluguel"]}
          value={property.operation}
          setValue={(newValue) =>
            setProperty({ ...property, operation: newValue })
          }
        />
        <Input
          type="text"
          label="Tipo de Imóvel"
          wid="150"
          select="true"
          selectOptions={["Casa", "Apartamento", "Terreno"]}
          value={property.type}
          setValue={(newValue) => setProperty({ ...property, type: newValue })}
        />
        <Input
          type="number"
          label="Preço"
          wid="150"
          placeholder="Ex: 400.000"
          value={property.price}
          setValue={(newValue) => setProperty({ ...property, price: newValue })}
        />
      </div>
      <div
        className={`flex items-left space-y-4 space-x-4 -mb-2 flex-cols-2 md:flex-cols-1 mt-2`}
      >
        <Input
          type="number"
          label="Quartos"
          wid="150"
          select="true"
          selectOptions={["1", "2", "3", "4", "5+"]}
          value={property.items.quartos}
          setValue={(newValue) =>
            setProperty({
              ...property,
              items: { ...property.items, quartos: newValue },
            })
          }
        />
        <Input
          type="number"
          label="Banheiros"
          wid="150"
          select="true"
          selectOptions={["1", "2", "3", "4", "5+"]}
          value={property.items.banheiros}
          setValue={(newValue) =>
            setProperty({
              ...property,
              items: { ...property.items, banheiros: newValue },
            })
          }
        />
        <Input
          type="number"
          label="Vagas"
          wid="150"
          select="true"
          selectOptions={["1", "2", "3", "4", "5+"]}
          value={property.items.vagas}
          setValue={(newValue) =>
            setProperty({
              ...property,
              items: { ...property.items, vagas: newValue },
            })
          }
        />
        <Input
          type="number"
          label="Área (m²)"
          wid="150"
          placeholder="Ex: 120"
          value={property.area}
          setValue={(newValue) => setProperty({ ...property, area: newValue })}
        />
      </div>
      <Input
        type="text"
        label="Descrição"
        wid="full"
        placeholder="Ex: Uma casa espaçosa e confortável, ideal para famílias grandes."
        textarea="true"
        rows={3}
        value={property.description}
        setValue={(newValue) =>
          setProperty({ ...property, description: newValue })
        }
      />
      <Input
        type="file"
        label="Imagens (URLs)"
        wid="full"
        multiple
        className={
          "file:bg-[#0f3e58] file:text-white file:p-1 file:rounded-md file:hover:bg-[#0d3246] cursor-pointer file:cursor-pointer"
        }
        value={property.img}
        setValue={(newValue) => setProperty({ ...property, img: newValue })}
      />
      <div className="flex items-center justify-center mt-4">
        <Button
          label="Salvar"
          wid="full"
          onClick={() => functions.add(property)}
        />
      </div>
    </div>
  );
}

export default AdminPage;
