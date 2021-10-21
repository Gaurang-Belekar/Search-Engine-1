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
  var queryString = document.getElementById("myInput").value;
  console.log(queryString)
  let results = miniSearch.search(queryString)
  if (results.length == 0) {
    document.getElementById("searchResults").innerHTML = `
      <div class="row mt-2 mb-3">
      <div class="card">
        <div class="card-body">
          No Result Found
        </div>
        </div>`;
    console.log("No Results found");
  }
  else {
    document.getElementById("searchResults").innerHTML = `<div></div>`;
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

function filterFunction() {
  let input, filter, a, i;
  console.log("FilterFunction running")
  input = document.getElementById("myInput").value;
  filter = input.toUpperCase();
  div = document.getElementById("myDropdown");
  console.log(input)
  a = miniSearch.autoSuggest(input, { fuzzy: 0.2 })
  console.log(a);
  document.getElementById("myDropdown").innerHTML = `<div></div>`;
  if(a.length!=0){

    for (i = 0; i < a.length; i++) {
      let txtValue = a[i].suggestion;
      console.log("Suggestion is "+ txtValue);
      document.getElementById("myDropdown").innerHTML += `
      <a onClick="document.getElementById("myInput").value = ${txtValue};" >${txtValue}</a>
      `
  
      // if (txtValue.toUpperCase().indexOf(filter) > -1) {
      //   a[i].style.display = "";
      // } else {
      //   a[i].style.display = "none";
      // }
    }

  }
}


//   searchQuery("zen")
  // => [
  //   { id: 2, title: 'Zen and the Art of Motorcycle Maintenance', category: 'fiction', score: 2.77258, match: { ... } },
  //   { id: 4, title: 'Zen and the Art of Archery', category: 'non-fiction', score: 1.38629, match: { ... } }
  // ]