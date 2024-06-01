import React, { useState } from 'react';
import apiService from '../services/services';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Cookies from 'js-cookie';


function Login() {

  const eliminaCookie = () => {
    Cookies.remove('user');
  }

  
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = document.getElementById('exampleInputEmail').value;
    const password = document.getElementById('exampleInputPassword').value;
    const dataUsuarios = await apiService.getUsuarios();
    setUser(dataUsuarios);

    const user = dataUsuarios.find(u => u.usr_correo_usuario === email && u.usr_password === password);
    if (user) {
      // Grabar la cookie
      Cookies.set('user', JSON.stringify({
        email: user.usr_correo_usuario,
        role: user.usr_rol,
        expid: user.usr_codexp
      }), { expires: 1 }); // La cookie expirará en 1 día

      console.log(user.usr_usuario)
      console.log("se encontró registro")
      if (user.usr_rol === 'Usuario') {


        navigate("/DashboardEmpleado");
      }
      if (user.usr_rol === 'Administrador') {
        navigate("/DashboardAdmin");
      }

    } else {
      Swal.fire('Error', 'Las Credenciales no son correctas', 'error');
      console.error('Usuario no autenticado');
    }


  }

  eliminaCookie();
  return (
    <div className="container">
      <div className="row justify-content-center">

        <div className="col-xl-10 col-lg-12 col-md-9">

          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Bienvenido a HR360!</h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Ingrese el Email..."
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Ingrese la contraseña"
                        />
                      </div>
                      <button className="btn btn-primary btn-user btn-block">
                        Login
                      </button>
                      <hr />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>

  )
}

export default Login
