import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import TableComponent from '../components/TableComponent'

const Marcaciones = () => {
  return (
    <div>
      <NavbarComponent/>
      <div className="titulo">
        <h1>Marcaciones</h1>
      </div>      
      <TableComponent/>
    </div>
  )
}

export default Marcaciones
