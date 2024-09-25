import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import CartItem from "../../components/ItemCart"; // Đảm bảo bạn đã tạo CartItem component
import fetchOrderById from "../../utils/order/fetchOrderById";
import { getProfile } from "../../utils/user/profileUser";
import deleteOrderById from "../../utils/order/deleteOrderById";
import updateQuantity from "../../utils/order/updateQuantity";
import paymentCart from "../../utils/order/paymentCart";
import formatCurrency from "../../utils/formatMoney";
import styles from "./style";
import createPaymentIntent from "../../utils/payment/createPaymentIntent";
import { useStripe } from "@stripe/stripe-react-native";
const CartScreen = () => {
  const [items, setItems] = useState([]);
  const [itemsSelected, setItemsSelected] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const increaseQuantity = async (id) => {
    const quantity = items.find((item) => item.id === id).quantity;
    // console.log(quantity);
    await updateQuantity(id, quantity + 1);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = async (id) => {
    const quantity = items.find((item) => item.id === id).quantity;
    // console.log(quantity);
    await updateQuantity(id, quantity - 1);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const deleteItem = async (id) => {
    await deleteOrderById(id);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Tính tổng số tiền
  // const totalAmount = itemsSelected.reduce(
  //   (total, item) => total + item.new_price * item.quantity,
  //   0,
  // );
  // const totalAmount = items
  //   .filter((item) => itemsSelected.includes(item.id))
  //   .reduce((total, item) => total + item.new_price * item.quantity, 0);

  const paymentCarts = async () => {
    try {
      // create payment intent
      const responseCreatePaymentIntent = await createPaymentIntent(
        totalAmount
      );
      if (responseCreatePaymentIntent.error) {
        throw new Error(responseCreatePaymentIntent.error);
      }
      console.log(responseCreatePaymentIntent);
      // initial payment sheet
      const responseInitPayment = await initPaymentSheet({
        merchantDisplayName: "notJust.dev",
        paymentIntentClientSecret: responseCreatePaymentIntent.paymentIntent,
        // defaultBillingDetails: {},
      });
      if (responseInitPayment.error) {
        throw new Error(responseInitPayment.error);
      }
      // perent payment sheet from striple
      const responsePaymentSheet = await presentPaymentSheet();
      if (responsePaymentSheet.error) {
        throw new Error(responsePaymentSheet.error);
      }
      console.log("checkout ok");
      // if payment ok - > create order, change status, change item carts
      itemsSelected.map(async (id) => {
        await paymentCart(id);
      });
      setItems((prevItems) =>
        prevItems.filter((item) => !itemsSelected.includes(item.id))
      );
      setItemsSelected([]);
    } catch (e) {
      console.error(e);
      return;
    }
  };
  const selectItem = (id) => {
    console.log(id);
    if (itemsSelected.includes(id)) {
      setItemsSelected(itemsSelected.filter((item) => item !== id));
    } else {
      setItemsSelected([...itemsSelected, id]);
    }
  };
  useEffect(() => {
    console.log("Items Selected:", itemsSelected);
  }, [itemsSelected]);
  useEffect(() => {
    const total = items
      .filter((item) => itemsSelected.includes(item.id))
      .reduce((total, item) => total + item.new_price * item.quantity, 0);
    setTotalAmount(total);
  }, [itemsSelected]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy userId và name từ hàm getProfile
        const { userId, name } = await getProfile();
        console.log("User ID:", userId);
        console.log("User Name:", name);

        // Gọi API lấy dữ liệu giỏ hàng sau khi có userId
        if (userId) {
          const cartItems = await fetchOrderById(userId, "pending", setItems); // Gọi API lấy giỏ hàng
          // console.log('Cart Items:', cartItems);
        }
      } catch (error) {
        console.error("Error fetching profile or cart:", error);
      }
    };

    fetchData(); // Gọi hàm async trong useEffect
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ Hàng</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onDelete={deleteItem}
            selectItem={selectItem}
            itemsSelected={itemsSelected}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Thành Tiền:</Text>
        <Text style={styles.totalAmount}>{formatCurrency(totalAmount)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={paymentCarts}>
          <Text style={styles.checkoutButtonText}>Thanh Toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
