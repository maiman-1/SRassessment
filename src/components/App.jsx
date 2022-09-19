import { useEffect, useState } from "react";
import Posts from './Posts';

function App() {
  /*Step 1: UseState to retrieve data from mock api*/
  let [selectedPosts, setSelectedPosts] = useState([])

  // useState function for retrieving data from mock api
  // taken from: https://miragejs.com/docs/getting-started/introduction/
  useEffect(() => {
    fetchData()
  }, [])

  let fetchData = () => {
    fetch("/api/posts")
    .then((response) => response.json())
    .then((json) => setSelectedPosts(json))
  }

  /* Step 2: Creating a category filter */
  //https://dev.to/salehmubashar/search-bar-in-react-js-545l
  let [categoryFilter, setCategoryFilter] = useState("")

  // Handles the input from categoryFilterSearchInput
  let InputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setCategoryFilter(lowerCase);
    
    if (categoryFilter === '' || categoryFilter.length === 1) {
      fetchData()
    }

    // filter the posts
    let filteredPosts = selectedPosts.posts.filter((post) => {
      if (post.categories.filter((category) => category.name.toLowerCase().includes(categoryFilter)).length > 0){
        return post
      }
    })
    selectedPosts.posts = filteredPosts
  }

  return <div>
      {/* {console.log(selectedPosts)} */}
      <div className="categoryFilterSearchDiv">
        <input 
          type='text' 
          placeholder="Category Filter..." 
          className="categoryFilterSearchInput"
          onChange={InputHandler}></input>
      </div>

      <Posts posts={selectedPosts}/>
    </div>
}

export default App;
