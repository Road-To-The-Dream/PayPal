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
            'old_password' => 'min:8|max:20|required',
            'new_password' => 'min:8|max:20|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'min:8|max:20'
        ];
    }

    /**
     * @return array
     */
    public function messages(): array
    {
        return [
            'old_password.required' => 'Field old password is empty',
            'old_password.min:8' => 'Field old password must be 8 characters',
            'old_password.max:20' => 'The old password may not be greater than 20 characters',

            'new_password.min:8' => 'Field password must be 8 characters',
            'new_password.max:20' => 'The new password may not be greater than 20 characters',
            'new_password.required_with:password_confirmation' => 'Field password is empty',
            'new_password.same:password_confirmation' => 'Password do not match',

            'password_confirmation.min:8' => 'Field confirm password must be 7 characters',
            'password_confirmation.max:20' => 'The confirmation password may not be greater than 20 characters',
        ];
    }
}
