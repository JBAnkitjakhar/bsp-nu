"use client"
import React, { useState } from 'react';
import { Parser } from 'pickleparser'; // Assuming pickleparser is a valid TypeScript module

// interface PickleData {
//   // Define the structure of your unpickled data here
//   // This will help with type safety and code completion
// }

export const PickleToJsonConverter=()=> {
  const [json, setJson] = useState(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result instanceof ArrayBuffer) {
          const buffer = new Uint8Array(e.target.result);
          const parser = new Parser();
          try {
            const result:any = parser.parse(buffer);
            setJson(result);
          } catch (error) {
            console.error('Error parsing pickle data:', error);
            // Handle parsing errors gracefully (e.g., display an error message)
          }
        } else {
          console.error('Unexpected file content type');
          // Handle unexpected file content type (e.g., display an error message)
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".pickle" />
      {json && (
        <div>
          <h3>Converted JSON:</h3>
          <pre>{JSON.stringify(json, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// export default PickleToJsonConverter;
