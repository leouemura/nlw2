import React from "react";
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import "./styles.css";

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars.githubusercontent.com/u/56941739?s=460&u=7d59e1ffe14f6667c9d3e00876a09ed0490fa6d5&v=4"
          alt="Leonardo Uemura"
        />
        <div>
          <strong>Leonardo Uemura</strong>
          <span>Programação</span>
        </div>
      </header>
      <p>
        Em busca de novas soluções e aprendizado de novas tecnologias. Domínio
        em Node.js, React, Django e Análise de Dados.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 60,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;
