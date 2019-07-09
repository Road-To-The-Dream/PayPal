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
            'total-price' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'total-price|required' => 'Field is empty'
        ];
    }
}
