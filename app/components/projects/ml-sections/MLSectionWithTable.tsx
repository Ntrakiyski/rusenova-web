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
  background = 'bg-bg-white'
}: MLSectionWithTableProps) {
  return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] relative z-10`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Title and Description Row */}
        <div className="mb-12">
          {title && (
            <h2 className="font-bricolage text-text-primary text-display-md font-semibold mb-5">
              {title}
            </h2>
          )}
          {description && (
            <p className="font-bricolage text-text-secondary text-text-xl-regular max-w-[768px]">
              {description}
            </p>
          )}
        </div>

        {/* Table Row */}
        <div className="rounded-3xl bg-[radial-gradient(134.07%_95.89%_at_92.97%_104.35%,rgba(244,77,46,0.90)_3.85%,rgba(240,132,76,0.90)_22.12%,#C1ABD8_37.02%,#D7DBED_46.63%,#F7F4ED_53.85%)] overflow-hidden relative w-full">

          <div className="relative z-10 p-8 md:p-16">
            <div className="overflow-x-auto">
              <table className="w-full bg-bg-white rounded-[16px] border border-border overflow-hidden">
                <thead>
                  <tr className="border-b border-border">
                    {columns.map((column, index) => (
                      <th key={index} className="text-left py-4 px-4 font-bricolage text-text-primary font-semibold">
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
                        <td key={colIndex} className="py-4 px-4 font-bricolage text-text-secondary">
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
