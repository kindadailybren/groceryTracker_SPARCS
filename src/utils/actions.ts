import { supabase } from "../supabase/supabaseClient";

type InsertProduct = {
    product_name: string;
    quantity: number;
    price: number;
};

export const addItem = async (product: InsertProduct) => {
    const { product_name, quantity, price } = product;

    const { data, error } = await supabase
        .from('product')
        .insert([
            {
                name: product_name,
                quantity: quantity,
                price: price
            }
        ])
        .select();

    if (error) {
        console.error("Error inserting product:", error);
        return null;
    }

    console.log("Inserted product:", data);
    return data;
};