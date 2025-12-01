// /components/ResponsiveRichTextTable.js
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function ResponsiveRichTextTable({ node }) {
  // Extraemos las cabeceras (la primera fila)
  const headers = node.content[0].content.map(headerCell => {
    // Extraemos el texto de la cabecera. El contenido de una celda es un párrafo.
    return headerCell.content[0].content[0].value;
  });

  // Extraemos las filas del cuerpo (todas las filas menos la primera)
  const bodyRows = node.content.slice(1);
  const numColumns = headers.length;

  return (
    <div className="my-8 font-sans">
      {/* --- VISTA MÓVIL (Por Defecto) --- */}
      <div className="md:hidden space-y-4">
        {bodyRows.map((row, rowIndex) => (
          <div key={rowIndex} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <div className="space-y-3">
              {row.content.map((cell, cellIndex) => (
                <div key={cellIndex}>
                  <p className="font-semibold text-sm text-gray-800">{headers[cellIndex]}</p>
                  <div className="text-gray-600 text-sm mt-1 prose prose-sm max-w-none">
                    {/* Renderizamos el contenido de la celda */}
                    {documentToReactComponents(cell)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* --- VISTA DE ESCRITORIO (md y superior) --- */}
      <div className="hidden md:block border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bodyRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.content.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 align-top">
                    <div className="text-sm text-gray-700 prose prose-sm max-w-none">
                      {documentToReactComponents(cell)}
                    </div>
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