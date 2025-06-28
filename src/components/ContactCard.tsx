"use client";

import CustomizationCard from "./CustomizationCard";
import { Input, Checkbox, Divider, Row, Col } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { useInvitationStore } from "../stores/invitation-store";

export default function ContactCard() {
  const { data, setField } = useInvitationStore();

  const handleContactChange = (id: string, field: string, value: any) => {
    const updatedContacts = {
      ...data.contacts,
      [id]: {
        ...data.contacts[id as keyof typeof data.contacts],
        [field]: value,
      },
    };
    setField("contacts", updatedContacts);
  };

  const handleOptionChange = (optionType: "showCall" | "showSms", value: boolean) => {
    const contactIds = [
      "groom",
      "groomFather",
      "groomMother",
      "bride",
      "brideFather",
      "brideMother",
    ];
    const updatedContacts = { ...data.contacts };
    contactIds.forEach((id) => {
      updatedContacts[id as keyof typeof updatedContacts][optionType] = value;
    });
    setField("contacts", updatedContacts);
  };

  const contactRow = (id: string, label: string) => (
    <Row gutter={8} className="mb-2">
      <Col span={4}>
        <div className="flex h-8 items-center text-sm font-medium text-gray-700">{label}</div>
      </Col>
      <Col span={9}>
        <Input
          size="small"
          placeholder="이름"
          value={data.contacts[id as keyof typeof data.contacts].name}
          onChange={(e) => handleContactChange(id, "name", e.target.value)}
        />
      </Col>
      <Col span={11}>
        <Input
          size="small"
          placeholder="전화번호"
          prefix={<PhoneOutlined className="text-gray-400" />}
          value={data.contacts[id as keyof typeof data.contacts].phoneNumber}
          onChange={(e) => handleContactChange(id, "phoneNumber", e.target.value)}
        />
      </Col>
    </Row>
  );

  return (
    <CustomizationCard title="연락처">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-600">청첩장에 표시할 연락처 정보를 입력하세요.</p>

        <div className="mb-3 text-base font-medium text-gray-800">신랑측</div>
        {contactRow("groom", "신랑")}
        {contactRow("groomFather", "아버지")}
        {contactRow("groomMother", "어머니")}

        <Divider className="my-4" />

        <div className="mb-3 text-base font-medium text-gray-800">신부측</div>
        {contactRow("bride", "신부")}
        {contactRow("brideFather", "아버지")}
        {contactRow("brideMother", "어머니")}

        <div className="mt-4">
          <div className="mb-2 text-sm font-medium text-gray-700">옵션</div>
          <Row gutter={16}>
            <Col span={12}>
              <Checkbox
                checked={data.contacts.groom.showCall && data.contacts.bride.showCall}
                onChange={(e) => handleOptionChange("showCall", e.target.checked)}
              >
                <span className="text-sm text-gray-700">전화 버튼 표시</span>
              </Checkbox>
            </Col>
            <Col span={12}>
              <Checkbox
                checked={data.contacts.groom.showSms && data.contacts.bride.showSms}
                onChange={(e) => handleOptionChange("showSms", e.target.checked)}
              >
                <span className="text-sm text-gray-700">문자 버튼 표시</span>
              </Checkbox>
            </Col>
          </Row>
        </div>
      </div>
    </CustomizationCard>
  );
}
