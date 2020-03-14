function GetTrendFilms(root){
	fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=3a66dca4ab982982a2e4d01db94410b4&language=uk&include_image_language=uk,null')
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
	url='https://api.themoviedb.org/3/movie/'+id+'?api_key=3a66dca4ab982982a2e4d01db94410b4&language=uk&include_image_language=uk,null';
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
			let card = document.createElement('div') 
			GetSimilary(card, id)

    		const img = document.createElement('img')
			img.src = 'http://image.tmdb.org/t/p/w500' + res.poster_path
			root.appendChild(title)
			root.appendChild(img)
			root.appendChild(br)
			root.appendChild(about)
			root.appendChild(br)
			root.appendChild(genres)
			root.appendChild(card)
			
		})
}
function GetSimilary(card, id)
{

	url =" https://api.themoviedb.org/3/movie/"+id+"/similar?api_key=3a66dca4ab982982a2e4d01db94410b4&language=uk&page=1"
	fetch(url)
	.then(response=>response.json())
	.then(res => {
		if(res.total_results === 0)
		{
			card.innerText = "Схожих фільмів не знайдено(("
		}
		else
		{
				card.innerText = "Схожі фільми:"
				res.results.map(r=>{
				const title = document.createElement('a')
				const br = document.createElement('br')
				title.href = "#"+r.id;
				title.innerText = r.title
				card.appendChild(br)
				card.appendChild(title)
			})
		}
	//	return card

	})
}

function SearchFilm(root)
{
	root.innerHTML=""
	console.log("a")
	const box = document.getElementById("search")
	const movie = box.value;
	const card = document.createElement('div')
	console.log(movie)
	if (movie != "")
	{
		url = "https://api.themoviedb.org/3/search/movie?api_key=3a66dca4ab982982a2e4d01db94410b4&language=uk&query="+movie +"&page=1&include_adult=true&include_image_language=uk,null"
		fetch(url)
		.then(response => response.json())
		.then(res => {
			if(res.total_results === 0)
			{
				card.innerText = "Нічого не знайдено(("
			}
			else
			{
				card.innerText = "Peзультати:"
				res.results.map(el => {
					const title = document.createElement('a')
					const br = document.createElement('br')
				 	title.href = "#"+el.id;
				 	title.innerText = el.title
				 	card.appendChild(br)
					card.appendChild(title)
					console.log(el.title)
				})
		}
			root.appendChild(card)
	
		})

	}
}
function ButtonClick()
{
	location.hash = "search"
}
function Control() 
{
	const root = document.getElementById('result')
	const id = getRouteInfo()
	console.log(id)
	if (id==="start") GetTrendFilms(root)
	else if (id ==="search") SearchFilm(root)
	else GetMovie(root, id)
}

if (location.hash === "") location.hash = "#start"
addEventListener(window.onhashchange, Control())


