const contentBox = document.querySelector('#content-box');
const nextButt = document.querySelector('#btt-next');
const prevButt = document.querySelector('#btt-prev');
let id = 0;
let tab = [];
function fetchData() {
    const url = 'https://picsum.photos/v2/list';
    return fetch(url).then(resp => {
        return resp.json();

    });
}

async function getLinks() {

    const arrTab = await fetchData();
    let i = 0;
    arrTab.forEach(item => {
        let parts = item.url.split('photos/', 2);
        if (parts[1]) {
            const data = {
                id: i,
                url: 'http://source.unsplash.com/' + parts[1]
            }
            tab.push(data)
            i++;
        }
    })
    presentsData();
}
function presentsData() {
    tab.forEach(item => {
        if (item.id >= id && item.id < id + 3) {
            const template = document.querySelector('#template');
            const boxImg = document.importNode(template.content, true);
            boxImg.querySelector('img').src = item.url;
            contentBox.append(boxImg);
        }
    });

}

function deleteNode() {
    const contentBox = document.querySelectorAll('#content-box .img-box');
    for (const box of contentBox) {
        box.remove();
    }
}
nextButt.addEventListener('click', () => {
    id += 3;
    deleteNode();
    presentsData();
})
prevButt.addEventListener('click', () => {
    id -= 3;
    if (id <= 0) {
        id = 0;
    }
    deleteNode();
    presentsData();
})
getLinks();




