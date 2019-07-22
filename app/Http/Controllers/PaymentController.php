<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentRequest;
use App\Services\PayPal;
use Illuminate\Http\RedirectResponse;

class PaymentController extends Controller
{
    private $payPalService;

    public function __construct(PayPal $objPayPal)
    {
        $this->payPalService = $objPayPal;
    }

    /**
     * @param PaymentRequest $request
     * @return RedirectResponse
     */
    public function pay(PaymentRequest $request): RedirectResponse
    {
        $this->payPalService->saveEmailAndPhoneToSession($request);

        return $this->payPalService->pay($request);
    }

    /**
     * @return RedirectResponse
     */
    public function getPaymentStatus(): RedirectResponse
    {
        return $this->payPalService->getPaymentStatus();
    }
}
