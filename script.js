fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=3a66dca4ab982982a2e4d01db94410b4&language=uk-UK')
  .then(response => response.json())
  .then(res => {
    const root = document.createElement('div')

      const title = document.createElement('p1')
      title.innerText = el.title

      const br = document.createElement('br')
      
      const img = document.createElement('img')
      img.src = 'http://image.tmdb.org/t/p/w200' + el.poster_path

      root.appendChild(card)
      card.appendChild(img)
      card.appendChild(br)
      card.appendChild(title)

    })
  })