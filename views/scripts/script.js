const doc = document;
const searchText = doc.getElementById('searchText');
const productsString = doc.getElementById('products');
const rowContainer = doc.getElementById('rowContainer');

let products = JSON.parse(productsString.innerHTML);
productsString.innerHTML = '';
productsString.innerText = '';

searchText.addEventListener('keyup', search);

function search(evt) {
    rowContainer.innerHTML = '';
    const text = searchText.value.toLowerCase();
    for (let i of products) {
        const name = i.name.toLowerCase();
        const description = i.description.toLowerCase();
        if (name.indexOf(text) != -1 ||
            description.indexOf(text) != -1) {
            console.log(name);
            rowContainer.innerHTML += `
            <div class="col-md-3">
                <div class="card m-1 d-inline-block">
                    <div class="card-header">
                        <p>Name: ${i.name}
                        </p>
                    </div>

                    <div class="card-body">
                        <p>Description: ${i.description}
                        </p>
                        <p>Category: ${i.category}
                        </p>
                        <p>Stock: ${i.stock}
                        </p>
                        <img src="${i.image}" class="card-img-top">
                    </div>

                    <div class="card-footer">
                        <a href="/delete/${i.id}">
                            <button class="btn btn-danger">
                                Delete
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            `
        }
    }
}