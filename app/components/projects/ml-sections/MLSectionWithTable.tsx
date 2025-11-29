'use client';

import React from 'react';

interface TableRow {
  [key: string]: string | React.ReactNode;
}

interface MLSectionWithTableProps {
  title: string;
  description: string;
  columns: string[];
  rows: TableRow[];
  background?: string;
}

export default function MLSectionWithTable({
  title,
  description,
  columns,
  rows,
  background = 'bg-white'
}: MLSectionWithTableProps) {
  return (
    <section className={`${background} py-16 md:py-24 relative z-10`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          {title && (
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {title}
            </h2>
          )}
          {description && (
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {description}
            </p>
          )}
        </div>

        <div className="rounded-3xl bg-[radial-gradient(134.07%_95.89%_at_92.97%_104.35%,rgba(244,77,46,0.90)_3.85%,rgba(240,132,76,0.90)_22.12%,#C1ABD8_37.02%,#D7DBED_46.63%,#F7F4ED_53.85%)] overflow-hidden relative w-full">

          <div className="relative z-10 p-8 md:p-16">
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-[16px] border-[#dddddd] overflow-hidden">
                <thead>
                  <tr className="border-b border-[#dddddd]">
                    {columns.map((column, index) => (
                      <th key={index} className="text-left py-4 px-4 font-['Bricolage_Grotesque',sans-serif] text-[#191818] font-semibold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`border-b border-[#f0f0f0] last:border-b-0 ${rowIndex === rows.length - 1 ? 'bg-[#8EB2F21F]' : ''}`}
                    >
                      {columns.map((column, colIndex) => (
                        <td key={colIndex} className="py-4 px-4 font-['Bricolage_Grotesque',sans-serif] text-[#494848]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                          {row[column] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
