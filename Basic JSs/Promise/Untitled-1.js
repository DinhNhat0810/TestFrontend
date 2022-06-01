// Promise Example 

var users = [
    {
        id:1,
        name:'Cat'
    },
    {
        id:2,
        name:'Dog'
    },
    {
        id:3,
        name:'Duck'
    }
];

var comments = [
    {
        id:1,
        user_id:1,
        content:'You are lazy',
        link: 'google.com.vn'
    },
    {
        id:2,
        user_id:2,
        content:'No, it\'s you',
        link: 'google.com.vn'

    },
    {
        id:3,
        user_id:3,
        content:'Both of you',
        link: 'google.com.vn'

    }
    
];
// Creative getcommetns function
function getComments(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(comments)
        },1000)
    });
}

// Creative getUsersById function
function getUsersById(userIds){
    return new Promise(function(resolve){
        var result = users.filter(function(user){
            return userIds.includes(user.id);
        });
        setTimeout(function(){
            resolve(result);
        },1000)
    })
}


getComments()
    .then(function(comments){
        var userIds = comments.map(function(comment){
            return comment.user_id;
        })

        return getUsersById(userIds)
            .then(function(users){
                return {
                    users: users,
                    comments: comments
                };
        });
    })
    
    .then(function(data){
        var commentBlock = document.getElementById('comment-block');

        var html = '';
        data.comments.forEach(function(comment){
            var user = data.users.find(function(user){
                return user.id === comment.user_id;
            })
            html+=`<li>${user.name}: ${comment.content}</li>`;
        });
        commentBlock.innerHTML=html;
    })