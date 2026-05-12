const app = document.getElementById('app');

// 내림차순 정렬 (최신글이 먼저 오도록)
const getSortedPosts = () => [...posts].sort((a, b) => b.id - a.id);

// 페이지당 보여줄 게시글 수
const POSTS_PER_PAGE = 5;

function router() {
    const hash = location.hash.replace('#', '') || 'home';

    if (hash === 'home') {
        renderHome();
    } else if (hash.startsWith('category/')) {
        const parts = hash.split('/');
        const categoryKey = parts[1];
        const page = parseInt(parts[2]) || 1; // 3번째 인자로 페이지 번호 받기 (없으면 1페이지)
        renderCategory(categoryKey, page);
    } else if (hash.startsWith('post/')) {
        const postId = hash.split('/')[1];
        renderPost(postId);
    }
}

// 홈 화면 렌더링
function renderHome() {
    let html = `<h1>학습 기록장</h1><div class="theme-grid">`;
    const sortedPosts = getSortedPosts();

    Object.keys(categoryMap).forEach(key => {
        const cat = categoryMap[key];
        const recent3 = sortedPosts.filter(p => p.category === key).slice(0, 3);
        html += `
            <div class="theme-card" onclick="location.hash='category/${key}/1'">
                <div class="theme-info">
                    <h2>${cat.name}</h2>
                </div>
                <ul class="recent-list">
                    ${recent3.map(p => `<li>· ${p.title}</li>`).join('')}
                    ${recent3.length === 0 ? '<li style="text-align:center; color:var(--border);">작성된 글이 없습니다.</li>' : ''}
                </ul>
            </div>
        `;
    });

    html += `</div>`;
    app.innerHTML = html;
}

// 카테고리 목록 렌더링 (페이지네이션 적용)
function renderCategory(key, page) {
    const cat = categoryMap[key];
    const filtered = getSortedPosts().filter(p => p.category === key);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE) || 1;
    
    // 유효하지 않은 페이지 접근 방지
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    // 현재 페이지에 해당하는 글만 자르기
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const paginatedPosts = filtered.slice(startIndex, startIndex + POSTS_PER_PAGE);

    let html = `<h2 class="page-title">${cat.name}</h2><div class="vertical-list">`;
    html += paginatedPosts.map(p => `
        <div class="post-item" onclick="location.hash='post/${p.id}'">
            <h3>${p.title}</h3>
            <p>${p.summary}</p>
            <small style="color:var(--text-muted)">${p.date}</small>
        </div>
    `).join('');
    html += `</div>`;

    // 페이지네이션 UI
    html += `<div style="margin-top: 40px; display: flex; justify-content: center; align-items: center; gap: 20px;">`;
    
    // 이전 페이지 버튼
    if (page > 1) {
        html += `<a href="#category/${key}/${page - 1}" style="color:var(--accent);">← 이전</a>`;
    } else {
        html += `<span style="color:var(--border);">← 이전</span>`;
    }

    // 현재 페이지 / 전체 페이지 표시
    html += `<span style="color:var(--text-main); font-weight:bold;">${page} / ${totalPages}</span>`;

    // 다음 페이지 버튼
    if (page < totalPages) {
        html += `<a href="#category/${key}/${page + 1}" style="color:var(--accent);">다음 →</a>`;
    } else {
        html += `<span style="color:var(--border);">다음 →</span>`;
    }
    html += `</div>`;

    html += `<div style="text-align:center; margin-top:30px;">
                <a href="#home" style="display:inline-block; color:var(--text-muted);">홈으로 돌아가기</a>
             </div>`;
             
    app.innerHTML = html;
}

// 개별 글 렌더링 (이전글/다음글 기능 적용)
function renderPost(id) {
    const sortedPosts = getSortedPosts();
    const currentIndex = sortedPosts.findIndex(p => p.id == id);

    if (currentIndex === -1) return app.innerHTML = "글을 찾을 수 없습니다.";

    const post = sortedPosts[currentIndex];

    // 같은 카테고리 내에서 이전글/다음글 찾기
    const categoryPosts = sortedPosts.filter(p => p.category === post.category);
    const catIndex = categoryPosts.findIndex(p => p.id == id);

    // sortedPosts는 최신글이 앞(index 0)에 오도록 정렬되어 있음
    const nextPost = catIndex > 0 ? categoryPosts[catIndex - 1] : null; // 인덱스가 작을수록 최신글(다음글)
    const prevPost = catIndex < categoryPosts.length - 1 ? categoryPosts[catIndex + 1] : null; // 인덱스가 클수록 예전글(이전글)

    app.innerHTML = `<div class="markdown-body">로딩 중...</div>`;

    fetch(`posts/${post.fileName}`)
        .then(res => res.text())
        .then(md => {
            let html = `<article class="markdown-body">${marked.marked(md, { breaks: true })}</article>`;
            
            html += `<hr style="border:0; border-top:1px solid var(--border); margin:50px 0 30px;">`;
            
            // 이전글 / 다음글 네비게이션 구역
            html += `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; font-size: 0.95rem;">`;
            
            // 이전글
            if (prevPost) {
                html += `<a href="#post/${prevPost.id}" style="color:var(--accent); flex: 1; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 10px;">
                            <span style="color:var(--text-muted); font-size:0.8rem; display:block; margin-bottom:3px;">이전글</span>
                            ← ${prevPost.title}
                         </a>`;
            } else {
                html += `<div style="flex: 1;"></div>`; // 빈 공간 채우기
            }

            // 다음글
            if (nextPost) {
                html += `<a href="#post/${nextPost.id}" style="color:var(--accent); flex: 1; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-left: 10px;">
                            <span style="color:var(--text-muted); font-size:0.8rem; display:block; margin-bottom:3px;">다음글</span>
                            ${nextPost.title} →
                         </a>`;
            } else {
                html += `<div style="flex: 1;"></div>`; // 빈 공간 채우기
            }
            
            html += `</div>`; // 네비게이션 종료

            // 목록으로 돌아가기
            html += `
                <div style="text-align:center;">
                    <a href="#category/${post.category}/1" style="color:var(--text-muted); border: 1px solid var(--border); padding: 8px 20px; border-radius: 20px; transition: 0.2s;" onmouseover="this.style.borderColor='var(--accent)'; this.style.color='var(--text-main)';" onmouseout="this.style.borderColor='var(--border)'; this.style.color='var(--text-muted)';">
                        목록으로 돌아가기
                    </a>
                </div>
            `;

            app.innerHTML = html;
            document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
        })
        .catch(() => app.innerHTML = "<h2>파일을 불러오지 못했습니다.</h2><p>posts 폴더에 마크다운 파일이 있는지 확인해주세요.</p>");
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);