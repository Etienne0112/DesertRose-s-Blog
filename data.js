//카테고리 정의
const categoryMap = {
    'CPP': { name: 'C / C++' },
    'ASM': { name: 'Assembly' },
    'CS': { name: 'Computer Science' },
    'UE': { name: 'Unreal Engine' },
    'DX11': { name: 'DirectX 11' },
    'DX12': { name: 'DirectX 12' },
    'MATH': { name: 'Mathematics' },
    'UN' : { name: 'Unity' },
    'WEB': { name: 'Web' },
    'AI' : { name: 'Artificial Intelligence' },
    'GAME': { name: 'Game Development' },
    'OTHER': { name: 'Other' }
};

//작성한 글
const posts = [
    // CPP
    { id: 10001, category: 'CPP', date: '2026-05-07', title: 'CPP 기초부터 마스터 까지 1화',
        summary: '간단한 입출력, 변수와 함수', fileName: 'CPPBasic1.md' },

    // CS
    { id: 13001, category: 'CS', date: '2026-05-07', title: '테스트1',
        summary: '롤체 하고싶다', fileName: 'test12345.md' },

];