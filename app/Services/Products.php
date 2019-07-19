<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Model\Product;
use Illuminate\Http\JsonResponse;

class Products
{
    /**
     * @param Request $request
     * @return array
     */
    public function getProductsId(Request $request): array
    {
        $productsId = [];

        foreach ($request->session()->get('productsId') as $product) {
            array_push($productsId, $product[0]);
        }

        return $productsId;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function isAmount(Request $request): JsonResponse
    {
        $productId = $this->getProductsId($request);

        $productsId = array_unique($productId);

        $products = Product::whereIn('id', $productsId)->get();

        $counts = array_count_values($productId);
        $iteration = 0;
        foreach ($productsId as $item) {
            if ($products[$iteration]->amount < $counts[$item]) {
                return response()->json([
                    'message' => "Недостаточное количество продукта под номером {$item}"
                ], 300);
            }

            $iteration++;
        }

        return response()->json(200);
    }

    /**
     * @param Request $request
     * @return array
     */
    public function getProductAmountInSession(Request $request): array
    {
        $productsId = $this->getProductsId($request);

        $counts = array_count_values($productsId);

        $productInfo = [];
        foreach (array_unique($productsId) as $item) {
            array_push($productInfo, [
                'id' => $item,
                'amount' => $counts[$item],
            ]);
        }

        return $productInfo;
    }

    /**
     * @param Request $request
     */
    public function decreaseProductAmount(Request $request): void
    {
        $productsId = $this->getProductsId($request);
        $uniqueProductsId = array_unique($productsId);

        $productsInfo = Product::whereIn('id', $uniqueProductsId)->get();

        $counts = array_count_values($productsId);

        $iteration = 0;
        foreach ($uniqueProductsId as $product) {
            Product::where('id', $product)
                ->update(['amount' => $productsInfo[$iteration]->amount - $counts[$product]]);

            $iteration++;
        }
    }
}
