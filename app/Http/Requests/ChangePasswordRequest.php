<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
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
            'email' => 'required',
            'password' => 'required'
        ];
    }

    /**
     * @return array
     */
    public function messages(): array
    {
        return [
            'email|required' => 'Field email is empty',
            'password|required' => 'Field password is empty'
        ];
    }
}
