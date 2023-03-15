import React from "react";

const AuthHeader = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img
            src="https://gamek.mediacdn.vn/zoom/600_315/133514250583805952/2022/11/22/avatar1669101028096-1669101028759775287725.png"
            width="50"
            height="150"
            alt="Logo"
          />
          <h1 style={{ fontSize: "xx-large", paddingLeft: "10px" }}>
            FIFA World cup Qatar 2022
          </h1>
        </a>
      </div>
    </nav>
  );
};

export default AuthHeader;
