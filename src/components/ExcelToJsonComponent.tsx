// ExcelToJsonComponent.tsx
"use client"
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelToJsonComponent: React.FC = () => {
  const [jsonData, setJsonData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setJsonData(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {jsonData.length > 0 ? (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      ) : (
        <p>No file selected.</p>
      )}
    </div>
  );
};

export default ExcelToJsonComponent;
