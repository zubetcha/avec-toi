"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";
import { Input, Button, Checkbox, Space, Divider, Form, Row, Col } from "antd";
import { PhoneOutlined } from "@ant-design/icons";

interface ContactInfo {
  id: string;
  name: string;
  phoneNumber: string;
  showCall: boolean;
  showSms: boolean;
}

interface ContactCardProps {
  contacts: {
    groom: ContactInfo;
    groomFather: ContactInfo;
    groomMother: ContactInfo;
    bride: ContactInfo;
    brideFather: ContactInfo;
    brideMother: ContactInfo;
  };
  onContactsChange: (contacts: any) => void;
}

export default function ContactCard({ contacts, onContactsChange }: ContactCardProps) {
  const [contactInfo, setContactInfo] = useState<any>(contacts);

  const handleContactChange = (id: string, field: string, value: any) => {
    const updatedContacts = {
      ...contactInfo,
      [id]: {
        ...contactInfo[id],
        [field]: value,
      },
    };
    setContactInfo(updatedContacts);
    onContactsChange(updatedContacts);
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
          value={contactInfo[id].name}
          onChange={(e) => handleContactChange(id, "name", e.target.value)}
        />
      </Col>
      <Col span={11}>
        <Input
          size="small"
          placeholder="전화번호"
          prefix={<PhoneOutlined className="text-gray-400" />}
          value={contactInfo[id].phoneNumber}
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
                checked={contactInfo.groom.showCall && contactInfo.bride.showCall}
                onChange={(e) => {
                  const value = e.target.checked;
                  const updatedContacts = { ...contactInfo };
                  Object.keys(updatedContacts).forEach((key) => {
                    updatedContacts[key].showCall = value;
                  });
                  setContactInfo(updatedContacts);
                  onContactsChange(updatedContacts);
                }}
              >
                <span className="text-sm text-gray-700">전화 버튼 표시</span>
              </Checkbox>
            </Col>
            <Col span={12}>
              <Checkbox
                checked={contactInfo.groom.showSms && contactInfo.bride.showSms}
                onChange={(e) => {
                  const value = e.target.checked;
                  const updatedContacts = { ...contactInfo };
                  Object.keys(updatedContacts).forEach((key) => {
                    updatedContacts[key].showSms = value;
                  });
                  setContactInfo(updatedContacts);
                  onContactsChange(updatedContacts);
                }}
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
