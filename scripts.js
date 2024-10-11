import data from './data.js'

const itemsContainer = document.querySelector('#items')
const cart = []

for (let i = 0; i < data.length; i += 1) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	// create an image element
	const img = document.createElement('img');
	// this will change each time we go through the loop. Can you explain why?
	img.src = data[i].image
	img.width = 300
	img.height = 300
	// Add the image to the div
	newDiv.appendChild(img)
	console.log(img) // Check the console!
	itemsContainer.appendChild(newDiv)

    // create a paragraph element for a description
    const desc = document.createElement('P')
    // give the paragraph text from the data
    desc.innerText = data[i].desc
    // append the paragraph to the div
    newDiv.appendChild(desc)
    // do the same thing for price
    const price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)

    const button = document.createElement('button')
    // add a class name to the button
    button.className = 'add-to-cart'
	// add an  id name to the button
	button.dataset.id = data[i].name
	// creates a custom attribute called data-price. That will hold price for each element in the button
	button.dataset.price = data[i].price
	button.innerHTML = "Add to Cart"
	newDiv.appendChild(button)

}

const addItemToCart = (id, price) => {
    // Loop over cart items. 
    for (let i = 0; i < cart.length; i += 1) {
        // If we find a matching item increase the quantity
        if (cart[i].id === id) {
            cart[i].qty += 1
            return // exit this function early
        }
    }
    // If no matching items were found add a new item
    cart.push({ id, price, qty: 1 })
}

const addToCart = (id) => {
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i] // get the item from the cart
        // Does the name match the name of the id? 
        if (id === item.id) {
            // if so...
            item.qty += 1 // add 1 to qty
            return // exit this function early
        }
    }
}

const removeFromCart = (id) => {
    // Loop over items in cart
    for (let i = 0; i < cart.length; i += 1 ) {
        // get an item 
        const item = cart[i]
        // Does id match the item id? 
        if (id === item.id) {
            // if so, subtract 1 from item qty
            item.qty -= 1
            // Check if the qty is 0
            if (item.qty === 0) {
            // If so remove this item from the cart
            cart.splice(i, 1)
            }
        return 
        }
    }
}

document.body.addEventListener('click', (e) => {
    if (e.target.matches('.add-to-cart')) {
        console.log(e.target)
        addItemToCart(e.target.id, e.target.dataset.price)
        console.log(cart) // Use console.log to test your work
    }
})

const displayCart = () => {
    let cartStr = ''
    for (let i = 0; i < cart.length; i += 1) {
      const item = cart[i]
      cartStr += `<li>
        <span>${item.id}</span>
        <input type="number" value="${item.qty}" class="input-qty" data-id="${item.id}">
        <span>${item.price}</span>
        <span>${(item.price * item.qty).toFixed(2)}</span>
        <button class="button-add" data-id="${item.id}">+</button>
        <button class="button-sub" data-id="${item.id}">-</button>
      </li>`
    }
    // Get the cart 
    const cartItems = document.querySelector('#cart-items')
    // Set the inner html of the cart
    cartItems.innerHTML = cartStr
}

document.body.addEventListener('click', (e) => {
    if (e.target.matches('.add-to-cart')) {
        addItemToCart(e.target.dataset.id, e.target.dataset.price)
        displayCart() // Display the cart! 
    } else if (e.target.matches('.button-add')) {
        const name = e.target.dataset.id
        addToCart(name)
        displayCart()
    } else if (e.target.matches('.button-sub')) {
        const name = e.target.dataset.id // get the id
        removeFromCart(name) // call remove cart
        displayCart() // display the cart
    }
})

const updateCart = (id, val) => {
    console.log(id, val)
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i]
        if (id === item.id) {
            item.qty = val
            // If the value is less than 1
            if (item.qty < 1) {
            // remove this item from the cart
            cart.splice(i, 1)
            }
        return 
        }
    }
}

document.body.addEventListener('change', (e) => {
    if (e.target.matches('.input-qty')) {
        const name = e.target.dataset.id // get the id
        const value = parseInt(e.target.value) // get the value from the input
        updateCart(name, value) // call updateCart with the id and value
        displayCart() // display the cart
    }
})

document.body.addEventListener('keydown', (e) => {
    if (e.target.matches('.input-qty')) {
        if (e.key === "Enter") {
            const name = e.target.dataset.id
            const value = parseInt(e.target.value)
            updateCart(name, value)
            console.log(e)
            displayCart()
        }
    }
})