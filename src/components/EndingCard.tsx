"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";
import { Input, Button, Radio, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface EndingCardProps {
  endingMessage: string;
  onEndingMessageChange: (message: string) => void;
}

export default function EndingCard({ endingMessage, onEndingMessageChange }: EndingCardProps) {
  const [effect, setEffect] = useState<string>("페이드인");

  const presetMessages = [
    "소중한 분들을 초대합니다.\n함께해 주신다면 더없는 기쁨이겠습니다.",
    "귀한 발걸음 해주셔서 감사합니다.\n행복하게 잘 살겠습니다.",
    "저희의 결혼을 축복해 주셔서 감사합니다.\n늘 건강하시고 행복하세요.",
    "여러분의 축복 속에 새로운 시작을 하려 합니다.\n함께해 주셔서 감사합니다.",
  ];

  const handlePresetSelect = (preset: string) => {
    onEndingMessageChange(preset);
  };

  return (
    <CustomizationCard title="엔딩 메시지">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-600">청첩장 마지막에 표시할 메시지를 작성하세요.</p>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">엔딩 메시지</label>
          <TextArea
            value={endingMessage}
            onChange={(e) => onEndingMessageChange(e.target.value)}
            placeholder="엔딩 메시지를 입력하세요"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-gray-700">또는 엔딩 메시지 템플릿 선택</p>
          <div className="flex flex-col gap-4">
            {presetMessages.map((preset, index) => (
              <div
                key={index}
                className="cursor-pointer rounded-md border border-gray-200 bg-gray-50 p-3 shadow-sm transition-all hover:bg-gray-100 hover:shadow"
                onClick={() => handlePresetSelect(preset)}
              >
                <div className="text-sm">
                  {preset.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 애니메이션 효과 선택 */}
        <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="mb-2 text-sm font-medium text-gray-700">메시지 표시 효과</p>
          <Radio.Group
            value={effect}
            onChange={(e) => setEffect(e.target.value)}
            buttonStyle="solid"
          >
            <Space wrap>
              {["페이드인", "슬라이드", "타이핑", "반짝임"].map((option) => (
                <Radio.Button key={option} value={option}>
                  {option}
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>
        </div>
      </div>
    </CustomizationCard>
  );
}
