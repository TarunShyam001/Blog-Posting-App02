const blogForm = document.getElementById('blogForm');
const blogList = document.getElementById('blogList');

let blogs = [];


blogForm.addEventListener('submit',async(event)=>{
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;
  
    try{
        const response = await axios.post('http://localhost:3000/blogs',{ title, author,content });
        blogs.push(response.data);
        renderBlog();
    }
    catch(error){
        console.log('Error adding blog: ',error);
    }

})

async function fetchBlogs(){
    try{
        const response = await axios.get('http://localhost:3000/blogs');
        const   blogs = response.data;
        renderBlog();
    }
    catch(error){
        console.log('Error fetching blogs:: ',error);
    }
}

async function deleteBlog(index) {
    const blog = blogs[index];
    
    try {
      await axios.delete(`http://localhost:3000/blog/${blog.id}`);
      blogs.splice(index, 1);
      renderBlog();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  }


  function renderBlog() {
    const blogList = document.getElementById('blogList');
    blogList.innerHTML = '';
  
    blogs.forEach((blog, index) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `<strong>${blog.title}</strong>: ${blog.author}-: ${blog.content} 
                            <button onclick="deleteBlog(${index})">❌</button>
                            <input type="text" id="commentInput_${index}">
                            <button onclick="postComments(${index})">Comment</button>
                            <div id="comments_${index}"></div>`; 
                            
        blogList.appendChild(listItem);
    });
}

async function postComments(index) {
  const commentInput = document.getElementById(`commentInput_${index}`).value;
  const blogId = blogs[index].id; // Assuming each blog has an 'id' property

  try {
      const response = await axios.post(`http://localhost:3000/blogs/${blogId}/comments`, { commentInput });
      const comment = response.data;
   
      const commentsContainer = document.getElementById(`comments_${index}`);
      const commentElement = document.createElement('div');
      commentElement.textContent = comment.commentText; // Adjust according to your response structure
      commentsContainer.appendChild(commentElement);
  } catch (error) {
      console.error('Error posting comment:', error);
  }
}


  window.onload = fetchBlogs();








