
function login_cookie(event){
    event.preventDefault();
    const Key = document.getElementById('login_id').value;
    if(Key.length === 0){
        alert("please enter the Key");
    }
    else{
        fetch('/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',              
            },
            body: JSON.stringify({privateKey : Key})
        })
        .then(function(response){
            console.log(response);
            return response.json();
        })
        .then(function (data){
            console.log(JSON.stringify(data));
            if(data.done =1){
                sessionStorage.clear();
                sessionStorage.setItem("privatekey",data.privatekey);
                alert(data.message);
                window.location.href='/home';
            }
            else{
                window.location.href='/';
            }
        })
        .catch(function(err){
            console.log(err);
            alert("Error in processing request");
        })
    }
}

function logout_cookie(event){
    event.preventDefault();
    sessionStorage.clear();
    window.location.href='/';
}

function bake_cookie(event){
    event.preventDefault();
    const p_key=sessionStorage.getItem('privatekey');
    const bake_cookie = document.getElementById('bake_id').value;
    if(bake_cookie.length === 0){
    alert("Please enter a number");

     }
    else{
        fetch('/bake',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',              
            },
            body: JSON.stringify({pri_key: p_key, cookie: bake_cookie})
        })
        .then(function(response){
            console.log(response);
            return response.json();
        })
        .then(function (data){
            console.log(JSON.stringify(data));
            alert(data.message);
        })
        .catch(function(err){
            console.log(err);
            alert("Error in processing request");
        })

    }
}

function eat_cookie(event){
    event.preventDefault();
    const p_key=sessionStorage.getItem('privatekey');
    const eat_cookie = document.getElementById('eat_id').value;
    console.log("value"+eat_cookie)
    if(eat_cookie.length === 0){
        alert("Please enter the number");  
    }
    else{
        fetch('/eat',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',              
            },
            body: JSON.stringify({pri_key : p_key, cookie : eat_cookie})
        })
        .then(function(response){
            console.log(response);
            return response.json();
        })
        .then(function (data){
            console.log(JSON.stringify(data));
            alert(data.message);
        })
        .catch(function(err){
            console.log(err);
            alert("Error in processing request");
        })
    }

}

function count_cookie(event){
    event.preventDefault();
    const p_key=sessionStorage.getItem('privatekey');
    fetch('/count',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',              
        },
        body: JSON.stringify({pri_key : p_key})
    })
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function (data){
        console.log(JSON.stringify(data));
        alert("Your cookie count is:"  + data.count);
        document.getElementById("count_id").value ="Your cookies = " + data.count;
    })
    .catch(function(err){
        console.log(err);
        alert("Error in processing request");
    })

}
