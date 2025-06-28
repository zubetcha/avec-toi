"use client";

import { useState, useEffect, useRef } from "react";
import CustomizationCard from "./CustomizationCard";
import { Input, Button, Checkbox, Row, Col } from "antd";
import { SearchOutlined, PhoneOutlined } from "@ant-design/icons";
import { useInvitationStore } from "../stores/invitation-store";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function WeddingVenueCard() {
  const { data, setField, setNested } = useInvitationStore();

  const [showMapPreview, setShowMapPreview] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  // 카카오맵 초기화
  useEffect(() => {
    if (!showMapPreview || !mapRef.current) {
      return;
    }

    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          initializeMap();
        });
      }
    };

    const initializeMap = () => {
      const options = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 서울 시청 (기본값)
        level: 3,
        draggable: !data.venueOptions.lockMap, // 지도 잠금 옵션 적용
        zoomable: !data.venueOptions.lockMap, // 지도 잠금 옵션 적용
      };

      const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
      setMap(kakaoMap);

      // 주소가 있으면 해당 위치로 지도 이동
      if (data.weddingAddress) {
        searchAddressToCoordinate(data.weddingAddress, kakaoMap);
      }
    };

    loadKakaoMap();
  }, [showMapPreview, data.venueOptions.lockMap]);

  // 지도 잠금 상태가 변경될 때 지도 설정 업데이트
  useEffect(() => {
    if (map) {
      map.setDraggable(!data.venueOptions.lockMap);
      map.setZoomable(!data.venueOptions.lockMap);
    }
  }, [data.venueOptions.lockMap, map]);

  // 주소로 좌표 검색 및 마커 표시
  const searchAddressToCoordinate = (address: string, mapInstance: any = map) => {
    if (!mapInstance || !window.kakao) return;

    // 주소-좌표 변환 객체 생성
    const geocoder = new window.kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색
    geocoder.addressSearch(address, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        setCoordinates({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) });

        // 기존 마커 제거
        if (marker) {
          marker.setMap(null);
        }

        // 결과값으로 받은 위치를 마커로 표시
        const newMarker = new window.kakao.maps.Marker({
          map: mapInstance,
          position: coords,
        });
        setMarker(newMarker);

        // 인포윈도우로 장소에 대한 설명 표시
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${data.weddingLocation}${data.venueHall ? ` ${data.venueHall}` : ""}</div>`,
        });
        infowindow.open(mapInstance, newMarker);

        // 지도의 중심을 결과값으로 받은 위치로 이동
        mapInstance.setCenter(coords);
      } else {
        alert("주소를 찾을 수 없습니다. 다시 확인해주세요.");
      }
    });
  };

  // 주소 검색 버튼 클릭 시 실행
  const searchAddress = () => {
    if (data.weddingAddress) {
      searchAddressToCoordinate(data.weddingAddress);
    }
  };

  // 주소 변경 시 지도 업데이트
  useEffect(() => {
    if (showMapPreview && map && data.weddingAddress) {
      searchAddressToCoordinate(data.weddingAddress);
    }
  }, [data.weddingAddress, data.weddingLocation, data.venueHall, showMapPreview, map]);

  return (
    <CustomizationCard title="예식 장소">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">예식이 진행될 장소 정보를 입력하세요.</p>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">제목</label>
          <Input
            value={data.venueTitle}
            onChange={(e) => setField("venueTitle", e.target.value)}
            placeholder="예식 장소 제목을 입력하세요 (예: 웨딩 본식)"
            size="middle"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">예식장 이름</label>
          <Input
            value={data.weddingLocation}
            onChange={(e) => setField("weddingLocation", e.target.value)}
            placeholder="예식장 이름을 입력하세요"
            size="middle"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">예식장 주소</label>
          <div className="flex gap-2">
            <Input
              value={data.weddingAddress}
              onChange={(e) => setField("weddingAddress", e.target.value)}
              placeholder="예식장 주소를 입력하세요"
              size="middle"
            />
            {showMapPreview && (
              <Button icon={<SearchOutlined />} onClick={searchAddress} type="primary">
                검색
              </Button>
            )}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">예식장 층/홀</label>
          <Input
            value={data.venueHall}
            onChange={(e) => setField("venueHall", e.target.value)}
            placeholder="예식장 층/홀을 입력하세요 (예: 3층 그랜드홀)"
            size="middle"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">예식장 연락처</label>
          <Input
            value={data.venuePhone}
            onChange={(e) => setField("venuePhone", e.target.value)}
            placeholder="예식장 연락처를 입력하세요"
            prefix={<PhoneOutlined />}
            size="middle"
          />
        </div>

        {/* 옵션 설정 */}
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700">옵션 설정</p>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Checkbox
                checked={data.venueOptions.showMap}
                onChange={(e) => setNested("venueOptions", "showMap", e.target.checked)}
              >
                지도 표시하기
              </Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox
                checked={data.venueOptions.lockMap}
                onChange={(e) => setNested("venueOptions", "lockMap", e.target.checked)}
                disabled={!data.venueOptions.showMap}
              >
                지도 잠금 (스크롤 및 이동 비활성화)
              </Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox
                checked={data.venueOptions.attachDirections}
                onChange={(e) => setNested("venueOptions", "attachDirections", e.target.checked)}
              >
                약도 첨부하기
              </Checkbox>
            </Col>
          </Row>
        </div>

        {/* 지도 검색 버튼 - showMap이 true일 때만 표시 */}
        {data.venueOptions.showMap && (
          <div>
            <Button type="default" onClick={() => setShowMapPreview(!showMapPreview)} block>
              {showMapPreview ? "지도 미리보기 닫기" : "지도에서 위치 확인"}
            </Button>
          </div>
        )}

        {/* 지도 미리보기 - showMap이 true이고 showMapPreview가 true일 때만 표시 */}
        {data.venueOptions.showMap && showMapPreview && (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div ref={mapRef} className="h-64 w-full" style={{ minHeight: "300px" }}></div>
            {coordinates && (
              <div className="bg-gray-50 p-2 text-xs text-gray-500">
                <p>
                  위도: {coordinates.lat.toFixed(6)}, 경도: {coordinates.lng.toFixed(6)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 약도 첨부 - attachDirections이 true일 때만 표시 */}
        {data.venueOptions.attachDirections && (
          <div className="pt-2">
            <Button block type="dashed">
              약도 이미지 업로드
            </Button>
            <p className="mt-1 text-xs text-gray-500">
              약도 이미지는 JPG, PNG 형식으로 업로드해주세요.
            </p>
          </div>
        )}
      </div>
    </CustomizationCard>
  );
}
