const show = document.getElementsByClassName("jobs")[0];
const search = document.getElementsByClassName("searched")[0];
const upper = document.getElementsByClassName("upper")[0];
const lower = document.getElementsByClassName("lower")[0];
const itemdiv = document.createElement('div');
const bg= document.getElementsByClassName('bg')[0]

const clearbutton = document.getElementsByClassName('btn2');
search.style.top=`calc(${bg.clientHeight-search.clientHeight/2 })`;

const clear = document.createElement('div');
clear.classList = 'clear';
const cleartext = document.createElement('p');
const clearbtn = document.createElement('button');
cleartext.textContent = 'clear';
cleartext.classList = 'tag';
clearbtn.textContent = 'X';

clearbtn.classList.add('btn2');
clear.appendChild(cleartext);
clear.appendChild(clearbtn);
upper.appendChild(clear);

search.style.display = 'none';

let searchitems = [];


clearbtn.addEventListener('click', () => {

    searchitems = [];
    lower.innerHTML = ''; 
    fetchjobs(); 
    search.style.display = 'none';
});

const fetchjobs = async () => {
    const res = await fetch("data.json");
    let data = await res.json();

    if (searchitems.length > 0) {
        data = data.filter((dta) => {
            const jobTags = [dta.role, dta.level, ...dta.languages];
            return searchitems.every((tag) => jobTags.includes(tag));
        });
    }
    displayjobs(data);
};

const displayjobs = async (data) => {
    show.innerHTML = "";

    data.forEach((dta) => {
        const div = document.createElement("div");
        div.classList = 'container';

        if (dta.featured) {
            div.classList.add('featured');
        }

        const innerdiv1 = document.createElement("div");
        innerdiv1.classList = "innerdiv1";
        const div1 = document.createElement("div");
        div1.classList = "company-info";

        const company = document.createElement("p");
        company.textContent = `${dta.company}`;

        const div2 = document.createElement("div");
        div2.classList = "position-info";
        const position = document.createElement("h2");
        position.textContent = `${dta.position}`;

        const div3 = document.createElement("div");
        div3.classList = "details";
        const posted = document.createElement("p");
        posted.textContent = `${dta.postedAt}`;
        const contract = document.createElement("p");
        contract.textContent = `${dta.contract}`;
        const location = document.createElement("p");
        location.textContent = `${dta.location}`;

        const innerdiv2 = document.createElement("div");
        innerdiv2.classList = "tags";

        const tags = [dta.role, dta.level, ...dta.languages];

        tags.forEach((tag) => {
            const data = document.createElement('p');
            data.textContent = tag;
            data.classList = 'tag';
            innerdiv2.appendChild(data);

            data.addEventListener('click', () => {
                if (!searchitems.includes(tag)) {
                    searchitems.push(tag);
            
                    search.style.display = 'block';
                    
                    const item = document.createElement('p');
                    const button = document.createElement('button');
                    item.textContent = tag;
                    item.classList = 'tag';
                    button.textContent = 'X';
                    button.classList.add('btn1');

                    const itemDiv = document.createElement('div');
                    itemDiv.classList = 'itemdiv';
                    itemDiv.appendChild(item);
                    itemDiv.appendChild(button);
                    lower.appendChild(itemDiv);

                    button.addEventListener('click', () => {
                        searchitems = searchitems.filter((item) => item !== tag);
                        itemDiv.remove();
                        fetchjobs();
                        
                        
                        if (searchitems.length === 0) {
                            search.style.display = 'none';
                        }
                    });
                }
                fetchjobs();  
            });
        });

        const img = document.createElement("img");
        img.src = dta.logo;
        img.classList = "company-logo";

        show.appendChild(div);
        div.appendChild(img);
        div.appendChild(innerdiv1);
        innerdiv1.appendChild(div1);
        innerdiv1.appendChild(div2);
        innerdiv1.appendChild(div3);
        div1.appendChild(company);

        if (dta.new) {
            const newicon = document.createElement("p");
            newicon.classList = "badge new";
            newicon.textContent = "NEW!";
            div1.appendChild(newicon);
        }
        if (dta.featured) {
            const featured = document.createElement("p");
            featured.classList = "badge featured";
            featured.textContent = "FEATURED";
            div1.appendChild(featured);
        }

        div2.appendChild(position);
        div3.appendChild(posted);
        div3.appendChild(contract);
        div3.appendChild(location);
        div.appendChild(innerdiv2);
    });
};


fetchjobs();
