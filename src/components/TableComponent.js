import React from 'react';

const TableComponent = () => {
  return (
    <div class="contenedorPadre">
      <h1>Tabla de Horas Extras</h1>
      <div class="contenedorHijo">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Hora Inicio</th>
              <th scope="col">Hora Fin</th>
              <th scope="col">Horas Extras</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>4124</td>
              <td>Pedro</td>
              <td>9:00 AM</td>
              <td>6:00 PM</td>
              <td>3</td>
              <td class="opcionesBTN">
                <button type="button" class="btn btn-outline-success">Autorizar</button>
                <button type="button" class="btn btn-outline-primary">Modificar</button>
                <button type="button" class="btn btn-outline-danger">Anular</button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>4124</td>
              <td>Pedro</td>
              <td>8:00 AM</td>
              <td>5:00 PM</td>
              <td>2</td>
              <td class="opcionesBTN">
                <button type="button" class="btn btn-outline-success">Autorizar</button>
                <button type="button" class="btn btn-outline-primary">Modificar</button>
                <button type="button" class="btn btn-outline-danger">Anular</button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>4124</td>
              <td>Pedro</td>
              <td>10:00 AM</td>
              <td>6:00 PM</td>
              <td>4</td>
              <td class="opcionesBTN">
                <button type="button" class="btn btn-outline-success">Autorizar</button>
                <button type="button" class="btn btn-outline-primary">Modificar</button>
                <button type="button" class="btn btn-outline-danger">Anular</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
