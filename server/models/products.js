const products = {
  productsList: [{
    id: 1,
    quantity: 12,
    minInvent: 3,
    name: 'Otis Headphone',
    created: '2018-10-14T06:33:09.250Z',
    price: 18,
  },
  {
    id: 2,
    quantity: 10,
    minInvent: 5,
    name: 'Extreme GPS',
    created: '2018-10-14T06:38:20.250Z',
    price: 7,
  },
  ],
  lastId: 2,
};

const productsMap = new Map();
products.productsList.forEach((product) => {
  productsMap.set(String(product.id), product);
});
export { products, productsMap };
