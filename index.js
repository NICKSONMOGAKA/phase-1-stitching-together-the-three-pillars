// Step 1: Function to initialize the hearts' click event listeners
const initializeHearts = () => {
  const articleHearts = document.querySelectorAll('.like-heart');

  articleHearts.forEach((heart) => {
    heart.addEventListener('click', async () => {
      const postId = heart.dataset.postId;
      const liked = heart.classList.contains('red-heart');

      try {
        const { postId: updatedPostId, liked: updatedLiked } = await mockServerResponse(postId, !liked);
        const updatedHeart = document.querySelector(`[data-post-id="${updatedPostId}"]`);

        if (updatedLiked) {
          updatedHeart.classList.add('red-heart');
        } else {
          updatedHeart.classList.remove('red-heart');
        }

        console.log(`Post ${updatedPostId} is now ${updatedLiked ? 'liked' : 'unliked'}`);
      } catch (error) {
        console.error('Error updating post:', error);
      }
    });
  });
};

// Step 2: Mock server communication function
const mockServerResponse = (postId, liked) => {
  console.log(`Sending ${liked ? 'like' : 'unlike'} request for post ${postId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ postId, liked });
    }, 500);
  });
};

// Export the necessary variables for testing
module.exports = {
  initializeHearts,
  mockServerResponse
};

// Automatically initialize hearts if we're in the browser environment
if (typeof document !== 'undefined') {
  initializeHearts();
}

