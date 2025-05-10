"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";

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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">축하의 마음을 전할 계좌 정보를 입력하세요.</p>

          <div className="flex items-center">
            <label htmlFor="show-accounts" className="mr-2 text-xs text-gray-700">
              계좌번호 표시
            </label>
            <div className="relative inline-block h-5 w-9">
              <input
                type="checkbox"
                id="show-accounts"
                checked={showAccounts}
                onChange={() => setShowAccounts(!showAccounts)}
                className="peer absolute h-0 w-0 opacity-0"
              />
              <span className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition duration-300 peer-checked:bg-rose-500"></span>
              <span className="absolute top-0.5 left-0.5 h-4 w-4 transform rounded-full bg-white transition duration-300 peer-checked:translate-x-4"></span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {bankAccounts.map((account) => (
            <div key={account.id} className="rounded-lg border border-gray-200 bg-white p-3">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {account.relationship || "계좌 정보"}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveAccount(account.id)}
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
              </div>

              <div className="space-y-2">
                <div>
                  <label
                    htmlFor={`relationship-${account.id}`}
                    className="mb-1 block text-xs font-medium text-gray-700"
                  >
                    관계
                  </label>
                  <input
                    type="text"
                    id={`relationship-${account.id}`}
                    value={account.relationship}
                    onChange={(e) =>
                      handleAccountChange(account.id, "relationship", e.target.value)
                    }
                    placeholder="예: 신랑측, 신부측, 신랑 어머니"
                    className="w-full rounded-md border border-gray-300 p-1.5 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`bank-${account.id}`}
                    className="mb-1 block text-xs font-medium text-gray-700"
                  >
                    은행
                  </label>
                  <select
                    id={`bank-${account.id}`}
                    value={account.bankName}
                    onChange={(e) => handleAccountChange(account.id, "bankName", e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-1.5 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                  >
                    <option value="">은행 선택</option>
                    {banks.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`account-number-${account.id}`}
                    className="mb-1 block text-xs font-medium text-gray-700"
                  >
                    계좌번호
                  </label>
                  <input
                    type="text"
                    id={`account-number-${account.id}`}
                    value={account.accountNumber}
                    onChange={(e) =>
                      handleAccountChange(account.id, "accountNumber", e.target.value)
                    }
                    placeholder="- 없이 입력하세요"
                    className="w-full rounded-md border border-gray-300 p-1.5 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`account-holder-${account.id}`}
                    className="mb-1 block text-xs font-medium text-gray-700"
                  >
                    예금주
                  </label>
                  <input
                    type="text"
                    id={`account-holder-${account.id}`}
                    value={account.accountHolder}
                    onChange={(e) =>
                      handleAccountChange(account.id, "accountHolder", e.target.value)
                    }
                    placeholder="예금주 이름을 입력하세요"
                    className="w-full rounded-md border border-gray-300 p-1.5 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 계좌 추가 버튼 */}
        <button
          type="button"
          onClick={handleAddAccount}
          className="w-full rounded-md border border-dashed border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          + 계좌 추가
        </button>
      </div>
    </CustomizationCard>
  );
}
