import { supabase } from "../supabase/supabaseClient";

export const addItem = async (
  name: string,
  price: number,
  quantity: number,
) => {
  const { data, error } = await supabase
    .from("product")
    .insert([{ name, price, quantity }]);
  if (error) console.error("Insert failed", error);
  else console.log("Inserted item", data);
};

export const updateProduct = async (
  id: string,
  productName: string,
  quantity: number,
  price: number,
) => {
  const { data, error } = await supabase
    .from("product")
    .update({
      name: productName,
      quantity: quantity,
      price: price,
    })
    .eq("id", id);

  if (error) {
    console.error("Update error:", error.message);
  } else {
    console.log("Updated successfully:", data);
  }
};

export const deleteProduct = async (id: number) => {
  const { data, error } = await supabase
    .from("product") // your table name
    .delete()

    .eq("id", id);

  if (error) {
    console.error("Delete error:", error.message);
  } else {
    console.log("Deleted row:", data);
  }
};

