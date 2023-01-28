import type { NextApiRequest, NextApiResponse } from "next";

import { APIError, GetProducts } from "interfaces/api";
import { Method, StatusCode } from "enums/api";
import { sort } from "helpers";

export default function handler(req: NextApiRequest, res: NextApiResponse<GetProducts | APIError>) {
    if (req.method !== Method.GET) {
        return res
            .status(StatusCode.MethodNotAllowed)
            .json({ msg: "Method Not Allowed!", status: StatusCode.MethodNotAllowed });
    }

    return res.status(StatusCode.OK).json({
        products: sort(
            "A-Z",
            [
                {
                    _id: "1",
                    categoryId: "1",
                    name: "Buzo Future Icons",
                    price: 24999,
                    description:
                        "Lográ tus objetivos con este calzado. Estas zapatillas de running adidas mantiene tus pies cómodos sin importar qué tan tarde salgas a correr. Perfectas para el uso diario, tienen un exterior de malla transpirable y ligero que brinda frescura a tus pies y una mediasuela Cloudfoam para pasos más cómodos. La suela de caucho está diseñada para mantenerse firme en todo tipo de superficies, desde pasto mojado hasta arcilla. Cambiá de planes sin tener que cambiar de zapatillas.",
                    images: [
                        "/imgs/products/buzo-future-icons.webp",
                        "/imgs/products/buzo-future-icons-back.webp",
                    ],
                },
                {
                    _id: "2",
                    categoryId: "2",
                    name: "Calza Own The Run",
                    price: 19499,
                    description:
                        "No se trata solo del número de kilómetros o del tono muscular. Correr es el tiempo que dedicás a tu mente y cuerpo. Comprometete con cada paso con estas calzas de running adidas. Incorporan un bolsillo a prueba de sudor para guardar tu teléfono y están confeccionadas con tejido AEROREADY absorbente que te mantiene fresca. Prepará tu playlist de running y salí a correr.",
                    images: [
                        "/imgs/products/calza-own-the-run.webp",
                        "/imgs/products/calza-own-the-run-back.webp",
                    ],
                },
                {
                    _id: "3",
                    categoryId: "3",
                    name: "Campera Adicolor Colorblock",
                    price: 37999,
                    description:
                        "El conjunto es una leyenda. Es el símbolo de la facilidad, con una actitud despreocupada que no podés dejar de adoptar. Esta campera adidas se inspira en los años 80 para crear las icónicas siluetas Mirabeau que se destacan en diferentes colores. Su silueta estilizada y clásica te ofrece una absoluta comodidad.",
                    images: [
                        "/imgs/products/campera-adicolor-colorblock.webp",
                        "/imgs/products/campera-adicolor-colorblock-back.webp",
                    ],
                },
                {
                    _id: "4",
                    categoryId: "4",
                    name: "Pantalón SST Blocked",
                    price: 22999,
                    description:
                        "Creado para atletas y reimaginada para la vida urbana, el conjunto deportivo adidas SST ha sido una de las prendas más populares durante décadas. Esta versión del pantalón deportivo adidas SST luce la clásica silueta con las 3 Tiras, pero le inyecta energía moderna a tu atuendo con un diseño en bloques de color. Su tejido de tejido de tricot suave y los puños elásticos crean la mezcla perfecta entre descanso y deporte.",
                    images: [
                        "/imgs/products/pantalon-sst-blocked.webp",
                        "/imgs/products/pantalon-sst-blocked-back.webp",
                    ],
                },
                {
                    _id: "5",
                    categoryId: "5",
                    name: "Remera Essentials",
                    price: 9999,
                    description:
                        "Plan viajero. Plan relajación. Plan con amigos. Cualquier plan es bueno. Hacelo todo con el estilo descomplicado y cómodo de esta remera adidas. Su corte holgado y el tejido de algodón suave la hacen muy versátil para combinar con pantalones o jeans.",
                    images: [
                        "/imgs/products/remera-essentials.webp",
                        "/imgs/products/remera-essentials-back.webp",
                    ],
                },
                {
                    _id: "6",
                    categoryId: "6",
                    name: "Shorts Play",
                    price: 15999,
                    description:
                        "Símbolos de pasión y desempeño, el Trifolio y las 3 Tiras han dejado su huella a lo largo de décadas y culturas. Y hoy siguen haciéndolo a través de estos shorts adidas. Los icónicos detalles se destacan en colores contrastantes, jugando con dirección y profundidad para darles un enfoque moderno.",
                    images: [
                        "/imgs/products/shorts-play.webp",
                        "/imgs/products/shorts-play-back.webp",
                    ],
                },
                {
                    _id: "7",
                    categoryId: "7",
                    name: "Zapatillas Galaxy 6",
                    price: 20999,
                    description:
                        "Lográ tus objetivos con este calzado. Estas zapatillas de running adidas mantiene tus pies cómodos sin importar qué tan tarde salgas a correr. Perfectas para el uso diario, tienen un exterior de malla transpirable y ligero que brinda frescura a tus pies y una mediasuela Cloudfoam para pasos más cómodos. La suela de caucho está diseñada para mantenerse firme en todo tipo de superficies, desde pasto mojado hasta arcilla. Cambiá de planes sin tener que cambiar de zapatillas.",
                    images: [
                        "/imgs/products/zapatillas-galaxy-6.webp",
                        "/imgs/products/zapatillas-galaxy-6-side.webp",
                    ],
                },
            ],
            "name"
        ),
        status: StatusCode.OK,
    });
}
