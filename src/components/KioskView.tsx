
import React, { useState } from "react";
import Scanner from "./Scanner";
import ResultDisplay from "./ResultDisplay";

const KioskView: React.FC = () => {
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  
  const handleScanComplete = (code: string) => {
    setScannedCode(code);
  };
  
  const handleReset = () => {
    setScannedCode(null);
  };
  
  return (
    <div className="w-full p-6 bg-kiosk-background min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold text-kiosk-purple">Card Scanner Kiosk</h1>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
        {scannedCode ? (
          <ResultDisplay scanData={scannedCode} onReset={handleReset} />
        ) : (
          <Scanner onScanComplete={handleScanComplete} />
        )}
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Point your card's barcode or QR code at the scanner</p>
        <p>System will automatically detect and process your card</p>
      </div>
    </div>
  );
};

export default KioskView;
