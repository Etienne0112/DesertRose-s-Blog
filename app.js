const app = document.getElementById('app');

function router() {
    const hash = location.hash.replace('#', '') || 'home';

    if (hash === 'home') {
        renderHome();
    } else if (hash.startsWith('category/')) {
        const categoryKey = hash.split('/')[1];
        renderCategory(categoryKey);
    } else if (hash.startsWith('post/')) {
        const postId = hash.split('/')[1];
        renderPost(postId);
    }
}

// 홈 화면 렌더링
function renderHome() {
    let html = `<h1>학습 기록장</h1><div class="theme-grid">`;

    Object.keys(categoryMap).forEach(key => {
        const cat = categoryMap[key];
        const recent3 = posts.filter(p => p.category === key).slice(0, 3);

        // 카드 전체에 onClick 이벤트 적용. 내부 리스트(li) 클릭 시에도 카테고리로 이동함.
        html += `
            <div class="theme-card" onclick="location.hash='category/${key}'">
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

// 카테고리 목록 렌더링
function renderCategory(key) {
    const cat = categoryMap[key];
    const filtered = posts.filter(p => p.category === key);

    let html = `<h2 class="page-title">${cat.name}</h2><div class="vertical-list">`;
    html += filtered.map(p => `
        <div class="post-item" onclick="location.hash='post/${p.id}'">
            <h3>${p.title}</h3>
            <p>${p.summary}</p>
            <small style="color:var(--text-muted)">${p.date}</small>
        </div>
    `).join('');
    html += `</div><br><a href="#home" style="display:inline-block; margin-top:20px; color:var(--accent);">← 홈으로 돌아가기</a>`;
    app.innerHTML = html;
}

// 개별 글 렌더링
function renderPost(id) {
    const post = posts.find(p => p.id == id);
    if (!post) return app.innerHTML = "글을 찾을 수 없습니다.";

    app.innerHTML = `<div class="markdown-body">로딩 중...</div>`;

    fetch(`posts/${post.fileName}`)
        .then(res => res.text())
        .then(md => {
            app.innerHTML = `
                <article class="markdown-body">${marked.marked(md, { breaks: true })}</article>
                <hr style="border:0; border-top:1px solid var(--border); margin:40px 0;">
                <a href="#category/${post.category}" style="color:var(--accent);">← 목록으로 돌아가기</a>
            `;
            document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
        })
        .catch(() => app.innerHTML = "<h2>파일을 불러오지 못했습니다.</h2><p>posts 폴더에 마크다운 파일이 있는지 확인해주세요.</p>");
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);