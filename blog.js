// Blog comment functionality
document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');
    
    // Array to store comments (in a real app, this would be stored in a database)
    let comments = [];
    
    // Function to format date
    function formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    }
    
    // Function to create comment HTML
    function createCommentHTML(comment) {
        return `
            <div class="comment">
                <div class="comment-avatar">
                    <img src="default.jpg" alt="Commenter Avatar" />
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h4 class="commenter-name">${comment.name}</h4>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <p class="comment-text">${comment.text}</p>
                </div>
            </div>
        `;
    }
    
    // Function to display all comments
    function displayComments() {
        if (comments.length === 0) {
            commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to share your thoughts!</p>';
            return;
        }
        
        const commentsHTML = comments.map(comment => createCommentHTML(comment)).join('');
        commentsList.innerHTML = commentsHTML;
    }
    
    // Function to add a new comment
    function addComment(name, email, text) {
        const newComment = {
            id: Date.now(), // Simple ID generation
            name: name,
          
            text: text,
            date: formatDate(new Date())
        };
        
        comments.unshift(newComment);
        displayComments();
    }
    
    // Handle form submission
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const commentText = document.getElementById('comment').value.trim();
        
        // Basic validation
        if (!name || !email || !commentText) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        
        // Add the comment
        addComment(name, commentText);
        
        // Reset form
        commentForm.reset();
        
        // Show success message
        alert('Thank you for your comment! It has been added below.');
        
        // Scroll to comments section
        commentsList.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Initialize comments display
    displayComments();
    
    
});
