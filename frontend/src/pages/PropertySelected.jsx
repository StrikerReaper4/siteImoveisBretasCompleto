import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";
import { FaAngleLeft, FaAngleRight, FaBath, FaCarAlt } from "react-icons/fa";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { IoIosBed } from "react-icons/io";

function PropertySelected() {
  const [imageSelected, setImageSelected] = useState(0);
  const icons = [
    <IoIosBed size={55} className="inline-block ml-2" />,
    <FaBath size={55} className="inline-block ml-2" />,
    <FaCarAlt size={55} className="inline-block ml-2" />,
  ];
  const properties = [
    {
      id: 1,
      type: "Casa",
      operation: "Aluguel",
      img: [
        "/placeholder_house.jpg",
        "/placeholder_house_2.jpg",
        "/placeholder_house_3.png",
      ],
      address: "Rua das Flores, 123",
      bairro: "Jardim Exemplos",
      cidade: "CAMPO GRANDE",
      estado: "MS",
      area: 2000,
      items: {
        quartos: 2,
        banheiros: 1,
        vagas: 1,
      },
      price: "R$ 500.000",
      description:
        "Uma casa espaçosa e confortável, ideal para famílias grandes.",
    },
    {
      id: 2,
      type: "Apartamento",
      operation: "Compra",
      img: [
        "/placeholder_house.jpg",
        "/placeholder_house_2.jpg",
        "/placeholder_house_3.png",
      ],
      address: "Avenida Central, 456",
      bairro: "Jardim Exemplos",
      cidade: "CAMPO GRANDE",
      estado: "MS",
      area: 120,
      items: {
        quartos: 3,
        banheiros: 2,
        vagas: 2,
      },
      price: "R$ 750.000",
      description:
        "Um apartamento moderno e aconchegante, perfeito para famílias pequenas.",
    },
    {
      id: 3,
      type: "Terreno",
      operation: "Compra",
      img: [
        "/placeholder_house.jpg",
        "/placeholder_house_2.jpg",
        "/placeholder_house_3.png",
      ],
      address: "Facom",
      bairro: "Jardim Exemplos",
      cidade: "CAMPO GRANDE",
      estado: "MS",
      area: 1000,
      items: {
        quartos: 0,
        banheiros: 0,
        vagas: 0,
      },
      price: "R$ 300.000",
      description:
        "Um terreno espaçoso ideal para construir a casa dos seus sonhos.",
    },
    {
      id: 4,
      type: "Casa",
      operation: "Aluguel",
      img: [
        "/placeholder_house.jpg",
        "/placeholder_house_2.jpg",
        "/placeholder_house_3.png",
      ],
      address: "Rua das Palmeiras, 321",
      bairro: "Jardim Exemplos",
      cidade: "CAMPO GRANDE",
      estado: "MS",
      area: 2500,
      items: {
        quartos: 4,
        banheiros: 3,
        vagas: 2,
      },
      price: "R$ 1.200.000",
      description:
        "Uma casa espaçosa e confortável, ideal para famílias grandes.",
    },
    {
      id: 5,
      type: "Apartamento",
      operation: "Compra",
      img: [
        "/placeholder_house.jpg",
        "/placeholder_house_2.jpg",
        "/placeholder_house_3.png",
      ],
      address: "Avenida dos Lírios, 654",
      bairro: "Jardim Exemplos",
      cidade: "CAMPO GRANDE",
      estado: "MS",
      area: 100,
      items: {
        quartos: 2,
        banheiros: 1,
        vagas: 1,
      },
      price: "R$ 600.000",
      description:
        "Um apartamento moderno e aconchegante, perfeito para famílias pequenas.",
    },
    {
      id: 6,
      type: "Terreno",
      operation: "Compra",
      img: [
        "/placeholder_house.jpg",
        "/placeholder_house_2.jpg",
        "/placeholder_house_3.png",
      ],
      address: "Rua do Campo, 987",
      bairro: "Jardim Exemplos",
      cidade: "CAMPO GRANDE",
      estado: "MS",
      area: 1200,
      items: {
        quartos: 0,
        banheiros: 0,
        vagas: 0,
      },
      price: "R$ 400.000",
      description:
        "Um terreno espaçoso ideal para construir a casa dos seus sonhos.",
    },
  ];
  const location = useLocation();
  const propertyId = location.pathname.split("/property/")[1];
  const property = properties.find((prop) => prop.id === parseInt(propertyId));
  useEffect(() => {
    const intervalo = setInterval(() => {
      setImageSelected(
        imageSelected === property.img.length - 1 ? 0 : imageSelected + 1
      );
    }, 5000);
    return () => clearInterval(intervalo);
  });

  const redirectToWhatsapp = () => {
    const phoneNumber = "556784121913";
    const message = `Olá, gostaria de saber mais sobre o imóvel 
    do endereço ${property.address} e do ID ${property.id}`;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener noreferrer"
    );
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Header />
      <div className="bg-[#F3F3F3] w-full min-h-96 p-4 pb-28 flex flex-col items-center justify-center text-center">
        <div className="bg-white w-full max-w-[1300px] rounded-2xl p-6 sm:p-8 shadow-md grid grid-cols-1 lg:grid-cols-2 gap-2">
          {/* === Galeria de imagens === */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-1 flex-wrap">
              <div
                className="bg-[#0f3e58] min-[400px]:hidden rounded-[100%] mb-2 lg:flex p-2 justify-center items-center h-[45px] w-[50px] cursor-pointer hover:bg-[#14506e] transition"
                onClick={() =>
                  setImageSelected(
                    imageSelected === 0
                      ? property.img.length - 1
                      : imageSelected - 1
                  )
                }
              >
                <FaAngleLeft className="text-white" size={26} />
              </div>

              <img
                src={property.img[imageSelected]}
                className="w-full max-w-[500px] h-[250px] sm:h-[300px] md:h-[350px] rounded-lg object-cover"
                alt="Imagem do imóvel"
              />

              <div
                className="bg-[#0f3e58] min-[400px]:hidden lg:flex lg:mt-2 rounded-[100%] justify-center p-2 items-center h-[45px] w-[50px] cursor-pointer hover:bg-[#14506e] transition"
                onClick={() =>
                  setImageSelected(
                    imageSelected === property.img.length - 1
                      ? 0
                      : imageSelected + 1
                  )
                }
              >
                <FaAngleRight className="text-white" size={26} />
              </div>
            </div>

            {/* Indicadores de imagem */}
            <div className="mt-2 flex justify-center items-center gap-2">
              {property.img.map((item, index) => (
                <div
                  key={index}
                  className={`rounded-full h-4 w-4 cursor-pointer transition ${
                    index === imageSelected ? "bg-[#0f3e58]" : "bg-[#0f3e586c]"
                  }`}
                  onClick={() => setImageSelected(index)}
                ></div>
              ))}
            </div>
          </div>

          {/* === Informações principais === */}
          <div className="bg-[#0f3e58] text-left text-white rounded-2xl p-6 sm:p-8 shadow-md mx-auto flex flex-col max-w-[500px] w-full">
            <span className="text-[#efd16e] font-bold text-md mt-2 block">
              {property.type} - {property.operation}
            </span>
            <p className="text-2xl sm:text-3xl font-bold mb-2">
              Endereço: {property.address}
            </p>
            <p className="text-lg sm:text-xl mb-2">
              Bairro {property.bairro}, {property.cidade} - {property.estado}
            </p>
            <p className="text-3xl sm:text-4xl text-[#efd16e] font-extrabold mb-2">
              R$ {property.price}
            </p>
            <p className="text-base sm:text-lg mt-2">
              <strong>Descrição:</strong>{" "}
              {property.description
                ? property.description
                : "Este imóvel não possui uma descrição detalhada no momento."}
            </p>
            <Button
              label="Entrar em Contato"
              wid="full"
              className="p-2 mt-6 bg-[#c5ac5c] hover:bg-[#978b62] transition"
              onClick={() => redirectToWhatsapp()}
            />
          </div>

          {/* === Itens adicionais === */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-4 w-full col-span-1 lg:col-span-2">
            {Object.entries(property.items).map(([key, value], index) => (
              <div
                key={index}
                className="bg-[#0f3e58] text-center text-white rounded-md p-2 sm:p-3 shadow-md w-[45%] sm:w-[30%] md:w-[22%] max-w-[140px] min-h-[100px] mt-4"
              >
                <h2 className="text-lg sm:text-2xl font-bold">
                  {key[0].toUpperCase() + key.slice(1)}
                </h2>
                <div className="grid grid-cols-2 gap-1 justify-center items-center text-center">
                  {icons[index]}
                  <span className="font-bold text-3xl sm:text-5xl inline-block">
                    {value}
                  </span>
                </div>
              </div>
            ))}
            <div className="bg-[#0f3e58] text-center text-white rounded-md px-4 pt-2 pb-3 shadow-md w-[45%] sm:w-[30%] md:w-[22%] max-w-[180px] min-h-[100px] mt-4">
              <h2 className="text-lg sm:text-2xl font-bold">Área (m²)</h2>
              <span className="font-bold text-3xl sm:text-[40px]">
                {property.area}
              </span>
            </div>
          </div>

          {/* === Mapa === */}
          <div className="grid justify-center items-center w-full mt-6 col-span-1 lg:col-span-2 grid-cols-1">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 w-full text-center col-span-1 lg:col-span-2">
              Localização no Mapa
            </h2>
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                property.address
              )}${encodeURIComponent(property.cidade)}${encodeURIComponent(
                property.estado
              )}&z=17&output=embed`}
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] rounded-lg shadow-md"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PropertySelected;
