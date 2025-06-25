"use client";

import { Checkbox, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CustomizationCard from "./CustomizationCard";
import { useInvitationStore } from "../stores/invitation-store";

interface FlowerVendor {
  id: string;
  name: string;
  url: string;
  logo: string;
}

export default function FlowerCard() {
  const { data, setField } = useInvitationStore();

  // 화환 업체 목업 데이터
  const vendors: FlowerVendor[] = [
    {
      id: "flower1",
      name: "꽃팜",
      url: "https://example.com/flower1",
      logo: "/vendors/flower1.png",
    },
    {
      id: "flower2",
      name: "더플라워",
      url: "https://example.com/flower2",
      logo: "/vendors/flower2.png",
    },
    {
      id: "flower3",
      name: "화환마스터",
      url: "https://example.com/flower3",
      logo: "/vendors/flower3.png",
    },
    {
      id: "flower4",
      name: "플라워드림",
      url: "https://example.com/flower4",
      logo: "/vendors/flower4.png",
    },
  ];

  const handleVendorToggle = (vendorId: string) => {
    const currentVendors = data.selectedFlowerVendors;
    if (currentVendors.includes(vendorId)) {
      setField(
        "selectedFlowerVendors",
        currentVendors.filter((id) => id !== vendorId)
      );
    } else {
      setField("selectedFlowerVendors", [...currentVendors, vendorId]);
    }
  };

  return (
    <CustomizationCard title="축하 화환 보내기" defaultEnabled={data.flowerEnabled}>
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          하객들이 청첩장을 통해 화환을 보낼 수 있도록 제휴 업체를 선택하세요.
        </p>

        <div className="rounded-lg border border-gray-200 bg-white p-3">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">화환 업체 선택</p>
              <p className="text-xs text-gray-500">
                원하는 화환 업체를 선택하세요. 다중 선택 가능합니다.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="flex items-center">
                <Checkbox
                  checked={data.selectedFlowerVendors.includes(vendor.id)}
                  onChange={() => handleVendorToggle(vendor.id)}
                  className="mr-2"
                />
                <div className="flex flex-1 items-center justify-between rounded-md border border-gray-200 p-2 text-sm hover:bg-gray-50">
                  <span className="font-medium">{vendor.name}</span>
                  <div className="h-6 w-6 bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 화환 주문 미리보기 */}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">화환 주문 미리보기</p>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <div className="mb-3 border-b border-gray-100 pb-3">
                <p className="text-center text-sm font-medium">축하 화환 보내기</p>
              </div>

              {data.selectedFlowerVendors.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {vendors
                    .filter((vendor) => data.selectedFlowerVendors.includes(vendor.id))
                    .map((vendor) => (
                      <div
                        key={vendor.id}
                        className="flex flex-col items-center rounded-md border border-gray-200 p-2 text-center"
                      >
                        <div className="mb-2 h-10 w-10 bg-gray-200"></div>
                        <p className="text-xs font-medium">{vendor.name}</p>
                        <p className="text-xs text-gray-500">바로가기</p>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-gray-500">
                  선택된 화환 업체가 없습니다.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 직접 업체 추가 (실제 구현 시 구현 필요) */}
        <Button type="dashed" icon={<PlusOutlined />} className="w-full" block>
          직접 화환 업체 추가
        </Button>
      </div>
    </CustomizationCard>
  );
}
