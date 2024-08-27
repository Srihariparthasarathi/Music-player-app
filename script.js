// OM NAMASIVAYA

const datas = [
    {
        "id": 1,
        "genre": "Tamil Pop",
        "name": "Enjoy Enjaami",
        "artist": "Dhee",
        "img": "https://images.pexels.com/photos/1037997/pexels-photo-1037997.jpeg",
        "source": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        "id": 2,
        "genre": "Tamil Folk",
        "name": "Aathichudi",
        "artist": "Nithyasree Mahadevan",
        "img": "https://images.pexels.com/photos/196657/pexels-photo-196657.jpeg",
        "source": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        "id": 3,
        "genre": "Tamil Classical",
        "name": "Kurai Onrum Illai",
        "artist": "Lalgudi Jayaraman",
        "img": "https://images.pexels.com/photos/1037997/pexels-photo-1037997.jpeg",
        "source": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        "id": 4,
        "genre": "Tamil Pop",
        "name": "Sangeetha",
        "artist": "Hariharan",
        "img": "https://images.pexels.com/photos/1500715/pexels-photo-1500715.jpeg",
        "source": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        "id": 5,
        "genre": "Tamil Folk",
        "name": "Venkateshwara Suprabhatam",
        "artist": "S. P. Balasubrahmanyam",
        "img": "https://images.pexels.com/photos/1592200/pexels-photo-1592200.jpeg",
        "source": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        "id": 6,
        "genre": "Tamil Classical",
        "name": "Nadhamuni",
        "artist": "A. R. Rahman",
        "img": "https://images.pexels.com/photos/1846592/pexels-photo-1846592.jpeg",
        "source": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    {
        "id": 7,
        "genre": "Tamil Pop",
        "name": "Kadhal Rojave",
        "artist": "A. R. Rahman",
        "img": "https://images.pexels.com/photos/1459394/pexels-photo-1459394.jpeg",
        "source": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    {
        "id": 8,
        "genre": "Tamil Folk",
        "name": "Ponnin Selvan",
        "artist": "Ilaiyaraaja",
        "img": "https://images.pexels.com/photos/33715/pexels-photo.jpg",
        "source": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    },
    {
        "id": 9,
        "genre": "Tamil Classical",
        "name": "Melody",
        "artist": "Hariharan",
        "img": "https://images.pexels.com/photos/69106/pexels-photo-69106.jpeg",
        "source": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    {
        "id": 10,
        "genre": "Tamil Pop",
        "name": "Kurai Onrum Illai",
        "artist": "Lalgudi Jayaraman",
        "img": "https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg",
        "source": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
    }
];
const playListDict = {};

const genreBasIdDict = {all: datas.map((item) => item.id)};
let currentPlayListName = null;
let currentSongId;
const currentPlAsName = "Current PlayList";


const toggleEl = document.querySelector('#togglebr');
const genreFilterSelEl = document.getElementById('genreSel');
const filterHeadingEl = document.querySelector('.filter h2');
const songContainer = document.getElementById('filContainer');
const imageCardContainer = document.getElementById('imgCard');
const detCardContainer = document.getElementById('detCard');
const createPlayListForm = document.getElementById('createPlayListForm');
const createPlayInput = document.querySelector('.createPlayList form input');
const searchForm = document.getElementById('searchForm');
const searchByArtOrSongInput = document.querySelector('#serSongArtist form input');
const allPlayListContainer = document.getElementById('allPlayListContainer');
const currentPlayListHeading = document.querySelector('.playListSec h2');
const audioEl = document.querySelector('.musicPlayer audio');
const CurrentPlyLisConainer = document.getElementById('curPlayLisContainer');
const addItmPlisBtn = document.getElementById('addItmPlis');
const frontBtn = document.getElementById('frontBtn');
const backBtn = document.getElementById('backBtn');


// toggle switch
toggleEl.addEventListener('change', (event) => toggleTheame(event))
function toggleTheame(event){
    if(event.target.checked){
        document.body.setAttribute("data-theme","dark");
    }else{
        document.body.setAttribute("data-theme","light");
    }
}



// creating options for filter of genre
function CreatingGenreOpt(){
    // add gener in collection 
    const genreCol = new Set();  // creating new set to store the genre to display in drop down

    for(let data of datas){
        if(!genreCol.has(data.genre)) genreCol.add(data.genre);

        if(!Object.keys(genreBasIdDict).includes(data.genre)){
            genreBasIdDict[data.genre] = new Array();
        }

    genreBasIdDict[data.genre].push(data.id);
}

    genreFilterSelEl.textContent = "";

    /* filter tab */
    // default all soungs
    const genreOption = document.createElement('option');
    genreOption.value = "all";
    genreOption.textContent = "all";
    genreFilterSelEl.appendChild(genreOption);


    for(let genre of genreCol){
        const genreOption = document.createElement('option');
        genreOption.value = genre;
        genreOption.textContent = genre;
        genreFilterSelEl.appendChild(genreOption);
    }
}

// default setting 
CreatingGenreOpt();

// initial add all song
showSongs('all');


// to show the song detail in the gener
function showSongs(value){
    /** this function help to update the genre and add the first song to the song card */
    songContainer.textContent = "";
    let flag = true;  //to add first element to song card
    
    if(value == 'all'){  //update all song in song section
        for(let data of datas) {
            addSongs(data);   
            if(flag){ 
                songCardUpdate(data.id);  //the first song of gener is updated
                flag = false;
            }
        }
    }else{
        for(let data of datas){
            if(value == data.genre){
                addSongs(data);
                if(flag){
                    songCardUpdate(data.id);
                    flag = false;
                }
            }
        }

    }
}
    


function addSongs(data){
    /** create the song element and update in song section */

    const filterSongsEl = document.createElement('div');
    filterSongsEl.classList.add('filItems');
    filterSongsEl.id = data.id;

    // song name as para
    const paraEl = document.createElement('p');
    paraEl.textContent = data.name;

    // delete icon div
    const delIconDiv =  document.createElement('div');
    delIconDiv.classList.add('delItem');
    delIconDiv.id = "delSong";
    delIconDiv.setAttribute('data-delId' ,data.id);
    delIconDiv.addEventListener('click',(event) => deleteSong(event))

    //font asom i element
    const fonDelIcon = document.createElement('i');
    fonDelIcon.classList.add('fa-solid', 'fa-trash-can');
    

    delIconDiv.appendChild(fonDelIcon);
    filterSongsEl.append(paraEl, delIconDiv);


    filterSongsEl.addEventListener('click',(event) => songCardUpdate(event.currentTarget.id));
    songContainer.appendChild(filterSongsEl);
}



 // to delete the song from dict
 function deleteSong(event){
    /**Delete song item from datas object, update genre option in drop down and remove the song from every play list */
    const delIconDiv = event.target.closest('.delItem');
    let index;
    let songId;
    let delItmGenre;
    // to get index
    if (delIconDiv) {
        songId = delIconDiv.getAttribute('data-delId');
        for(let data of datas){
            if(data.id == songId){
                index = datas.indexOf(data);
                delItmGenre = data.genre;
                break
            }
        }     
    }

    // remove item from datas list
    datas.splice(index, 1);

    // updating genre filter tab
    let genreExists = false;
    for (let data of datas){
        if(data.genre == delItmGenre){
            genreExists = true;
            break
        }
    }
    if(genreExists == false){
        CreatingGenreOpt()
    }

    // delete song from playlist
    for(let key in playListDict){
        if(playListDict[key].has(parseInt(songId))){
            playListDict[key].delete(parseInt(songId));
            updateCurrentPlyList()
        }   
    }

    // updating song
    if(datas.length != 0){
        showSongs(genreFilterSelEl.value);
    }else{
        cleanSongCard();
        showSongs(genreFilterSelEl.value);
    }
    
}

// updating songs using filter
genreFilterSelEl.addEventListener('change', updateFilter)

genreFilterSelEl.addEventListener('click', updateFilter)


function updateFilter(){
    const capGenreName = genreFilterSelEl.value.charAt(0).toUpperCase() + genreFilterSelEl.value.slice(1);
    filterHeadingEl.textContent = `${capGenreName} songs`;
    songContainer.textContent = "";
    // calling the showSong with genre value
    showSongs(genreFilterSelEl.value);
}

function cleanSongCard(){
    /** cleane the show card when there is no song is precent */

    const noSongH2El = document.createElement('h2');
    noSongH2El.id = "noSong";

    imageCardContainer.textContent = "";
    imageCardContainer.appendChild(noSongH2El);

    // creating song name element
    const songName = document.createElement('h2');
    songName.textContent = "no song present";

    //creating artist name element
    const artistName = document.createElement('p');
    artistName.textContent = "no artist";

    // updating the songName, atristName in detCardContainer
    detCardContainer.textContent = "",
    detCardContainer.append(songName, artistName);

    // updating song
    audioEl.textContent = "";
    const sourceEl = document.createElement('source');
    sourceEl.src = "";
    audioEl.appendChild(sourceEl);
    audioEl.load();
}


function songCardUpdate(id){
   /**function help to update data in song card */ 
    for(let data of datas){
        if(data.id == id){       
            
            // adding image
            const imageEl = document.createElement('img');
            imageEl.src = data.img;
            imageEl.alt = `${data.artist} image`;
            imageCardContainer.textContent = "";
            imageCardContainer.appendChild(imageEl);

            // creating song name element
            const songName = document.createElement('h2');
            songName.textContent = data.name;

            //creating artist name element
            const atristName = document.createElement('p');
            atristName.textContent = data.artist;

            // updating the songName, artistNmae in detCardContainer
            detCardContainer.textContent = "",
            detCardContainer.append(songName, atristName);

            // updating song
            audioEl.textContent = "";
            const sourceEl = document.createElement('source');
            sourceEl.src = data.source;
            audioEl.appendChild(sourceEl);
            audioEl.load();

            // help to add the id in current playlist set
            currentSongId = data.id;

        }
    }
}

function createPlayList(event){
    /**Function to create PlayList */

    event.preventDefault(); //prevent the form submmit default activity

    const playListName = createPlayInput.value.trim(); //getting new playlist name from from
    createPlayInput.value = "";

    // checking the input have any char and the play list name already exist
    if(playListName && !Object.keys(playListDict).includes(playListName)){

            const allPlayListItem = document.createElement('div');
            allPlayListItem.classList.add('allPlyListItem');
            allPlayListItem.id = playListName;

            const paraAlPlyEl = document.createElement('p');
            paraAlPlyEl.textContent = playListName;

            // delete icon div
            const delAlPlyIconDiv =  document.createElement('div');
            delAlPlyIconDiv.classList.add('delAlPlItem');
            // delAlPlyIconDiv.id = "delSong";
            delAlPlyIconDiv.setAttribute('data-delAlPlId', playListName);

            //font asom i element
            const fonDelIcon = document.createElement('i');
            fonDelIcon.classList.add('fa-solid', 'fa-trash-can');

            delAlPlyIconDiv.appendChild(fonDelIcon);
            allPlayListItem.append(paraAlPlyEl, delAlPlyIconDiv);

            // add event listner to the delete icon deletePlist(event)
            delAlPlyIconDiv.addEventListener('click',(event) => deleteCurPlist(event));
            // add event listner to the playlist name
            allPlayListItem.addEventListener('click',(event) => showCurrentPlayList(event));

            // adding the play list to the container
            allPlayListContainer.appendChild(allPlayListItem);

            // creating new set to save the id of the soung and append in the dict
            playListDict[playListName] = new Set();


    }
        
}


// creating playlist 
createPlayListForm.addEventListener('submit', (event) =>createPlayList(event));



function updateCurrentPlyList(){
    /** updating the song to the current playlist from the  playListDict[currentPlayListName] set*/
    CurrentPlyLisConainer.textContent = "";
    for(let songId of playListDict[currentPlayListName]){
        for(let data of datas){
            if(data.id == songId){
                const CurPlySongsEl = document.createElement('div');
                CurPlySongsEl.classList.add('curPlSong');
                CurPlySongsEl.id = data.id;

                // song name as para
                const paraPlyEl = document.createElement('p');
                paraPlyEl.textContent = data.name;
                
                // delete icon div
                const delPlyIconDiv =  document.createElement('div');
                delPlyIconDiv.classList.add('delPlItem');
                // delPlyIconDiv.id = "delSong";
                delPlyIconDiv.setAttribute('data-delPlId' ,data.id);
                delPlyIconDiv.addEventListener('click',(event) => deleteSongFrCurPlist(event));

                //font asom i element
                const fonDelIcon = document.createElement('i');
                fonDelIcon.classList.add('fa-solid', 'fa-trash-can');

                delPlyIconDiv.appendChild(fonDelIcon);
                CurPlySongsEl.append(paraPlyEl, delPlyIconDiv);

                CurPlySongsEl.addEventListener('click',(event) => songCardUpdate(event.currentTarget.id));
                CurrentPlyLisConainer.appendChild(CurPlySongsEl);
                break;
            }
        }
    }
}


function showCurrentPlayList(event){
    /**change the playlist name and update the playlist */

    currentPlayListName = event.currentTarget.textContent; //getting the current play list name that help to add song items in tha play list
    currentPlayListHeading.textContent = currentPlayListName;
    updateCurrentPlyList(); // show the song item to the current playlist
}


// delete playlist 
function deleteCurPlist(event){
    event.stopPropagation(); 
    const selPlaylistName = event.currentTarget.getAttribute('data-delAlPlId');

    if(selPlaylistName == currentPlayListName){
        currentPlayListHeading.textContent = currentPlAsName;
        currentPlayListName = currentPlAsName;
        CurrentPlyLisConainer.textContent = "";
    }
    delete playListDict[selPlaylistName];
    allPlayListContainer.removeChild(document.getElementById(event.currentTarget.getAttribute('data-delAlPlId')));
    
}


addItmPlisBtn.addEventListener('click', () =>{
    /**adding song in play list */
    if(currentPlayListName){
        playListDict[currentPlayListName].add(currentSongId); //adding the song id to the set of the play list
        updateCurrentPlyList(); // show the song item to the current playlist

    }
})

function deleteSongFrCurPlist(event){
    // to delete the song in the playlist
    event.stopPropagation()
    const delIconDiv = event.target.closest('.delPlItem');
    let songId;

    // to get index
    if (delIconDiv) {
        songId = delIconDiv.getAttribute('data-delPlId');
        if(playListDict[currentPlayListName].has(parseInt(songId))){
            // delete the id from the current playlist
            playListDict[currentPlayListName].delete(parseInt(songId));
            updateCurrentPlyList();
        }       
    }
}

//frontbtn 
frontBtn.addEventListener('click', ()=>{
    /**to change the song in front wards based on genre */
    let genreIdArr = genreBasIdDict[genreFilterSelEl.value];
    if(genreIdArr[genreIdArr.length - 1] != currentSongId && genreIdArr.includes(currentSongId)){
        songCardUpdate(genreIdArr[genreIdArr.indexOf(currentSongId) + 1]);
    }
})

// backBtn
backBtn.addEventListener('click', ()=>{
    /**to change the song in back wards based on genre */
    let genreIdArr = genreBasIdDict[genreFilterSelEl.value];
    if(genreIdArr[0] != currentSongId && genreIdArr.includes(currentSongId)){
        songCardUpdate(genreIdArr[genreIdArr.indexOf(currentSongId) - 1]);
    }
})


// search song or songs with artist

searchForm.addEventListener('submit', (event)=> searchByArtOrSong(event));


function searchByArtOrSong(event){
    /** update song by song name or by the artist name if song name return one song if artist it return all song of the artist of the current gerne */
    event.preventDefault(); //prevent the form submmit default activity

    const searchValue = searchByArtOrSongInput.value.trim();
    searchByArtOrSongInput.value = "";
    // check song
    let songNotExists = true;
    for(let data of datas){
        if(data.name.toLowerCase() == searchValue.toLowerCase() && genreBasIdDict[genreFilterSelEl.value].includes(data.id)){
            songContainer.textContent = "";
            addSongs(data);
            songNotExists = false;
            break
        }
    }

    // song does not exist check for artist
    if(songNotExists){
        const artSpeData = []; //matched data will be pushed
        for(let data of datas){
            
            if(data.artist.toLowerCase() == searchValue.toLowerCase() && genreBasIdDict[genreFilterSelEl.value].includes(data.id)){
                artSpeData.push(data);
            }
        }
        // updating the data

        if(artSpeData.length != 0){
            songContainer.textContent = "";
            for(let speData of artSpeData){
                addSongs(speData);
            }
        }
        

    }
}