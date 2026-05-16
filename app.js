// 한 페이지에 표시할 게시글 수 설정
const POSTS_PER_PAGE = 5;

const app = document.getElementById('app');
const getSortedPosts = () => [...posts].sort((a, b) => b.id - a.id);

function router() {
    const hash = decodeURIComponent(location.hash.replace('#', '')) || 'home';

    // 애니메이션 리셋
    app.classList.remove('animate-in');
    void app.offsetWidth;
    app.classList.add('animate-in');

    if (hash === 'home') {
        renderHome();
    } else if (hash.startsWith('category/')) {
        const parts = hash.split('/');
        renderCategory(parts[1], parseInt(parts[2]) || 1, parts[3] || null);
    } else if (hash.startsWith('post/')) {
        renderPost(hash.split('/')[1]);
    } else if (hash.startsWith('search/')) {
        const parts = hash.split('/');
        renderSearch(parts[1], parseInt(parts[2]) || 1);
    }
}

// 하단 공통 카테고리 네비게이션 생성
function getBottomCategoriesHTML() {
    let html = `<div class="bottom-categories"><h3>다른 카테고리 둘러보기</h3><div class="bottom-cat-grid">`;
    Object.keys(categoryMap).forEach(key => {
        html += `<a href="#category/${key}/1" class="bottom-cat-item">${categoryMap[key].name}</a>`;
    });
    html += `</div></div>`;
    return html;
}

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

function renderCategory(key, page, targetTag) {
    const cat = categoryMap[key];
    const categoryPosts = getSortedPosts().filter(p => p.category === key);

    const tagsSet = new Set();
    categoryPosts.forEach(p => { if(p.tags) p.tags.forEach(t => tagsSet.add(t)) });
    const uniqueTags = Array.from(tagsSet);

    let filtered = categoryPosts;
    if (targetTag) {
        filtered = categoryPosts.filter(p => p.tags && p.tags.includes(targetTag));
    }

    const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE) || 1;
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const paginatedPosts = filtered.slice(startIndex, startIndex + POSTS_PER_PAGE);

    let html = `<h2 class="page-title">${cat.name} ${targetTag ? `<span style="color:var(--accent); font-size:1.2rem;">#${targetTag}</span>` : ''}</h2>`;

    html += `<div class="category-layout">`;

    html += `<div class="tag-sidebar">
                <button class="tag-btn ${!targetTag ? 'active' : ''}" onclick="location.hash='category/${key}/1'">전체보기 (${categoryPosts.length})</button>`;
    uniqueTags.forEach(tag => {
        const count = categoryPosts.filter(p => p.tags && p.tags.includes(tag)).length;
        const isActive = tag === targetTag ? 'active' : '';
        html += `<button class="tag-btn ${isActive}" onclick="location.hash='category/${key}/1/${tag}'"># ${tag} (${count})</button>`;
    });
    html += `</div>`;

    html += `<div class="post-list-area">`;
    if (paginatedPosts.length === 0) {
        html += `<p style="color:var(--text-muted); text-align:center; padding:40px 0;">게시글이 없습니다.</p>`;
    }

    html += paginatedPosts.map(p => {
        let tagsHtml = '';
        if (p.tags && p.tags.length > 0) {
            tagsHtml = `<div class="inline-tags">${p.tags.map(t => `<span class="inline-tag">#${t}</span>`).join('')}</div>`;
        }
        return `
            <div class="post-item" onclick="location.hash='post/${p.id}'">
                ${tagsHtml}
                <h3>${p.title}</h3>
                <p>${p.summary}</p>
                <small style="color:var(--text-muted)">${p.date}</small>
            </div>
        `;
    }).join('');

    html += `<div style="margin-top: 40px; display: flex; justify-content: center; align-items: center; gap: 20px;">`;
    const tagQuery = targetTag ? `/${targetTag}` : '';

    if (page > 1) html += `<a href="#category/${key}/${page - 1}${tagQuery}" style="color:var(--accent);">← 이전</a>`;
    else html += `<span style="color:var(--border);">← 이전</span>`;

    html += `<span style="color:var(--text-main); font-weight:bold;">${page} / ${totalPages}</span>`;

    if (page < totalPages) html += `<a href="#category/${key}/${page + 1}${tagQuery}" style="color:var(--accent);">다음 →</a>`;
    else html += `<span style="color:var(--border);">다음 →</span>`;

    html += `</div></div></div>`;

    html += getBottomCategoriesHTML();
    app.innerHTML = html;
}

