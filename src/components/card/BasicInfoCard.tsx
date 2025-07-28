"use client";

import CustomizationCard from "./CustomizationCard";
import { Select, Input, Checkbox } from "antd";
import "antd/dist/reset.css";
import { useInvitationStore } from "@/stores/invitation-store";

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

export default function BasicInfoCard() {
  const { data, setNested } = useInvitationStore();

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
                  value={data.groomInfo.lastName}
                  onChange={(e) => setNested("groomInfo", "lastName", e.target.value)}
                  style={inputStyles}
                  placeholder="성"
                  size="middle"
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
                  value={data.groomInfo.firstName}
                  onChange={(e) => setNested("groomInfo", "firstName", e.target.value)}
                  style={inputStyles}
                  placeholder="이름"
                  size="middle"
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
                  value={data.groomInfo.isChild}
                  onChange={(value) => setNested("groomInfo", "isChild", value)}
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
                  value={data.groomInfo.fatherName}
                  onChange={(e) => setNested("groomInfo", "fatherName", e.target.value)}
                  style={inputStyles}
                  placeholder="아버지 성함"
                  size="middle"
                />
                <div className="flex items-center">
                  <Checkbox
                    id="groomFatherDeceased"
                    checked={data.groomInfo.isFatherDeceased}
                    onChange={(e) => setNested("groomInfo", "isFatherDeceased", e.target.checked)}
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
                  value={data.groomInfo.motherName}
                  onChange={(e) => setNested("groomInfo", "motherName", e.target.value)}
                  style={inputStyles}
                  placeholder="어머니 성함"
                  size="middle"
                />
                <div className="flex items-center">
                  <Checkbox
                    id="groomMotherDeceased"
                    checked={data.groomInfo.isMotherDeceased}
                    onChange={(e) => setNested("groomInfo", "isMotherDeceased", e.target.checked)}
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
                  value={data.brideInfo.lastName}
                  onChange={(e) => setNested("brideInfo", "lastName", e.target.value)}
                  style={inputStyles}
                  placeholder="성"
                  size="middle"
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
                  value={data.brideInfo.firstName}
                  onChange={(e) => setNested("brideInfo", "firstName", e.target.value)}
                  style={inputStyles}
                  placeholder="이름"
                  size="middle"
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
                  value={data.brideInfo.isChild}
                  onChange={(value) => setNested("brideInfo", "isChild", value)}
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
                  value={data.brideInfo.fatherName}
                  onChange={(e) => setNested("brideInfo", "fatherName", e.target.value)}
                  style={inputStyles}
                  placeholder="아버지 성함"
                  size="middle"
                />
                <div className="flex items-center">
                  <Checkbox
                    id="brideFatherDeceased"
                    checked={data.brideInfo.isFatherDeceased}
                    onChange={(e) => setNested("brideInfo", "isFatherDeceased", e.target.checked)}
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
                  value={data.brideInfo.motherName}
                  onChange={(e) => setNested("brideInfo", "motherName", e.target.value)}
                  style={inputStyles}
                  placeholder="어머니 성함"
                  size="middle"
                />
                <div className="flex items-center">
                  <Checkbox
                    id="brideMotherDeceased"
                    checked={data.brideInfo.isMotherDeceased}
                    onChange={(e) => setNested("brideInfo", "isMotherDeceased", e.target.checked)}
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
                checked={data.options.showDeceasedWithFlower}
                onChange={(e) => setNested("options", "showDeceasedWithFlower", e.target.checked)}
                className="text-rose-500"
              />
              <label htmlFor="showDeceasedWithFlower" className="ml-2 text-sm text-gray-700">
                고인 국화 꽃으로 표시
              </label>
            </div>

            <div className="flex items-center">
              <Checkbox
                id="showBrideFirst"
                checked={data.options.showBrideFirst}
                onChange={(e) => setNested("options", "showBrideFirst", e.target.checked)}
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
