"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";
import { Input, Checkbox, Button, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { TextArea } = Input;

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

  const handleTransportDelete = (index: number) => {
    // 기본 교통수단(처음 4개)은 삭제할 수 없도록 처리
    if (index < 4) {
      return;
    }

    const updatedTransports = transports.filter((_, i) => i !== index);
    setTransports(updatedTransports);
    onTransportChange(updatedTransports);
    message.success("교통 수단이 삭제되었습니다.");
  };

  const handleTransportTypeChange = (index: number, value: string) => {
    const updatedTransports = transports.map((transport, i) => {
      if (i === index) {
        return { ...transport, type: value };
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
                <Checkbox
                  id={`transport-${index}`}
                  checked={transport.enabled}
                  onChange={() => handleTransportToggle(index)}
                >
                  {index < 4 ? (
                    <span className="text-sm font-medium text-gray-700">{transport.type}</span>
                  ) : (
                    <Input
                      size="middle"
                      value={transport.type}
                      onChange={(e) => handleTransportTypeChange(index, e.target.value)}
                      placeholder="교통 수단 이름"
                      className="w-32"
                    />
                  )}
                </Checkbox>
              </div>
              {index >= 4 && (
                <div>
                  <Button
                    type="text"
                    size="small"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => handleTransportDelete(index)}
                  />
                </div>
              )}
            </div>

            {transport.enabled && (
              <div className="mt-2">
                <TextArea
                  value={transport.description}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  placeholder={`${transport.type} 안내 정보를 입력하세요`}
                  autoSize={{ minRows: 3, maxRows: 6 }}
                />
              </div>
            )}
          </div>
        ))}

        {/* 교통 수단 추가 버튼 */}
        <Button
          type="dashed"
          block
          icon={<PlusOutlined />}
          onClick={() => {
            const newTransports = [...transports, { type: "기타", description: "", enabled: true }];
            setTransports(newTransports);
            onTransportChange(newTransports);
          }}
        >
          교통 수단 추가
        </Button>
      </div>
    </CustomizationCard>
  );
}
