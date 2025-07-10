

document.addEventListener('DOMContentLoaded', function() {

    const postsContainer = document.getElementById('postCont');
    const loadingIndicator = document.getElementById('loading');
    const errorMessage = document.getElementById('errorMsg');

    const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5';
    
   
    function showLoading() {
        loadingIndicator.style.display = 'block';
         errorMessage.style.display = 'none';
        postsContainer.style.display = 'none';
    }

    function hideLoading() {
        loadingIndicator.style.display = 'none';
    }

    function showError(message = 'Failed to load blog posts. Please try again.') {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        postsContainer.style.display = 'none';
    }
    
  
    function LengthMax(text, maxLength = 150) {
       if (text.length <= maxLength) {
         
            return text;
        }
        return text.substring(0, maxLength).trim() + '...';
    }

   
    function createPostHTML(post) {
        return `
            <div class="post-card" data-post-id="${post.id}">
                <div class="post-header">
                    <span class="post-id">Post #${post.id}</span>
                    <h3 class="post-title">${post.title}</h3>
                </div>
                <div class="post-body">
                    <p>${LengthMax(post.body)}</p>
                </div>
                <div class="post-meta">
                    <span class="user-id">Author ID: ${post.userId}</span>
                </div>
            </div>
        `;
    }

  
    function displayPosts(posts) {
       
        if (!posts || posts.length === 0) {
           
            postsContainer.innerHTML = '<p class="no-posts">No blog posts found.</p>';
            postsContainer.style.display = 'block';
            return;
        }
        //posts.map= loops through each posts in the array
     
        const postsHTML = posts.map(post => createPostHTML(post)).join('');
        postsContainer.innerHTML = postsHTML;
        postsContainer.style.display = 'grid';
        addPostClickListeners();
    }

  
    function addPostClickListeners() {
        const postCards = document.querySelectorAll('.post-card');
        postCards.forEach(card => {
            card.addEventListener('click', function() {
               const postId = this.getAttribute('data-post-id');
                console.log(`Clicked on post ${postId}`);
                alert(`You clicked on post #${postId}. Full post view coming soon!`);
            });
        });
    }

   
    async function fetchBlogPosts() {
        try { 
            showLoading();
            // await = wait for server response
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Parse the JSON response body into JavaScript objects
            const posts = await response.json();
        
            hideLoading();
            displayPosts(posts);
            console.log(`Successfully loaded ${posts.length} blog posts`);

        } catch (error) {

            console.error('Error fetching blog posts:', error);
         
            hideLoading();
       
            showError(`Error loading posts: ${error.message}`);
        }
    }

 
    console.log('Page loaded - fetching initial blog posts...');
    fetchBlogPosts();

});
