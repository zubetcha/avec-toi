"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";

interface TransportInfo {
  type: string;
  description: string;
  enabled: boolean;
}

interface TransportationCardProps {
  transportations: TransportInfo[];
  onTransportChange: (transports: TransportInfo[]) => void;
}

export default function TransportationCard({
  transportations = [],
  onTransportChange,
}: TransportationCardProps) {
  const [transports, setTransports] = useState<TransportInfo[]>(
    transportations.length > 0
      ? transportations
      : [
          { type: "지하철", description: "", enabled: true },
          { type: "버스", description: "", enabled: true },
          { type: "자가용", description: "", enabled: true },
          { type: "셔틀버스", description: "", enabled: false },
        ]
  );

  const handleTransportToggle = (index: number) => {
    const updatedTransports = transports.map((transport, i) => {
      if (i === index) {
        return { ...transport, enabled: !transport.enabled };
      }
      return transport;
    });

    setTransports(updatedTransports);
    onTransportChange(updatedTransports);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedTransports = transports.map((transport, i) => {
      if (i === index) {
        return { ...transport, description: value };
      }
      return transport;
    });

    setTransports(updatedTransports);
    onTransportChange(updatedTransports);
  };

  return (
    <CustomizationCard title="교통 수단">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          예식장으로 오시는 교통 수단 정보를 입력하세요. 사용하지 않을 항목은 체크를 해제하세요.
        </p>

        {transports.map((transport, index) => (
          <div key={index} className="rounded-lg border border-gray-200 bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`transport-${index}`}
                  checked={transport.enabled}
                  onChange={() => handleTransportToggle(index)}
                  className="h-4 w-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                />
                <label htmlFor={`transport-${index}`} className="text-sm font-medium text-gray-700">
                  {transport.type}
                </label>
              </div>
            </div>

            {transport.enabled && (
              <div className="mt-2">
                <textarea
                  value={transport.description}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  placeholder={`${transport.type} 안내 정보를 입력하세요`}
                  className="h-20 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            )}
          </div>
        ))}

        {/* 교통 수단 추가 버튼 */}
        <button
          type="button"
          onClick={() => {
            const newTransports = [...transports, { type: "기타", description: "", enabled: true }];
            setTransports(newTransports);
            onTransportChange(newTransports);
          }}
          className="w-full rounded-md border border-dashed border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          + 교통 수단 추가
        </button>
      </div>
    </CustomizationCard>
  );
}
