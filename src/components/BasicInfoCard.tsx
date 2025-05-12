"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";
import { Select, Input, Checkbox } from "antd";
import "antd/dist/reset.css";

// Select 컴포넌트 스타일 커스터마이징
const selectStyles = {
  width: "100%",
  height: "38px",
};

// Input 컴포넌트 스타일 커스터마이징
const inputStyles = {
  width: "100%",
  height: "38px",
};

interface BasicInfoCardProps {
  groomInfo: {
    lastName: string;
    firstName: string;
    isChild: "son" | "daughter";
    fatherName: string;
    isFatherDeceased: boolean;
    motherName: string;
    isMotherDeceased: boolean;
  };
  brideInfo: {
    lastName: string;
    firstName: string;
    isChild: "son" | "daughter";
    fatherName: string;
    isFatherDeceased: boolean;
    motherName: string;
    isMotherDeceased: boolean;
  };
  options: {
    showDeceasedWithFlower: boolean;
    showBrideFirst: boolean;
  };
  onInfoChange: (field: string, value: string) => void;
  onGroomInfoChange: (field: string, value: any) => void;
  onBrideInfoChange: (field: string, value: any) => void;
  onOptionsChange: (field: string, value: boolean) => void;
}

export default function BasicInfoCard({
  groomInfo,
  brideInfo,
  options,
  onInfoChange,
  onGroomInfoChange,
  onBrideInfoChange,
  onOptionsChange,
}: BasicInfoCardProps) {
  return (
    <CustomizationCard title="기본 정보">
      <div className="space-y-6">
        {/* 신랑측 정보 */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h3 className="mb-3 text-base font-medium text-gray-800">신랑측 정보</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-1/6">
                <label
                  htmlFor="groomLastName"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  성
                </label>
                <Input
                  id="groomLastName"
                  value={groomInfo.lastName}
                  onChange={(e) => onGroomInfoChange("lastName", e.target.value)}
                  style={inputStyles}
                  placeholder="성"
                />
              </div>
              <div className="w-1/6">
                <label
                  htmlFor="groomFirstName"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  이름
                </label>
                <Input
                  id="groomFirstName"
                  value={groomInfo.firstName}
                  onChange={(e) => onGroomInfoChange("firstName", e.target.value)}
                  style={inputStyles}
                  placeholder="이름"
                />
              </div>
              <div className="w-1/6">
                <label
                  htmlFor="groomIsChild"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  관계
                </label>
                <Select
                  id="groomIsChild"
                  value={groomInfo.isChild}
                  onChange={(value) => onGroomInfoChange("isChild", value)}
                  style={selectStyles}
                  options={[
                    { value: "son", label: "아들" },
                    { value: "daughter", label: "딸" },
                  ]}
                  size="middle"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="groomFatherName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                아버지 성함
              </label>
              <div className="flex w-1/2 items-center gap-3">
                <Input
                  id="groomFatherName"
                  value={groomInfo.fatherName}
                  onChange={(e) => onGroomInfoChange("fatherName", e.target.value)}
                  style={inputStyles}
                  placeholder="아버지 성함"
                />
                <div className="flex items-center">
                  <Checkbox
                    id="groomFatherDeceased"
                    checked={groomInfo.isFatherDeceased}
                    onChange={(e) => onGroomInfoChange("isFatherDeceased", e.target.checked)}
                    className="text-rose-500"
                  />
                  <label htmlFor="groomFatherDeceased" className="ml-2 text-sm text-gray-600">
                    故
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="groomMotherName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                어머니 성함
              </label>
              <div className="flex w-1/2 items-center gap-3">
                <Input
                  id="groomMotherName"
                  value={groomInfo.motherName}
                  onChange={(e) => onGroomInfoChange("motherName", e.target.value)}
                  style={inputStyles}
                  placeholder="어머니 성함"
                />
                <div className="flex items-center">
                  <Checkbox
                    id="groomMotherDeceased"
                    checked={groomInfo.isMotherDeceased}
                    onChange={(e) => onGroomInfoChange("isMotherDeceased", e.target.checked)}
                    className="text-rose-500"
                  />
                  <label htmlFor="groomMotherDeceased" className="ml-2 text-sm text-gray-600">
                    故
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 신부측 정보 */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h3 className="mb-3 text-base font-medium text-gray-800">신부측 정보</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-1/6">
                <label
                  htmlFor="brideLastName"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  성
                </label>
                <Input
                  id="brideLastName"
                  value={brideInfo.lastName}
                  onChange={(e) => onBrideInfoChange("lastName", e.target.value)}
                  style={inputStyles}
                  placeholder="성"
                />
              </div>
              <div className="w-1/6">
                <label
                  htmlFor="brideFirstName"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  이름
                </label>
                <Input
                  id="brideFirstName"
                  value={brideInfo.firstName}
                  onChange={(e) => onBrideInfoChange("firstName", e.target.value)}
                  style={inputStyles}
                  placeholder="이름"
                />
              </div>
              <div className="w-1/6">
                <label
                  htmlFor="brideIsChild"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  관계
                </label>
                <Select
                  id="brideIsChild"
                  value={brideInfo.isChild}
                  onChange={(value) => onBrideInfoChange("isChild", value)}
                  style={selectStyles}
                  options={[
                    { value: "son", label: "아들" },
                    { value: "daughter", label: "딸" },
                  ]}
                  size="middle"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="brideFatherName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                아버지 성함
              </label>
              <div className="flex w-1/2 items-center gap-3">
                <Input
                  id="brideFatherName"
                  value={brideInfo.fatherName}
                  onChange={(e) => onBrideInfoChange("fatherName", e.target.value)}
                  style={inputStyles}
                  placeholder="아버지 성함"
                />
                <div className="flex items-center">
                  <Checkbox
                    id="brideFatherDeceased"
                    checked={brideInfo.isFatherDeceased}
                    onChange={(e) => onBrideInfoChange("isFatherDeceased", e.target.checked)}
                    className="text-rose-500"
                  />
                  <label htmlFor="brideFatherDeceased" className="ml-2 text-sm text-gray-600">
                    故
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="brideMotherName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                어머니 성함
              </label>
              <div className="flex w-1/2 items-center gap-3">
                <Input
                  id="brideMotherName"
                  value={brideInfo.motherName}
                  onChange={(e) => onBrideInfoChange("motherName", e.target.value)}
                  style={inputStyles}
                  placeholder="어머니 성함"
                />
                <div className="flex items-center">
                  <Checkbox
                    id="brideMotherDeceased"
                    checked={brideInfo.isMotherDeceased}
                    onChange={(e) => onBrideInfoChange("isMotherDeceased", e.target.checked)}
                    className="text-rose-500"
                  />
                  <label htmlFor="brideMotherDeceased" className="ml-2 text-sm text-gray-600">
                    故
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 추가 옵션 */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h3 className="mb-3 text-base font-medium text-gray-800">추가 옵션</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Checkbox
                id="showDeceasedWithFlower"
                checked={options.showDeceasedWithFlower}
                onChange={(e) => onOptionsChange("showDeceasedWithFlower", e.target.checked)}
                className="text-rose-500"
              />
              <label htmlFor="showDeceasedWithFlower" className="ml-2 text-sm text-gray-700">
                고인 국화 꽃으로 표시
              </label>
            </div>

            <div className="flex items-center">
              <Checkbox
                id="showBrideFirst"
                checked={options.showBrideFirst}
                onChange={(e) => onOptionsChange("showBrideFirst", e.target.checked)}
                className="text-rose-500"
              />
              <label htmlFor="showBrideFirst" className="ml-2 text-sm text-gray-700">
                신부측 먼저 표시
              </label>
            </div>
          </div>
        </div>
      </div>
    </CustomizationCard>
  );
}
