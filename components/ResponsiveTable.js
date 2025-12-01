// /components/ResponsiveTable.js

export default function ResponsiveTable({ data }) {
  // Asegúrate de que hay datos para evitar errores
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      {/* --- VISTA MÓVIL (Por Defecto) --- */}
      {/* En pantallas pequeñas, mostramos los bloques apilados. `md:hidden` los oculta en pantallas medianas y grandes. */}
      <div className="md:hidden space-y-6">
        {data.map((column, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-md font-bold text-gray-900 mb-3">{column.header}</h3>
            <div className="space-y-4">
              {column.rows.map((row, rowIndex) => (
                <div key={rowIndex}>
                  <p className="font-semibold text-sm text-gray-700">{row.label}</p>
                  <div className="text-gray-600 text-sm mt-1">{row.content}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* --- VISTA DE ESCRITORIO (md y superior) --- */}
      {/* `hidden md:block` asegura que esta tabla solo se vea en pantallas medianas y grandes. */}
      <div className="hidden md:block border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {data.map((column, index) => (
                <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Asumimos que todas las columnas tienen las mismas etiquetas de fila, así que usamos las del primero */}
            {data[0].rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {data.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 align-top">
                     <p className="font-bold text-sm text-gray-900 md:hidden">{row.label}</p> {/* Etiqueta oculta en escritorio */}
                    <div className="text-sm text-gray-700">{column.rows[rowIndex].content}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}