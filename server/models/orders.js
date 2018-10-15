const orders = {
  ordersList:
    [
      {
        orderId: 1,
        productsArray: [
          {
            productId: 2,
            quantity: 5,
            pricePerProduct: 8,
          },
          {
            productId: 1,
            quantity: 7,
            pricePerProduct: 8,
          },
        ],
        attendantId: 1,
        orderDate: '2018-09-14T06:33:09.250Z',
      },
    ],

  lastOrderId: 1,
};

const ordersMap = new Map();
orders.ordersList.forEach((order) => {
  ordersMap.set(String(order.orderId), order);
});
export { orders, ordersMap };
