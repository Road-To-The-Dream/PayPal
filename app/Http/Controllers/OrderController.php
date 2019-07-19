<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Model\Order;
use App\Services\Orders;
use App\Services\PayPal;
use App\Services\Products;
use Illuminate\Http\RedirectResponse;
use Mockery\Exception;

class OrderController extends Controller
{
    private $payService;
    private $productService;
    private $orderService;

    public function __construct(PayPal $objPayPal, Products $objProduct, Orders $objOrder)
    {
        $this->payService = $objPayPal;
        $this->productService = $objProduct;
        $this->orderService = $objOrder;
    }

    public function store(PaymentRequest $request)
    {
        $w = 2;
        try {
            $newOrder = Order::create();
            $newOrder->products()->sync($this->orderService->getArrayProductsInfo($request));

            $request->session()->forget('productsId');
        } catch (Exception $ex) {
            return response()->json([
                'message' => "Ошибка, повторите попытку позже!"
            ], 500);
        }

        return response()->json([
            'message' => "Заказ успешно оформлен !"
        ], 200);
    }

    /**
     * @return RedirectResponse
     */
    public function getPaymentStatus(): RedirectResponse
    {
        return $this->payService->getPaymentStatus();
    }
}
