create = element => document.createElement(element);
append = (parent, child) => parent.append(child);
select = selector => document.querySelector(selector);


const loaderWrapper = select('.loaderWrapper');

document.addEventListener('DOMContentLoaded', () => {

    // loaderWrapper.style.display = 'none';

    setTimeout(() => {
        loaderWrapper.style.display = 'none';
    }, 3000)
})

// O setTimeout é apenas para dar tempo de ver o loader, se for usar em seu site basta remove-lo e descomentar a linha anterior.


const section = create('section');
const article = create('article');
const h1 = create('h1');

h1.innerText = 'Loader oculto e conteúdo exibido após o carregamento do DOM';

const main = select('main');

append(main, section);
append(section, article);
append(article, h1);