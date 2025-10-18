import Header from "../components/Header";
import FilterCard from "../components/FilterCard";
import Footer from "../components/Footer";
import CardProperty from "../components/CardProperty";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function Home() {
  const [showExtra, setShowExtra] = useState(false);

  const properties = [
    {
      id: 1,
      type: "Casa",
      operation: "Aluguel",
      img: ["/placeholder_house.jpg","/placeholder_house_2.jpg","/placeholder_house_3.png"],
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
      description: "Uma casa espaçosa e confortável, ideal para famílias grandes.",
    },
    {
      id: 2,
      type: "Apartamento",
      operation: "Compra",
      img: ["/placeholder_house.jpg","/placeholder_house_2.jpg","/placeholder_house_3.png"],
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
      description: "Um apartamento moderno e aconchegante, perfeito para famílias pequenas.",
    },
    {
      id: 3,
      type: "Terreno",
      operation: "Compra",
      img: ["/placeholder_house.jpg","/placeholder_house_2.jpg","/placeholder_house_3.png"],
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
      description: "Um terreno espaçoso ideal para construir a casa dos seus sonhos.",
    },
    {
      id: 4,
      type: "Casa",
      operation: "Aluguel",
      img: ["/placeholder_house.jpg","/placeholder_house_2.jpg","/placeholder_house_3.png"],
      address: "Rua das Palmeiras, 321",
      bairro: "Jardim Exemplos",
      cidade: "CAMPO GRANDE",
      estado: "MS",
      area: 2500,
      items: {
        quartos: 4,
        banheiros: 3,
        vagas: 2
      },
      price: "R$ 1.200.000",
      description: "Uma casa espaçosa e confortável, ideal para famílias grandes.",
    },
    {
      id: 5,
      type: "Apartamento",
      operation: "Compra",
      img: ["/placeholder_house.jpg","/placeholder_house_2.jpg","/placeholder_house_3.png"],
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
      description: "Um apartamento moderno e aconchegante, perfeito para famílias pequenas.",
    },
    {
      id: 6,
      type: "Terreno",
      operation: "Compra",
      img: ["/placeholder_house.jpg","/placeholder_house_2.jpg","/placeholder_house_3.png"],
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
      description: "Um terreno espaçoso ideal para construir a casa dos seus sonhos.",
    },
  ];

  // Exibe o botão "Voltar aos Filtros" após rolar 500px
  const handleScroll = () => {
    const position = window.scrollY;
    setShowExtra(position > 500);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({top:0,behavior:"smooth"});
  },[])

  // Função para rolar até o filtro
  const scrollToFilters = () => {
    setShowExtra(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header />

      {showExtra && (
        <div className="max-[710px]:flex hidden justify-center fixed top-4 z-50 w-full">
          <button
            onClick={scrollToFilters}
            className="bg-[#80703c] text-white text-center py-2 px-6 rounded-full font-bold shadow-md align-middle"
          >
            <FaArrowUp className="inline-block mr-2" />
            Voltar aos Filtros
          </button>
        </div>
      )}

      <div className="bg-[#F3F3F3] grid grid-cols-[400px_2fr] max-[710px]:grid-cols-1 p-4 pb-28">
        <div className="sticky top-4 self-start max-[710px]:static max-[710px]:mb-8">
          <FilterCard />
        </div>

        <div className="space-y-1 items-center justify-center text-center">
          <h2 className="text-3xl mb-4 title">Destaques</h2>
          <div className="flex flex-wrap gap-8 justify-center items-center">
            {properties.map((property, index) => (
              <CardProperty key={index} property={property} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
