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
        $productsId = $this->productsService->getProductsId($request);
        $uniqueProductsId = array_unique($productsId);
        $productsPrice = Product::whereIn('id', $uniqueProductsId)->get();
        $counts = array_count_values($productsId);

        $iteration = 0;
        $productsInfo = [];
        foreach ($uniqueProductsId as $item) {
            array_push($productsInfo, [
                'product_id' => $item,
                'product_price' => $productsPrice[$iteration]->price,
                'product_amount' => $counts[$item],
                'user_email' => $request->input('pay_email'),
                'user_phone' => $request->input('pay_phone')
            ]);

            $iteration++;
        }

        return $productsInfo;
    }
}
