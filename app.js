
const baseURL = 'http://api.tvmaze.com/search/shows'
const showContainer = document.querySelector('#showContainer');

const form = document.querySelector('#searchForm');



form.addEventListener('submit', async function (event) {

    event.preventDefault();
    deleteImages();
    const userInput = form.elements.query.value;
    const config = { params: { q: userInput } }
    const response = await axios.get(`${baseURL}`, config);

    displayImages(response.data);
    form.elements.query.value = "";

    const st = document.querySelector('#showContainer');

    st.style.display = 'flex';


});

const displayImages = (shows) => {
    let i = 0;
    for (let result of shows) {
        if (result.show.image) {
            const btn = document.createElement('button');
            btn.setAttribute('data-toggle', 'modal');
            btn.setAttribute('data-target', '#exampleModal');

            const img = document.createElement('img');
            img.src = result.show.image.medium;
            const title = document.createElement('span');
            let summary = document.createElement('p');
            title.textContent = result.show.name;



            let = summaryText = result.show.summary.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');
            summary.textContent = summaryText;
            btn.append(title);
            btn.append(img);
            btn.append(summary);
            showContainer.append(btn);

        }

    }
    showContainer.addEventListener('click', function (event) {
        const tHolder = document.querySelector('#exampleModalLabel')
        tHolder.innerText = event.target.previousSibling.innerText;

        let sHolder = document.querySelector('#body');

        sHolder.innerText = event.target.nextSibling.innerText;

        const google = document.querySelector('#google')
        google.setAttribute('href', `https://google.com/search?q=${tHolder.innerText}`)
    })

}




const deleteImages = () => {
    const images = document.querySelectorAll('img');

    for (let image of images) {
        image.remove();
    }
}

deleteImages();