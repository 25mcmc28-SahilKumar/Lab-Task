let booksJSON = [];

$(document).ready(function(){
    // ajax works like fetch
    // ajax (worbose and detailed)
    $.ajax({
        url: "book.xml",
        type: "GET",
        dataType: "xml",
        success: function(xml) {

            $(xml).find("book").each(function(){
                let book = {
                    id: $(this).attr("id"),
                    title: $(this).find("title").text(),
                    author: $(this).find("author").text(),
                    genres: $(this).find("genre").text(), // added genre
                    price: parseFloat($(this).find("price").text()),
                    publish_date: $(this).find("publish_date").text()
                };
                booksJSON.push(book);
            });

            populateFilters();
            displayBooks(booksJSON);
        },
        error: function(){
            alert("Error while loading xml file");
        }
    });

    $('#applyFilter').click(function(){
        applyFilter();
    });
});


function populateFilters(){
    let genres = new Set();
    let authors = new Set();

    booksJSON.forEach(book => {
        genres.add(book.genres);
        authors.add(book.author);
    });

    genres.forEach(g =>{
        $('#genreFilter').append(`<option value="${g}">${g}</option>`);
    });

    authors.forEach(a=>{
        $('#authorFilter').append(`<option value="${a}">${a}</option>`);
    });
}


function displayBooks(data) {
    let table = `
    <table border="1">
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Price</th>
            <th>Publish Date</th>
        </tr>
    `;

    data.forEach(book =>{
        table += `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genres}</td>
                <td>${book.price}</td>
                <td>${book.publish_date}</td>
            </tr>
        `;
    });

    table += '</table>';

    $('#tableContainer').html(table);
}


function applyFilter(){
    let selectedG = $("#genreFilter").val();
    let selectedA = $("#authorFilter").val();
    let minPrice = parseFloat($("#minPrice").val()) || 0;
    let maxPrice = parseFloat($("#maxPrice").val()) || Infinity;

    let filteredBooks = booksJSON.filter(book => {

        let matchGenre = selectedG === "all" || book.genres === selectedG;
        let matchAuthor = selectedA === "all" ||  book.author === selectedA;
        let matchPrice = book.price >= minPrice && book.price <= maxPrice;

        return matchGenre && matchAuthor && matchPrice;
    });

    displayBooks(filteredBooks);
}