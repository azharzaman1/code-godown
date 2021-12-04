// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { filteredLangs } from "../../files/programming-langs-filtered";

export default function programming_langs(req, res) {
  res.status(200).json(filteredLangs);
}
