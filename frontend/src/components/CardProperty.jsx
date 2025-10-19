import { FaMapMarkerAlt, FaBath, FaCarAlt } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CardProperty({ property, admin, handleOpen }) {
  const navigate = useNavigate();

  const redirectToWhatsapp = () => {
    const phoneNumber = "556784121913";
    const address = `${property?.rua}, ${property?.numero} - ${property?.bairro}, ${property?.cidade} / ${property?.estado}`;
    const message = `Olá, gostaria de saber mais sobre o imóvel do endereço ${address} e do ID ${property?.ind}`;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener noreferrer"
    );
  };

  if (admin === undefined) {
    admin = false;
  }

  const address = `${property?.rua}, ${property?.numero} - ${property?.bairro}, ${property?.cidade} / ${property?.estado}`;

  return (
    <div className="bg-white min-w-[350px] min-h-[400px] rounded-xl p-4 shadow-md text-left max-w-[400px] mb-4">
      <img
        src={property?.img || "/placeholder_house.jpg"} // imagem genérica
        alt="Imagem do Imóvel"
        className="w-full h-[170px] object-cover mb-4 rounded-xl"
      />
      {admin && (
        <span className="text-[#9c894a] font-extrabold text-sm -mt-3 block">
          ID: {property?.ind}
        </span>
      )}
      <span className="text-[#c5ac5c] font-bold text-sm block">
        {property?.tipo}
      </span>
      <FaMapMarkerAlt size={25} className="inline-block" />
      <h2 className="inline-block font-bold text-2xl align-middle text-wrap w-[80%]">{address}</h2>

      <div className="flex justify-between mt-2 max-w-[350px]">
        <div>
          <IoIosBed size={25} className="text-[#c5ac5c] inline-block mr-0.5" />
          <span className="text-[#c5ac5c] font-bold text-md -mt-3 inline-block">
            {property?.quartos} quartos
          </span>
        </div>
        <div>
          <FaBath size={25} className="text-[#c5ac5c] inline-block mr-1" />
          <span className="text-[#c5ac5c] font-bold text-md -mt-3 inline-block">
            {property?.banheiros} banheiros
          </span>
        </div>
        <div>
          <FaCarAlt size={25} className="text-[#c5ac5c] inline-block mr-1" />
          <span className="text-[#c5ac5c] font-bold text-md -mt-3 inline-block">
            {property?.vagas} vagas
          </span>
        </div>
      </div>

      <p className="text-xl title font-bold text-left mt-2">
        {property?.valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>

      {admin ? (
        <div className="flex flex-col">
          <Button
            label="Ver Detalhes"
            wid="full"
            className="p-0 mt-2"
            onClick={() => navigate(`/property/${property?.ind}`)}
          />
          <Button
            label="Editar Imóvel"
            wid="full"
            className="p-0 mt-2 bg-[#c5ac5c] hover:bg-[#978b62]"
            onClick={() => handleOpen("edit", property?.ind)}
          />
          <Button
            label="Deletar Imóvel"
            wid="full"
            className="p-0 mt-2 bg-red-600 hover:bg-red-700"
            onClick={() => handleOpen("delete", property?.ind)}
          />
        </div>
      ) : (
        <>
          <Button
            label="Ver Detalhes"
            wid="full"
            className="p-0 mt-2"
            onClick={() => navigate(`/property/${property?.ind}`)}
          />
          <Button
            label="Entrar em Contato"
            wid="full"
            className="p-0 mt-2 bg-[#c5ac5c] hover:bg-[#978b62]"
            onClick={redirectToWhatsapp}
          />
        </>
      )}
    </div>
  );
}
