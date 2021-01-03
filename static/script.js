function GetTrendFilms(root){
	fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=3a66dca4ab982982a2e4d01db94410b4&language=uk&include_image_language=uk,null')
	.then(response => response.json())
    .then(res => {
		root.innerHTML = ""
    	res.results.map(el => {
			const card = document.createElement('div');
			card.className = "card";
			const title = document.createElement('a');
			title.href = "#"+el.id;
			title.innerText = el.title;
			title.className = "card-link";
	   		const br = document.createElement('br');
	   		const img = document.createElement('img');
			img.src = 'http://image.tmdb.org/t/p/w200' + el.poster_path;
			img.className = "card-img-top";  
   			card.appendChild(img);
			card.appendChild(br);
			card.appendChild(title);
			root.appendChild(card);
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
			title.className = "col-xl-10"
			
			const img = document.createElement('img')
			img.className = "img-fluid"
			img.src = 'http://image.tmdb.org/t/p/w500' + res.poster_path
			img.width = "450"


			const opys = document.createElement('dl')
			opys.className ="col-xl-6"

			const dt = document.createElement('dt')
			dt.innerText = "Опис:  "
			const about = document.createElement('dd')
			about.innerText = res.overview
			about.className = "text-muted"

			const dt2 = document.createElement('dt')
			dt2.innerText = "Жанри: "
			let a = ""
			const genres = document.createElement('dd')
			res.genres.map (g =>
				{
					a+=g.name +"  "
				}) 
			genres.innerText = a;
			genres.className = "text-muted"

			let card = document.createElement('dl') 
			GetSimilary(card, id)
			//card.className = "text-muted"
			
			root.appendChild(title)
			root.appendChild(img)
			root.appendChild(opys)
			opys.appendChild(dt)
			opys.appendChild(about)
			opys.appendChild(dt2)
			opys.appendChild(genres)
			opys.appendChild(card)
			
		})
}
function GetSimilary(card, id)
{
	const dt = document.createElement('dt')	
	dt.innerText = "Схожі фільми:"
	card.appendChild(dt)

	const dd = document.createElement('dd')
	dd.className = "text-muted"

	url =" https://api.themoviedb.org/3/movie/"+id+"/similar?api_key=3a66dca4ab982982a2e4d01db94410b4&language=uk&page=1"
	fetch(url)
	.then(response=>response.json())
	.then(res => {
		if(res.total_results === 0)
		{
			dd.innerText = "Схожих фільмів не знайдено(("
		}
		else
		{
			res.results.map(r=>{
				const title = document.createElement('a')
				const br = document.createElement('br')
				title.href = "#"+r.id;
				title.innerText = r.title
				dd.appendChild(title)
				dd.appendChild(br)
			})
		}
	})
	card.appendChild(dd)
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


