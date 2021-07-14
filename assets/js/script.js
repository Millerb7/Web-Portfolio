//
let listButton = document.querySelector('#navButtons');
//
let workList = document.querySelector('#work-list');
//
let highlightButton = document.querySelector('#highlightNavbar');
//
let highligtedContainer = document.querySelector('#highlightedWork');

function init () {

}

function createPagesList (event) {

    let apiUrl = 'https://api.github.com/users/Millerb7/repos?type=public';

    fetch(apiUrl)
    .then(function(response) {
        response.json().then(function (data) {
            console.log(data);

            for(var i = 0; i < data.length; i++) {
                var listItem = document.createElement('a');
                listItem.classList = 'workItem col-sm-12 col-lg-5 p-5 m-2 text-center';
                listItem.setAttribute('href','https://millerb7.github.io/' + data[i].name + '/');
                listItem.setAttribute('target','_blank');
                
                var itemName = document.createElement('h5');
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

function createRepoList (event) {

    let apiUrl = 'https://api.github.com/users/Millerb7/repos';

    fetch(apiUrl)
    .then(function(response) {
        response.json().then(function (data) {
            console.log(data);

            /* logo addition
            let githubLogo = document.createElement('img');
            githubLogo.setAttribute('src',data[0].owner.avatar_url);
            document.querySelector('#workListLabel').append(githubLogo);
            */

            for(var i = 0; i < data.length; i++) {
                var listItem = document.createElement('a');
                listItem.classList = 'workItem col-sm-12 col-lg-5 p-5 m-2 text-center';
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

function highlightWork (event) {
    let apiUrl = 'https://api.github.com/repos/Millerb7/' + event.target.getAttribute('name') + '/readme';

    fetch(apiUrl)
    .then(function(response) {
        response.json().then(function (data) {
            console.log(data);

            let workImage = document.createElement('img');
            workImage.setAttribute('src','assets/images/8455_DrakeNo.png');
            workImage.classList = 'p-3 col-4';
            workImage.setAttribute('style','');
            highligtedContainer.append(workImage);

            let workDescription = document.createElement('p');
            workDescription.textContent = data.content;
            workDescription.classList = 'text-center p-3 col-8 align-items-center';
            workDescription.setAttribute('style','');
            highligtedContainer.append(workDescription);
        })
    });
}

listButton.addEventListener('click', function() {
    // tells you which button was pressed to create the modal
    document.querySelector('#workListLabel').textContent = event.target.textContent;
    console.log(event.target.textContent);

    if(event.target.textContent === 'Deployed Applications') {
        createPagesList(event);
    } else if (event.target.textContent === 'Github Repositories') {
        createRepoList(event);
    }

    workList.textContent = "";
});

highlightButton.addEventListener('click',function() {
    // removes border from the aside / nav bar
    this.setAttribute('style','border: none;');
    // removes the content
    highligtedContainer.textContent = "";
    //
    let temp = event.target.textContent;
    event.target.textContent = "";
    // puts border on unselected buttons
    for(let i = 0; i < this.children[0].children.length; i++) {
        if(this.children[0].children[i].textContent !== event.target.textContent) {
            this.children[0].children[i].setAttribute('style','border-left: 5px solid var(--dark);')
        }
        
    }
    // makes the button blend with the work
    event.target.parentElement.setAttribute('style','background-color: var(--primary); border: none;');

    highlightWork(event);

    // removes border on unselected buttons
    //event.target.parentElement.setAttribute('style','background-color: var(--complementary);');

    event.target.textContent = temp;
});

init();