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
  signature: {
    marginTop: 30,
    textAlign: 'center',
  },
});

// Define the PDF document
function PdfComponent({nombre, dpi, fechaInicio}) {
  const [plaza, setPlaza] = useState([]);

  //const dataPlaza = apiService.getPlazaId(cargo);
  //setPlaza(dataPlaza);

  const plazaDesc = plaza.plz_nombre;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Constancia Laboral</Text>
        </View>
        <View style={styles.body}>
          <Text>
            A quien corresponda:
          </Text>
          <Text style={{ marginTop: 10 }}>
            Por medio de la presente, se certifica que el Sr./Sra. {nombre}, con
            número de DPI: {dpi}, labora en nuestra empresa Patito S.A.
            desde el {fechaInicio}.
          </Text>
          <Text style={{ marginTop: 10 }}>
            Durante su tiempo en nuestra empresa, el Sr./Sra. {nombre} ha demostrado ser
            un(a) empleado(a) responsable, puntual y comprometido(a) con sus responsabilidades.
            Su desempeño ha sido satisfactorio y ha contribuido significativamente al éxito de
            nuestros proyectos.
          </Text>
          <Text style={{ marginTop: 10 }}>
            Esta constancia se expide a solicitud del interesado para los fines que estime
            conveniente.
          </Text>
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

export default PdfComponent;
