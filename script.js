function GetTrendFilms(){
	fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=3a66dca4ab982982a2e4d01db94410b4&language=uk')
    .then(response => response.json())
    .then(res => {
	const root = document.createElement('div')
    document.body.appendChild(root)

	res.results.map(el => {
	const card = CreateFilmCard(el)
	root.appendChild(card)
    })
})
}

function CreateFilmCard(el)
{
	const card = document.createElement('div')
	const title = document.createElement('p1')
	hash= el.id;
	title.innerText = el.title
   	const br = document.createElement('br')
   	const img = document.createElement('img')
   	img.src = 'http://image.tmdb.org/t/p/w200' + el.poster_path
   	card.appendChild(img)
	card.appendChild(br)
	card.appendChild(title)
	card.addEventListener('click', ()=>ChangeHash(hash))
	return card
}

function ChangeHash(hash)
{
	location.hash = hash;
}

function getRouteInfo()
{

	const hash = location.hash.slice(1);
	return hash
}

function GetMovie(id) 
{
	url='https://api.themoviedb.org/3/movie/'+id+'?api_key=3a66dca4ab982982a2e4d01db94410b4&language=uk';
	console.log(url);
	fetch(url)
		.then(response=>response.json())
		.then(res=>{
			const root = document.createElement('div')
    		document.body.appendChild(root)
			const title = document.createElement('h1')
			title.innerText = res.title

    		const br = document.createElement('br')
      
    		const img = document.createElement('img')
			img.src = 'http://image.tmdb.org/t/p/w500' + res.poster_path
    
			root.appendChild(title)
			root.appendChild(img)

			
		})
}

function Control() 
{
	const id = getRouteInfo();	
	if (id==="start") GetTrendFilms()
	else GetMovie(id)
}
window.addEventListener('hashchange', console.log("OK"))
location.hash = "#start";
Control();
