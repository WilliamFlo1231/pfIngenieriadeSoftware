import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import TableComponent from '../components/TableComponent'

function AutoGestion() {
  return (
    <div>
      <NavbarComponent/>
      <div className="titulo">
        <h1>Auto Gestion</h1>
      </div>
      <TableComponent/>
    </div>
  )
}

export default AutoGestion
