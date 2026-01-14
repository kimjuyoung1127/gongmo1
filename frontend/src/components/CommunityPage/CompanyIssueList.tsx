import { CompanyIssue, CompanyIssueCard } from './CompanyIssueCard';

const MOCK_ISSUES: CompanyIssue[] = [
    {
        id: '1',
        category: '설비',
        status: 'WAITING',
        title: 'A라인 3번 컨베이어 소음',
        author: '김철수',
        location: '제1공장 A라인',
        createdAt: '10분 전',
        imageUrl: 'https://picsum.photos/seed/issue1/200/200'
    },
    {
        id: '2',
        category: '안전',
        status: 'SOLVED',
        title: 'B구역 바닥 미끄럼 주의',
        author: '박영희',
        location: '제2공장 B구역',
        createdAt: '1시간 전',
        imageUrl: 'https://picsum.photos/seed/issue2/200/200'
    },
    {
        id: '3',
        category: '품질',
        status: 'URGENT',
        title: 'C제품 도장 불량 다수 발생',
        author: '최팀장',
        location: '제1공장 도장반',
        createdAt: '어제',
        isUrgent: true
    }
];

export function CompanyIssueList() {
    return (
        <div className="px-4 py-4 space-y-4">
            {MOCK_ISSUES.map(issue => (
                <CompanyIssueCard key={issue.id} issue={issue} />
            ))}
        </div>
    );
}
