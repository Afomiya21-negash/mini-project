// Blog posts fetching functionality using JSONPlaceholder API
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements that we'll be working with
    const postsContainer = document.getElementById('postCont');
    const loadingIndicator = document.getElementById('loading');
    const errorMessage = document.getElementById('errorMsg');
    const refreshBtn = document.getElementById('refreshBtn');
    
    // JSONPlaceholder API endpoint for posts
    const API_URL = 'https://jsonplaceholder.typicode.com/posts';
    
    /**
     * Function to show loading state
     * This hides the posts and error message, shows loading indicator
     */
    function showLoading() {
        loadingIndicator.style.display = 'block';
        errorMessage.style.display = 'none';
        postsContainer.style.display = 'none';
        refreshBtn.disabled = true;
        refreshBtn.textContent = 'Loading...';
    }
    
    /**
     * Function to hide loading state
     * This hides the loading indicator and re-enables the refresh button
     */
    function hideLoading() {
        loadingIndicator.style.display = 'none';
        refreshBtn.disabled = false;
        refreshBtn.textContent = 'Refresh Posts';
    }
    
    /**
     * Function to show error message
     * This displays an error message when the API call fails
     */
    function showError(message = 'Failed to load blog posts. Please try again.') {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        postsContainer.style.display = 'none';
    }
    
    /**
     * Function to truncate text to a specified length
     * This ensures post bodies don't get too long in the preview
     * @param {string} text - The text to truncate
     * @param {number} maxLength - Maximum length before truncation
     * @returns {string} - Truncated text with ellipsis if needed
     */
    function truncateText(text, maxLength = 150) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength).trim() + '...';
    }
    
    /**
     * Function to create HTML for a single blog post card
     * This generates the HTML structure for displaying each post
     * @param {Object} post - Post object from the API
     * @returns {string} - HTML string for the post card
     */
    function createPostHTML(post) {
        return `
            <div class="post-card" data-post-id="${post.id}">
                <div class="post-header">
                    <span class="post-id">Post #${post.id}</span>
                    <h3 class="post-title">${post.title}</h3>
                </div>
                <div class="post-body">
                    <p>${truncateText(post.body)}</p>
                </div>
                <div class="post-meta">
                    <span class="user-id">Author ID: ${post.userId}</span>
                </div>
            </div>
        `;
    }
    
    /**
     * Function to display all blog posts
     * This takes an array of posts and renders them in the container
     * @param {Array} posts - Array of post objects from the API
     */
    function displayPosts(posts) {
        // Check if we have any posts to display
        if (!posts || posts.length === 0) {
            postsContainer.innerHTML = '<p class="no-posts">No blog posts found.</p>';
            postsContainer.style.display = 'block';
            return;
        }
        
        // Generate HTML for all posts by mapping over the array
        const postsHTML = posts.map(post => createPostHTML(post)).join('');
        
        // Insert the generated HTML into the container
        postsContainer.innerHTML = postsHTML;
        postsContainer.style.display = 'grid';
        
        // Add click event listeners to each post card for future interactivity
        addPostClickListeners();
    }
    
    /**
     * Function to add click event listeners to post cards
     * This allows users to click on posts for future functionality (like viewing full post)
     */
    function addPostClickListeners() {
        const postCards = document.querySelectorAll('.post-card');
        postCards.forEach(card => {
            card.addEventListener('click', function() {
                const postId = this.getAttribute('data-post-id');
                console.log(`Clicked on post ${postId}`);
                // Future enhancement: Navigate to full post view
                alert(`You clicked on post #${postId}. Full post view coming soon!`);
            });
        });
    }
    
    /**
     * Main function to fetch blog posts from JSONPlaceholder API
     * This handles the entire process of fetching and displaying posts
     */
    async function fetchBlogPosts() {
        try {
            // Show loading state to user
            showLoading();
            
            // Make the API call to JSONPlaceholder
            // fetch() returns a Promise that resolves to the Response object
            const response = await fetch(API_URL);
            
            // Check if the response is successful (status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Parse the JSON response
            // response.json() returns a Promise that resolves to the parsed JSON
            const posts = await response.json();
            
            // Hide loading state
            hideLoading();
            
            // Display the fetched posts
            displayPosts(posts);
            
            console.log(`Successfully loaded ${posts.length} blog posts`);
            
        } catch (error) {
            // Handle any errors that occurred during the fetch process
            console.error('Error fetching blog posts:', error);
            
            // Hide loading state
            hideLoading();
            
            // Show error message to user
            showError(`Error loading posts: ${error.message}`);
        }
    }
    
    /**
     * Event listener for the refresh button
     * This allows users to manually refresh the blog posts
     */
    refreshBtn.addEventListener('click', function() {
        console.log('Refresh button clicked - fetching posts...');
        fetchBlogPosts();
    });
    
    // Initial load of blog posts when the page loads
    console.log('Page loaded - fetching initial blog posts...');
    fetchBlogPosts();
});
