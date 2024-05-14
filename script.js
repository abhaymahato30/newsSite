 const API_KEY ="f51f6489708a49e7a5846774f8373c48";
 const url="https://newsapi.org/v2/everything?q=";

 window.addEventListener('load',() => fetchNews("india"));


 function reload(){
   window.location.reload();
 }



  async function fetchNews(query){
    

    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    
    console.log(data); 
    bindData(data.articles);
 }

 function bindData(articles) {
    const cardContainer =document.getElementById("card-container");
    const newsCardTemplate=document.getElementById("template-news-card");
   
    cardContainer.innerHTML='';

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone =newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
        
    });


    function fillDataInCard(cardClone,article){
      const newsImg =cardClone.querySelector('#news-img');
      const newsTittle =cardClone.querySelector('#news-title');
      const newsSource =cardClone.querySelector('#news-source');
      const newsdes =cardClone.querySelector('#news-des');
      
      newsImg.src=article.urlToImage;
      newsTittle.innerHTML=article.title;
      newsdes.innerHTML=article.description;

      const date = new Date(article.publishedAt).toLocaleString("en-us",{
         timeZone:"Asia/jakarta"
      });

      newsSource.innerHTML=`${article.source.name} . ${date}`;

      cardClone.firstElementChild.addEventListener("click",()=>{
         window.open(article.url,"_blank");
      })


    }

   
    
 }
 let curSelectedNav =null;
 function onNavItemClick(id){
   fetchNews(id);
   const navItem=document.getElementById(id);
   curSelectedNav?.classList.remove('active');
   curSelectedNav=navItem;
   curSelectedNav.classList.add('active');

      
 }
 const searchBtn=document.getElementById('search-btn');
 const searchText=document.getElementById('news-inp');


 searchBtn.addEventListener('click',() =>{
   const query =searchText.value;
   if(!query) return;
   fetchNews(query);
   curSelectedNav?.classList.remove('active');
   curSelectedNav = null;
 })






