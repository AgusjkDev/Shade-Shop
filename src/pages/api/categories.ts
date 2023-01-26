import type { NextApiRequest, NextApiResponse } from "next";

import { APIError, GetCategories } from "interfaces/api";
import { Method, StatusCode } from "enums/api";
import { sort } from "helpers";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetCategories | APIError>
) {
    if (req.method !== Method.GET) {
        return res
            .status(StatusCode.MethodNotAllowed)
            .json({ msg: "Method Not Allowed!", status: StatusCode.MethodNotAllowed });
    }

    return res.status(StatusCode.OK).json({
        categories: sort(
            "A-Z",
            [
                {
                    _id: "1",
                    name: "Buzos",
                },
                {
                    _id: "2",
                    name: "Calzas",
                },
                {
                    _id: "3",
                    name: "Camperas",
                },
                {
                    _id: "4",
                    name: "Pantalones",
                },
                {
                    _id: "5",
                    name: "Shorts",
                },
                {
                    _id: "6",
                    name: "Remeras",
                },
                {
                    _id: "7",
                    name: "Zapatillas",
                },
            ],
            "name"
        ),
        status: StatusCode.OK,
    });
}
