import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import apiService from '../services/services';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Times-Roman',
    fontSize: 12,
    lineHeight: 1.5,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  body: {
    marginBottom: 20,
  },
  table: {
    display: "table",
    width: "auto",
    margin: "10px 0",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  signature: {
    marginTop: 30,
    textAlign: 'center',
  },
});

function PdfHPAComponent({ nombre, dpi, fechaInicio, salario, deducciones, bonificaciones }) {
  const [plaza, setPlaza] = useState([]);
  dpi = "123";
  fechaInicio = "01/01/2021";
  salario = 1000;
  deducciones = 100;
  bonificaciones = 200;


  const salarioNeto = salario + bonificaciones - deducciones;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Boleta de Pago</Text>
        </View>
        <View style={styles.body}>
          <Text>Nombre: {nombre}</Text>
          <Text>DPI: {dpi}</Text>
          <Text>Fecha de Inicio: {fechaInicio}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Descripción</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Monto</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Salario</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{salario}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Bonificaciones</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{bonificaciones}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Deducciones</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{deducciones}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Salario Neto</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{salarioNeto}</Text>
            </View>
          </View>
        </View>
        <View style={styles.signature}>
          <Text>_______________________________</Text>
          <Text>Juan Alberto Perez Palacios</Text>
          <Text>Gerente de Patito S.A.</Text>
          <Text>Patito S.A.</Text>
        </View>
      </Page>
    </Document>
  );
}

export default PdfHPAComponent;
