const socket = io();

socket.on("postsUpdated", res => {
    fetch('/posts', {
        method: 'GET',
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjcsImVtYWlsIjoiZG9kaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6Ijg1OTA3MCIsImlhdCI6MTYxOTAwODIyMSwiZXhwIjoxNjE5MDExODIxfQ.4YnyvoxYz8ZCXvqWsRH_ipwzZtS53hujrxZroKmdiO4'}})
    .then(result => result.json())
    .then(res => {
        let posts = document.getElementById("posts");
        posts.innerHTML = "";
        console.log(res.result);
        res.result.forEach(element => {
            let title = document.createElement('h4');
            title.innerHTML = element.title;
            let description = document.createElement('p');
            description.innerHTML = element.description;
            posts.appendChild(title).append(description);
        });
    })
    .catch((err) => console.log(err));
})
