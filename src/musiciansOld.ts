import './style.css'

interface Musician{
    name: string,
    email: string,
    genres: string[],
    instruments: string[]
}

const registerMusicianButton = <HTMLButtonElement>document.getElementById('registerMusician')
const findMusiciansButton = <HTMLButtonElement>document.getElementById('findMusicians')
const modifyMusicianButton = <HTMLButtonElement>document.getElementById('modifyMusician')
const findMusiciansList = <HTMLUListElement>document.getElementById('musicianList')

const registeredMusicians: Array<Musician> = []

registerMusicianButton.addEventListener('click',addMusician)
findMusiciansButton.addEventListener('click',findMusicians)
modifyMusicianButton.addEventListener('click',modifyMusician)

function showResults(message: string, musicianName: string, musicianEmail: string, musicianGenres: string[], musicianInstruments: string[]): void{
    if (message){
        const messageHTML = `<label>Músico ${message}!</label>`
        findMusiciansList.appendChild(stringToHTML(messageHTML));
    }
    const itemHTML = 
    `
    <li>${musicianName}, ${musicianEmail}
        <ul>
          <li>${musicianGenres}</li>
          <li>${musicianInstruments}</li>
        </ul>
    </li><br>
    `
    findMusiciansList.appendChild(stringToHTML(itemHTML));
}


function exclusiveSearch(musicianName: string, musicianEmail: string, musicianGenre: string, musicianInstrument: string): Array<Musician>{
    const searchResults: Array<Musician> = []
    let indexesToRemove: number[] = []  

    if (!!musicianName){
        registeredMusicians.forEach((musician) => {
            if (musician.name === musicianName){
                searchResults.push(musician)
                }
        })
    }
    else{
        registeredMusicians.forEach((musician) => {searchResults.push(musician)})
    }

    if (!!musicianEmail){
        return searchResults.filter((musician) => {
            return musician.email === musicianEmail
        })
    }

    if (!!musicianGenre){
        searchResults.forEach((musician,index) => {
            if (!musician.genres.includes(musicianGenre)){
                indexesToRemove.push(index) 
            }
        })
        indexesToRemove.reverse()
        for (let iterator of indexesToRemove){
            searchResults.splice(iterator,1)
        }
    }

    if (!!musicianInstrument){
        searchResults.forEach((musician,index) => {
            if (!musician.instruments.includes(musicianInstrument)){
                indexesToRemove.push(index) 
            }
        })
        indexesToRemove.reverse()
        for (let iterator of indexesToRemove){
            searchResults.splice(iterator,1)
        }
    }

    return searchResults;
}

function basicSearch(musicianName: string, musicianEmail: string, musicianGenre: string, musicianInstrument: string): Array<Musician>{
    const addedEmails: string[] = []
    const searchResults: Array<Musician> = []

    if(!!musicianName){
        registeredMusicians.forEach((musician) => {
            if (musician.name === musicianName){
                searchResults.push(musician)
                addedEmails.push(musician.email)
            }
        })
    }

    if(!!musicianEmail){
        registeredMusicians.every((musician) => {
            if (musician.email === musicianEmail){
                if (!(addedEmails.includes(musician.email))){
                    searchResults.push(musician)
                    addedEmails.push(musician.email)
                }
                return false
            }
        return true
        })
    }

    if(!!musicianGenre){
        registeredMusicians.forEach((musician) => {
            if (musician.genres.includes(musicianGenre) && !(addedEmails.includes(musician.email))){
                searchResults.push(musician)
                addedEmails.push(musician.email)
            }
        })
    }

    if(!!musicianInstrument){
        registeredMusicians.forEach((musician) => {
            if (musician.instruments.includes(musicianInstrument) && !(addedEmails.includes(musician.email))){
                searchResults.push(musician)
            }
        })
    }
    return searchResults
}

function findMusicians(): void{
    const tempInfoGetter = (<HTMLInputElement[]>[].slice.call(document.getElementsByClassName('musicianInfo')))
    const musicianInfo = tempInfoGetter.map((element) => {return element.value})
    const musicianName = musicianInfo[0]
    const musicianEmail = musicianInfo[1]
    const musicianGenre = musicianInfo[2].replace(/\s+/g, '').toLowerCase()
    const musicianInstrument = musicianInfo[3].replace(/\s+/g, '').toLowerCase()
    const isExclusiveSearch = (<HTMLInputElement>document.getElementById('exclusiveSearchCheckbox')).checked
    let searchResults: Array<Musician>;
    findMusiciansList.innerHTML = ""

    if (musicianGenre.includes(',') || musicianInstrument.includes(',')){
        alert('A busca não pode conter múltiplos gêneros musicais e/ou múltiplos instrumentos')
        return
    }

    if (isExclusiveSearch){
        searchResults = exclusiveSearch(musicianName, musicianEmail, musicianGenre, musicianInstrument);
    }
    else{
        searchResults = basicSearch(musicianName, musicianEmail, musicianGenre, musicianInstrument);
    }

    for (let musician of searchResults){
        showResults("",musician.name, musician.email, musician.genres, musician.instruments)
    }
    
    console.log(searchResults);
    
}

