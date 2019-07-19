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
        ];
    }

    /**
     * @return array
     */
    public function messages(): array
    {
        return [
            'total_price|required' => 'Field total price is empty',
        ];
    }
}
