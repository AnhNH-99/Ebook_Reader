fetch('https://rickandmortyapi.com/api/character', {
    method: "GET",
    headers: {
        "x-access-token":""
    },
    body: {

    }
})
.then(response => response.json())
.then(({ results }) => {
})