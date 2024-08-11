document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.getElementById('nav-links');

    // �����û���¼״̬�洢�� localStorage �У����磬localStorage.getItem('loggedIn')��
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    if (isLoggedIn) {
        // �û��ѵ�¼
        navLinks.innerHTML = `
            <li><a href="publish.html">����</a></li>
            <li><a href="notifications.html">֪ͨ</a></li>
            <li><a href="profile.html"><img src="user-avatar.jpg" alt="�û�ͷ��" id="user-avatar"></a></li>
        `;
    } else {
        // �û�δ��¼
        navLinks.innerHTML = `
            <li><a href="login.html">��¼</a></li>
            <li><a href="register.html">ע��</a></li>
        `;
    }

    // ���ط�������
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
