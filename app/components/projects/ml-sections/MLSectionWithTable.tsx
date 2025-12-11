'use client';

import React from 'react';
import GradientBackground from '../../ui/GradientBackground';

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
    <section className={`py-16 md:py-24 lg:py-32 relative z-10`}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
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
        <GradientBackground gradient={true} className="bg-bg-light rounded-3xl overflow-hidden relative w-full">
          <div className="relative z-10 p-8">
            <div className="overflow-x-auto">
              <table className="w-full bg-bg-white rounded-[16px] border border-border overflow-hidden">
                <thead>
                  <tr className="border-b border-stroke">
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
                      className={`border-b border-stroke last:border-b-0 ${rowIndex === rows.length - 1 ? 'bg-[#F1F6FD]' : ''}`}
                    >
                      {columns.map((column, colIndex) => (
                        <td key={colIndex} className="py-4 px-4 font-bricolage text-text-primary">
                          {rowIndex === rows.length - 1 && colIndex === columns.length - 1 ? (
                            <div className="flex items-center gap-1">
                              <img
                                src="/Check icon.svg"
                                alt={column}
                                className="w-8 h-8 rounded-full"
                                loading="lazy"
                              />
                              <span className="text-text-primary font-semibold">{row[column] || '-'}</span>
                            </div>
                          ) : (
                            row[column] || '-'
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GradientBackground>
      </div>
    </section>
  );
}
