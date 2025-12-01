// /components/ResponsiveRichTextTable.js
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import useIsMobile from './hooks/useIsMobile'; // <-- 1. Importa el nuevo hook

export default function ResponsiveRichTextTable({ node }) {
  const isMobile = useIsMobile(); // <-- 2. Llama al hook

  // --- 3. Lógica de renderizado inteligente ---
  // Mientras isMobile es 'null', no mostramos nada para evitar el flash.
  // El servidor renderizará 'null', y el cliente decidirá qué mostrar.
  if (isMobile === null) {
    return null; 
  }

  // Extraemos las cabeceras y las filas
  const headers = node.content[0].content.map(headerCell => headerCell.content[0].content[0].value);
  const bodyRows = node.content.slice(1);

  // Si es móvil, muestra la vista de tarjetas. Si no, la de escritorio.
  return isMobile ? (
    // --- VISTA MÓVIL (Renderizado Condicional) ---
    <div className="my-8 font-sans space-y-4">
      {bodyRows.map((row, rowIndex) => (
        <div key={rowIndex} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
          <div className="space-y-3">
            {row.content.map((cell, cellIndex) => (
              <div key={cellIndex}>
                <p className="font-semibold text-sm text-gray-800">{headers[cellIndex]}</p>
                <div className="text-gray-600 text-sm mt-1 prose prose-sm max-w-none">
                  {documentToReactComponents(cell)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : (
    // --- VISTA DE ESCRITORIO (Renderizado Condicional) ---
    <div className="my-8 font-sans">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
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