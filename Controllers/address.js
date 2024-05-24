import { Address } from "../Models/Address.js";

// Add a new address
export const addAddress = async (req, res) => {
  const { fullName, city, state, pinCode, country, phoneNumber, addressLine } =
    req.body;

  try {
    const address = new Address({
      userId: req.user,
      fullName,
      addressLine,
      city,
      state,
      pinCode,
      country,
      phoneNumber,
    });

    const savedAddress = await address.save();
    res.status(201).json({ message: "Your Address Added", savedAddress });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all addresses for a user
export const getAddressesByUserId = async (req, res) => {
  const userId = req.user;

  try {
    const addresses = await Address.find({ userId }).sort({createdAt:-1});
    res.status(200).json({ message: "user Address", recentaddress:addresses[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
