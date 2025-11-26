# Frontend Mentor - REST Countries API with color theme switcher

![Design preview for the REST Countries API with color theme switcher coding challenge](./design/desktop-preview.jpg)

## Welcome! 👋

Thanks for checking out this front-end coding challenge.

[Frontend Mentor](https://www.frontendmentor.io) challenges help you improve your coding skills by building realistic projects.

**To do this challenge, you need a good understanding of HTML, CSS, and JavaScript.**

## The challenge

Your challenge is to integrate with the [REST Countries API](https://restcountries.com) to pull country data and display it like in the designs.

You can use any JavaScript framework/library on the front-end such as [React](https://reactjs.org) or [Vue](https://vuejs.org). You also have complete control over which packages you use to do things like make HTTP requests or style your project.

Your users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

Want some support on the challenge? [Join our community](https://www.frontendmentor.io/community) and ask questions in the **#help** channel.

**⚠️ NOTE ⚠️: Sometimes the REST Countries API can go down. We've added a `data.json` file with all the country data if you prefer to use that instead. However, please be aware that the data in the JSON file might not be up-to-date.**

## Where to find everything

Your task is to build out the project to the designs inside the `/design` folder. 

In this challenge, you will find mobile and desktop designs in light and dark mode color schemes for both pages.

The designs are in JPG static format. Using JPGs will mean that you'll need to use your best judgment for styles such as `font-size`, `padding` and `margin`. 

If you would like the design files (we provide Sketch & Figma versions) to inspect the design in more detail, you can [subscribe as a PRO member](https://www.frontendmentor.io/pro).

There are no assets for this challenge, as the country flags will be pulled from the [REST Countries API](https://restcountries.com) and you can use an icon font library for the icons.

There is also a `style-guide.md` file containing the information you'll need, such as color palette and fonts.

## Building your project

Feel free to use any workflow that you feel comfortable with. Below is a suggested process, but do not feel like you need to follow these steps:

1. Initialize your project as a public repository on [GitHub](https://github.com/). Creating a repo will make it easier to share your code with the community if you need help. If you're not sure how to do this, [have a read-through of this Try Git resource](https://try.github.io/).
2. Configure your repository to publish your code to a web address. This will also be useful if you need some help during a challenge as you can share the URL for your project with your repo URL. There are a number of ways to do this, and we provide some recommendations below.
3. Look through the designs to start planning out how you'll tackle the project. This step is crucial to help you think ahead for CSS classes to create reusable styles.
4. Before adding any styles, structure your content with HTML. Writing your HTML first can help focus your attention on creating well-structured content.
5. Write out the base styles for your project, including general content styles, such as `font-family` and `font-size`.
6. Start adding styles to the top of the page and work down. Only move on to the next section once you're happy you've completed the area you're working on.

## Deploying your project

As mentioned above, there are many ways to host your project for free. Our recommended hosts are:

- [GitHub Pages](https://pages.github.com/)
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

You can host your site using one of these solutions or any of our other trusted providers. [Read more about our recommended and trusted hosts](https://medium.com/frontend-mentor/frontend-mentor-trusted-hosting-providers-bf000dfebe).

## Create a custom `README.md`

We strongly recommend overwriting this `README.md` with a custom one. We've provided a template inside the [`README-template.md`](./README-template.md) file in this starter code.

The template provides a guide for what to add. A custom `README` will help you explain your project and reflect on your learnings. Please feel free to edit our template as much as you like.

Once you've added your information to the template, delete this file and rename the `README-template.md` file to `README.md`. That will make it show up as your repository's README file.

## Submitting your solution

Submit your solution on the platform for the rest of the community to see. Follow our ["Complete guide to submitting solutions"](https://medium.com/frontend-mentor/a-complete-guide-to-submitting-solutions-on-frontend-mentor-ac6384162248) for tips on how to do this.

Remember, if you're looking for feedback on your solution, be sure to ask questions when submitting it. The more specific and detailed you are with your questions, the higher the chance you'll get valuable feedback from the community.

## Sharing your solution

There are multiple places you can share your solution:

1. Share your solution page in the **#finished-projects** channel of the [community](https://www.frontendmentor.io/community). 
2. Tweet [@frontendmentor](https://twitter.com/frontendmentor) and mention **@frontendmentor**, including the repo and live URLs in the tweet. We'd love to take a look at what you've built and help share it around.
3. Share your solution on other social channels like LinkedIn.
4. Blog about your experience building your project. Writing about your workflow, technical choices, and talking through your code is a brilliant way to reinforce what you've learned. Great platforms to write on are [dev.to](https://dev.to/), [Hashnode](https://hashnode.com/), and [CodeNewbie](https://community.codenewbie.org/).

We provide templates to help you share your solution once you've submitted it on the platform. Please do edit them and include specific questions when you're looking for feedback. 

The more specific you are with your questions the more likely it is that another member of the community will give you feedback.

## Got feedback for us?

We love receiving feedback! We're always looking to improve our challenges and our platform. So if you have anything you'd like to mention, please email hi[at]frontendmentor[dot]io.

This challenge is completely free. Please share it with anyone who will find it useful for practice.

**Have fun building!** 🚀

https://restcountries.com/v3.1/all?status=true&fields=name,popultion,region,capital,flag,nativeName,subregion,currencies,languages,borders


restcountries.com/v3.1/all?fields=name,capital,currencies


 name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };


  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
<button id="theme-toggle" class="theme-toggle">
          <i class="far fa-moon"></i>
          <span>Dark Mode</span>
        </button>


Instead of writing new URLSearchParams(window.location.search).get('code') everywhere, you have a clean reusable function:

import { getQueryParam } from './utils/url';
const code = getQueryParam('code');

import { toggleTheme, getSavedTheme } from './utils/theme';
toggleTheme('dark'); // sets dark mode and saves preference
console.log(getSavedTheme()); // returns 'dark' or 'light'
✅ Optional: You can do this inline in main.ts, but separating it makes your code modular and easier to maintain.



function createCountryCard(country: Country) {
  return `
    <div class="country-card">
      <img src="${country.flag}" alt="${country.name}">
      <h3>${country.name}</h3>
      <p><strong>Population:</strong> ${country.formattedPopulation()}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Capital:</strong> ${country.capital}</p>
    </div>
  `;
}

https://www.youtube.com/watch?v=ox98ylF1kSM --Dark mode

https://stackoverflow.com/questions/6298566/match-exact-string - regex 




import { fetchAllCountries, fetchCountryByCode } from "./services/apiServices.js";

const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");
const container = document.getElementById("country-detail")!;

let all = [];

const loadDetail = async () => {
    all = await fetchAllCountries();
    const country = all.find(c => c.name === countryName);

    if (!country) return;

    container.innerHTML = `
        <h2>${country.name}</h2>
        <img src="${country.flag}">
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>

        <h3>Border Countries:</h3>
        <div id="borders"></div>
    `;

    // Load border countries
    const borderBox = document.getElementById("borders")!;
    borderBox.innerHTML = country.borders
        .map(code => `<button class="border-btn" data-code="${code}">${code}</button>`)
        .join("");

    // Click border country → load new detail
    borderBox.addEventListener("click", async (e) => {
        const code = (e.target as HTMLElement).dataset.code;
        if (code) {
            const newCountry = await fetchCountryByCode(code);
            window.location.href = `country.html?name=${newCountry.name}`;
        }
    });
};

loadDetail();


Smooth CSS styling
✅ Mobile responsive layout
✅ Search debounce (faster search)
✅ Error display UI
✅ Loading spinner
✅ Folder cleanup + Vite config








document.addEventListener('DOMContentLoaded', init);



-------------------------------------
// src/utils/theme.ts
export const toggleTheme = (theme: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

export const getSavedTheme = (): 'light' | 'dark' => {
  return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
};


-------------------------------
What you do on the detail page

Read the country code from the URL:

import { getQueryParam } from './utils/url'; // optional helper

const code = new URLSearchParams(window.location.search).get('code');
// or use getQueryParam('code')


Use your existing service to fetch the country:

import { fetchCountryByCode, fetchAllCountries } from './service/apiService';
import Country from './models/Country';

const country = await fetchCountryByCode(code);


Render all details:

const detailContainer = document.getElementById('country-detail');

if (country && detailContainer) {
  detailContainer.innerHTML = `
    <img src="${country.flag}" alt="${country.name} flag">
    <h2>${country.name}</h2>
    <p>Population: ${country.formattedPopulation()}</p>
    <p>Region: ${country.region}</p>
    <p>Capital: ${country.capital}</p>
    <div class="borders">
      ${country.borders.map(borderCode => `<span data-code="${borderCode}" class="border-country">${borderCode}</span>`).join('')}
    </div>
  `;
}


Optional: Add click handlers to border countries to navigate to their detail page:

document.querySelectorAll('.border-country').forEach(el => {
  el.addEventListener('click', () => {
    const code = (el as HTMLElement).dataset.code;
    if (code) window.location.href = `country.html?code=${code}`;
  });
});
---------------------------------------------------
 async function showCountryDetails(code) {
 
 // Hide list
    document.getElementById("list-section").style.display = "none";

    // Show details
    document.getElementById("detail-section").style.display = "block";

    // Fetch data
    const c = await fetchCountryByCode(code);

    // Create HTML
    const html = `
        <img src="${c.flag}" class="detail-flag">

        <h2>${c.name}</h2>

        <p><strong>Population:</strong> ${c.formattedPopulation()}</p>
        <p><strong>Region:</strong> ${c.region}</p>
        <p><strong>Capital:</strong> ${c.capital}</p>

        <p><strong>Native Name:</strong> ${c.nativeName}</p>
        <p><strong>Currency:</strong> ${c.currency}</p>
        <p><strong>Languages:</strong> ${c.languages}</p>

        <div id="border-container"></div>
    `;

    document.getElementById("detail-container").innerHTML = html;

    renderBorderCountries(c.borders);
}
✅ Border countries (clickable)
(Done inside the same page, no redirect.)

js
Copy code
async function renderBorderCountries(borders) {
    const container = document.getElementById("border-container");

    if (!borders || borders.length === 0) {
        container.innerHTML = `<p><strong>Border Countries:</strong> None</p>`;
        return;
    }

    container.innerHTML = `<strong>Border Countries:</strong> `;

    for (let code of borders) {
        const b = await fetchCountryByCode(code);

        const btn = document.createElement("button");
        btn.className = "border-btn";
        btn.textContent = b.name;

        btn.addEventListener("click", () => {
            showCountryDetails(code);  // load without leaving page
        });

        container.appendChild(btn);
    }
}------------------------

async function renderBorderCountries(borders) {
    const container = document.getElementById("border-container");

    if (!borders || borders.length === 0) {
        container.innerHTML = `<p><strong>Border Countries:</strong> None</p>`;
        return;
    }

    container.innerHTML = `<strong>Border Countries:</strong> `;

    for (let code of borders) {
        const b = await fetchCountryByCode(code);

        const btn = document.createElement("button");
        btn.className = "border-btn";
        btn.textContent = b.name;

        btn.addEventListener("click", () => {
            showCountryDetails(code);  // load without leaving page
        });

        container.appendChild(btn);
    }
}
--------------------------

Returns to list view.

document.getElementById("back-btn").addEventListener("click", () => {
    document.getElementById("detail-section").style.display = "none";
    document.getElementById("list-section").style.display = "block";
});


=================================
            // Border countries redirect
            const borderButtons = document.querySelectorAll(".border-btn");
            borderButtons.forEach(btn => {
                btn.addEventListener("click", () => {
                    const borderCode = btn.dataset.code;
                    window.location.href = `detail.html?code=${borderCode}`;
                });
            });
        });
});

===========================
2. How to call detail page from index.js

Inside your card click event in index.js, add:

card.addEventListener("click", () => {
    window.location.href = `detail.html?code=${country.cca3}`;
}); 

✔ Fix layout
✔ Create clean SCSS/CSS
✔ Add dark mode auto-storage in localStorage
✔ Fix responsiveness
✔ Optimize performance (no repeated API calls)

 // Get currencies
    const currencies = country.currencies
      ? Object.values(country.currencies)
          .map((curr) => curr.name)
          .join(", ")
      : "N/A";
    // Get languages
    const languages = country.languages
      ? Object.values(country.languages).join(", ")
      : "N/A";