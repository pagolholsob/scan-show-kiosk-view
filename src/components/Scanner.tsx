
import React, { useState, useRef, useEffect } from "react";
import { Scan, QrCode, Barcode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ScannerProps {
  onScanComplete: (code: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerBoxRef = useRef<HTMLDivElement>(null);
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startScanner = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsScanning(true);
          
          // Simulate a successful scan after 3 seconds for demo purposes
          scanTimeoutRef.current = setTimeout(() => {
            // This is just for demo. In a real app, you'd use a library like
            // zxing-js or dynamsoft-javascript-barcode
            const mockCode = "EVENT-1234-SEAT-A12";
            handleScanComplete(mockCode);
          }, 3000);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        toast.error("Could not access camera. Please allow camera permissions.");
      }
    } else {
      toast.error("Your browser does not support camera access.");
    }
  };

  const stopScanner = () => {
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
      scanTimeoutRef.current = null;
    }

    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsScanning(false);
    }
  };

  const handleScanComplete = (code: string) => {
    toast.success("Code scanned successfully!");
    onScanComplete(code);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <QrCode className="text-kiosk-purple h-6 w-6" />
          <Barcode className="text-kiosk-purple h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Scan Card</h2>
        <p className="text-gray-500">Position the QR code or barcode in the scanner area</p>
      </div>

      <div 
        ref={scannerBoxRef}
        className="relative bg-black rounded-lg overflow-hidden w-full aspect-square max-w-sm mx-auto mb-6"
      >
        {isScanning ? (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-2 border-kiosk-light-purple rounded-lg" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-kiosk-light-purple rounded-md flex items-center justify-center">
                <div className="absolute w-40 h-1 bg-kiosk-light-purple/50 animate-scanning rounded" />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
            <Scan className="h-16 w-16 text-kiosk-gray mb-4" />
            <p className="text-kiosk-gray text-center">Camera is off</p>
          </div>
        )}
      </div>
      
      <div className="flex justify-center">
        {!isScanning ? (
          <Button 
            onClick={startScanner}
            className="bg-kiosk-purple hover:bg-kiosk-dark-purple text-white px-8 py-2"
          >
            <Scan className="mr-2 h-4 w-4" />
            Start Scanning
          </Button>
        ) : (
          <Button 
            onClick={stopScanner}
            variant="outline"
            className="border-kiosk-purple text-kiosk-purple hover:bg-kiosk-purple/10"
          >
            Cancel Scan
          </Button>
        )}
      </div>
    </div>
  );
};

export default Scanner;
