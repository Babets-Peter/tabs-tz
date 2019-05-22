const urlApi = 'https://raw.githubusercontent.com/sellbe/test-task/master/data/';
let responseData = new Map();


const title = document.createElement('h1');
const content = document.createElement('p');
const result = document.querySelector('div');

const appearData = (id ) => 

{			
			if(!responseData.get(id)){ return ;}
			const responseTitle = responseData.get(id).title;
			const responseContent = responseData.get(id).content;

			const resContent = responseContent.toLowerCase().split(' ');
			const repeatWords = resContent.reduce((a, b) => Object.assign(a, {[b]: (a[b] || 0) + 1}), {});
		
		 	const higherWord = Object.keys(repeatWords)

		 						.filter((key) => repeatWords[key] === Math.max.apply(null, Object.values(repeatWords)));

		 	const regExpression = new RegExp(`(${higherWord})`, 'ig');

		 	const shineWord = responseContent.replace(regExpression, `<strong>${higherWord}</strong>` );

		 		title.innerHTML = responseTitle;
				content.innerHTML = shineWord;

		result.appendChild(title);
		 result.appendChild(content);	
}

const handlerClick = (evt) => 
{
		if(!responseData.has(evt.textContent))
		{
			return fetch(urlApi + evt.textContent + '.json')
				.then(response => response.json())

				.then(data => responseData.set(evt.textContent,data))
				.then( _ => appearData(evt.textContent))

				.catch(err => console.log(err));
		}

		appearData(evt.textContent);
		
};

