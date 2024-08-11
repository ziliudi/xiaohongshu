document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.getElementById('nav-links');

    // 假设用户登录状态存储在 localStorage 中（例如，localStorage.getItem('loggedIn')）
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    if (isLoggedIn) {
        // 用户已登录
        navLinks.innerHTML = `
            <li><a href="publish.html">发布</a></li>
            <li><a href="notifications.html">通知</a></li>
            <li><a href="profile.html"><img src="user-avatar.jpg" alt="用户头像" id="user-avatar"></a></li>
        `;
    } else {
        // 用户未登录
        navLinks.innerHTML = `
            <li><a href="login.html">登录</a></li>
            <li><a href="register.html">注册</a></li>
        `;
    }

    // 加载发布内容
    axios.get('/api/posts')
        .then(response => {
            const posts = response.data;
            const container = document.getElementById('posts');
            posts.forEach(post => {
                const item = document.createElement('div');
                item.className = 'masonry-item';
                item.innerHTML = `
                    <a href="post-detail.html?postId=${post.id}">
                        <img src="${post.images[0]}" alt="${post.title}">
                        <h2>${post.title}</h2>
                        <div class="author">
                            <img src="${post.author.avatar}" alt="${post.author.name}">
                            <span>${post.author.name}</span>
                        </div>
                    </a>
                `;
                container.appendChild(item);
            });
            new Masonry(container, { itemSelector: '.masonry-item' });
        });
});
