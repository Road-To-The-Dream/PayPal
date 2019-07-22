<?php

namespace App\Services;

use App\Model\Product;
use Illuminate\Http\JsonResponse;

class Products
{
    /**
     * @param $productsIdSession
     * @return JsonResponse
     */
    public function isProductsAmount($productsIdSession): JsonResponse
    {
        $productsId = $this->getProductsIdInSession($productsIdSession);
        $productsIdUnique = $this->getProductsUniqueInSession($productsIdSession);
        $productsInfo = Product::whereIn('id', $productsIdUnique)->get();

        $arrayProductsAmount = $this->getEveryProductsAmountInSession($productsId);

        sort($productsIdUnique);

        $productsIdAmount = count($productsIdUnique);
        for ($i = 0; $i < $productsIdAmount; $i++) {
            if ($productsInfo[$i]->amount < $arrayProductsAmount[$productsIdUnique[$i]]) {
                return response()->json([
                    'message' => "На складе нет заданного количества продукта под номером {$productsIdUnique[$i]}"
                ], 300);
            }
        }

        return response()->json(200);
    }

    /**
     * @param $productsIdSession
     */
    public function decreaseProductAmountInDatabase($productsIdSession): void
    {
        $productsId = $this->getProductsIdInSession($productsIdSession);
        $productsIdUnique = $this->getProductsUniqueInSession($productsIdSession);

        sort($productsIdUnique);

        $arrayProductsAmounts = $this->getEveryProductsAmountInSession($productsId);

        $productsIdAmount = count($productsIdUnique);
        for ($i = 0; $i < $productsIdAmount; $i++) {
            Product::where('id', $productsIdUnique[$i])
                ->decrement('amount', $arrayProductsAmounts[$productsIdUnique[$i]]);
        }
    }

    /**
     * @param $productsIdSession
     * @return array
     */
    public function getProductsInfoInSession($productsIdSession): array
    {
        $productsId = $this->getProductsIdInSession($productsIdSession);
        $arrayProductsAmounts = $this->getEveryProductsAmountInSession($productsId);

        $productInfo = [];
        foreach (array_unique($productsId) as $item) {
            array_push($productInfo, [
                'id' => $item,
                'amount' => $arrayProductsAmounts[$item],
            ]);
        }

        sort($productInfo);

        return $productInfo;
    }

    /**
     * @param $productsIdSession
     * @return array
     */
    public function getProductsIdInSession($productsIdSession): array
    {
        $productKeys = $this->getProductsKeyInSession($productsIdSession);

        $productsId = [];

        $productsAmount = count($productsIdSession);
        for ($i = 0; $i < $productsAmount; $i++) {
            array_push($productsId, $productsIdSession[$productKeys[$i]][0]);
        }

        return $productsId;
    }

    /**
     * @param $productsId
     * @return array
     */
    public function getProductsUniqueInSession($productsId): array
    {
        return array_unique($this->getProductsIdInSession($productsId));
    }

    /**
     * @param $productsId
     * @return array
     */
    public function getEveryProductsAmountInSession($productsId): array
    {
        return array_count_values($productsId);
    }

    /**
     * @param $productsId
     * @return int|void
     */
    public function getProductsAmountInSession($productsId)
    {
        return count($productsId);
    }

    public function getProductsKeyInSession($productsId)
    {
        return array_keys($productsId);
    }
}
