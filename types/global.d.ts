type Category = {
    _id: string;
    name: string;
};

type Product = {
    _id: string;
    categoryId: string;
    name: string;
    price: number;
    description: string;
    images: string[];
};
