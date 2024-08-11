// index.html and profile.html
document.addEventListener('DOMContentLoaded', () => {
    axios.get('/api/posts')
        .then(response => {
            const posts = response.data;
            const container = document.getElementById('posts') || document.getElementById('user-posts');
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

// post-detail.html
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    
    axios.get(`/api/post-detail?postId=${postId}`)
        .then(response => {
            const post = response.data;
            document.getElementById('post-title').innerText = post.title;
            document.getElementById('author-avatar').src = post.author.avatar;
            document.getElementById('author-name').innerText = post.author.name;
            document.getElementById('post-description').innerText = post.description;
            document.getElementById('post-time').innerText = new Date(post.timestamp).toLocaleString();
            
            const carousel = document.querySelector('.carousel-images');
            post.images.forEach(image => {
                const img = document.createElement('img');
                img.src = image;
                carousel.appendChild(img);
            });
            
            new Swiper('.carousel', { /* Swiper options */ });
        });
});
