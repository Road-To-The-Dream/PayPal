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
            'amount' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'amount|required' => 'Field is empty'
        ];
    }
}
