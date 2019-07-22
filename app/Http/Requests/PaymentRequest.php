<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
{
    /**
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'total_price' => 'required',
            'pay_email' => 'required|email',
            'pay_phone' => 'required'
        ];
    }

    /**
     * @return array
     */
    public function messages(): array
    {
        return [
            'total_price.required' => 'Field total price is empty',
            'pay_email.email' => 'The email must be a valid email address',
            'pay_email.required' => 'Field email is empty',
            'pay_phone.required' => 'Field phone is empty',
        ];
    }
}
