"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";

interface ContactInfo {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  showCall: boolean;
  showSms: boolean;
}

interface ContactCardProps {
  contacts: ContactInfo[];
  onContactsChange: (contacts: ContactInfo[]) => void;
}

export default function ContactCard({ contacts = [], onContactsChange }: ContactCardProps) {
  const [contactList, setContactList] = useState<ContactInfo[]>(
    contacts.length > 0
      ? contacts
      : [
          {
            id: "groom",
            name: "",
            relationship: "신랑",
            phoneNumber: "",
            showCall: true,
            showSms: true,
          },
          {
            id: "bride",
            name: "",
            relationship: "신부",
            phoneNumber: "",
            showCall: true,
            showSms: true,
          },
        ]
  );

  const handleContactChange = (id: string, field: keyof ContactInfo, value: any) => {
    const updatedContacts = contactList.map((contact) => {
      if (contact.id === id) {
        return { ...contact, [field]: value };
      }
      return contact;
    });

    setContactList(updatedContacts);
    onContactsChange(updatedContacts);
  };

  const handleAddContact = () => {
    const newContact: ContactInfo = {
      id: `contact-${Date.now()}`,
      name: "",
      relationship: "",
      phoneNumber: "",
      showCall: true,
      showSms: true,
    };

    const updatedContacts = [...contactList, newContact];
    setContactList(updatedContacts);
    onContactsChange(updatedContacts);
  };

  const handleRemoveContact = (id: string) => {
    // 기본 신랑/신부 연락처는 삭제 불가
    if (id === "groom" || id === "bride") return;

    const updatedContacts = contactList.filter((contact) => contact.id !== id);
    setContactList(updatedContacts);
    onContactsChange(updatedContacts);
  };

  return (
    <CustomizationCard title="연락처">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">청첩장에 표시할 연락처 정보를 입력하세요.</p>

        <div className="space-y-3">
          {contactList.map((contact) => (
            <div key={contact.id} className="rounded-lg border border-gray-200 bg-white p-3">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {contact.id === "groom"
                      ? "신랑"
                      : contact.id === "bride"
                        ? "신부"
                        : "추가 연락처"}
                  </span>
                </div>
                {contact.id !== "groom" && contact.id !== "bride" && (
                  <button
                    onClick={() => handleRemoveContact(contact.id)}
                    className="rounded p-1 text-gray-500 hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <div>
                  <label
                    htmlFor={`name-${contact.id}`}
                    className="mb-1 block text-xs font-medium text-gray-700"
                  >
                    이름
                  </label>
                  <input
                    type="text"
                    id={`name-${contact.id}`}
                    value={contact.name}
                    onChange={(e) => handleContactChange(contact.id, "name", e.target.value)}
                    placeholder="이름을 입력하세요"
                    className="w-full rounded-md border border-gray-300 p-1.5 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                {contact.id !== "groom" && contact.id !== "bride" && (
                  <div>
                    <label
                      htmlFor={`relationship-${contact.id}`}
                      className="mb-1 block text-xs font-medium text-gray-700"
                    >
                      관계
                    </label>
                    <input
                      type="text"
                      id={`relationship-${contact.id}`}
                      value={contact.relationship}
                      onChange={(e) =>
                        handleContactChange(contact.id, "relationship", e.target.value)
                      }
                      placeholder="관계를 입력하세요 (예: 신랑 어머니)"
                      className="w-full rounded-md border border-gray-300 p-1.5 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor={`phone-${contact.id}`}
                    className="mb-1 block text-xs font-medium text-gray-700"
                  >
                    전화번호
                  </label>
                  <input
                    type="tel"
                    id={`phone-${contact.id}`}
                    value={contact.phoneNumber}
                    onChange={(e) => handleContactChange(contact.id, "phoneNumber", e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full rounded-md border border-gray-300 p-1.5 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id={`call-${contact.id}`}
                      checked={contact.showCall}
                      onChange={(e) =>
                        handleContactChange(contact.id, "showCall", e.target.checked)
                      }
                      className="h-3.5 w-3.5 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                    />
                    <label htmlFor={`call-${contact.id}`} className="text-xs text-gray-700">
                      전화 버튼 표시
                    </label>
                  </div>

                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id={`sms-${contact.id}`}
                      checked={contact.showSms}
                      onChange={(e) => handleContactChange(contact.id, "showSms", e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                    />
                    <label htmlFor={`sms-${contact.id}`} className="text-xs text-gray-700">
                      문자 버튼 표시
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 연락처 추가 버튼 */}
        <button
          type="button"
          onClick={handleAddContact}
          className="w-full rounded-md border border-dashed border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          + 연락처 추가
        </button>
      </div>
    </CustomizationCard>
  );
}
