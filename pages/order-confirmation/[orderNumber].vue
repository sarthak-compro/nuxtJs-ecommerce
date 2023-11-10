<template>
    <div class="container mx-auto">
        <h1 class="text-3xl font-semibold mb-4">Order Confirmation</h1>
        <div class="bg-white p-6 shadow-lg rounded-md">
            <div>
                <h2 class="text-xl font-semibold">Thank you for your order!</h2>
                <p class="mt-4">
                    Your order has been successfully placed with the following details:
                </p>

                <!-- Order Summary -->
                <div class="mt-4">
                    <h3 class="text-lg font-semibold">Order Summary</h3>
                    <p>Order Number: {{ order.orderNumber }}</p>
                    <p>Order Date: {{ currentDate }}</p>
                    <p>Total Amount: Rs. {{ useCartStore().totalPrice }}</p>
                    <p>Payment Method: {{ order.paymentMethod }}</p>
                    <p>Shipping Address: {{ order.shippingAddress.street }}, {{ order.shippingAddress.city }}</p>
                </div>

                <!-- Ordered Items -->
                <div class="mt-6">
                    <h3 class="text-lg font-semibold">Ordered Items</h3>
                    <ul>
                        <li v-for="item in useCartStore().cart.items" :key="item.id">
                            {{ item.name }} (Quantity: {{ item.quantity }}, Price: Rs. {{ item.price }},
                            Subtotal: Rs. {{ item.subTotalPrice }})
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { useOrdersStore } from '~/store/orders';

const orderNumber = useRouter().currentRoute.value.params.orderNumber;
console.log(orderNumber);
const order = await useOrdersStore().getOrder(orderNumber);
</script>
