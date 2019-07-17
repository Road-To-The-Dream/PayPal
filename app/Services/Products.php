<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Model\Product;

class Products
{
    public function getProductsId(Request $request)
    {
        $productsId = [];

        foreach ($request->session()->get('productsId') as $product) {
            array_push($productsId, $product[0]);
        }

        return $productsId;
    }

    public function isAmount(Request $request)
    {
        $productId = $this->getProductsId($request);

        $productsId = array_unique($productId);

        $products = Product::whereIn('id', $productsId)->get();

        $counts = array_count_values($productId);
        $iteration = 0;
        foreach ($productsId as $item) {
            if ($products[$iteration]->amount < $counts[$item]) {
                break;
            }

            $iteration++;
        }

        return response()->json([
            'message' => "Недостаточное количество продукта под номером {$products[$iteration]->id}"
        ], 200);
    }
}
