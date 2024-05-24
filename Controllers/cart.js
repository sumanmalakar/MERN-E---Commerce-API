// controllers/cartController.js

import Cart from "../Models/Cart.js";

// Add to Cart
export const addItemToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;
  const userId = req.user;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty;
      cart.items[itemIndex].price += price * qty; // Assuming price is the price per unit
    } else {
      cart.items.push({ productId, title, price, qty, imgSrc });
    }

    await cart.save();
    res.status(200).json({ message: "Items is added on Cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error suman", error });
  }
};

// get Cart by User
export const getUserCart = async (req, res) => {
  const userId = req.user;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "User Specific Cart ", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// remove Item from cart
export const removeItemFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Item Removed ", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// decrease Qty of item
// export const decreaseItemQty = async (req, res) => {
//   const { productId, qty } = req.body;

//   const userId = req.user;

//   if (!productId || !qty) {
//     return res
//       .status(400)
//       .json({ message: "Missing productId, qty, or userId" });
//   }

//   try {
//     const cart = await Cart.findOne({ userId });
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     const itemIndex = cart.items.findIndex(
//       (item) => item.productId.toString() === productId
//     );

//     // const temp = cart.items[itemIndex].price / cart.items[itemIndex].qty;

//     if (itemIndex > -1) {
//       if (cart.items[itemIndex].qty > qty) {
//         cart.items[itemIndex].qty -= qty;
//         cart.items[itemIndex].price -=
//           (cart.items[itemIndex].price / cart.items[itemIndex].qty) * qty;
//       } else {
//         cart.items.splice(itemIndex, 1);
//       }
//     } else {
//       return res.status(404).json({ message: "Item not found in cart" });
//     }

//     await cart.save();
//     res.status(200).json({ message: "Item quantity decreased", cart });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// decrease Qty of item
export const decreaseItemQty = async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user;

  if (!productId || !qty) {
    return res
      .status(400)
      .json({ message: "Missing productId, qty, or userId" });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      const item = cart.items[itemIndex];

      if (item.qty > qty) {
        // Calculate the price per unit
        const pricePerUnit = item.price / item.qty;
        // Decrease the quantity
        item.qty -= qty;
        // Update the price
        item.price -= pricePerUnit * qty;
      } else {
        // If qty to decrease is equal or more than current qty, remove the item
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await cart.save();
    res.status(200).json({ message: "Item quantity decreased", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Clear Cart
export const clearCart = async (req, res) => {
  const userId = req.user;
  try {
    // Assuming there's a single cart, you might need to adjust this for multiple carts.
    let cart = await Cart.findOne({ userId }); 
    console.log("my cart", cart)
    if (!cart) {
      // If there's no cart, create a new empty one
      cart = new Cart({ items: [] });
    } else {
      // Clear the existing cart
      cart.items = [];
      
    }
    console.log("my cart", cart);

    // Save the cleared cart
    await cart.save();

    res.json({ message: 'Cart cleared', cart });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}

