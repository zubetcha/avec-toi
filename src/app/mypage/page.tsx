import Link from "next/link";

export default function MyPage() {
  // 예시 데이터 - 실제로는 API나 상태 관리를 통해 가져와야 함
  const myInvitations = [
    { id: 1, title: "우리의 결혼식", date: "2024-06-15", views: 120 },
    { id: 2, title: "소중한 초대", date: "2024-07-22", views: 85 },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 p-8">
      <div className="mb-6 flex w-full max-w-4xl items-center justify-between">
        <h1 className="text-2xl font-bold">내 청첩장</h1>
        <Link href="/" className="text-sm text-gray-600 hover:text-black">
          홈으로
        </Link>
      </div>

      <div className="w-full max-w-4xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-medium">나의 청첩장 목록</h2>
          <Link
            href="/create"
            className="rounded-md bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
          >
            새 청첩장 만들기
          </Link>
        </div>

        {myInvitations.length === 0 ? (
          <div className="rounded-lg bg-gray-50 py-12 text-center">
            <p className="mb-4 text-gray-600">아직 만든 청첩장이 없습니다.</p>
            <Link
              href="/create"
              className="rounded-md bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
            >
              첫 청첩장 만들기
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full min-w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">제목</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">날짜</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">조회수</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {myInvitations.map((invitation) => (
                  <tr key={invitation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {invitation.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{invitation.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{invitation.views}</td>
                    <td className="px-6 py-4 text-right text-sm">
                      <div className="flex justify-end gap-2">
                        <button className="text-indigo-600 hover:text-indigo-900">보기</button>
                        <button className="text-blue-600 hover:text-blue-900">수정</button>
                        <button className="text-red-600 hover:text-red-900">삭제</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 w-full max-w-4xl">
        <h2 className="mb-4 text-xl font-medium">계정 정보</h2>
        <div className="rounded-lg bg-gray-50 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-1 text-sm text-gray-500">이메일</h3>
              <p>example@email.com</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm text-gray-500">가입일</h3>
              <p>2023년 12월 10일</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm text-gray-500">청첩장 수</h3>
              <p>{myInvitations.length}개</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm text-gray-500">총 조회수</h3>
              <p>{myInvitations.reduce((sum, inv) => sum + inv.views, 0)}회</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
