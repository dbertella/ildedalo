import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-box">
          <h4>Link Utili</h4>
          <ul className="footer-list">
            <li className="footer-list-item">
              <a href="/la-tessera/">La Tessera</a>
            </li>
            <li className="footer-list-item">
              <a href="/come-iscriversi/">Come Iscriversi ai Corsi</a>
            </li>
            <li className="footer-list-item">
              <a href="/regolamento-corsi/">Regolamento Corsi</a>
            </li>
            <li className="footer-list-item">
              <a href="/amministrazione-trasparente/">
                Amministrazione Trasparente
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-box">
          <h4>Dove Siamo</h4>
          <span aria-label="love" style={{ marginRight: "0.5rem" }}>
            🌿
          </span>
          Il Dedalo si trova a Casatenovo, in via Garibaldi 5
          <li className="footer-list-item">
            <a href="https://www.facebook.com/ildedalo">Facebook</a> ·{" "}
            <a href="https://www.instagram.com/_ildedalo_/">Instagram</a> ·{" "}
            <a href="https://goo.gl/maps/cKBwARWrqwyhCdYT7">Maps</a>
          </li>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 