import React from "react";

interface TableProps {
  headers: string[]; // Textos de las columnas del thead
  rows: string[][]; // Textos de las filas del tbody (cada fila es un array de celdas)
  headClassName?: string[]; // Clases personalizadas para cada columna del thead
  tbodyClassName?: string[][]; // Clases personalizadas para cada fila del tbody
}

export function Table({ headers, rows, headClassName = [], tbodyClassName = [] }: TableProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full overflow-hidden rounded-sm">
        <table className="w-full">
          {/* Thead con colores fijos y clases personalizadas */}
          <thead className="bg-primaryOri text-sm text-secondaryOri">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`px-5 py-5 text-start font-bold ${
                    index === 0 ? "rounded-tl-sm" : index === headers.length - 1 ? "rounded-tr-sm" : ""
                  } ${headClassName[index] || ""}`} // Aplica clases personalizadas si existen
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Tbody con colores fijos, alternados y clases personalizadas */}
          <tbody className="group text-sm text-primaryOri">
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-greyOri-50"} last:border-0 ${
                  tbodyClassName[rowIndex] ? tbodyClassName[rowIndex].join(" ") : ""
                }`} // Aplica clases personalizadas si existen
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-5 py-5">
                    {cell}
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