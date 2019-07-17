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
            'old-password' => 'min:8|required',
            'new-password' => 'min:8|required_with:password-confirmation|same:password-confirmation',
            'password-confirmation' => 'min:8'
        ];
    }

    /**
     * @return array
     */
    public function messages(): array
    {
        return [
            'email|required' => 'Field email is empty',
            'old-password|required' => 'Field old password is empty',
            'old-password|min:8' => 'Field old password must be 8 characters',
            'new-password|min:8' => 'Field password must be 8 characters',
            'new-password|required_with:password-confirmation' => 'Field password is empty',
            'new-password|same:password-confirmation' => 'Password do not match',
            'password-confirmation|min:8' => 'Field confirm password must be 7 characters'
        ];
    }
}
