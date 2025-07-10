// Blog comment functionality with localStorage persistence
document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');
    
    // Storage key for localStorage
    const STORAGE_KEY = 'blog_comments';
    
    // Array to store comments - load from localStorage or initialize empty
    let comments = loadCommentsFromStorage();
    
    // Function to load comments from localStorage
    function loadCommentsFromStorage() {
        try {
            const storedComments = localStorage.getItem(STORAGE_KEY);
            return storedComments ? JSON.parse(storedComments) : [];
        } catch (error) {
            console.error('Error loading comments from localStorage:', error);
            return [];
        }
    }
    
    // Function to save comments to localStorage
    function saveCommentsToStorage() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
        } catch (error) {
            console.error('Error saving comments to localStorage:', error);
            // Handle storage quota exceeded or other errors
            alert('Unable to save comment. Storage may be full.');
        }
    }
    
    // Function to clear all comments (useful for testing or admin purposes)
    function clearAllComments() {
        if (confirm('Are you sure you want to delete all comments? This action cannot be undone.')) {
            comments = [];
            saveCommentsToStorage();
            displayComments();
        }
    }
    
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
    
    // Function to escape HTML to prevent XSS attacks
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Function to create comment HTML
    function createCommentHTML(comment) {
        return `
            <div class="comment" data-comment-id="${comment.id}">
                <div class="comment-avatar">
                    <img src="default.jpg" alt="Commenter Avatar" onerror="this.style.display='none'" />
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h4 class="commenter-name">${escapeHtml(comment.name)}</h4>
                        <span class="comment-date">${comment.date}</span>
                        <button class="delete-comment" onclick="deleteComment(${comment.id})" title="Delete comment">×</button>
                    </div>
                    <p class="comment-text">${escapeHtml(comment.text)}</p>
                </div>
            </div>
        `;
    }
    
    // Function to display all comments
    function displayComments() {
        if (comments.length === 0) {
            commentsList.innerHTML = `
                <p class="no-comments">No comments yet. Be the first to share your thoughts!</p>
                <div class="comments-stats">
                    <small>Comments are saved locally in your browser</small>
                </div>
            `;
            return;
        }
        
        const commentsHTML = comments.map(comment => createCommentHTML(comment)).join('');
        const statsHTML = `
            <div class="comments-stats">
                <small>${comments.length} comment${comments.length !== 1 ? 's' : ''} • Comments saved locally</small>
                <button class="clear-comments-btn" onclick="clearAllComments()">Clear All Comments</button>
            </div>
        `;
        
        commentsList.innerHTML = commentsHTML + statsHTML;
    }
    
    // Function to add a new comment
    function addComment(name, email, text) {
        const newComment = {
            id: Date.now(), // Simple ID generation
            name: name,
            email: email, // Store email but don't display it
            text: text,
            date: formatDate(new Date()),
            timestamp: new Date().toISOString() // For sorting purposes
        };
        
        // Add to beginning of array (newest first)
        comments.unshift(newComment);
        
        // Save to localStorage
        saveCommentsToStorage();
        
        // Update display
        displayComments();
        
        // Show success message with fade effect
        showSuccessMessage('Comment added successfully!');
    }
    
    // Function to delete a comment
    function deleteComment(commentId) {
        if (confirm('Are you sure you want to delete this comment?')) {
            comments = comments.filter(comment => comment.id !== commentId);
            saveCommentsToStorage();
            displayComments();
            showSuccessMessage('Comment deleted successfully!');
        }
    }
    
    // Function to show success message
    function showSuccessMessage(message) {
        // Remove existing success message if any
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create and show new success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            successDiv.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => successDiv.remove(), 300);
        }, 3000);
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
        
        // Check comment length
        if (commentText.length > 1000) {
            alert('Comment is too long. Please keep it under 1000 characters.');
            return;
        }
        
        // Add the comment
        addComment(name, email, commentText);
        
        // Reset form
        commentForm.reset();
        
        // Scroll to comments section
        commentsList.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Make functions available globally for onclick handlers
    window.deleteComment = deleteComment;
    window.clearAllComments = clearAllComments;
    
    // Initialize comments display on page load
    displayComments();
    
    // Add some CSS for animations and styling
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .delete-comment {
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            font-size: 18px;
            padding: 0 5px;
            margin-left: 10px;
            border-radius: 3px;
            transition: all 0.2s ease;
        }
        
        .delete-comment:hover {
            background: #ff4444;
            color: white;
        }
        
        .comments-stats {
            margin-top: 20px;
            padding: 15px;
            background: #f5f5f5;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .clear-comments-btn {
            background: #ff4444;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.2s ease;
        }
        
        .clear-comments-btn:hover {
            background: #cc0000;
        }
        
        .comment {
            position: relative;
            transition: all 0.2s ease;
        }
        
        .comment:hover {
            background: #fafafa;
        }
        
        .comment-header {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
        }
        
        @media (max-width: 600px) {
            .comments-stats {
                flex-direction: column;
                text-align: center;
            }
            
            .success-message {
                right: 10px !important;
                left: 10px !important;
                top: 10px !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Optional: Export comments functionality for debugging
    window.blogComments = {
        getComments: () => comments,
        exportComments: () => JSON.stringify(comments, null, 2),
        importComments: (jsonString) => {
            try {
                const importedComments = JSON.parse(jsonString);
                comments = importedComments;
                saveCommentsToStorage();
                displayComments();
                showSuccessMessage('Comments imported successfully!');
            } catch (error) {
                alert('Invalid JSON format for comments import.');
            }
        }
    };
});