//
let listButton = document.querySelector('#navButtons');
//
let workList = document.querySelector('#work-list');

function init () {
    savePagesList();
    saveRepoList();
}

function savePagesList () {
    
}

function createPagesList (event) {

    let apiUrl = 'https://api.github.com/repos/Millerb7/' + 'CodeRefactor' + '/pages';

    fetch(apiUrl)
    .then(function(response) {
        response.json().then(function (data) {
            console.log(data);

            for(var i = 0; i < data.length; i++) {
                var listItem = document.createElement('a');
                listItem.classList = 'workItem col-5 p-5 m-2 text-center';
                listItem.setAttribute('href',data[i].html_url);
                listItem.setAttribute('target','_blank');
                
                var itemName = document.createElement('h5');
                itemName.textContent = data[i].name;
                listItem.append(itemName);
        
                workList.append(listItem);
            }
        })
    });
}

function createRepoList (event) {

    let apiUrl = 'https://api.github.com/users/Millerb7/repos';

    fetch(apiUrl)
    .then(function(response) {
        response.json().then(function (data) {
            console.log(data);

            for(var i = 0; i < data.length; i++) {
                var listItem = document.createElement('a');
                listItem.classList = 'workItem col-5 p-5 m-2 text-center';
                listItem.setAttribute('href',data[i].html_url);
                listItem.setAttribute('target','_blank');

                var itemName = document.createElement('h4');
                itemName.textContent = data[i].name;
                listItem.append(itemName);

                var itemDescription = document.createElement('p');
                itemDescription.textContent = data[i].description;
                listItem.append(itemDescription);

                workList.append(listItem);
            }
        })
    });
}

listButton.addEventListener('click', function() {
    document.querySelector('#workListLabel').textContent = event.target.textContent;
    console.log(event.target.textContent);

    if(event.target.textContent === 'Deployed Applications') {
        createPagesList(event);
    } else if (event.target.textContent === 'Github Repositories') {
        createRepoList(event);
    }

    workList.textContent = "";
});

init();