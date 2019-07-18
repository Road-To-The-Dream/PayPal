<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Services\PayPal;
use App\Services\Products;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    private $payService;
    private $product;

    public function __construct(PayPal $objPayPal, Products $objProduct)
    {
        $this->payService = $objPayPal;
        $this->product = $objProduct;
    }

    public function store(PaymentRequest $request)
    {
        return response()->json([
            'message' => "Всё супер"
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
