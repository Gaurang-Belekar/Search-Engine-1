// A collection of documents for our examples
const documents = [
  {
    id: 1,
    title: 'Moby Dick',
    text: 'Call me Ishmael. Some years ago...',
    category: 'fiction'
  },
  {
    id: 2,
    title: 'Zen and the Art of Motorcycle Maintenance',
    text: 'I can see by my watch...',
    category: 'fiction'
  },
  {
    id: 3,
    title: 'Neuromancer',
    text: 'The sky above the port was...',
    category: 'fiction'
  },
  {
    id: 4,
    title: 'Zen and the Art of Archery',
    text: 'At first sight it must seem...',
    category: 'non-fiction'
  },
  // ...and more
]

let miniSearch = new MiniSearch({
  fields: ['title', 'text'], // fields to index for full-text search
  storeFields: ['title', 'category'] // fields to return with search results
})

// Index all documents
miniSearch.addAll(documents)

// Search with default options


function searchQuery() {
  var queryString = document.getElementById("querySearch").value;
  console.log(queryString)
  let results = miniSearch.search(queryString)
  if (results.length == 0) {
    console.log("No Results found");
  }
  else {
    console.log(results);
    for (let i = 0; i < results.length; i++) {
      document.getElementById("searchResults").innerHTML += `
      <div class="row mt-2 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${results[i].title}</h5>
          <p class="card-text">${results[i].text}</p>
          <p class="card-text">Category: ${results[i].category}</p>
        </div>
        </div>`;
    }
  }
}

//   searchQuery("zen")
  // => [
  //   { id: 2, title: 'Zen and the Art of Motorcycle Maintenance', category: 'fiction', score: 2.77258, match: { ... } },
  //   { id: 4, title: 'Zen and the Art of Archery', category: 'non-fiction', score: 1.38629, match: { ... } }
  // ]