function renderSearch(keyword, page) {
    const filtered = getSortedPosts().filter(p =>
        p.title.includes(keyword) ||
        (p.summary && p.summary.includes(keyword)) ||
        (p.tags && p.tags.includes(keyword))
    );

    const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE) || 1;
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const paginatedPosts = filtered.slice(startIndex, startIndex + POSTS_PER_PAGE);

    let html = `<h2 class="page-title">"${keyword}" 검색 결과 <span style="font-size:1.2rem; color:var(--text-muted);">(${filtered.length}건)</span></h2>`;

    html += `<div class="vertical-list">`;
    if (paginatedPosts.length === 0) {
        html += `<p style="text-align:center; padding: 40px; color:var(--text-muted);">일치하는 결과가 없습니다.</p>`;
    }

    html += paginatedPosts.map(p => {
        let tagsHtml = p.tags && p.tags.length > 0 ? `<div class="inline-tags">${p.tags.map(t => `<span class="inline-tag">#${t}</span>`).join('')}</div>` : '';
        return `
            <div class="post-item" onclick="location.hash='post/${p.id}'">
                ${tagsHtml}
                <h3>${p.title}</h3>
                <p>${p.summary}</p>
                <small style="color:var(--text-muted)">[${categoryMap[p.category].name}] ${p.date}</small>
            </div>
        `;
    }).join('');
    html += `</div>`;

    html += `<div style="margin-top: 40px; display: flex; justify-content: center; gap: 20px;">`;
    if (page > 1) html += `<a href="#search/${keyword}/${page - 1}" style="color:var(--accent);">← 이전</a>`;
    else html += `<span style="color:var(--border);">← 이전</span>`;

    html += `<span>${page} / ${totalPages}</span>`;

    if (page < totalPages) html += `<a href="#search/${keyword}/${page + 1}" style="color:var(--accent);">다음 →</a>`;
    else html += `<span style="color:var(--border);">다음 →</span>`;
    html += `</div>`;

    html += getBottomCategoriesHTML();
    app.innerHTML = html;
}

function renderPost(id) {
    const sortedPosts = getSortedPosts();
    const currentIndex = sortedPosts.findIndex(p => p.id == id);

    if (currentIndex === -1) return app.innerHTML = "글을 찾을 수 없습니다.";

    const post = sortedPosts[currentIndex];
    const categoryPosts = sortedPosts.filter(p => p.category === post.category);
    const catIndex = categoryPosts.findIndex(p => p.id == id);

    const nextPost = catIndex > 0 ? categoryPosts[catIndex - 1] : null;
    const prevPost = catIndex < categoryPosts.length - 1 ? categoryPosts[catIndex + 1] : null;

    app.innerHTML = `<div class="markdown-body">로딩 중...</div>`;

    fetch(`posts/${post.fileName}`)
        .then(res => res.text())
        .then(md => {
            let tagsHtml = post.tags && post.tags.length > 0
                ? `<div class="post-meta-tags">${post.tags.map(t => `<span class="inline-tag" style="cursor:pointer;" onclick="location.hash='category/${post.category}/1/${t}'">#${t}</span>`).join('')}</div>`
                : '';

            let html = `<article class="markdown-body">
                            ${tagsHtml}
                            ${marked.marked(md, { breaks: true })}
                        </article>`;

            html += `<hr style="border:0; border-top:1px solid var(--border); margin:50px 0 30px;">`;
            html += `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; font-size: 0.95rem;">`;

            if (prevPost) html += `<a href="#post/${prevPost.id}" style="color:var(--accent); flex: 1;"><span style="color:var(--text-muted); font-size:0.8rem; display:block;">이전글</span>← ${prevPost.title}</a>`;
            else html += `<div style="flex: 1;"></div>`;

            if (nextPost) html += `<a href="#post/${nextPost.id}" style="color:var(--accent); flex: 1; text-align: right;"><span style="color:var(--text-muted); font-size:0.8rem; display:block;">다음글</span>${nextPost.title} →</a>`;
            else html += `<div style="flex: 1;"></div>`;

            html += `</div>`;

            html += `<div style="text-align:center;">
                        <a href="#category/${post.category}/1" style="color:var(--text-muted); border: 1px solid var(--border); padding: 8px 20px; border-radius: 20px;">목록으로 돌아가기</a>
                     </div>`;

            html += getBottomCategoriesHTML();

            app.innerHTML = html;
            document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));
        })
        .catch(() => app.innerHTML = "<h2>파일을 불러오지 못했습니다.</h2>");
}

// 검색 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if(searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                const val = e.target.value.trim();
                if(val) {
                    location.hash = `search/${encodeURIComponent(val)}/1`;
                    e.target.value = ''; // 검색 후 입력창 비우기
                }
            }
        });
    }
});

window.addEventListener('hashchange', router);
window.addEventListener('load', router);