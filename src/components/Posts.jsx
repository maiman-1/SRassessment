import {useState } from "react";

function Posts(props) {
    /*Step 3: Creating pagination */
    // pagination information
    let postsPerPage = 5;
    let pagePerPaginate = 5;
    let [currentPage, setCurrentPage] = useState(1)
    let [pages] = useState(Math.round(props.posts.length/postsPerPage))

    // functions for controlling pages
    let goToNextPage = () => {setCurrentPage((currentPage) = currentPage + 1)}
    let goToPreviousPage = () => {setCurrentPage((currentPage) = currentPage - 1)}
    let changePage = (e) => {
        let pageNumber = Number(e.target.textContent)
        setCurrentPage(pageNumber)
    }
    let slicePosts = () => {
        const startIndex = currentPage * postsPerPage - postsPerPage;
        const endIndex = startIndex + postsPerPage;
        return props.posts.posts?.slice(startIndex, endIndex);
    }

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pagePerPaginate) * pagePerPaginate;
        return new Array(pagePerPaginate).fill().map((_, idx) => start + idx + 1);
      };


    return <div className='postsMainDiv'>
        {/* {posts.posts.map((post) => {console.log(post)})} */}
        <ul className='postsMainList'>
            {
            slicePosts()?.map(
                (post) => {
                return <li key={post.id}><div className='postEachDiv'>
                        <h1 className='postTitle'>{post.title}</h1>
                        <div className='postEachAuthor'>
                            <img src={post.author.avatar} alt="author avatar"></img>{post.author.name}
                        </div>
                        <h3>{post.publishDate}</h3>
                        <p>{post.summary}</p>

                        <ul>
                            {post.categories?.map((category) => {return <li key={category.id}>{category.name}</li>})}
                        </ul>
                        
                    </div></li>
            })
            }
        </ul>


        {/*Here lies pagination*/}

        <div className="pagination">
            {/* previous button */}
            <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
            >
            prev
            </button>

            {/* show page numbers */}
            {getPaginationGroup().map((item, index) => (
            <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${currentPage === item ? 'active' : null}`}
            >
                <span>{item}</span>
            </button>
            ))}

            {/* next button */}
            <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages ? 'disabled' : ''}`}
            >
            next
            </button>
        </div>
    </div>
}

export default Posts;