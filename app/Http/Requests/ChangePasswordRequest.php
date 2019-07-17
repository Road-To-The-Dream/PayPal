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
            'old_password' => 'min:8|required',
            'new_password' => 'min:8|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'min:8'
        ];
    }

    /**
     * @return array
     */
    public function messages(): array
    {
        return [
            'email|required' => 'Field email is empty',
            'old_password|required' => 'Field old password is empty',
            'old_password|min:8' => 'Field old password must be 8 characters',
            'new_password|min:8' => 'Field password must be 8 characters',
            'new_password|required_with:password_confirmation' => 'Field password is empty',
            'new_password|same:password_confirmation' => 'Password do not match',
            'password_confirmation|min:8' => 'Field confirm password must be 7 characters'
        ];
    }
}
