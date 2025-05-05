import Link from "next/link";

export default function CreatePage() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-6 p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="mb-6 flex w-full max-w-4xl items-center justify-between">
        <h1 className="text-2xl font-bold">청첩장 만들기</h1>
        <div className="flex gap-4">
          <Link href="/mypage" className="text-sm text-gray-600 hover:text-black">
            내 청첩장
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-black">
            홈으로
          </Link>
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-medium">템플릿 선택</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <div
                key={id}
                className="cursor-pointer overflow-hidden rounded-lg border transition-shadow hover:shadow-md"
              >
                <div className="flex h-48 items-center justify-center bg-gray-100">
                  <span className="text-gray-400">템플릿 {id}</span>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 font-medium">템플릿 스타일 {id}</h3>
                  <p className="text-sm text-gray-600">심플한 디자인의 모던한 청첩장 템플릿</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="mb-6 text-xl font-medium">정보 입력</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">청첩장 제목</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="예) 민수와 지연의 결혼식에 초대합니다"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">결혼식 날짜</label>
                <input
                  type="date"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">신랑 이름</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="신랑 이름을 입력하세요"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">신부 이름</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="신부 이름을 입력하세요"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">결혼식 장소</label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="예) 서울 강남구 테헤란로 123 웨딩홀"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">초대의 말</label>
              <textarea
                className="h-32 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="예) 저희 두 사람이 사랑과 믿음으로 한 가정을 이루게 되었습니다. 부디 오셔서 축복해 주시면 감사하겠습니다."
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full rounded-md bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800"
              >
                청첩장 미리보기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