function findMusicianIndexByEmail(email: string): number{
    let musicianIndex = 0;
    for (let currentMusician of registeredMusicians){
        if (currentMusician.email === email){
            return musicianIndex;
        }
    musicianIndex++;
    }
    return -1;
}

function editGenres(musicianIndex: number, newGenres: string[], removeGenres: boolean): void{
    if (!removeGenres){
        newGenres.forEach((newGenre) => {
            if (registeredMusicians[musicianIndex].genres.includes(newGenre) || newGenre === ""){
                return
            }
            registeredMusicians[musicianIndex].genres.push(newGenre)
        })
    }
    else{
        let indexFound;
        newGenres.forEach((newGenre) => {
            indexFound = registeredMusicians[musicianIndex].genres.indexOf(newGenre)
            if (indexFound !== -1){
                registeredMusicians[musicianIndex].genres.splice(indexFound,1)
            }
        })
    }
}

function editInstruments(musicianIndex: number, newInstruments: string[], removeInstrument: boolean): void{
    if (!removeInstrument){
        newInstruments.forEach((newInstrument) => {
            if (registeredMusicians[musicianIndex].instruments.includes(newInstrument) || newInstrument === ""){
                return
            }
            registeredMusicians[musicianIndex].instruments.push(newInstrument)
        })
    }
    else{
        let indexFound;
        newInstruments.forEach((newInstrument) => {
            indexFound = registeredMusicians[musicianIndex].instruments.indexOf(newInstrument)
            if (indexFound !== -1){
                registeredMusicians[musicianIndex].instruments.splice(indexFound,1)
            }
        })
    }
}

function modifyMusician(): void{
    const tempInfoGetter = (<HTMLInputElement[]>[].slice.call(document.getElementsByClassName('musicianInfo')))
    const musicianInfo = tempInfoGetter.map((element) => {return element.value})
    const musicianEmail = musicianInfo[1]
    const musicianNewGenres = musicianInfo[2].toLowerCase().replace(/\s+/g, '').split(',')
    const musicianNewInstruments = musicianInfo[3].toLowerCase().replace(/\s+/g, '').split(',')
    const isRemovingGenres = (<HTMLInputElement>document.getElementById('removeGenresCheckbox')).checked
    const isRemovingInstruments = (<HTMLInputElement>document.getElementById('removeInstrumentsCheckbox')).checked
    const musicianIndex = findMusicianIndexByEmail(musicianEmail)
    findMusiciansList.innerHTML = ""

    if (!musicianEmail){
        alert(`Email inválido`)   
        return
    }
    else if (musicianIndex === -1){
        alert("Músico não encontrado em nossa base de dados.")
        return
    }

    if (musicianNewGenres[musicianNewGenres.length-1] === ""){
        musicianNewGenres.pop()
    }
    if (musicianNewInstruments[musicianNewInstruments.length-1] === ""){
        musicianNewInstruments.pop()
    }
    
    if (musicianNewGenres){
        editGenres(musicianIndex, musicianNewGenres, isRemovingGenres)
    }
    if (musicianNewInstruments){
        editInstruments(musicianIndex, musicianNewInstruments, isRemovingInstruments)
    }

    showResults("modificado",registeredMusicians[musicianIndex].name, 
        registeredMusicians[musicianIndex].email, 
        registeredMusicians[musicianIndex].genres, 
        registeredMusicians[musicianIndex].instruments)

}

function addMusician(): void{
    const tempInfoGetter = (<HTMLInputElement[]>[].slice.call(document.getElementsByClassName('musicianInfo')))
    const musicianInfo = tempInfoGetter.map((element) => {return element.value})
    let invalidFlag = false;
    findMusiciansList.innerHTML = ""
    
    tempInfoGetter.every((element) => {
        if (!element.value){
            alert(`Campo "${element.name}" inválido`)   
            invalidFlag = true;     
            return false
        }
        return true
    })
    if (invalidFlag) return

    findMusiciansList.innerHTML = ""

    const musicianName = musicianInfo[0]
    const musicianEmail = musicianInfo[1]
    if (findMusicianIndexByEmail(musicianEmail) !== -1){
        alert('Músico já cadastrado em nossa base de dados.')
        return
    }
    const musicianGenres = musicianInfo[2].toLowerCase().replace(/\s+/g, '').split(',').filter((element) => {return element !== ""})
    const musicianInstruments = musicianInfo[3].toLowerCase().replace(/\s+/g, '').split(',').filter((element) => {return element !== ""})

    registeredMusicians.push({name: musicianInfo[0].toLowerCase(), email: musicianInfo[1], genres: musicianGenres, instruments: musicianInstruments})
    
    showResults("adicionado",musicianName,musicianEmail,musicianGenres,musicianInstruments)
};

function stringToHTML(str: string): HTMLElement {
	const parser = new DOMParser();
	const doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};