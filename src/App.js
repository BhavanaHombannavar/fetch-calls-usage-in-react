
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [updateApp, setUpdateApp] = useState(false);

  useEffect(()=>{
    let currentPosts = posts;
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(json=>json.json())
    .then(jsonRes=>{
      jsonRes.map((obj)=>{
        // console.log(obj)
        return fetch('https://jsonplaceholder.typicode.com/photos/'+obj.id)
        .then(res=>res.json())
        .then(photo=>{
          // console.log(obj)
          // console.log(photo)

          currentPosts.push({obj, photo})
          setPosts(currentPosts)
        })
      })
    })
    .then(()=>{
      setUpdateApp(true)
    })
  }, [updateApp])

  const changeColor = (e) => {
    console.log(e)
    e.target.classList.add('active')
  }


  return (
    <div className="App"  >
      {console.log(posts)}
      {posts.map(post=>{
        return <div className="width100" key={post.id}>
          <div className="width30">
              <img src={post.photo.thumbnailUrl} />
          </div>
          <div className="width70">
            <h2 onClick={changeColor}>{post.obj.title}</h2>
            {post.obj.body.length > 150 ? post.obj.body.slice(0, 150)+'...'  : post.obj.body}
          </div>
        </div>
      })}

    </div>
  );
}

export default App;
