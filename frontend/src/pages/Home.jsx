import Header from "../components/Header";
import FilterCard from "../components/FilterCard";
import Footer from "../components/Footer";
import CardProperty from "../components/CardProperty";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { getImoveis, filterImoveis, deleteImovel, createImovel  } from "../services/imovelService";
import Loading from "../components/Loading";

function Home() {
  const [showExtra, setShowExtra] = useState(false);
  const [properties, setProperties] = useState([]);


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

  if (properties.length === 0) return <Loading />;

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

      <div className="bg-[#F3F3F3] grid grid-cols-[400px_3fr] max-[870px]:grid-cols-1 p-4 pb-28">
        <div className="sticky top-4 self-start max-[870px]:static max-[710px]:mb-8">
          <FilterCard />
        </div>

        <div className="space-y-1 items-center justify-center text-center">
          <h2 className="text-3xl mb-4 title">Destaques</h2>
          <div className="flex flex-wrap gap-4 justify-center items-center ">
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
