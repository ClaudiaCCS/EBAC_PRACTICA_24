let contador = 5;
let status = ['Cancelada', 'Pendiente', 'En tránsito', 'Entregada'];

let listaGuias = [{guia: 'A208', origen: 'Tijuana', destino: 'CDMX', destinatario: 'Carlos Sánchez', fecha: '12/03/2026', estado: 3, id: 1 },
    {guia: 'A211', origen: 'Mérida', destino: 'Texas', destinatario: 'Araceli Leal', fecha: '15/03/2026', estado: 2, id: 2 },
    {guia: 'A213', origen: 'California', destino: 'Veracruz', destinatario: 'GlossWeb, SA', fecha: '20/03/2026', estado: 2, id: 3 },
    {guia: 'A215', origen: 'Veracruz', destino: 'California', destinatario: 'Adriana Consuelo', fecha: '19/03/2026', estado: 2, id: 4 },
    {guia: 'A220', origen: 'CDMX', destino: 'Monterrey', destinatario: 'Jorge Rojas', fecha: '20/03/2026', estado: 1, id: 5 }
 ];

let statusGuias = [{id: 1, guia: 'A208', fecha: '08/03/2026', estado: 1}, 
    {id: 1, guia: 'A208', fecha: '10/03/2026', estado: 2},
    {id: 1, guia: 'A208', fecha: '12/03/2026', estado: 3},
    {id: 2, guia: 'A211', fecha: '10/03/2026', estado: 1},
    {id: 2, guia: 'A211', fecha: '15/03/2026', estado: 2},
    {id: 3, guia: 'A213', fecha: '10/03/2026', estado: 1},
    {id: 3, guia: 'A213', fecha: '20/03/2026', estado: 2},
    {id: 4, guia: 'A215', fecha: '17/03/2026', estado: 1},
    {id: 4, guia: 'A215', fecha: '19/03/2026', estado: 2},
    {id: 5, guia: 'A220', fecha: '20/03/2026', estado: 1}
];

let total_pendientes = 0;
let total_transito = 0;
let total_entregadas = 0;