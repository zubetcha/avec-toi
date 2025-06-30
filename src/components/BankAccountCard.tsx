"use client";

import React, { useCallback } from "react";
import CustomizationCard from "./CustomizationCard";
import { Input, Select, Switch, Button, Card, Space, Typography, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useInvitationStore } from "../stores/invitation-store";

const { Text } = Typography;
const { Option } = Select;

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  relationship: string;
}

export default function BankAccountCard() {
  const { data, setField } = useInvitationStore();

  const banks = [
    "KB국민은행",
    "신한은행",
    "우리은행",
    "하나은행",
    "SC제일은행",
    "농협은행",
    "기업은행",
    "카카오뱅크",
    "토스뱅크",
    "케이뱅크",
  ];

  // 초기 계좌가 없을 때 기본 계좌 추가
  const initializeDefaultAccounts = useCallback(() => {
    if (data.bankAccounts.length === 0) {
      const defaultAccounts: BankAccount[] = [
        {
          id: "groom-account",
          bankName: "",
          accountNumber: "",
          accountHolder: "",
          relationship: "신랑측",
        },
        {
          id: "bride-account",
          bankName: "",
          accountNumber: "",
          accountHolder: "",
          relationship: "신부측",
        },
      ];
      setField("bankAccounts", defaultAccounts);
    }
  }, [data.bankAccounts, setField]);

  // 컴포넌트 마운트 시 기본 계좌 초기화
  React.useEffect(() => {
    initializeDefaultAccounts();
  }, [initializeDefaultAccounts]);

  const handleAccountChange = (id: string, field: keyof BankAccount, value: string) => {
    const updatedAccounts = data.bankAccounts.map((account) => {
      if (account.id === id) {
        return { ...account, [field]: value };
      }
      return account;
    });
    setField("bankAccounts", updatedAccounts);
  };

  const handleAddAccount = () => {
    const newAccount: BankAccount = {
      id: `account-${Date.now()}`,
      bankName: "",
      accountNumber: "",
      accountHolder: "",
      relationship: "",
    };
    const updatedAccounts = [...data.bankAccounts, newAccount];
    setField("bankAccounts", updatedAccounts);
  };

  const handleRemoveAccount = (id: string) => {
    const updatedAccounts = data.bankAccounts.filter((account) => account.id !== id);
    setField("bankAccounts", updatedAccounts);
  };

  return (
    <CustomizationCard title="보내는 곳">
      <Space direction="vertical" size="middle" className="w-full">
        <Row justify="space-between" align="middle">
          <Text type="secondary">축하의 마음을 전할 계좌 정보를 입력하세요.</Text>

          <Space align="center">
            <Text type="secondary" className="text-xs">
              계좌번호 표시
            </Text>
            <Switch
              size="small"
              checked={data.showBankAccounts}
              onChange={(checked) => setField("showBankAccounts", checked)}
              className="bg-gray-300"
              checkedChildren=""
              unCheckedChildren=""
            />
          </Space>
        </Row>

        <Space direction="vertical" size="small" className="w-full">
          {data.bankAccounts.map((account) => (
            <Card
              key={account.id}
              size="small"
              className="rounded-lg border border-gray-200"
              bodyStyle={{ padding: 12 }}
            >
              <Space direction="vertical" size="small" className="w-full">
                <Row justify="space-between" align="middle">
                  <Text strong>{account.relationship || "계좌 정보"}</Text>
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    size="small"
                    onClick={() => handleRemoveAccount(account.id)}
                    className="text-gray-500"
                  />
                </Row>

                <Space direction="vertical" size="small" className="w-full">
                  <div>
                    <Text className="mb-1 block text-xs">관계</Text>
                    <Input
                      size="middle"
                      value={account.relationship}
                      onChange={(e) =>
                        handleAccountChange(account.id, "relationship", e.target.value)
                      }
                      placeholder="예: 신랑측, 신부측, 신랑 어머니"
                    />
                  </div>

                  <div>
                    <Text className="mb-1 block text-xs">은행</Text>
                    <Select
                      size="small"
                      value={account.bankName || undefined}
                      onChange={(value) => handleAccountChange(account.id, "bankName", value)}
                      placeholder="은행 선택"
                      className="w-full"
                    >
                      {banks.map((bank) => (
                        <Option key={bank} value={bank}>
                          {bank}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Text className="mb-1 block text-xs">계좌번호</Text>
                    <Input
                      size="middle"
                      value={account.accountNumber}
                      onChange={(e) =>
                        handleAccountChange(account.id, "accountNumber", e.target.value)
                      }
                      placeholder="- 없이 입력하세요"
                    />
                  </div>

                  <div>
                    <Text className="mb-1 block text-xs">예금주</Text>
                    <Input
                      size="middle"
                      value={account.accountHolder}
                      onChange={(e) =>
                        handleAccountChange(account.id, "accountHolder", e.target.value)
                      }
                      placeholder="예금주 이름을 입력하세요"
                    />
                  </div>
                </Space>
              </Space>
            </Card>
          ))}
        </Space>

        <Button type="dashed" onClick={handleAddAccount} className="w-full" block>
          + 계좌 추가
        </Button>
      </Space>
    </CustomizationCard>
  );
}
