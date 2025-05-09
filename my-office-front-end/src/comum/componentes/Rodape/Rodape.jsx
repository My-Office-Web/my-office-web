import "./Rodape.css";

const Rodape = () => {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="rodape_root">
      <div className="rodape-content">
        <p>Copyright © {anoAtual} - Todos os direitos reservados - Alerrandro - 2.0.</p>
      </div>
    </footer>
  );
};

export default Rodape;
