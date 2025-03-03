import { supabase } from "/app/layout";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const name = req.name;
    const email = req.email;
    const message = req.message;

    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([{ name, email, message }]);

    if (!error) {
      res.status(200).json(data);
    } else {
      res.status(500).json(error);
    }
  }
}
