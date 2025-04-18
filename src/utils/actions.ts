import { supabase } from "../supabase/supabaseClient";

export const addItem = async (name: string, price: number, quantity: number) => {
    const { data, error } = await supabase
        .from("product")
        .insert([{ name, price, quantity }]);
    if (error) console.error("Insert failed", error);
    else console.log("Inserted item", data);
};