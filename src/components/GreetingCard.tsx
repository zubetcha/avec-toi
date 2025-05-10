"use client";

import CustomizationCard from "./CustomizationCard";

interface GreetingCardProps {
  message: string;
  onMessageChange: (message: string) => void;
}

export default function GreetingCard({ message, onMessageChange }: GreetingCardProps) {
  const presetMessages = [
    "서로 다른 두 사람이 만나 하나의 사랑으로 새 출발합니다.\n소중한 분들을 초대하여 뜻깊은 자리를 빛내주시면 감사하겠습니다.",
    "평생을 같이하고 싶은 사람을 만났습니다.\n서로 아껴주고 이해하며 사랑을 베풀며 살고 싶습니다.\n저희의 새로운 출발을 축복해 주세요.",
    "살랑이는 바람결에 사랑이 묻어나는 계절입니다.\n여러분들의 진심 어린 축하를 받으며 새 출발을 하려 합니다.\n바쁘시더라도 부디 오셔서 축복해 주시면 감사하겠습니다.",
    "서로가 마주보며 다져온 사랑을\n이제 함께 한 곳을 바라보며 걸어갈 수 있는\n큰 사랑으로 키우고자 합니다.\n저희의 앞날을 축복해 주세요.",
  ];

  const handlePresetSelect = (preset: string) => {
    onMessageChange(preset);
  };

  return (
    <CustomizationCard title="인사말">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">청첩장에 표시할 인사말을 작성하세요.</p>

        <div>
          <label
            htmlFor="greeting-message"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            인사말 메시지
          </label>
          <textarea
            id="greeting-message"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            className="h-32 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
            placeholder="인사말을 입력하세요"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">또는 인사말 템플릿 선택</p>
          <div className="space-y-2">
            {presetMessages.map((preset, index) => (
              <button
                key={index}
                onClick={() => handlePresetSelect(preset)}
                className="w-full rounded-md border border-gray-200 bg-gray-50 p-3 text-left text-sm hover:bg-gray-100"
              >
                {preset.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </button>
            ))}
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
