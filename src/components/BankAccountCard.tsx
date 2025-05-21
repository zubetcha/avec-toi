"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";
import { Input, Select, Switch, Button, Card, Space, Typography, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;
const { Option } = Select;

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  relationship: string;
}

interface BankAccountCardProps {
  accounts: BankAccount[];
  onAccountsChange: (accounts: BankAccount[]) => void;
}

export default function BankAccountCard({ accounts = [], onAccountsChange }: BankAccountCardProps) {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(
    accounts.length > 0
      ? accounts
      : [
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
        ]
  );

  const [showAccounts, setShowAccounts] = useState(true);

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

  const handleAccountChange = (id: string, field: keyof BankAccount, value: string) => {
    const updatedAccounts = bankAccounts.map((account) => {
      if (account.id === id) {
        return { ...account, [field]: value };
      }
      return account;
    });

    setBankAccounts(updatedAccounts);
    onAccountsChange(updatedAccounts);
  };

  const handleAddAccount = () => {
    const newAccount: BankAccount = {
      id: `account-${Date.now()}`,
      bankName: "",
      accountNumber: "",
      accountHolder: "",
      relationship: "",
    };

    const updatedAccounts = [...bankAccounts, newAccount];
    setBankAccounts(updatedAccounts);
    onAccountsChange(updatedAccounts);
  };

  const handleRemoveAccount = (id: string) => {
    const updatedAccounts = bankAccounts.filter((account) => account.id !== id);
    setBankAccounts(updatedAccounts);
    onAccountsChange(updatedAccounts);
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
              checked={showAccounts}
              onChange={setShowAccounts}
              className="bg-gray-300"
              checkedChildren=""
              unCheckedChildren=""
            />
          </Space>
        </Row>

        <Space direction="vertical" size="small" className="w-full">
          {bankAccounts.map((account) => (
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
                      size="small"
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
                      size="small"
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
                      size="small"
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
