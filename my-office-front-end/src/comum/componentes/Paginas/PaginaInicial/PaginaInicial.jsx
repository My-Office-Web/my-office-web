import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "./PaginaInicial.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EstiloDeVida from "../Material_Ui/CardGridInicial";

// Não é necessário importar imagens da pasta 'public' com import
// Basta utilizar o caminho relativo para a pasta public
const opcoes = ["Apartamento", "Studio", "Kitnet", "Casa", "Sobrado"];

const PaginaInicial = () => {
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState("Alugar");
  const [opcoesSelecionadas, setOpcoesSelecionadas] = useState([]);
  const dropdownRef = useRef(null);

  const alternarDropdown = () => {
    setMostrarDropdown((prev) => !prev);
  };

  const trocarAba = (aba) => {
    setAbaAtiva(aba);
    setOpcoesSelecionadas([]);
  };

  const alternarOpcao = (opcao) => {
    setOpcoesSelecionadas((prev) =>
      prev.includes(opcao)
        ? prev.filter((item) => item !== opcao)
        : [...prev, opcao]
    );
  };

  const getTextoSelect = () => {
    if (opcoesSelecionadas.length === 0) return "Todos os imóveis";
    if (opcoesSelecionadas.length === 1) return opcoesSelecionadas[0];
    return `${opcoesSelecionadas.length} selecionados`;
  };

  useEffect(() => {
    const handleClickFora = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMostrarDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <div>
      <div className="pagina-inicial">
        <div className="my-office-layout">
          <div className="my-office-imagem">
            <Slider {...settings}>
              <div>
                <img src="/imagem-inicial.jpg" alt="Imagem 1" />
              </div>
              <div>
                <img src="/escritorio.jpg" alt="Imagem 2" />
              </div>
              <div>
                <img src="/predio-comercial.jpg" alt="Imagem 3" />
              </div>
            </Slider>
          </div>

          <div className="my-office-container">
            <div className="my-office-title">
              A lugar que você quer está aqui. Só no My Office você encontra 2
              milhões de salas.
            </div>

            <div className="my-office-tabs">
              {["Comprar", "Alugar", "Imóvel novo"].map((aba) => (
                <div
                  key={aba}
                  className={`my-office-tab ${
                    abaAtiva === aba ? "my-office-active" : ""
                  }`}
                  onClick={() => trocarAba(aba)}
                >
                  {aba}
                </div>
              ))}
            </div>

            <div className="my-office-form">
              <input
                type="text"
                className="my-office-input"
                placeholder="Digite o nome da rua, bairro ou cidade"
              />
              <div className="my-office-select-wrapper" ref={dropdownRef}>
                <div className="my-office-select" onClick={alternarDropdown}>
                  {getTextoSelect()}
                  <span className="my-office-arrow">
                    {mostrarDropdown ? "▲" : "▼"}
                  </span>
                </div>
                {mostrarDropdown && (
                  <div className="my-office-dropdown">
                    <h4>Residencial</h4>
                    {opcoes.map((opcao) => (
                      <label className="my-office-checkbox" key={opcao}>
                        <input
                          type="checkbox"
                          checked={opcoesSelecionadas.includes(opcao)}
                          onChange={() => alternarOpcao(opcao)}
                        />
                        {opcao}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <button className="my-office-btn">Buscar</button>
            </div>
          </div>
        </div>
      </div>
      <EstiloDeVida />
    </div>
  );
};

export default PaginaInicial;
