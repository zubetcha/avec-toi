"use client";

import { useState } from "react";
import CustomizationCard from "./CustomizationCard";

interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
}

interface BackgroundMusicCardProps {
  selectedSong?: Song;
  onSongChange: (song: Song | null) => void;
  autoPlay?: boolean;
  onAutoPlayChange: (autoPlay: boolean) => void;
}

export default function BackgroundMusicCard({
  selectedSong,
  onSongChange,
  autoPlay = true,
  onAutoPlayChange,
}: BackgroundMusicCardProps) {
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
    onSongChange(song);
  };

  const handleClearSelection = () => {
    onSongChange(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);

      // 실제 구현에서는 파일 업로드 로직이 필요합니다
      setTimeout(() => {
        const song: Song = {
          id: `song-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, ""),
          artist: "직접 업로드",
          url: URL.createObjectURL(file),
        };

        onSongChange(song);
        setIsUploading(false);
      }, 1000);
    }
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
            <div className="relative inline-block h-5 w-9">
              <input
                type="checkbox"
                id="auto-play"
                checked={autoPlay}
                onChange={() => onAutoPlayChange(!autoPlay)}
                className="peer absolute h-0 w-0 opacity-0"
              />
              <span className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition duration-300 peer-checked:bg-indigo-200"></span>
              <span className="absolute top-0.5 left-0.5 h-4 w-4 transform rounded-full bg-white transition duration-300 peer-checked:translate-x-4"></span>
            </div>
          </div>
        </div>

        {/* 현재 선택된 노래 */}
        {selectedSong && (
          <div className="rounded-lg border border-gray-200 bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{selectedSong.title}</p>
                <p className="text-xs text-gray-500">{selectedSong.artist}</p>
              </div>
              <button
                onClick={handleClearSelection}
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

            {/* 간단한 오디오 플레이어 */}
            <audio controls src={selectedSong.url} className="mt-2 w-full" />
          </div>
        )}

        {/* 노래 검색 */}
        <div>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="노래 또는 아티스트 검색"
              className="w-full rounded-md border border-gray-300 p-2 pr-8 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
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
        </div>

        {/* 노래 목록 */}
        <div className="max-h-60 overflow-y-auto rounded-md border border-gray-200">
          {filteredSongs.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredSongs.map((song) => (
                <li key={song.id}>
                  <button
                    onClick={() => handleSongSelect(song)}
                    className={`w-full p-2 text-left transition-colors hover:bg-gray-50 ${
                      selectedSong?.id === song.id ? "bg-rose-50" : ""
                    }`}
                  >
                    <p className="text-sm font-medium">{song.title}</p>
                    <p className="text-xs text-gray-500">{song.artist}</p>
                  </button>
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
          <label
            htmlFor="song-upload"
            className={`flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 p-3 text-sm font-medium text-gray-700 hover:bg-gray-100 ${
              isUploading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {isUploading ? "업로드 중..." : "내 음악 파일 업로드 (MP3)"}
            <input
              id="song-upload"
              type="file"
              accept="audio/mp3,audio/mpeg"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>
    </CustomizationCard>
  );
}
