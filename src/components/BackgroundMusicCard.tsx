"use client";

import { useState } from "react";
import { Input, Button, Switch, Upload, message } from "antd";
import { UploadOutlined, SearchOutlined, CloseOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import CustomizationCard from "./CustomizationCard";
import { useInvitationStore } from "../stores/invitation-store";

interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
}

export default function BackgroundMusicCard() {
  const { data, setField } = useInvitationStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // 임시 목업 데이터
  const presetSongs: Song[] = [
    { id: "song1", title: "Canon in D", artist: "Pachelbel", url: "/songs/canon.mp3" },
    { id: "song2", title: "Wedding March", artist: "Mendelssohn", url: "/songs/wedding-march.mp3" },
    {
      id: "song3",
      title: "A Thousand Years",
      artist: "Christina Perri",
      url: "/songs/thousand-years.mp3",
    },
    { id: "song4", title: "Perfect", artist: "Ed Sheeran", url: "/songs/perfect.mp3" },
    {
      id: "song5",
      title: "Can't Help Falling in Love",
      artist: "Elvis Presley",
      url: "/songs/cant-help.mp3",
    },
  ];

  const handleSongSelect = (song: Song) => {
    setField("selectedSong", song);
  };

  const handleClearSelection = () => {
    setField("selectedSong", null);
  };

  const handleFileUpload = (file: File) => {
    setIsUploading(true);

    // 실제 구현에서는 파일 업로드 로직이 필요합니다
    setTimeout(() => {
      const song: Song = {
        id: `song-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: "직접 업로드",
        url: URL.createObjectURL(file),
      };

      setField("selectedSong", song);
      setIsUploading(false);
    }, 1000);

    return false;
  };

  const uploadProps: UploadProps = {
    beforeUpload: handleFileUpload,
    showUploadList: false,
    accept: "audio/*",
    disabled: isUploading,
  };

  const filteredSongs = searchTerm
    ? presetSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : presetSongs;

  return (
    <CustomizationCard title="배경음악">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">청첩장에 표시할 배경음악을 선택하세요.</p>

          <div className="flex items-center">
            <label htmlFor="auto-play" className="mr-2 text-xs text-gray-700">
              자동 재생
            </label>
            <Switch
              checked={data.autoPlay}
              onChange={(checked) => setField("autoPlay", checked)}
              size="small"
            />
          </div>
        </div>

        {/* 현재 선택된 노래 */}
        {data.selectedSong && (
          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{data.selectedSong.title}</p>
                <p className="text-xs text-gray-500">{data.selectedSong.artist}</p>
              </div>
              <Button
                onClick={handleClearSelection}
                icon={<CloseOutlined />}
                type="text"
                size="small"
              />
            </div>

            {/* 간단한 오디오 플레이어 */}
            <audio controls src={data.selectedSong.url} className="mt-2 w-full" />
          </div>
        )}

        {/* 노래 검색 */}
        <div>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="노래 또는 아티스트 검색"
            prefix={<SearchOutlined />}
            suffix={
              searchTerm && (
                <Button
                  onClick={() => setSearchTerm("")}
                  icon={<CloseOutlined />}
                  type="text"
                  size="small"
                />
              )
            }
          />
        </div>

        {/* 노래 목록 */}
        <div className="max-h-60 overflow-y-auto rounded-md border border-gray-200">
          {filteredSongs.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredSongs.map((song) => (
                <li key={song.id}>
                  <Button
                    onClick={() => handleSongSelect(song)}
                    type="text"
                    className={`h-auto w-full p-2 text-left ${
                      data.selectedSong?.id === song.id ? "bg-rose-50" : ""
                    }`}
                    block
                  >
                    <div>
                      <p className="text-sm font-medium">{song.title}</p>
                      <p className="text-xs text-gray-500">{song.artist}</p>
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              {searchTerm ? "검색 결과가 없습니다" : "노래 목록이 없습니다"}
            </div>
          )}
        </div>

        {/* 파일 업로드 */}
        <div>
          <Upload {...uploadProps}>
            <Button
              icon={<UploadOutlined />}
              loading={isUploading}
              className="h-16 w-full border-dashed"
              type="dashed"
              block
            >
              {isUploading ? "음악 파일 업로드 중..." : "음악 파일 업로드 (MP3, 최대 20MB)"}
            </Button>
          </Upload>
          <p className="mt-1 text-xs text-gray-500">
            실제 구현에서는 음악 파일 용량 제한 및 압축 처리가 필요합니다.
          </p>
        </div>
      </div>
    </CustomizationCard>
  );
}
