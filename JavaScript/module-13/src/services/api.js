const URL = 'http://localhost:3000/notes'

export const getNotes = () => {

    return fetch(URL)
        .then(response => {
            if(response.ok) return response.json()

            throw new Error (`Error while fetching: ${response.statusText}`)
        })
}

export const saveNote = (note) => {
    const opts = {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
            "Content-Type": 'application/json ; charset=UTF-8'
        }
    }

    return fetch(URL, opts)
            .then(response => {
                if(response.ok) return response.json()
                
                throw new Error (`Error while saving note: ${response.statusText}`)
            })

}

export const deleteNote = (id) => {
    const opts = {
        method: "DELETE"
    }

    return fetch(`${URL}/${id}`, opts)
        .then(response => {
            if(response.ok) return response.json()
        })
}