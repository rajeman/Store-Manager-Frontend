
const verifyProductInCart = (products, id) =>
    products.find((product) => product.product_id === id)

const removeProduct = (products, id) =>
    products.filter((product) => product.product_id != id)

const saveToStorage = (email, userItems) => localStorage.setItem(email, JSON.stringify(userItems))

const getUserItems = (email) =>
    localStorage.getItem(email) !== null ? JSON.parse(localStorage.getItem(email)) : {};

export const addProductToCart = (email, product) => {
    const userItems = getUserItems(email);
    const userProducts = userItems.products != undefined ? userItems.products : [];
    const isProductPresent = verifyProductInCart(userProducts, product.product_id);
    if (isProductPresent) {
        return 'DUPLICATE_ITEM';
    }
    userProducts.push(product);
    saveToStorage(email, {
        ...userItems,
        products: userProducts
    });
    return 'ADD_SUCCESS';
}

export const removeCartProduct = (email, id) => {
    const userItems = getUserItems(email);
    const filteredProducts = removeProduct(userItems.products, id);
    saveToStorage(email, {
        ...userItems,
        products: filteredProducts
    });

    return 'REMOVE_SUCCESS';
}

export const removeAllProducts = (email) => {
    const userItems = getUserItems(email);
    saveToStorage(email, {
        ...userItems,
        products: []
    });

    return 'REMOVE_SUCCESS';
}

export const fetchCartProducts = (email) =>
  localStorage.getItem(email) !== null ? JSON.parse(localStorage.getItem(email)).products : [];
