<?php

namespace App\Services;

use App\Http\Requests\PaymentRequest;

interface Payment
{
    public function pay(PaymentRequest $request);

    public function getPaymentStatus();
}
