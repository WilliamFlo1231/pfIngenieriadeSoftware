import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import CardComponent from "../components/CardComponent";

const Landing = () => {
  return (
    <div>
      <NavbarComponent />
      <h1>HR360</h1>
      <p>HR360 es una plataforma que te permite gestionar las horas extras de tus empleados.</p>
      <div className="container">
        <div className="row">
          <CardComponent
            borderClass="border-left-warning"
            title="Pending Requests"
            quantity={18}
            iconClass="fas fa-comments"
          />
          <CardComponent
            borderClass="border-left-warning"
            title="Pending Requests"
            quantity={18}
            iconClass="fas fa-comments"
          />
          <CardComponent
            borderClass="border-left-warning"
            title="Pending Requests"
            quantity={18}
            iconClass="fas fa-comments"
          />
          <CardComponent
            borderClass="border-left-warning"
            title="Pending Requests"
            quantity={18}
            iconClass="fas fa-comments"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;