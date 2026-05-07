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
        summary: '왜 우리는 C++을 배워야 하는가?', fileName: 'CPPBasic1.md' },
    { id: 10002, category: 'CPP', date: '2026-05-07', title: 'CPP 기초부터 마스터 까지 2화',
        summary: '변수란 무엇인가?', fileName: 'CPPBasic2.md' },
    { id: 10003, category: 'CPP', date: '2026-05-07', title: 'CPP 기초부터 마스터 까지 3화',
        summary: '함수란 무엇인가? 1화', fileName: 'CPPBasic3.md' },
    //ASM
    //CS
    //UE
    //DX11
    //DX12
    //MATH
    //UN
    //WEB
    //AI
    //GAME
    //OTHER
];