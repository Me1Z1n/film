function GetTrendFilms(root){
	fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=3a66dca4ab982982a2e4d01db94410b4&language=uk')
	.then(response => response.json())
    .then(res => {
		root.innerHTML = ""
    	res.results.map(el => {
			const card = document.createElement('div')
			const title = document.createElement('a')
			title.href = "#"+el.id;
			title.innerText = el.title
	   		const br = document.createElement('br')
	   		const img = document.createElement('img')
   			img.src = 'http://image.tmdb.org/t/p/w200' + el.poster_path
   			card.appendChild(img)
			card.appendChild(br)
			card.appendChild(title)
			root.appendChild(card)
       })
    })
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

function GetMovie(root, id) 
{
	root.innerHTML = ""
	url='https://api.themoviedb.org/3/movie/'+id+'?api_key=3a66dca4ab982982a2e4d01db94410b4&language=uk';
	fetch(url)
		.then(response=>response.json())
		.then(res=>{
			const title = document.createElement('h1')
			title.innerText = res.title
			const about = document.createElement('p1')
			about.innerText = "Опис:  "+ res.overview
			let a = "Жанри: "
			const genres = document.createElement('p1')
			res.genres.map (g =>
				{
					a+=g.name +"  "
				}) 
			genres.innerText =a
    		const br = document.createElement('br')
    		const img = document.createElement('img')
			img.src = 'http://image.tmdb.org/t/p/w500' + res.poster_path
			root.appendChild(title)
			root.appendChild(img)
			root.appendChild(br)
			root.appendChild(about)
			root.appendChild(br)
			root.appendChild(genres)
			
		})
}

function Control() 
{
	    const root = document.getElementById('result')
		const id = getRouteInfo()
		if (id==="start") GetTrendFilms(root)
		else GetMovie(root, id)
}
if (location.hash ==="") location.hash = "#start"
addEventListener(window.onhashchange, Control())


