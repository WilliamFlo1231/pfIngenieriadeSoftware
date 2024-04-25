import React from 'react'
import TableComponent from '../components/TableComponent'
import NavbarComponent from '../components/NavbarComponent'

const HorasExtra = () => {
  return (
    <div>
      <NavbarComponent/>
      <div className="titulo">
        <h1>Horas Extras</h1>
      </div>
      <TableComponent/>
    </div>
  )
}

export default HorasExtra
