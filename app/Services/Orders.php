<?php

namespace App\Services;

use App\Model\Product;

class Orders
{
    private $productsService;

    public function __construct(Products $objProduct)
    {
        $this->productsService = $objProduct;
    }

    /**
     * @param $request
     * @return array
     */
    public function getArrayProductsInfo($request): array
    {
        $productsId = $this->productsService->getProductsIdInSession($request->session()->get('productsId'));
        $productsIdUnique = $this->productsService->getProductsUniqueInSession($request->session()->get('productsId'));

        sort($productsIdUnique);

        $productsKey = $this->productsService->getProductsKeyInSession($productsIdUnique);
        $productsPrice = Product::whereIn('id', $productsIdUnique)->get();
        $arrayProductsAmount = $this->productsService->getEveryProductsAmountInSession($productsId);

        $productsInfo = [];
        $productsIdAmount = count($productsKey);
        for ($i = 0; $i < $productsIdAmount; $i++) {
            array_push($productsInfo, [
                'product_id' => $productsIdUnique[$productsKey[$i]],
                'product_price' => $productsPrice[$i]->price,
                'product_amount' => $arrayProductsAmount[$productsIdUnique[$productsKey[$i]]],
                'user_email' => $request->session()->get('email.0'),
                'user_phone' => $request->session()->get('phone.0')
            ]);
        }

        return $productsInfo;
    }
}
