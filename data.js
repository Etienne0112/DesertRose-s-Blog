// 블로그에서 사용할 카테고리 목록
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
    'NTT' : { name: 'Nand2Tetris' },
    'NET': { name: 'Network' },
    'OS' : { name: 'Operating System' },
    'OTHER': { name: 'Other' }
};

// 게시글 데이터 (태그 기능 추가)
const posts = [
    //CPP
    { id: 10001, category: 'CPP', date: '2026-05-07', title: 'CPP 기초부터 마스터 까지 1화',
        summary: '왜 우리는 C++을 배워야 하는가?', fileName: 'CPPBasic1.md', tags: ['C++', '기초'] },

    { id: 10002, category: 'CPP', date: '2026-05-07', title: 'CPP 기초부터 마스터 까지 2화',
        summary: '변수란 무엇인가?', fileName: 'CPPBasic2.md', tags: ['C++', '기초'] },

    { id: 10003, category: 'CPP', date: '2026-05-07', title: 'CPP 기초부터 마스터 까지 3화',
        summary: '함수란 무엇인가? 1화', fileName: 'CPPBasic3.md', tags: ['C++', '기초'] },

    { id: 10004, category: 'CPP', date: '2026-05-10', title: 'CPP 기초부터 마스터 까지 4화',
        summary: '함수란 무엇인가? 2화', fileName: 'CPPBasic4.md', tags: ['C++', '기초'] },

    { id: 10005, category: 'CPP', date: '2026-05-12', title: 'CPP 기초부터 마스터 까지 5화',
        summary: '변수는 어떤 자료형들이 있는가?', fileName: 'CPPBasic5.md', tags: ['C++', '기초'] },

    //ASM
    { id: 20001, category: 'ASM', date: '2026-05-12', title: '컴파일러의 For문 최적화',
        summary: '어떠한 조건에서 컴파일러는 For문을 최적화 하는가?', fileName: 'ASMForOpt.md', tags: ['어셈블리어', '최적화'] },

    //CS
    { id: 30001, category: 'CS', date: '2026-05-13', title: '메모리 정렬이란?',
        summary: '왜 같은 구조체인데 메모리 크기가 다를까?', fileName: 'CSStructSize.md', tags: ['Computer Science', '최적화'] },
    
    //UE
    //DX11
    //DX12
    //MATH
    //UN
    //WEB
    //AI
    //GAME
    //NTT
    //NET
    //OS
    //OTHER
];