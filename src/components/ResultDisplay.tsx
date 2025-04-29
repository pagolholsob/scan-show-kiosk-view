
import React from "react";
import { Check, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ResultDisplayProps {
  scanData: string;
  onReset: () => void;
}

interface MockEventData {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  seat: string;
  isAvailable: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ scanData, onReset }) => {
  // Mock data - in a real app, you would fetch this data from an API based on the scanData
  const parseMockData = (): MockEventData => {
    // Simulate parsing the scan data
    const parts = scanData.split("-");
    
    return {
      id: scanData,
      name: "Tech Conference 2025",
      date: "April 30, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Main Hall",
      seat: parts.length > 3 ? parts[3] : "A12",
      isAvailable: true // Change this to test different states
    };
  };

  const eventData = parseMockData();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="inline-block rounded-full bg-kiosk-purple/10 p-3 mb-4">
          {eventData.isAvailable ? (
            <FileCheck className="h-8 w-8 text-kiosk-success" />
          ) : (
            <FileCheck className="h-8 w-8 text-kiosk-error" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {eventData.isAvailable ? "Available" : "Not Available"}
        </h2>
        <p className="text-gray-500">
          {eventData.isAvailable 
            ? "The scanned card is valid and available." 
            : "The scanned card is not available or has been used."}
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold">{eventData.name}</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Date:</span>
              <span className="font-medium">{eventData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Time:</span>
              <span className="font-medium">{eventData.time}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-500">Location:</span>
              <span className="font-medium">{eventData.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Seat:</span>
              <span className="font-medium">{eventData.seat}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-500">Card ID:</span>
              <span className="font-mono text-sm">{eventData.id}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={onReset}
          className="bg-kiosk-purple hover:bg-kiosk-dark-purple text-white px-8 py-2"
        >
          Scan Another Card
        </Button>
      </div>
    </div>
  );
};

export default ResultDisplay;
