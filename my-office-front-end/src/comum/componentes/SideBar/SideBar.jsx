import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { FiAlignJustify } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header className="my-office-navbar">
        <div className="my-office-left">
          <button className="my-office-menu-btn" aria-label="menu" onClick={toggleSidebar}>
            {isOpen ? <FaTimes /> : <FiAlignJustify />}
          </button>
          <span className="my-office-logo">
            <span className="z">My</span><span className="ap">Office</span>
          </span>
          <ul className="my-office-links">
            <li>Alugar</li>
            <li>Comprar</li>
            <li>Lançamentos &#9662;</li>
            <li>Descobrir</li>
            <li>Anunciar &#9662;</li>
            <li>Ajuda</li>
          </ul>
        </div>
        <div className="my-office-right">
          <button
            className="my-office-btn-primary"
            onClick={() => { navigate("/cadastro-login", { state: { isSignUp: true } }); }}
          >
            Criar conta
          </button>
          <button
            className="my-office-btn-outline"
            onClick={() => { navigate("/cadastro-login", { state: { isSignUp: false } }); }}
          >
            <span className="icon-user">👤</span> Entrar
          </button>
        </div>
      </header>

      <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
        </div>
        <ul className="sidebar-nav">
          <li onClick={() => { navigate("/cadastro-login", { state: { isSignUp: false } }); setIsOpen(false); }} className="nav-item">Entrar</li>
          <li onClick={() => { navigate("/"); setIsOpen(false); }} className="nav-item">Início</li>
          <li onClick={() => { navigate("/perfil"); setIsOpen(false); }} className="nav-item">Perfil</li>
          <li onClick={() => { navigate("/mensagem"); setIsOpen(false); }} className="nav-item">Mensagens</li>
          <li onClick={() => { navigate("/configuracoes"); setIsOpen(false); }} className="nav-item">Configurações</li>
          <li onClick={() => { navigate("/"); setIsOpen(false); }} className="nav-item">Sair</li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
